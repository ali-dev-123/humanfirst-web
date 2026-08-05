/**
 * CallToAction.tsx — HumanF1RST v2
 *
 * Final conversion section. Visual climax of the page.
 *
 * Structure:
 *   — Full-width section, extra tall padding
 *   — Multi-layer animated background (dot grid + dual radial glows + slow ambient)
 *   — Centered glass panel containing all content
 *   — Badge → heading → paragraph → CTA buttons → trust indicators
 *
 * Design intent:
 *   Premium, minimal, confident — not pressure-selling.
 *   The glass panel should feel like a spotlight on the message.
 *
 * Animations (viewport-triggered, once:true, prefers-reduced-motion safe):
 *   — Panel:             scaleIn 0ms
 *   — Badge + heading:   fadeUp, staggered
 *   — Para:              fadeUp 120ms
 *   — Buttons:           fadeUp + scale, 180ms
 *   — Trust indicators:  stagger fadeUp, 80ms apart
 *   — Background glow:   slow y oscillation, 12s loop (idle, ambient)
 *   — Hover: primary btn y:-2 + stronger shadow; secondary arrow x:3
 *
 * Performance: opacity + transform only (GPU composited).
 */

import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'

// ─── Content ───────────────────────────────────────────────────────────────────

const TRUST_INDICATORS = [
  'Privacy First',
  'No Surveillance',
  'Institution Controlled',
]

// ─── Animation helpers ─────────────────────────────────────────────────────────

function fadeUp(shouldReduce: boolean | null, delay = 0) {
  return {
    initial:     { opacity: 0, y: shouldReduce ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    { once: true, margin: '-60px 0px' },
    transition: {
      duration: 0.52,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }
}

function scaleIn(shouldReduce: boolean | null, delay = 0) {
  return {
    initial:     { opacity: 0, scale: shouldReduce ? 1 : 0.96 },
    whileInView: { opacity: 1, scale: 1 },
    viewport:    { once: true, margin: '-60px 0px' },
    transition: {
      duration: 0.60,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }
}

// ─── Main section ──────────────────────────────────────────────────────────────

function CallToAction() {
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      style={{
        position:        'relative',
        backgroundColor: 'var(--color-bg-base)',
        /* Extra tall — this is the visual climax */
        paddingTop:      'clamp(6rem, 14vw, 10rem)',
        paddingBottom:   'clamp(6rem, 14vw, 10rem)',
        overflow:        'hidden',
      }}
    >

      {/* ── Background ────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Dot grid */}
        <div className="absolute inset-0 bg-dots" style={{ opacity: 0.50 }} />

        {/* Primary ambient glow — large, centered, slow breathing (y oscillation) */}
        <motion.div
          animate={shouldReduce ? {} : {
            y:       [0, -14, 0],
            opacity: [0.75, 1, 0.75],
          }}
          transition={{
            duration: 12,
            repeat:   Infinity,
            ease:     'easeInOut',
          }}
          style={{
            position:   'absolute',
            top:        '50%',
            left:       '50%',
            transform:  'translate(-50%, -50%)',
            width:      '85%',
            height:     '75%',
            background: 'radial-gradient(ellipse, rgba(34,197,94,0.20) 0%, transparent 62%)',
            filter:     'blur(60px)',
          }}
        />

        {/* Secondary glow — upper right, static */}
        <div
          style={{
            position:   'absolute',
            top:        '5%',
            right:      '5%',
            width:      '45%',
            height:     '55%',
            background: 'radial-gradient(ellipse, rgba(34,197,94,0.07) 0%, transparent 70%)',
            filter:     'blur(80px)',
          }}
        />

        {/* Tertiary glow — lower left, static */}
        <div
          style={{
            position:   'absolute',
            bottom:     '5%',
            left:       '5%',
            width:      '40%',
            height:     '50%',
            background: 'radial-gradient(ellipse, rgba(34,197,94,0.05) 0%, transparent 70%)',
            filter:     'blur(80px)',
          }}
        />
      </div>

      {/* ── Container ────────────────────────────────────────────────────────── */}
      <div className="container-v2">

        {/* ── Glass panel — the visual centrepiece ─────────────────────────── */}
        <motion.div
          {...scaleIn(shouldReduce, 0)}
          style={{
            position:       'relative',
            maxWidth:        720,
            margin:         '0 auto',
            textAlign:      'center',
            /* Glassmorphism */
            background:     'rgba(22, 30, 23, 0.80)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border:         '1px solid rgba(34, 197, 94, 0.22)',
            borderRadius:   'var(--radius-2xl)',
            padding:        'clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 4rem)',
            boxShadow: [
              'var(--shadow-xl)',
              '0 0 90px 0 rgba(34, 197, 94, 0.16)',
              '0 0 0 1px rgba(34, 197, 94, 0.06)',
            ].join(', '),
          }}
        >
          {/* Top edge accent line */}
          <span
            aria-hidden="true"
            style={{
              position:   'absolute',
              top:        0,
              left:       '15%',
              right:      '15%',
              height:     1,
              background: 'linear-gradient(to right, transparent, rgba(34,197,94,0.45), transparent)',
            }}
          />

          {/* ── Badge ──────────────────────────────────────────────────────── */}
          <motion.div
            {...fadeUp(shouldReduce, 0.04)}
            style={{ marginBottom: 'var(--space-8)' }}
          >
            <div
              style={{
                display:      'inline-flex',
                alignItems:   'center',
                gap:          7,
                padding:      '5px 14px',
                borderRadius: 'var(--radius-full)',
                border:       '1px solid rgba(34,197,94,0.28)',
                background:   'rgba(34,197,94,0.08)',
              }}
            >
              <span
                className="animate-pulse"
                style={{
                  width:        5,
                  height:       5,
                  borderRadius: '50%',
                  background:   'var(--color-accent)',
                  flexShrink:   0,
                }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontSize:      'var(--text-xs)',
                  fontWeight:    'var(--font-semibold)',
                  letterSpacing: 'var(--tracking-widest)',
                  textTransform: 'uppercase',
                  color:         'var(--color-accent)',
                }}
              >
                Ready to Get Started
              </span>
            </div>
          </motion.div>

          {/* ── Heading ────────────────────────────────────────────────────── */}
          <motion.div
            {...fadeUp(shouldReduce, 0.10)}
            style={{ marginBottom: 'var(--space-6)' }}
          >
            <h2
              id="cta-heading"
              style={{ margin: 0 }}
            >
              {/* Line 1 — gradient accent */}
              <span
                className="text-gradient-accent"
                style={{
                  display:       'block',
                  fontSize:      'clamp(2.25rem, 5vw, 4rem)',
                  fontWeight:    'var(--font-extrabold)',
                  lineHeight:    1.05,
                  letterSpacing: 'var(--tracking-tight)',
                  marginBottom:  '0.15em',
                }}
              >
                Bring academic integrity
              </span>
              {/* Line 2 — white, same weight for cohesion */}
              <span
                style={{
                  display:       'block',
                  fontSize:      'clamp(2.25rem, 5vw, 4rem)',
                  fontWeight:    'var(--font-extrabold)',
                  lineHeight:    1.05,
                  letterSpacing: 'var(--tracking-tight)',
                  color:         'var(--color-text-primary)',
                }}
              >
                into the AI era.
              </span>
            </h2>
          </motion.div>

          {/* ── Supporting paragraph ─────────────────────────────────────────── */}
          <motion.div
            {...fadeUp(shouldReduce, 0.16)}
            style={{ marginBottom: 'var(--space-10)' }}
          >
            <p
              style={{
                fontSize:   'var(--text-lg)',
                color:      '#B0C4B2',
                lineHeight: 1.80,
                maxWidth:   540,
                margin:     '0 auto',
              }}
            >
              Discover how HumanFirst helps institutions preserve trust, protect
              privacy, and create assessment environments designed for modern
              education.
            </p>
          </motion.div>

          {/* ── CTA Buttons ──────────────────────────────────────────────────── */}
          <motion.div
            {...fadeUp(shouldReduce, 0.22)}
            style={{ marginBottom: 'var(--space-8)' }}
          >
            <div
              className="cta-button-row"
              style={{
                display:        'flex',
                flexWrap:       'wrap',
                alignItems:     'center',
                justifyContent: 'center',
                gap:            'var(--space-4)',
              }}
            >
              {/* Primary CTA */}
              <motion.a
                href="#pilot"
                className="btn btn-primary btn-lg"
                aria-label="Request a pilot programme"
                style={{ textDecoration: 'none' }}
                whileHover={shouldReduce ? {} : {
                  y:         -2,
                  boxShadow: '0 12px 32px rgba(34, 197, 94, 0.45)',
                }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                Request a Pilot
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                href="#demo"
                aria-label="Schedule a demo"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            'var(--space-2)',
                  fontSize:       'var(--text-sm)',
                  fontWeight:     600,
                  color:          'rgba(240, 245, 241, 0.72)',
                  letterSpacing:  '0.01em',
                  textDecoration: 'none',
                  padding:        '0.75rem 1.5rem',
                  border:         '1px solid rgba(240,245,241,0.12)',
                  borderRadius:   'var(--radius-full)',
                  background:     'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(8px)',
                }}
                whileHover={shouldReduce ? {} : {
                  color:       'rgba(240, 245, 241, 1)',
                  borderColor: 'rgba(240,245,241,0.25)',
                  background:  'rgba(255,255,255,0.07)',
                  y:           -1,
                }}
                transition={{ duration: 0.20, ease: 'easeOut' }}
              >
                Schedule a Demo
                <motion.span
                  whileHover={shouldReduce ? {} : { x: 3 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  aria-hidden="true"
                >
                  <ArrowRight size={14} />
                </motion.span>
              </motion.a>
            </div>
          </motion.div>

          {/* ── Trust indicators ─────────────────────────────────────────────── */}
          <div
            style={{
              display:        'flex',
              flexWrap:       'wrap',
              alignItems:     'center',
              justifyContent: 'center',
              gap:            'var(--space-5)',
            }}
          >
            {TRUST_INDICATORS.map((label, i) => (
              <motion.div
                key={label}
                {...fadeUp(shouldReduce, 0.30 + i * 0.08)}
                style={{
                  display:    'flex',
                  alignItems: 'center',
                  gap:        'var(--space-2)',
                }}
              >
                <CheckCircle2
                  size={14}
                  strokeWidth={2.5}
                  style={{ color: 'var(--color-accent)', flexShrink: 0 }}
                  aria-hidden="true"
                />
                <span
                  style={{
                    fontSize:   'var(--text-sm)',
                    fontWeight: 'var(--font-medium)',
                    color:      '#9CAE9E',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {label}
                </span>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  )
}

export default CallToAction
