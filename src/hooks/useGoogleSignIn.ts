import { useEffect, useRef, useState } from 'react'

type GoogleCredentialResponse = {
  credential?: string
}

type GoogleInitializeOptions = {
  client_id: string
  callback: (response: GoogleCredentialResponse) => void
  auto_select?: boolean
  cancel_on_tap_outside?: boolean
  ux_mode?: 'popup' | 'redirect'
  use_fedcm_for_prompt?: boolean
}

type GoogleAccountsId = {
  initialize: (options: GoogleInitializeOptions) => void
  renderButton: (
    element: HTMLElement,
    options?: Record<string, unknown>
  ) => void
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

/**
 * Google Identity Services is a global singleton.
 *
 * These variables intentionally live outside the hook so React re-renders,
 * StrictMode and multiple component mounts cannot call initialize()
 * repeatedly.
 */
let googleInitialized = false
let googleScriptLoading = false
let googleScriptLoaded = false

const googleCallbacks = {
  onSuccess: null as ((credential: string) => Promise<void>) | null,
  onError: null as ((error: Error) => void) | null,
}

function initializeGoogle() {
  if (!GOOGLE_CLIENT_ID) {
    throw new Error('Google Client ID is not configured.')
  }

  if (!window.google?.accounts?.id) {
    throw new Error('Google Identity Services failed to load.')
  }

  // VERY IMPORTANT:
  // Never initialize Google Identity Services more than once.
  if (googleInitialized) {
    return
  }

  window.google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,

    callback: async (response) => {
      if (!response?.credential) {
        googleCallbacks.onError?.(
          new Error('Google sign-in was not completed.')
        )
        return
      }

      try {
        if (googleCallbacks.onSuccess) {
          await googleCallbacks.onSuccess(response.credential)
        }
      } catch (error) {
        googleCallbacks.onError?.(
          error instanceof Error
            ? error
            : new Error('Google login failed.')
        )
      }
    },

    auto_select: false,
    cancel_on_tap_outside: false,

    // Use popup instead of redirect.
    ux_mode: 'popup',

    // IMPORTANT:
    // Prevent Chrome FedCM from trying to automatically request
    // Google credentials. We only use the official rendered button.
    use_fedcm_for_prompt: false,
  })

  // Explicitly disable auto-select to prevent any FedCM credential checking
  window.google.accounts.id.disableAutoSelect()

  googleInitialized = true
}

function loadGoogleScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Window is not available.'))
      return
    }

    // Google already available.
    if (window.google?.accounts?.id) {
      googleScriptLoaded = true
      resolve()
      return
    }

    // Script is already loading.
    if (googleScriptLoading) {
      const checkGoogle = () => {
        if (window.google?.accounts?.id) {
          googleScriptLoaded = true
          resolve()
          return
        }

        setTimeout(checkGoogle, 50)
      }

      checkGoogle()
      return
    }

    // Script was already loaded but Google object is not available.
    if (googleScriptLoaded) {
      reject(
        new Error('Google Identity Services is unavailable.')
      )
      return
    }

    const existingScript = document.getElementById(
      'google-identity-script'
    ) as HTMLScriptElement | null

    if (existingScript) {
      googleScriptLoading = true

      const handleLoad = () => {
        googleScriptLoading = false
        googleScriptLoaded = true
        resolve()
      }

      const handleError = () => {
        googleScriptLoading = false
        reject(
          new Error('Failed to load Google Sign-In script.')
        )
      }

      existingScript.addEventListener('load', handleLoad, {
        once: true,
      })

      existingScript.addEventListener('error', handleError, {
        once: true,
      })

      return
    }

    const script = document.createElement('script')

    script.id = 'google-identity-script'
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true

    googleScriptLoading = true

    script.onload = () => {
      googleScriptLoading = false
      googleScriptLoaded = true
      resolve()
    }

    script.onerror = () => {
      googleScriptLoading = false
      reject(
        new Error('Failed to load Google Sign-In script.')
      )
    }

    document.head.appendChild(script)
  })
}

export function useGoogleSignIn(options: {
  containerId: string
  onSuccess: (credential: string) => Promise<void>
  onError: (error: Error) => void
}) {
  const { containerId, onSuccess, onError } = options

  const [isReady, setIsReady] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  const onSuccessRef = useRef(onSuccess)
  const onErrorRef = useRef(onError)

  /**
   * Keep callbacks updated without reinitializing Google.
   */
  useEffect(() => {
    onSuccessRef.current = onSuccess
    onErrorRef.current = onError

    googleCallbacks.onSuccess = async (credential: string) => {
      await onSuccessRef.current(credential)
    }

    googleCallbacks.onError = (error: Error) => {
      onErrorRef.current(error)
    }
  }, [onSuccess, onError])

  useEffect(() => {
    let cancelled = false

    async function setupGoogle() {
      try {
        if (!GOOGLE_CLIENT_ID) {
          setLoadError(
            'Google Client ID is not configured.'
          )
          return
        }

        await loadGoogleScript()

        if (cancelled) return

        initializeGoogle()

        if (!window.google?.accounts?.id) {
          throw new Error(
            'Google Identity Services failed to initialize.'
          )
        }

        const container = document.getElementById(
          containerId
        )

        if (!container) {
          console.warn(
            `[useGoogleSignIn] Container "${containerId}" was not found.`
          )
          return
        }

        /**
         * Prevent duplicate Google buttons.
         *
         * This is important because React StrictMode can mount
         * effects more than once during development.
         */
        if (container.dataset.googleRendered === 'true') {
          setIsReady(true)
          return
        }

        // Clear anything previously rendered into this container.
        container.innerHTML = ''

        window.google.accounts.id.renderButton(container, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          text: 'continue_with',
          shape: 'rectangular',
          logo_alignment: 'left',
        })

        container.dataset.googleRendered = 'true'

        if (!cancelled) {
          setIsReady(true)
          setLoadError(null)
        }
      } catch (error) {
        if (cancelled) return

        console.error('[useGoogleSignIn]', error)

        setLoadError(
          error instanceof Error
            ? error.message
            : 'Google Sign-In failed to initialize.'
        )
      }
    }

    setupGoogle()

    return () => {
      cancelled = true
    }
  }, [containerId])

  return {
    isReady,
    loadError,
  }
}