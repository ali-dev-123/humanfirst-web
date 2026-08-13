/**
 * SignupCard.tsx — HumanF1RST Phase 2
 * Clean Modular SaaS Authentication Card Component for Sign Up
 *
 * Reuses LoginCard.css so styling, inputs, buttons, responsive rules,
 * and component hierarchy remain 100% identical to LoginCard.
 */

import { useCallback, useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useGoogleSignIn } from '../../hooks/useGoogleSignIn'
import './LoginCard.css'

const GOOGLE_BUTTON_CONTAINER_ID = 'signup-google-button-container'

export default function SignupCard() {
  const shouldReduce = useReducedMotion()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, googleLogin } = useAuth()
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
    console.error('[SignupCard] Google Sign-In error:', error)
  }, [])

  const { loadError } = useGoogleSignIn({
    containerId: GOOGLE_BUTTON_CONTAINER_ID,
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!agreeTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy')
      return
    }

    setIsSubmitting(true)
    try {
      await register(fullName, email, password)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
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
        <h1 className="login-title">Create Account</h1>
        <p className="login-subtitle">Join HUMΛNF1RST and start your journey.</p>
      </header>

      {/* ── FORM PRESENTATION ─────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="login-form" noValidate>
        {/* ── FULL NAME SECTION ───────────────────────────────────────── */}
        <div className="login-group">
          <label htmlFor="signup-name" className="login-label">
            Full Name
          </label>
          <div className="login-input-wrapper">
            <input
              id="signup-name"
              name="fullName"
              type="text"
              required
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="login-input"
            />
            <User className="login-icon-static w-5 h-5" />
          </div>
        </div>

        {/* ── EMAIL SECTION ──────────────────────────────────────────── */}
        <div className="login-group">
          <label htmlFor="signup-email" className="login-label">
            Email Address
          </label>
          <div className="login-input-wrapper">
            <input
              id="signup-email"
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
          <label htmlFor="signup-password" className="login-label">
            Password
          </label>
          <div className="login-input-wrapper">
            <input
              id="signup-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
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

        {/* ── CONFIRM PASSWORD SECTION ───────────────────────────────── */}
        <div className="login-group">
          <label htmlFor="signup-confirm-password" className="login-label">
            Confirm Password
          </label>
          <div className="login-input-wrapper">
            <input
              id="signup-confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="login-input"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="login-icon-button"
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            >
              {!showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* ── TERMS CHECKBOX SECTION ────────────────────────────────── */}
        <div className="login-options">
          <label className="login-remember" style={{ alignItems: 'flex-start' }}>
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="login-checkbox"
              style={{ marginTop: '2px' }}
            />
            <span style={{ lineHeight: '1.4' }}>
              I agree to the{' '}
              <a href="#" onClick={(e) => e.preventDefault()} className="login-forgot">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" onClick={(e) => e.preventDefault()} className="login-forgot">
                Privacy Policy
              </a>
            </span>
          </label>
        </div>

        {/* ── PRIMARY CREATE ACCOUNT BUTTON SECTION ─────────────────── */}
        {error ? (
          <div className="login-error-message" role="alert" style={{ color: '#F87171', marginBottom: '16px' }}>
            {error}
          </div>
        ) : null}
        <div className="login-button-container">
          <button type="submit" className="login-button" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
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
        <span>Already have an account?</span>
        <Link to="/login" className="login-link">
          Sign In
        </Link>
      </footer>
    </motion.div>
  )
}
