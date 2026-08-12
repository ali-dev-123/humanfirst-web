import { useCallback, useEffect, useState } from 'react'

type GoogleCredentialResponse = {
  credential?: string
}

type GoogleAccountsId = {
  initialize: (options: {
    client_id: string
    callback: (response: GoogleCredentialResponse) => void
    auto_select?: boolean
    cancel_on_tap_outside?: boolean
    ux_mode?: 'popup' | 'redirect'
  }) => void
  prompt: () => void
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
              await onSuccess(response.credential)
            } catch (error) {
              onError(error instanceof Error ? error : new Error('Google login failed.'))
            }
          } else {
            onError(new Error('Google sign-in was not completed.'))
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
  }, [onSuccess, onError])

  const signIn = useCallback(() => {
    if (!isReady) {
      onError(new Error(loadError ?? 'Google Sign-In is not ready.'))
      return
    }

    try {
      window.google?.accounts?.id.prompt()
    } catch {
      onError(new Error('Unable to open Google Sign-In.'))
    }
  }, [isReady, loadError, onError])

  return {
    signIn,
    isReady,
    loadError,
  }
}
