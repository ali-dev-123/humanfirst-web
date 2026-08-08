/**
 * ResetPasswordCard.tsx — HumanF1RST Phase 2
 * Clean Modular SaaS Create New Password Card Component
 *
 * Architecture:
 * - Uses shared LoginCard.css so layout, card width, input height, buttons,
 *   focus rings, and responsive rules align 100% with all auth pages.
 * - Live interactive password strength indicator & checklist.
 */

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import './LoginCard.css'

export default function ResetPasswordCard() {
  const shouldReduce = useReducedMotion()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isMismatch, setIsMismatch] = useState(false)

  // Password Requirements Validation
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

  // Strength Bar Percentage & Color
  let strengthPercent = (fulfilledCount / 5) * 100
  let strengthColor = '#EF4444' // Red
  let strengthLabel = 'Weak'

  if (fulfilledCount >= 4) {
    strengthColor = '#22C55E' // Green
    strengthLabel = 'Strong'
  } else if (fulfilledCount >= 2) {
    strengthColor = '#F59E0B' // Amber
    strengthLabel = 'Medium'
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setIsMismatch(true)
      return
    }

    setIsMismatch(false)
    setIsLoading(true)

    // Simulated UI loading delay -> Navigate to /password-changed
    setTimeout(() => {
      setIsLoading(false)
      navigate('/password-changed')
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
        <h1 className="login-title">Create New Password</h1>
        <p className="login-subtitle">
          Your new password must be different from previously used passwords.
        </p>
      </header>

      {/* ── FORM PRESENTATION ─────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="login-form" noValidate>
        {/* ── NEW PASSWORD SECTION ───────────────────────────────────── */}
        <div className="login-group">
          <label htmlFor="new-password" className="login-label">
            New Password
          </label>
          <div className="login-input-wrapper">
            <input
              id="new-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (isMismatch) setIsMismatch(false)
              }}
              placeholder="Enter new password"
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
          <label htmlFor="confirm-new-password" className="login-label">
            Confirm Password
          </label>
          <div className="login-input-wrapper">
            <input
              id="confirm-new-password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                if (isMismatch) setIsMismatch(false)
              }}
              placeholder="Confirm new password"
              className={`login-input ${isMismatch ? 'is-invalid' : ''}`}
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
          {isMismatch && (
            <p className="text-xs text-red-400 mt-1.5 ml-1">
              Passwords do not match. Please re-enter.
            </p>
          )}
        </div>

        {/* ── PASSWORD STRENGTH INDICATOR ────────────────────────────── */}
        {password.length > 0 && (
          <div
            className="mb-5 p-3.5 rounded-[12px]"
            style={{
              background: 'var(--color-bg-subtle)',
              border: '1px solid var(--color-border-default)',
            }}
          >
            <div className="flex items-center justify-between text-xs mb-2">
              <span style={{ color: 'var(--color-text-secondary)' }}>Password Strength</span>
              <span className="font-semibold" style={{ color: strengthColor }}>
                {strengthLabel}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-inset)' }}>
              <div
                className="h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${strengthPercent}%`,
                  backgroundColor: strengthColor,
                }}
              />
            </div>
          </div>
        )}

        {/* ── PRIMARY RESET BUTTON ──────────────────────────────────── */}
        <div className="login-button-container" style={{ marginTop: 4, marginBottom: 8 }}>
          <button
            type="submit"
            disabled={isLoading || !password || !confirmPassword || fulfilledCount < 3}
            className={`login-button ${isLoading ? 'is-loading' : ''}`}
          >
            {isLoading ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </div>
      </form>

      {/* ── BOTTOM BACK TO SIGN IN LINK ───────────────────────────────── */}
      <footer className="login-footer" style={{ marginTop: '8px' }}>
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
