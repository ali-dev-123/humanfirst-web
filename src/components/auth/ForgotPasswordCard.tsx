/**
 * ForgotPasswordCard.tsx — HumanF1RST Phase 2
 * Clean Modular SaaS Forgot Password Card Component
 *
 * Architecture:
 * - Uses shared LoginCard.css so layout, card width, input height, buttons,
 *   focus rings, and responsive rules align 100% with Login and Signup.
 */

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, ArrowLeft } from 'lucide-react'
import './LoginCard.css'

export default function ForgotPasswordCard() {
  const shouldReduce = useReducedMotion()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setIsInvalid(true)
      return
    }

    setIsInvalid(false)
    setIsLoading(true)

    // Simulated UI loading delay -> Navigate to /reset-email-sent
    setTimeout(() => {
      setIsLoading(false)
      navigate('/reset-email-sent')
    }, 600)
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
        <h1 className="login-title">Forgot Password</h1>
        <p className="login-subtitle">
          Enter your email address and we'll send you a password reset link.
        </p>
      </header>

      {/* ── FORM PRESENTATION ───────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="login-form" noValidate>
          {/* ── EMAIL SECTION ──────────────────────────────────────────── */}
          <div className="login-group">
            <label htmlFor="forgot-email" className="login-label">
              Email Address
            </label>
            <div className="login-input-wrapper">
              <input
                id="forgot-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (isInvalid) setIsInvalid(false)
                }}
                placeholder="Enter your email"
                className={`login-input ${isInvalid ? 'is-invalid' : ''}`}
              />
              <Mail className="login-icon-static w-5 h-5" />
            </div>
            {isInvalid && (
              <p className="text-xs text-red-400 mt-1.5 ml-1">
                Please enter a valid email address.
              </p>
            )}
          </div>

          {/* ── PRIMARY RESET BUTTON SECTION ──────────────────────────── */}
          <div className="login-button-container">
            <button
              type="submit"
              disabled={isLoading || !email.trim()}
              className={`login-button ${isLoading ? 'is-loading' : ''}`}
            >
              {isLoading ? 'Sending Link...' : 'Send Reset Link'}
            </button>
          </div>
        </form>

      {/* ── BOTTOM BACK TO SIGN IN LINK ───────────────────────────────── */}
      <footer className="login-footer" style={{ marginTop: '24px' }}>
        <Link
          to="/login"
          className="login-link"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginLeft: 0,
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </Link>
      </footer>
    </motion.div>
  )
}
