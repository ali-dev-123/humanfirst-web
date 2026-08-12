import { useCallback, useEffect, useRef, useState } from 'react'

type GoogleCredentialResponse = {
  credential?: string
}

type GoogleNotification = {
  isNotDisplayed?: () => boolean
  isSkippedMoment?: () => boolean
  getNotDisplayedReason?: () => string
  getSkippedReason?: () => string
}

type GoogleAccountsId = {
  initialize: (options: {
    client_id: string
    callback: (response: GoogleCredentialResponse) => void
    auto_select?: boolean
    cancel_on_tap_outside?: boolean
    ux_mode?: 'popup' | 'redirect'
  }) => void
  prompt: (momentListener?: (notification: GoogleNotification) => void) => void
  cancel: () => void
  disableAutoSelect: () => void
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: GoogleAccountsId
      }
    }
  }
}

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

export function useGoogleSignIn(options: {
  onSuccess: (credential: string) => Promise<void>
  onError: (error: Error) => void
}) {
  const { onSuccess, onError } = options
  const [isReady, setIsReady] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  // Keep the latest callbacks in refs so the init effect below does not
  // need onSuccess/onError in its dependency array. Those props are
  // recreated on every LoginCard render, which was causing this effect
  // to re-run on every keystroke and call google.accounts.id.initialize()
  // repeatedly — aborting any in-flight FedCM/Google prompt request.
  const onSuccessRef = useRef(onSuccess)
  const onErrorRef = useRef(onError)

  useEffect(() => {
    onSuccessRef.current = onSuccess
    onErrorRef.current = onError
  }, [onSuccess, onError])

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (!GOOGLE_CLIENT_ID) {
      setLoadError('Google Client ID is not configured.')
      return
    }

    const scriptId = 'google-identity-script'
    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null

    const initializeGoogle = () => {
      if (!window.google?.accounts?.id) {
        setLoadError('Google Identity Services failed to load.')
        return
      }

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response) => {
          if (response?.credential) {
            try {
              await onSuccessRef.current(response.credential)
            } catch (error) {
              onErrorRef.current(error instanceof Error ? error : new Error('Google login failed.'))
            }
          } else {
            onErrorRef.current(new Error('Google sign-in was not completed.'))
          }
        },
        auto_select: false,
        cancel_on_tap_outside: false,
        ux_mode: 'popup',
      })

      setIsReady(true)
    }

    if (existingScript) {
      if (window.google?.accounts?.id) {
        initializeGoogle()
        return
      }

      const handleLoad = () => initializeGoogle()
      const handleError = () => setLoadError('Failed to load Google Sign-In script.')

      existingScript.addEventListener('load', handleLoad, { once: true })
      existingScript.addEventListener('error', handleError, { once: true })

      return () => {
        existingScript.removeEventListener('load', handleLoad)
        existingScript.removeEventListener('error', handleError)
      }
    }

    const script = document.createElement('script')
    script.id = scriptId
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.addEventListener('load', initializeGoogle, { once: true })
    script.addEventListener('error', () => setLoadError('Failed to load Google Sign-In script.'), { once: true })
    document.head.appendChild(script)

    return () => {
      script.removeEventListener('load', initializeGoogle)
    }
    // Intentionally run once on mount — onSuccess/onError are read via refs above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const signIn = useCallback(() => {
    if (!isReady) {
      onErrorRef.current(new Error(loadError ?? 'Google Sign-In is not ready.'))
      return
    }

    try {
      window.google?.accounts?.id.prompt((notification) => {
        if (
          typeof notification?.isNotDisplayed === 'function' &&
          notification.isNotDisplayed()
        ) {
          onErrorRef.current(
            new Error(
              notification.getNotDisplayedReason?.() ??
                'Google Sign-In was not displayed. Check that this domain is added to Authorized JavaScript origins in Google Cloud Console, and that third-party cookies are not blocked.'
            )
          )
        } else if (
          typeof notification?.isSkippedMoment === 'function' &&
          notification.isSkippedMoment()
        ) {
          onErrorRef.current(
            new Error(notification.getSkippedReason?.() ?? 'Google Sign-In was skipped.')
          )
        }
      })
    } catch {
      onErrorRef.current(new Error('Unable to open Google Sign-In.'))
    }
  }, [isReady, loadError])

  return {
    signIn,
    isReady,
    loadError,
  }
}