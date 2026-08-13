/**
 * ResetPasswordCard.tsx — HumanF1RST Phase 2
 * Real backend password reset integration.
 */

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import './LoginCard.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

type ResetPasswordResponse = {
  success?: boolean
  message?: string
}

export default function ResetPasswordCard() {
  const shouldReduce = useReducedMotion()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const resetToken = searchParams.get('token') || ''

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [isMismatch, setIsMismatch] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // ── Password Requirements ──────────────────────────────────────────
  const hasMinLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)

  const fulfilledCount = [
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecial,
  ].filter(Boolean).length

  // ── Backend Password Validation ───────────────────────────────────
  // Must exactly match resetPasswordSchema on the backend:
  // min 8 + uppercase + lowercase + number
  // Special character is NOT required by backend.
  const isPasswordValid =
    hasMinLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber

  // ── Password Strength ──────────────────────────────────────────────
  const strengthPercent =
    (fulfilledCount / 5) * 100

  let strengthColor = '#EF4444'
  let strengthLabel = 'Weak'

  if (fulfilledCount >= 4) {
    strengthColor = '#22C55E'
    strengthLabel = 'Strong'
  } else if (fulfilledCount >= 2) {
    strengthColor = '#F59E0B'
    strengthLabel = 'Medium'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setErrorMessage('')
    setIsMismatch(false)

    // ── Validate reset token ─────────────────────────────────────────
    if (!resetToken) {
      setErrorMessage(
        'This password reset link is missing or invalid.'
      )
      return
    }

    // ── Validate password ────────────────────────────────────────────
    // This now matches the backend Zod validation exactly.
    if (!isPasswordValid) {
      setErrorMessage(
        'Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one number.'
      )
      return
    }

    // ── Confirm passwords match ──────────────────────────────────────
    if (password !== confirmPassword) {
      setIsMismatch(true)
      setErrorMessage(
        'Passwords do not match. Please re-enter.'
      )
      return
    }

    // ── Check API configuration ──────────────────────────────────────
    if (!API_BASE_URL) {
      setErrorMessage(
        'Unable to connect to the server.'
      )

      console.error(
        '[ResetPassword] VITE_API_BASE_URL is not configured.'
      )

      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/reset-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            resetToken,
            newPassword: password,
          }),
        }
      )

      let data: ResetPasswordResponse = {}

      try {
        data = await response.json()
      } catch {
        data = {}
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Unable to reset your password.'
        )
      }

      if (data.success === false) {
        throw new Error(
          data.message ||
            'Unable to reset your password.'
        )
      }

      /*
       * Backend successfully reset the password.
       *
       * The backend also invalidates the reset token:
       * resetToken = null
       * resetTokenExpiry = null
       */
      navigate('/password-changed')
    } catch (error) {
      console.error(
        '[ResetPassword] Request failed:',
        error
      )

      const message =
        error instanceof Error
          ? error.message
          : 'Unable to reset your password. Please try again.'

      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      className="login-card"
      initial={{
        opacity: 0,
        y: shouldReduce ? 0 : 16,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* ── HEADER SECTION ────────────────────────────────────────────── */}
      <header className="login-header">
        <h1 className="login-title">
          Create New Password
        </h1>

        <p className="login-subtitle">
          Your new password must be different from previously used passwords.
        </p>
      </header>

      {/* ── FORM ──────────────────────────────────────────────────────── */}
      <form
        onSubmit={handleSubmit}
        className="login-form"
        noValidate
      >
        {/* ── NEW PASSWORD ───────────────────────────────────────────── */}
        <div className="login-group">
          <label
            htmlFor="new-password"
            className="login-label"
          >
            New Password
          </label>

          <div className="login-input-wrapper">
            <input
              id="new-password"
              name="password"
              type={
                showPassword
                  ? 'text'
                  : 'password'
              }
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)

                if (isMismatch) {
                  setIsMismatch(false)
                }

                if (errorMessage) {
                  setErrorMessage('')
                }
              }}
              placeholder="Enter new password"
              className="login-input"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="login-icon-button"
              aria-label={
                showPassword
                  ? 'Hide password'
                  : 'Show password'
              }
            >
              {!showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* ── CONFIRM PASSWORD ───────────────────────────────────────── */}
        <div className="login-group">
          <label
            htmlFor="confirm-new-password"
            className="login-label"
          >
            Confirm Password
          </label>

          <div className="login-input-wrapper">
            <input
              id="confirm-new-password"
              name="confirmPassword"
              type={
                showConfirmPassword
                  ? 'text'
                  : 'password'
              }
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(
                  e.target.value
                )

                if (isMismatch) {
                  setIsMismatch(false)
                }

                if (errorMessage) {
                  setErrorMessage('')
                }
              }}
              placeholder="Confirm new password"
              className={`login-input ${
                isMismatch
                  ? 'is-invalid'
                  : ''
              }`}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="login-icon-button"
              aria-label={
                showConfirmPassword
                  ? 'Hide confirm password'
                  : 'Show confirm password'
              }
            >
              {!showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {isMismatch && (
            <p className="text-xs text-red-400 mt-1.5 ml-1">
              Passwords do not match. Please re-enter.
            </p>
          )}
        </div>

        {/* ── PASSWORD STRENGTH ──────────────────────────────────────── */}
        {password.length > 0 && (
          <div
            className="mb-5 p-3.5 rounded-[12px]"
            style={{
              background:
                'var(--color-bg-subtle)',
              border:
                '1px solid var(--color-border-default)',
            }}
          >
            <div className="flex items-center justify-between text-xs mb-2">
              <span
                style={{
                  color:
                    'var(--color-text-secondary)',
                }}
              >
                Password Strength
              </span>

              <span
                className="font-semibold"
                style={{
                  color: strengthColor,
                }}
              >
                {strengthLabel}
              </span>
            </div>

            <div
              className="w-full h-1.5 rounded-full overflow-hidden"
              style={{
                backgroundColor:
                  'var(--color-bg-inset)',
              }}
            >
              <div
                className="h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${strengthPercent}%`,
                  backgroundColor:
                    strengthColor,
                }}
              />
            </div>
          </div>
        )}

        {/* ── SERVER ERROR ───────────────────────────────────────────── */}
        {errorMessage && !isMismatch && (
          <p className="text-xs text-red-400 mb-4 ml-1">
            {errorMessage}
          </p>
        )}

        {/* ── RESET BUTTON ───────────────────────────────────────────── */}
        <div
          className="login-button-container"
          style={{
            marginTop: 4,
            marginBottom: 8,
          }}
        >
          <button
            type="submit"
            disabled={
              isLoading ||
              !password ||
              !confirmPassword ||
              !isPasswordValid
            }
            className={`login-button ${
              isLoading
                ? 'is-loading'
                : ''
            }`}
          >
            {isLoading
              ? 'Resetting Password...'
              : 'Reset Password'}
          </button>
        </div>
      </form>

      {/* ── BACK TO SIGN IN ──────────────────────────────────────────── */}
      <footer
        className="login-footer"
        style={{ marginTop: '8px' }}
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