/**
 * LoginCard.tsx — HumanF1RST Phase 2
 * Clean Modular SaaS Authentication Card Component
 *
 * Architecture:
 * - Section-by-section modular layout
 * - Styled via LoginCard.css (Separation of concerns)
 * - Reference layout inspired, HumanF1RST dark green branding
 */

import { useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useGoogleSignIn } from '../../hooks/useGoogleSignIn'
import './LoginCard.css'

function GoogleIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
      <path
        fill="#EA4335"
        d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
      />
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
      />
      <path
        fill="#FBBC05"
        d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-1.9z"
      />
      <path
        fill="#34A853"
        d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
      />
    </svg>
  )
}

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

  const { signIn, isReady } = useGoogleSignIn({
    onSuccess: async (credential) => {
      setGoogleError(null)
      setIsSubmitting(true)
      try {
        await googleLogin(credential)
        navigate('/')
      } catch (error) {
        setGoogleError(error instanceof Error ? error.message : 'Google login failed')
      } finally {
        setIsSubmitting(false)
      }
    },
    onError: (error) => {
      setGoogleError(error.message)
    },
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
              {showPassword ? (
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
      <div className="google-button-container">
        <button
          type="button"
          onClick={() => {
            setGoogleError(null)
            signIn()
          }}
          className="google-button"
          disabled={!isReady || isSubmitting}
        >
          <GoogleIcon />
          <span>{isReady ? 'Continue with Google' : 'Loading Google...'}</span>
        </button>
      </div>
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
