/**
 * ResetEmailSentCard.tsx — HumanF1RST Phase 2
 * Clean Modular SaaS Reset Email Sent Card Component
 *
 * Architecture:
 * - Uses shared LoginCard.css so layout, card width, buttons,
 *   and responsive rules align 100% with Login, Signup, and Forgot Password.
 */

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MailCheck, ArrowLeft } from 'lucide-react'
import './LoginCard.css'

export default function ResetEmailSentCard() {
  const shouldReduce = useReducedMotion()
  const [isResent, setIsResent] = useState(false)
  const [isResending, setIsResending] = useState(false)

  const handleResend = () => {
    setIsResending(true)
    setTimeout(() => {
      setIsResending(false)
      setIsResent(true)
    }, 800)
  }

  return (
    <motion.div
      className="login-card"
      initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── SUCCESS ICON & HEADER SECTION ─────────────────────────────── */}
      <header className="login-header">
        <div className="w-16 h-16 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center mx-auto mb-5">
          <MailCheck className="w-8 h-8 text-[#22C55E]" />
        </div>
        <h1 className="login-title">Check Your Email</h1>
        <p className="login-subtitle">
          We've sent a password reset link to your email address.
        </p>
      </header>

      {/* ── RESEND NOTIFICATION STATE ─────────────────────────────────── */}
      {isResent && (
        <div className="p-3.5 mb-6 rounded-[12px] bg-[#22C55E]/10 border border-[#22C55E]/20 text-center text-xs text-[#22C55E] font-medium">
          Reset link resent! Please check your inbox and spam folder.
        </div>
      )}

      {/* ── BUTTONS SECTION ───────────────────────────────────────────── */}
      <div className="login-form">
        {/* Primary Button: Open Email App */}
        <div className="login-button-container">
          <a
            href="mailto:"
            className="login-button"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
            }}
          >
            Open Email App
          </a>
        </div>

        {/* Secondary Button: Back to Sign In */}
        <div className="google-button-container" style={{ marginBottom: 0 }}>
          <Link
            to="/login"
            className="google-button"
            style={{ textDecoration: 'none' }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>

      {/* ── SMALL FOOTER SECTION ──────────────────────────────────────── */}
      <footer className="login-footer" style={{ marginTop: '32px' }}>
        <span>Didn't receive it?</span>
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className="login-link"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            fontFamily: 'inherit',
            fontSize: 'inherit',
          }}
        >
          {isResending ? 'Resending...' : 'Resend Email'}
        </button>
      </footer>
    </motion.div>
  )
}
