/**
 * SignupCard.tsx — HumanF1RST Phase 2
 * Clean Modular SaaS Authentication Card Component for Sign Up
 *
 * Reuses LoginCard.css so styling, inputs, buttons, responsive rules,
 * and component hierarchy remain 100% identical to LoginCard.
 */

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Mail, User } from 'lucide-react'
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

export default function SignupCard() {
  const shouldReduce = useReducedMotion()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
              {showPassword ? (
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
              {showConfirmPassword ? (
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
        <div className="login-button-container">
          <button type="submit" className="login-button">
            Create Account
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
        <button type="button" onClick={() => {}} className="google-button">
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>
      </div>

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
