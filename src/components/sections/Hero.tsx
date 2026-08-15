/**
 * Hero.tsx — HumanF1RST v2
 *
 * Hybrid Split-Canvas hero section.
 * Layout: Concept 2 (55/45 split) + Concept 1 background + Concept 3 typographic rhythm.
 *
 * Copy: Preserved verbatim from approved V1.
 * Animations: Framer Motion stagger, entrance-only (viewport.once: true not needed —
 *             hero is above fold, uses animate not whileInView).
 *
 * Performance:
 *   — All motion uses transform + opacity only (GPU composited, no layout)
 *   — prefers-reduced-motion respected via useReducedMotion()
 *   — will-change managed by Framer Motion automatically
 *   — No CLS: fixed dimensions on all background layers, no font-face shifts
 *   — Background layers isolated in a pointer-events-none overflow-hidden div
 *     so they never cause paint outside the section
 */

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useSmartNavigate } from '../../hooks/useSmartNavigate'
import Badge from '../ui/Badge'
import HeroDashboard from './HeroDashboard'

// ─── Animation variants ────────────────────────────────────────────────────────

/**
 * Left-column stagger container.
 * Drives sequential reveal of badge → h1 → sub-headline+body → CTAs.
 * staggerChildren: 0.12s matches the approved animation timeline.
 */
const CONTAINER_VARIANTS = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren:   0,
    },
  },
} as const

/**
 * Individual item variant.
 * opacity + y only — no width/height/padding changes (zero CLS).
 * y is conditionally applied via shouldReduce below.
 */
function makeItemVariant(shouldReduce: boolean | null) {
  return {
    hidden: {
      opacity: 0,
      y:       shouldReduce ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y:       0,
      transition: {
        duration: 0.6,
        ease:     [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  }
}

// ─── Noise texture data URI (identical to bg-noise utility, inlined as div) ───
const NOISE_DATA_URI =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")"

// ─── Hero component ────────────────────────────────────────────────────────────

function Hero() {
  const shouldReduce = useReducedMotion()
  const itemVariant  = makeItemVariant(shouldReduce)
  const { go }      = useSmartNavigate()

  return (
    <section
      id="hero"
      aria-label="HumanF1RST — Academic integrity platform"
      style={{
        position:   'relative',
        minHeight:  '85vh',
        display:    'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:    115,
        paddingBottom: 100,    /* increased from 80 — gives balanced breathing room below */
        backgroundColor: 'var(--color-bg-base)',
      }}
    >

      {/* ── Background Layers ──────────────────────────────────────────────────
          All layers are absolute-positioned inside an overflow-hidden div.
          This ensures no background effect bleeds outside the section,
          while content (floating cards) remains fully visible.
      ─────────────────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Layer 1 — Dot grid (24px spacing, 6% opacity) */}
        <div className="absolute inset-0 bg-dots" />

        {/* Layer 2 — Noise texture (2.5% — tactile depth) */}
        <div
          className="absolute inset-0"
          style={{ backgroundImage: NOISE_DATA_URI, opacity: 0.03 }}
        />

        {/* Layer 3 — Primary radial glow (top-center, green 10%) */}
        <div
          className="absolute hero-ambient-orb"
          style={{
            top:       '-10%',
            left:      '50%',
            transform: 'translateX(-50%)',
            width:     '70%',
            aspectRatio: '1 / 1',
            background: 'radial-gradient(ellipse, rgba(202, 255, 112, 0.24) 0%, transparent 70%)',
            filter:    'blur(40px)',
          }}
        />

        {/* Layer 4 — Right accent glow
            Expanded to cover the full dashboard height (top 5% → 88% tall).
            This wraps the glow around the entire panel rather than
            concentrating it only in the mid-section. */}
        <div
          className="absolute hero-ambient-orb-slow"
          style={{
            top:    '5%',
            right:  '0%',
            width:  '50%',
            height: '88%',
            background: 'radial-gradient(ellipse, rgba(8, 47, 37, 0.08) 0%, transparent 70%)',
            filter: 'blur(55px)',
          }}
        />

        {/* Layer 5 — Bottom fade (dissolves into next section) */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height:     200,
            background: 'linear-gradient(to bottom, transparent, var(--color-bg-base))',
          }}
        />
      </div>

      {/* ── Content Grid ─────────────────────────────────────────────────────-
          hero-grid:  1fr on mobile, 55fr 45fr at lg+
          container-v2: centered, max-width 1120px, horizontal padding
      ─────────────────────────────────────────────────────────────────────── */}
      <div className="container-v2 hero-grid w-full">

        {/* ── LEFT COLUMN — Text + CTAs ─────────────────────────────────── */}
        <motion.div
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: 560 }}
        >

          {/* Badge */}
          <motion.div variants={itemVariant}>
            <Badge variant="accent" dot dotPulse>
              AI Integrity Platform
            </Badge>
          </motion.div>

          {/* H1 — "Human > AI."
              Typographic rhythm: "Human" at weight 700 (soft claim),
              "> AI." at weight 800 + gradient (the differentiator).
              lg:whitespace-nowrap preserves single-line on desktop per spec.
              Natural wrap allowed on tablet and mobile. */}
          <motion.h1
            variants={itemVariant}
            className="lg:whitespace-nowrap"
            style={{
              marginTop:     'var(--space-5)',
              fontSize:      'clamp(2.5rem, 6vw, 4.5rem)',
              lineHeight:    'var(--leading-none)',
              letterSpacing: 'var(--tracking-tight)',
            }}
          >
            <span
              style={{
                fontWeight: 'var(--font-bold)',       /* 700 */
                color:      'var(--color-text-primary)',
              }}
            >
              Human{' '}
            </span>
            <span
              className="text-gradient-accent"
              style={{ fontWeight: 'var(--font-extrabold)' }}  /* 800 */
            >
              {'> AI.'}
            </span>
          </motion.h1>

          {/* Sub-headline + body (animated as one group per approved timeline) */}
          <motion.div
            variants={itemVariant}
            style={{ marginTop: 'var(--space-6)' }}
          >
            {/* Sub-headline — verbatim V1 */}
            <p
              style={{
                fontSize:      'var(--text-xl)',
                fontWeight:    'var(--font-semibold)',
                color:         'var(--color-text-primary)',
                letterSpacing: 'var(--tracking-snug)',
                lineHeight:    'var(--leading-snug)',
              }}
            >
              Verified integrity. Zero surveillance.
            </p>

            {/* Body — verbatim V1 */}
            <p
              style={{
                marginTop:  'var(--space-3)',
                fontSize:   'var(--text-lg)',
                color:      '#5F6D65',
                lineHeight: 'var(--leading-relaxed)',
                maxWidth:   480,
              }}
            >
              HumanFirst proves student work is genuinely human — without
              cameras, keystroke logging, or a single frame of video ever
              leaving the device.
            </p>
          </motion.div>

          {/* CTAs
              Mobile:  flex-col, primary full-width
              Desktop: flex-row, auto width
              Primary:   btn-primary (dominant)
              Secondary: text link + arrow (premium, understated) */}
          <motion.div
            variants={itemVariant}
            className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5"
            style={{ marginTop: 'var(--space-8)' }}
          >
            {/* Primary CTA — motion.a for GPU-smooth hover lift + shadow */}
            <motion.a
              href="/contact#request-pilot"
              className="btn btn-primary btn-lg w-full sm:w-auto"
              aria-label="Request a pilot programme"
              onClick={(e) => { e.preventDefault(); go('/contact#request-pilot') }}
              whileHover={{
                y:         -2,
                boxShadow: '0 10px 28px rgba(202, 255, 112, 0.40)',
              }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              Request a Pilot
            </motion.a>

            {/* Secondary CTA — text + arrow, no border.
                Resting color: between secondary and primary (--color-text-primary at 75% opacity)
                so it reads clearly but doesn't compete with the green button.
                Arrow nudges exactly 3px on hover via Framer Motion for GPU-smooth animation. */}
            <motion.a
              href="#opportunity"
              className="inline-flex items-center justify-center sm:justify-start gap-2 group"
              style={{
                fontSize:      'var(--text-sm)',
                fontWeight:    600,
                color:         'var(--color-text-secondary)',
                letterSpacing: '0.01em',
              }}
              whileHover={{ color: 'var(--color-forest-700)' }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              aria-label="Learn more about investor opportunity"
            >
              For Investors
              <motion.span
                className="inline-flex"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                aria-hidden="true"
              >
                <ArrowRight size={14} />
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN — Dashboard ───────────────────────────────────
            Entrance: slides in from x:40 + scale:0.97 → natural position.
            Starts at 200ms delay (overlaps with left column reveal).
            Completed by ~900ms — all left column items are visible.
        ─────────────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{
            opacity: 0,
            x:       shouldReduce ? 0 : 40,
            scale:   shouldReduce ? 1 : 0.97,
          }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: 0.7,
            delay:    0.2,
            ease:     [0.16, 1, 0.3, 1],
          }}
          /* Removed explicit willChange — Framer Motion manages it automatically */
        >
          <HeroDashboard />
        </motion.div>

      </div>
    </section>
  )
}

export default Hero
