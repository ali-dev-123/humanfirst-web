/**
 * Problem.tsx — HumanF1RST v2
 *
 * "The Challenge" section — based on approved reference design.
 *
 * Layout (desktop):
 *   — Eyebrow badge: "THE CHALLENGE"
 *   — Stat split row: [Left ~38%: giant "95%" gradient stat]
 *                     [Right ~62%: h2 + body + blockquote callout]
 *   — Divider / spacing
 *   — Approach sub-label
 *   — 3-column approach cards grid
 *   — Amber consequence callout
 *
 * Layout (mobile):
 *   — Badge → stat → text stacked vertically
 *   — 1-column cards
 *
 * Animations (viewport-triggered, once:true, prefers-reduced-motion safe):
 *   — Badge:      fadeUp, delay 0
 *   — Stat:       scaleIn + fadeUp, delay 0.06
 *   — Text block: fadeUp, delay 0.14
 *   — Cards:      staggered fadeUp, 120ms apart
 *   — Callout:    fadeUp, delay 0.45
 *
 * Performance:
 *   — opacity + transform only (GPU composited)
 *   — will-change managed by Framer Motion
 */

import { motion, useReducedMotion } from 'framer-motion'
import { Eye, Keyboard, VideoOff, AlertTriangle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// ─── Content ───────────────────────────────────────────────────────────────────

interface ApproachCard {
  icon:      LucideIcon
  eyebrow:   string
  title:     string
  body:      string
  accentHue: 'red' | 'amber' | 'neutral'
}

const APPROACHES: ApproachCard[] = [
  {
    icon:      Eye,
    eyebrow:   'Approach 01',
    title:     'Full Surveillance',
    body:      'Traditional proctoring tools record screens, webcams, and keystrokes. Students are watched like suspects. Institutions bear the legal risk of storing that footage — and students feel it.',
    accentHue: 'red',
  },
  {
    icon:      Keyboard,
    eyebrow:   'Approach 02',
    title:     'Keystroke Logging',
    body:      'Behavioral biometrics capture every pause, deletion, and typing rhythm. The data is deeply personal and never truly anonymised. A single breach exposes thousands of students.',
    accentHue: 'amber',
  },
  {
    icon:      VideoOff,
    eyebrow:   'Approach 03',
    title:     'Do Nothing',
    body:      'Assignments submitted with AI assistance are indistinguishable from genuine work by existing detectors. Pass rates rise, learning outcomes fall, and the credential loses its meaning.',
    accentHue: 'neutral',
  },
]

// ─── Accent palette ────────────────────────────────────────────────────────────

const ACCENT: Record<ApproachCard['accentHue'], {
  icon:   string
  badge:  string
  border: string
  glow:   string
}> = {
  red: {
    icon:   'var(--color-brand-green)',
    badge:  'var(--color-accent)',
    border: 'rgba(202, 255, 112, 0.30)',
    glow:   'rgba(202, 255, 112, 0.16)',
  },
  amber: {
    icon:   'var(--color-brand-green)',
    badge:  'var(--color-accent)',
    border: 'rgba(202, 255, 112, 0.30)',
    glow:   'rgba(202, 255, 112, 0.16)',
  },
  neutral: {
    icon:   'var(--color-brand-green)',
    badge:  'var(--color-accent)',
    border: 'rgba(202, 255, 112, 0.30)',
    glow:   'rgba(202, 255, 112, 0.16)',
  },
}

// ─── Animation helpers ─────────────────────────────────────────────────────────

function fadeUp(shouldReduce: boolean | null, delay = 0) {
  return {
    initial:     { opacity: 0, y: shouldReduce ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    { once: true, margin: '-80px 0px' },
    transition: {
      duration: 0.55,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }
}

function scaleIn(shouldReduce: boolean | null, delay = 0) {
  return {
    initial:     { opacity: 0, scale: shouldReduce ? 1 : 0.82 },
    whileInView: { opacity: 1, scale: 1 },
    viewport:    { once: true, margin: '-80px 0px' },
    transition: {
      duration: 0.6,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }
}

// ─── Approach card ─────────────────────────────────────────────────────────────

interface ApproachCardProps {
  card:         ApproachCard
  index:        number
  shouldReduce: boolean | null
}

function ApproachCardItem({ card, index, shouldReduce }: ApproachCardProps) {
  const Icon      = card.icon
  const colors    = ACCENT[card.accentHue]
  const cardDelay = 0.08 + index * 0.12

  return (
    <motion.article
      {...fadeUp(shouldReduce, cardDelay)}
      style={{
        position:      'relative',
        display:       'flex',
        flexDirection: 'column',
        background:    'var(--color-bg-elevated)',
        border:        `1px solid ${colors.border}`,
        borderRadius:  'var(--radius-2xl)',
        padding:       'var(--space-8)',
        boxShadow: [
          'var(--shadow-lg)',
          `0 0 40px 0 ${colors.glow}`,
        ].join(', '),
        overflow:   'hidden',
        height:     '100%',
        willChange: 'transform',
        cursor:     'default',
      }}
      whileHover={shouldReduce ? {} : {
        y:         -4,
        boxShadow: [
          'var(--shadow-xl)',
          `0 0 60px 0 ${colors.glow}`,
          `0 0 0 1px ${colors.border}`,
        ].join(', '),
      }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      {/* Top edge glow stripe */}
      <span
        aria-hidden="true"
        style={{
          position:     'absolute',
          top:          0,
          left:         '10%',
          right:        '10%',
          height:       1,
          background:   `linear-gradient(to right, transparent, ${colors.border}, transparent)`,
        }}
      />

      {/* Icon */}
      <motion.div
        {...scaleIn(shouldReduce, cardDelay + 0.04)}
        style={{
          display:        'inline-flex',
          alignItems:     'center',
          justifyContent: 'center',
          width:          44,
          height:         44,
          borderRadius:   'var(--radius-xl)',
          background:     colors.badge,
          border:         `1px solid ${colors.border}`,
          marginBottom:   'var(--space-6)',
          flexShrink:     0,
        }}
      >
        <Icon size={20} strokeWidth={1.75} style={{ color: colors.icon }} aria-hidden="true" />
      </motion.div>

      {/* Eyebrow mono label */}
      <p
        style={{
          fontSize:      'var(--text-xs)',
          fontWeight:    'var(--font-semibold)',
          letterSpacing: 'var(--tracking-widest)',
          textTransform: 'uppercase',
          color:         colors.icon,
          marginBottom:  'var(--space-2)',
          fontFamily:    'var(--font-mono)',
        }}
      >
        {card.eyebrow}
      </p>

      {/* Title */}
      <h3
        style={{
          fontSize:      'var(--text-xl)',
          fontWeight:    'var(--font-bold)',
          color:         'var(--color-text-primary)',
          lineHeight:    'var(--leading-snug)',
          letterSpacing: 'var(--tracking-snug)',
          marginBottom:  'var(--space-4)',
        }}
      >
        {card.title}
      </h3>

      {/* Body */}
      <p
        style={{
          fontSize:   'var(--text-sm)',
          color:      '#5F6D65',
          lineHeight: 'var(--leading-relaxed)',
          flexGrow:   1,
        }}
      >
        {card.body}
      </p>
    </motion.article>
  )
}

// ─── Main section ──────────────────────────────────────────────────────────────

function Problem() {
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      style={{
        position:        'relative',
        backgroundColor: 'var(--color-bg-base)',
        paddingTop:      'var(--space-24)',
        paddingBottom:   'var(--space-24)',
        overflow:        'hidden',
      }}
    >
      {/* ── Background ─────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Dot grid — same as Hero, slightly dimmer */}
        <div className="absolute inset-0 bg-dots" style={{ opacity: 0.45 }} />

        {/* Subtle green top glow — bridges visually from Hero */}
        <div
          style={{
            position:   'absolute',
            top:        0,
            left:       '50%',
            transform:  'translateX(-50%)',
            width:      '55%',
            height:     280,
            background: 'radial-gradient(ellipse, rgba(202,255,112,0.20) 0%, transparent 70%)',
            filter:     'blur(50px)',
          }}
        />
      </div>

      <div className="container-v2">

        {/* ── Eyebrow badge ─────────────────────────────────────────────────── */}
        <motion.div {...fadeUp(shouldReduce, 0)} style={{ marginBottom: 'var(--space-10)' }}>
          <div
            style={{
              display:       'inline-flex',
              alignItems:    'center',
              gap:           7,
              padding:       '5px 14px',
              borderRadius:  'var(--radius-full)',
              border:        '1px solid rgba(202, 255, 112, 0.30)',
              background:    'var(--color-accent)',
            }}
          >
            <span
              style={{
                width:        5,
                height:       5,
                borderRadius: '50%',
                background:   'var(--color-brand-green)',
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
                color:         'var(--color-text-primary)',
              }}
            >
              The Challenge
            </span>
          </div>
        </motion.div>

        {/* ── Stat split row ─────────────────────────────────────────────────
            Desktop: [38% stat] [62% text] side by side via problem-stat-grid
            Mobile:  stacked — stat above, text below
        ────────────────────────────────────────────────────────────────────── */}
        <div className="problem-stat-grid" style={{ marginBottom: 'var(--space-20)' }}>

          {/* LEFT — "95%" display stat */}
          <motion.div
            {...scaleIn(shouldReduce, 0.06)}
            style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'flex-start',
            }}
          >
            <div style={{ position: 'relative', lineHeight: 1 }}>
              {/* Ambient glow behind the stat */}
              <span
                aria-hidden="true"
                style={{
                  position:     'absolute',
                  inset:        '-20%',
                  background:   'radial-gradient(ellipse, rgba(202,255,112,0.24) 0%, transparent 70%)',
                  filter:       'blur(30px)',
                  pointerEvents:'none',
                }}
              />
              <span
                className="text-gradient-accent"
                style={{
                  /*
                   * clamp: 6rem on small mobile → scales with viewport →
                   * caps at 12.5rem on large desktop.
                   * Matches the reference's dominant proportion.
                   */
                  fontSize:      'clamp(6rem, 19vw, 12.5rem)',
                  fontWeight:    'var(--font-extrabold)',
                  letterSpacing: '-0.04em',
                  lineHeight:    1,
                  position:      'relative',
                }}
                aria-label="95 percent"
              >
                95%
              </span>
            </div>
          </motion.div>

          {/* RIGHT — headline + body + blockquote */}
          <motion.div
            {...fadeUp(shouldReduce, 0.14)}
            style={{
              display:       'flex',
              flexDirection: 'column',
              justifyContent:'center',
            }}
          >
            {/* H2 */}
            <h2
              id="problem-heading"
              style={{
                fontSize:      'clamp(1.6rem, 3.2vw, 2.5rem)',
                fontWeight:    'var(--font-extrabold)',
                lineHeight:    'var(--leading-tight)',
                letterSpacing: 'var(--tracking-tight)',
                color:         'var(--color-text-primary)',
                marginBottom:  'var(--space-5)',
              }}
            >
              of students have access to AI tools.{' '}
              <span style={{ color: 'var(--color-text-primary)' }}>
                Traditional monitoring can't keep up.
              </span>
            </h2>

            {/* Body */}
            <p
              style={{
                fontSize:   'var(--text-base)',
                color:      '#5F6D65',
                lineHeight: 'var(--leading-relaxed)',
                maxWidth:   520,
                marginBottom: 'var(--space-6)',
              }}
            >
              ChatGPT, Gemini, and dozens of AI tools are freely accessible
              to every student. Institutions face a real choice: ignore it,
              or use invasive surveillance tools that violate student trust
              and dignity.
            </p>

            {/* Blockquote callout — green left border, matching reference */}
            <blockquote
              style={{
                borderLeft:   '3px solid var(--color-accent)',
                paddingLeft:  'var(--space-5)',
                margin:       0,
              }}
            >
              <p
                style={{
                  fontSize:   'var(--text-base)',
                  fontWeight: 'var(--font-semibold)',
                  color:      'var(--color-text-primary)',
                  lineHeight: 'var(--leading-snug)',
                }}
              >
                There has to be a better way.
              </p>
            </blockquote>
          </motion.div>

        </div>

        {/* ── Approaches sub-label ──────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(shouldReduce, 0.08)}
          style={{ marginBottom: 'var(--space-8)' }}
        >
          <p
            style={{
              fontSize:      'var(--text-xs)',
              fontWeight:    'var(--font-semibold)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              color:         'var(--color-text-muted)',
              fontFamily:    'var(--font-mono)',
            }}
          >
            Why existing approaches fail
          </p>
        </motion.div>

        {/* ── Approach cards grid ───────────────────────────────────────────── */}
        <div
          className="problem-grid"
          style={{ display: 'grid', gap: 'var(--space-5)' }}
        >
          {APPROACHES.map((card, i) => (
            <ApproachCardItem
              key={card.eyebrow}
              card={card}
              index={i}
              shouldReduce={shouldReduce}
            />
          ))}
        </div>

        {/* ── Consequence callout ────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(shouldReduce, 0.45)}
          style={{
            marginTop:    'var(--space-8)',
            padding:      'var(--space-8)',
            background:   'var(--color-bg-elevated)',
            border:       '1px solid rgba(245, 158, 11, 0.20)',
            borderRadius: 'var(--radius-2xl)',
            boxShadow:    '0 0 48px 0 rgba(245, 158, 11, 0.06)',
            display:      'flex',
            alignItems:   'flex-start',
            gap:          'var(--space-6)',
            position:     'relative',
            overflow:     'hidden',
          }}
        >
          {/* Top accent line */}
          <span
            aria-hidden="true"
            style={{
              position:   'absolute',
              top:        0,
              left:       '5%',
              right:      '5%',
              height:     1,
              background: 'linear-gradient(to right, transparent, rgba(245,158,11,0.30), transparent)',
            }}
          />

          {/* Icon */}
          <div
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              justifyContent: 'center',
              width:          48,
              height:         48,
              borderRadius:   'var(--radius-xl)',
              background:     'rgba(245,158,11,0.10)',
              border:         '1px solid rgba(245,158,11,0.22)',
              flexShrink:     0,
              marginTop:      2,
            }}
          >
            <AlertTriangle
              size={22}
              strokeWidth={1.75}
              style={{ color: 'rgba(245,158,11,0.90)' }}
              aria-hidden="true"
            />
          </div>

          {/* Text */}
          <div>
            <p
              style={{
                fontSize:      'var(--text-xs)',
                fontWeight:    'var(--font-semibold)',
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                color:         'rgba(182,122,31,0.90)',
                fontFamily:    'var(--font-mono)',
                marginBottom:  'var(--space-2)',
              }}
            >
              The consequence
            </p>
            <p
              style={{
                fontSize:      'var(--text-lg)',
                fontWeight:    'var(--font-semibold)',
                color:         'var(--color-text-primary)',
                lineHeight:    'var(--leading-snug)',
                letterSpacing: 'var(--tracking-snug)',
                marginBottom:  'var(--space-3)',
              }}
            >
              Institutions are paralysed between two unacceptable choices.
            </p>
            <p
              style={{
                fontSize:   'var(--text-sm)',
                color:      '#5F6D65',
                lineHeight: 'var(--leading-relaxed)',
                maxWidth:   640,
              }}
            >
              Doing nothing lets AI-generated work pass as genuine — eroding the value
              of every degree issued. Deploying surveillance breaches student trust,
              invites legal scrutiny, and creates data liability no institution wants.
              HumanFirst is built because this gap shouldn't exist.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Problem
