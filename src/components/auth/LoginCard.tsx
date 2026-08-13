/**
 * LoginCard.tsx — HumanF1RST Phase 2
 * Clean Modular SaaS Authentication Card Component
 *
 * Architecture:
 * - Section-by-section modular layout
 * - Styled via LoginCard.css (Separation of concerns)
 * - Reference layout inspired, HumanF1RST dark green branding
 */

import { useCallback, useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useGoogleSignIn } from '../../hooks/useGoogleSignIn'
import './LoginCard.css'

const GOOGLE_BUTTON_CONTAINER_ID = 'login-google-button-container'

export default function LoginCard() {
  const shouldReduce = useReducedMotion()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login, googleLogin } = useAuth()
  const navigate = useNavigate()
  const [googleError, setGoogleError] = useState<string | null>(null)

  const handleGoogleSuccess = useCallback(
    async (credential: string) => {
      setGoogleError(null)
      setIsSubmitting(true)
      try {
        await googleLogin(credential)
        navigate('/')
      } catch (error) {
        setGoogleError(error instanceof Error ? error.message : 'Google authentication could not be completed. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    },
    [googleLogin, navigate]
  )

  const handleGoogleError = useCallback((error: Error) => {
    setGoogleError('Google Sign-In failed. Please try again.')
    console.error('[LoginCard] Google Sign-In error:', error)
  }, [])

  const { loadError } = useGoogleSignIn({
    containerId: GOOGLE_BUTTON_CONTAINER_ID,
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      className="login-card"
      initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── HEADER SECTION ────────────────────────────────────────────── */}
      <header className="login-header">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to continue to HUMΛNF1RST.</p>
      </header>

      {/* ── FORM PRESENTATION ─────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="login-form" noValidate>
        {/* ── EMAIL SECTION ──────────────────────────────────────────── */}
        <div className="login-group">
          <label htmlFor="login-email" className="login-label">
            Email Address
          </label>
          <div className="login-input-wrapper">
            <input
              id="login-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="login-input"
            />
            <Mail className="login-icon-static w-5 h-5" />
          </div>
        </div>

        {/* ── PASSWORD SECTION ───────────────────────────────────────── */}
        <div className="login-group">
          <label htmlFor="login-password" className="login-label">
            Password
          </label>
          <div className="login-input-wrapper">
            <input
              id="login-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="login-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="login-icon-button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {!showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* ── OPTIONS ROW SECTION ────────────────────────────────────── */}
        <div className="login-options">
          <label className="login-remember">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="login-checkbox"
            />
            <span>Remember me</span>
          </label>

          <Link to="/forgot-password" className="login-forgot">
            Forgot password?
          </Link>
        </div>

        {/* ── PRIMARY SIGN IN BUTTON SECTION ──────────────────────────── */}
        {error ? (
          <div className="login-error-message" role="alert" style={{ color: '#F87171', marginBottom: '16px' }}>
            {error}
          </div>
        ) : null}
        <div className="login-button-container">
          <button type="submit" className="login-button" disabled={isSubmitting}>
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
      </form>

      {/* ── OR DIVIDER SECTION ────────────────────────────────────────── */}
      <div className="login-divider">
        <div className="login-divider-line" />
        <span className="login-divider-text">OR</span>
      </div>

      {/* ── GOOGLE BUTTON SECTION ─────────────────────────────────────── */}
      {loadError ? (
        <div className="login-error-message" role="alert" style={{ color: '#F87171', marginBottom: '16px' }}>
          {loadError}
        </div>
      ) : (
        <div className="google-button-container">
          <div id={GOOGLE_BUTTON_CONTAINER_ID} />
        </div>
      )}
      {googleError ? (
        <div className="login-error-message" role="alert" style={{ color: '#F87171', marginBottom: '16px' }}>
          {googleError}
        </div>
      ) : null}

      {/* ── BOTTOM LINK SECTION ───────────────────────────────────────── */}
      <footer className="login-footer">
        <span>Don't have an account?</span>
        <Link to="/signup" className="login-link">
          Create Account
        </Link>
      </footer>
    </motion.div>
  )
}
