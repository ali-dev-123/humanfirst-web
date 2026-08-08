/**
 * HeroDashboard.tsx — HumanF1RST v2
 *
 * Right-column product interface for the Hero section.
 * Comprises:
 *   — A complete professor-facing submission list panel
 *   — Three floating glass information cards
 *
 * Performance notes:
 *   — All animations use transform/opacity only (GPU composited)
 *   — will-change: transform applied only during active animation
 *   — Respects prefers-reduced-motion via useReducedMotion()
 *   — No state, no intervals — purely presentational
 */

import { motion, useReducedMotion } from 'framer-motion'
import { ShieldCheck, SlidersHorizontal, WifiOff, CheckCircle, AlertTriangle } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface FloatConfig {
  amplitude: number  // px — max 6px per spec
  duration:  number  // s  — 6–10s range per spec
  delay:     number  // s  — desynchronised per card
}

// ─── Submission row data (generic, no PII) ────────────────────────────────────

const SUBMISSIONS = [
  { id: '01', score: 98, status: 'verified' as const },
  { id: '02', score: 61, status: 'review'   as const },
  { id: '03', score: 94, status: 'verified' as const },
] as const

type SubmissionStatus = 'verified' | 'review'

const STATUS_CONFIG: Record<SubmissionStatus, {
  label: string
  icon:  typeof CheckCircle
  color: string
  bg:    string
  dot:   string
}> = {
  verified: {
    label: 'Verified',
    icon:  CheckCircle,
    color: 'text-[var(--color-forest-700)]',
    bg:    'bg-[rgba(202,255,112,0.24)]',
    dot:   'bg-[var(--color-accent)]',
  },
  review: {
    label: 'Review',
    icon:  AlertTriangle,
    color: 'text-amber-400',
    bg:    'bg-amber-500/10',
    dot:   'bg-amber-400',
  },
}

// ─── Floating card sub-components ─────────────────────────────────────────────

function CardAIBlocked() {
  return (
    <div
      className="card-glass"
      style={{ padding: '10px 14px', minWidth: 168 }}
      aria-label="AI access blocked during session"
    >
      {/* Header */}
      <div
        className="flex items-center gap-2"
        style={{
          paddingBottom: 7,
          marginBottom:  7,
          borderBottom: '1px solid rgba(8, 47, 37, 0.08)',
        }}
      >
        <WifiOff
          size={13}                           /* +1px for visibility */
          className="text-red-400 flex-shrink-0"
          aria-hidden="true"
        />
        <span
          className="text-[10px] font-semibold tracking-wider uppercase"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          AI Access Blocked
        </span>
      </div>
      {/* Rows */}
      <div className="space-y-1.5">
        {['AI Chat Tools', 'AI Writing Assistants'].map((item) => (
          <div key={item} className="flex items-center gap-2">
            <span className="text-red-400 text-[10px] font-bold leading-none">✕</span>
            <span
              className="text-[10px] font-mono"
              style={{ color: 'var(--color-text-secondary)' }}  /* was text-muted (#4A574C) → secondary (#8C9A8E) */
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CardPrivacyShield() {
  return (
    <div
      className="card-glass"
      style={{ padding: '10px 14px', minWidth: 152 }}
      aria-label="Privacy shield active"
    >
      {/* Header */}
      <div
        className="flex items-center gap-2"
        style={{
          paddingBottom: 7,
          marginBottom:  7,
          borderBottom: '1px solid rgba(8, 47, 37, 0.08)',
        }}
      >
        <ShieldCheck
          size={14}                           /* +1px for visibility */
          aria-hidden="true"
          style={{ color: 'var(--color-accent)', flexShrink: 0 }}
        />
        <span
          className="text-[10px] font-semibold tracking-wider uppercase"
          style={{ color: 'var(--color-accent)' }}  /* accent — intentionally strong */
        >
          Privacy Active
        </span>
      </div>
      {/* Stats */}
      <div className="space-y-1.5">
        {['0 frames recorded', '0 bytes uploaded'].map((stat) => (
          <p
            key={stat}
            className="text-[10px] font-mono"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {stat}
          </p>
        ))}
      </div>
    </div>
  )
}

function CardTeacherControlled() {
  return (
    <div
      className="card-glass"
      style={{ padding: '10px 14px', minWidth: 180 }}
      aria-label="Session is teacher controlled"
    >
      {/* Header */}
      <div
        className="flex items-center gap-2"
        style={{
          paddingBottom: 7,
          marginBottom:  7,
          borderBottom: '1px solid rgba(8, 47, 37, 0.08)',
        }}
      >
        <SlidersHorizontal
          size={13}                           /* +1px for visibility */
          aria-hidden="true"
          style={{ color: 'var(--color-accent)', flexShrink: 0 }}
        />
        <span
          className="text-[10px] font-semibold tracking-wider uppercase"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Teacher Controlled
        </span>
      </div>
      {/* Body */}
      <p
        className="text-[10px] mb-2"
        style={{ color: 'var(--color-text-secondary)' }}  /* was text-muted — stepped up */
      >
        Session rules set by Instructor
      </p>
      <span className="badge badge-success" style={{ fontSize: 9, padding: '3px 8px' }}>
        <span className="badge-dot bg-[var(--color-accent)] animate-pulse" />
        Active Now
      </span>
    </div>
  )
}

// ─── Dashboard Panel ──────────────────────────────────────────────────────────

function DashboardPanel() {
  return (
    <div
      style={{
        background: 'var(--color-bg-overlay)',          /* lifted: elevated→overlay (#161E17) */
        border: '1px solid var(--color-accent-border)',  /* lifted: border-accent→accent-border (0.25 opacity) */
        borderRadius: 'var(--radius-2xl)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-xl), var(--shadow-glow-md)',
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          padding: '12px 18px',
          borderBottom: '1px solid var(--color-border-default)',  /* lifted: subtle(0.05)→default(0.08) */
          background: 'var(--color-bg-elevated)',                 /* lifted: subtle→elevated (#111712) */
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Profile */}
        <div className="flex items-center gap-2.5">
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-forest-600), var(--color-forest-800))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 600,
              color: 'var(--color-lime-300)',
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            IN
          </div>
          <div>
            <p
              className="text-[11px] font-semibold leading-none"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Instructor
            </p>
            <p
              className="text-[10px] mt-0.5"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Course Session · CS-401A
            </p>
          </div>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: 'var(--color-accent)' }}
            aria-hidden="true"
          />
          <span
            className="text-[10px] font-semibold tracking-wider uppercase"
            style={{ color: 'var(--color-forest-700)' }}
          >
            Session Live
          </span>
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid var(--color-border-default)',  /* lifted: subtle→default */
          padding: '0 18px',
        }}
      >
        {(['Submissions', 'Analysis', 'Reports'] as const).map((tab, i) => (
          <div
            key={tab}
            style={{
              padding: '8px 0',
              marginRight: 20,
              fontSize: 11,
              fontWeight: i === 0 ? 600 : 400,
              color: i === 0 ? 'var(--color-accent)' : 'var(--color-text-secondary)',  /* lifted: muted→secondary */
              borderBottom: i === 0 ? '1.5px solid var(--color-accent)' : '1.5px solid transparent',
              whiteSpace: 'nowrap',
              cursor: 'default',
            }}
          >
            {tab}
            {i === 0 && (
              <span
                style={{
                  marginLeft: 5,
                  background: 'var(--color-accent-muted)',
                  color: 'var(--color-accent)',
                  borderRadius: 99,
                  padding: '1px 5px',
                  fontSize: 9,
                  fontWeight: 700,
                }}
              >
                {SUBMISSIONS.length}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* ── Submission rows ── */}
      <div style={{ padding: '8px 0' }}>
        {SUBMISSIONS.map((sub, idx) => {
          const cfg = STATUS_CONFIG[sub.status]
          const Icon = cfg.icon
          return (
            <div
              key={sub.id}
              style={{
                padding: '10px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: idx === 1
                  ? 'rgba(245, 158, 11, 0.07)'   /* lifted: 0.04→0.07 for amber review row */
                  : 'transparent',
                borderLeft: idx === 1
                  ? '2px solid rgba(245,158,11,0.45)'  /* lifted: 0.30→0.45 */
                  : '2px solid transparent',
                transition: 'background 200ms',
              }}
            >
              {/* Left: submission info */}
              <div className="flex items-center gap-2.5">
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-bg-inset)',
                    border: '1px solid var(--color-border-default)',  /* lifted: subtle→default */
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--color-text-muted)' }}>
                    PDF
                  </span>
                </div>
                <div>
                  <p
                    className="text-[11px] font-medium leading-none"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Submission {sub.id}
                  </p>
                  <p
                    className="text-[10px] mt-0.5 font-mono"
                    style={{ color: 'var(--color-text-secondary)' }}  /* lifted: muted→secondary */
                  >
                    CS-401A · Assignment 3
                  </p>
                </div>
              </div>

              {/* Right: score + status */}
              <div className="flex items-center gap-2.5">
                <span
                  className="text-[11px] font-semibold tabular-nums"
                  style={{ color: sub.status === 'review' ? '#B67A1F' : 'var(--color-forest-700)' }}
                >
                  {sub.score}%
                </span>
                <div
                  className={`flex items-center gap-1 ${cfg.color}`}
                  style={{
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    /* Lifted badge backgrounds: inline for precise opacity control */
                    background: sub.status === 'verified'
                      ? 'rgba(202, 255, 112, 0.24)'
                      : 'rgba(245, 158, 11, 0.18)',   /* was ~0.10 — clearly readable amber */
                  }}
                >
                  <Icon size={9} aria-hidden="true" />
                  {cfg.label}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Stats footer ── */}
      <div
        style={{
          padding: '10px 18px',
          borderTop: '1px solid var(--color-border-default)',  /* lifted: subtle→default */
          background: 'rgba(202,255,112,0.20)',
          display: 'flex',
          gap: 24,
        }}
      >
        {[
          { count: 12, label: 'Verified',  dot: 'var(--color-accent)' },
          { count: 1,  label: 'Review',    dot: '#B67A1F' },
          { count: 0,  label: 'Flagged',   dot: 'var(--color-text-muted)' },
        ].map(({ count, label, dot }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span
              style={{
                width: 6, height: 6,
                borderRadius: '50%',
                background: dot,
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
            <span
              className="text-[10px] font-medium tabular-nums"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
                {count}
              </span>{' '}
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

function HeroDashboard() {
  const shouldReduce = useReducedMotion()

  /**
   * Builds Framer Motion animate/transition props for idle float.
   * Amplitude: 4–6px, duration: 6–10s (per spec).
   * Desynchronised delays prevent mechanical lock-step movement.
   */
  const float = ({ amplitude, duration, delay }: FloatConfig) => ({
    animate: shouldReduce ? {} : { y: [0, -amplitude, 0] },
    transition: {
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  })

  return (
    /*
     * Outer wrapper is the positioning context for all floating cards.
     * Padding gives cards room to overflow the panel edges without clipping.
     * overflow: visible is critical — cards must not be cropped.
     */
    <div
      className="relative"
      style={{
        /*
         * Padding creates breathing room for floating cards that
         * overflow the dashboard panel edges.
         * Bottom padding is increased on mobile to clear Card 2.
         */
        paddingTop:    24,
        paddingBottom: 28,
        paddingLeft:   36,
        paddingRight:  32,
        contain: 'layout',
      }}
    >
      {/*
       * ── Floating Card 1 — AI Access Blocked (top-right) ──
       *
       * Two-layer pattern (used for all three cards):
       *   Outer div  → CSS handles position + static rotation via .hero-fc-* class
       *   Inner motion.div → Framer Motion handles ONLY the Y-axis float
       *
       * This separation prevents CSS transform and Framer Motion transform
       * from conflicting on the same element, and allows media-query overrides
       * on the outer div without fighting Framer Motion's inline style.
       *
       * Visible on: mobile + tablet + desktop
       */}
      <div className="absolute z-20 hero-fc-ai" aria-hidden="true">
        <motion.div
          {...float({ amplitude: 5, duration: 7, delay: 0.3 })}
          style={{ willChange: 'transform' }}
        >
          <CardAIBlocked />
        </motion.div>
      </div>

      {/* ── Main Panel with responsive CSS rotation ── */}
      <div className="dashboard-tilt">
        <motion.div
          {...float({ amplitude: 5, duration: 8, delay: 0 })}
          style={{ willChange: 'transform' }}
        >
          <DashboardPanel />
        </motion.div>
      </div>

      {/*
       * ── Floating Card 2 — Privacy Shield ──
       * Desktop/tablet: left mid-panel  (top: 38%, left: 0)
       * Mobile:         bottom-left     (bottom: 4px, left: 4px)
       * Scaled to 88% on mobile via .hero-fc-privacy media query.
       * Visible on: mobile + tablet + desktop  (no hidden class)
       */}
      <div className="absolute z-20 hero-fc-privacy" aria-hidden="true">
        <motion.div
          {...float({ amplitude: 4, duration: 9, delay: 1.2 })}
          style={{ willChange: 'transform' }}
        >
          <CardPrivacyShield />
        </motion.div>
      </div>

      {/*
       * ── Floating Card 3 — Teacher Controlled (bottom-right) ──
       * Desktop/tablet only — hidden on mobile per spec.
       */}
      <div className="absolute z-20 hidden md:block hero-fc-teacher" aria-hidden="true">
        <motion.div
          {...float({ amplitude: 6, duration: 6, delay: 2.4 })}
          style={{ willChange: 'transform' }}
        >
          <CardTeacherControlled />
        </motion.div>
      </div>
    </div>
  )
}

export default HeroDashboard
