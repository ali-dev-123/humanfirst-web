/**
 * ForgotPasswordCard.tsx — HumanF1RST Phase 2
 * Real backend password reset request integration.
 */

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, ArrowLeft } from 'lucide-react'
import './LoginCard.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

type ForgotPasswordResponse = {
  success?: boolean
  message?: string
}

export default function ForgotPasswordCard() {
  const shouldReduce = useReducedMotion()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const normalizedEmail = email.trim().toLowerCase()

    if (!normalizedEmail || !normalizedEmail.includes('@')) {
      setIsInvalid(true)
      setErrorMessage('Please enter a valid email address.')
      return
    }

    if (!API_BASE_URL) {
      setIsInvalid(true)
      setErrorMessage('Unable to connect to the server.')
      console.error(
        '[ForgotPassword] VITE_API_BASE_URL is not configured.'
      )
      return
    }

    setIsInvalid(false)
    setErrorMessage('')
    setIsLoading(true)

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/forgot-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: normalizedEmail,
          }),
        }
      )

      let data: ForgotPasswordResponse = {}

      try {
        data = await response.json()
      } catch {
        data = {}
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Unable to process your password reset request.'
        )
      }

      if (data.success === false) {
        throw new Error(
          data.message ||
            'Unable to process your password reset request.'
        )
      }

      /*
       * Backend successfully processed the request.
       *
       * The backend sends the reset email containing:
       * /reset-password?token=...
       */
      navigate('/reset-email-sent')
    } catch (error) {
      console.error('[ForgotPassword] Request failed:', error)

      setIsInvalid(true)
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to connect to the server. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      className="login-card"
      initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* ── HEADER SECTION ────────────────────────────────────────────── */}
      <header className="login-header">
        <h1 className="login-title">Forgot Password</h1>

        <p className="login-subtitle">
          Enter your email address and we'll send you a password reset link.
        </p>
      </header>

      {/* ── FORM ──────────────────────────────────────────────────────── */}
      <form
        onSubmit={handleSubmit}
        className="login-form"
        noValidate
      >
        {/* ── EMAIL ──────────────────────────────────────────────────── */}
        <div className="login-group">
          <label
            htmlFor="forgot-email"
            className="login-label"
          >
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

                if (isInvalid) {
                  setIsInvalid(false)
                  setErrorMessage('')
                }
              }}
              placeholder="Enter your email"
              className={`login-input ${
                isInvalid ? 'is-invalid' : ''
              }`}
              aria-invalid={isInvalid}
              aria-describedby={
                isInvalid
                  ? 'forgot-password-error'
                  : undefined
              }
            />

            <Mail className="login-icon-static w-5 h-5" />
          </div>

          {isInvalid && (
            <p
              id="forgot-password-error"
              className="text-xs text-red-400 mt-1.5 ml-1"
            >
              {errorMessage}
            </p>
          )}
        </div>

        {/* ── PRIMARY RESET BUTTON ───────────────────────────────────── */}
        <div className="login-button-container">
          <button
            type="submit"
            disabled={
              isLoading ||
              !email.trim()
            }
            className={`login-button ${
              isLoading ? 'is-loading' : ''
            }`}
          >
            {isLoading
              ? 'Sending Link...'
              : 'Send Reset Link'}
          </button>
        </div>
      </form>

      {/* ── BACK TO SIGN IN ──────────────────────────────────────────── */}
      <footer
        className="login-footer"
        style={{ marginTop: '24px' }}
      >
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