/**
 * PasswordChangedCard.tsx — HumanF1RST Phase 2
 * Clean Modular SaaS Password Updated Success Card Component
 */

import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import './LoginCard.css'

export default function PasswordChangedCard() {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      className="login-card"
      initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── SUCCESS ICON & HEADER SECTION ─────────────────────────────── */}
      <header className="login-header" style={{ marginBottom: '32px' }}>
        <div className="w-16 h-16 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-[#22C55E]" />
        </div>
        <h1 className="login-title">Password Updated</h1>
        <p className="login-subtitle">
          Your password has been successfully updated.
        </p>
      </header>

      {/* ── PRIMARY BUTTON SECTION ───────────────────────────────────── */}
      <div className="login-form">
        <div className="login-button-container" style={{ marginBottom: 0 }}>
          <Link
            to="/login"
            className="login-button"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              width: '100%',
              maxWidth: '320px',
            }}
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
