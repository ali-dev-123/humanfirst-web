/**
 * CoreFeatures.tsx — HumanF1RST v2
 *
 * "Core Features" section — answers "Why is HumanFirst different?"
 *
 * Layout:
 *   Desktop  (≥1024px): 3 × 2 grid (6 cards, 2 rows of 3)
 *   Tablet   (768–1023): 2 × 3 grid (3 rows of 2) — via .problem-grid
 *   Mobile   (<768px):  single column stack
 *
 * Reuses:
 *   — .problem-grid (index.css) — responsive card grid
 *   — .text-gradient-accent     — heading gradient
 *   — fadeUp / scaleIn pattern  — same as all other sections
 *
 * Animations (viewport-triggered, once:true, prefers-reduced-motion safe):
 *   — Badge + heading: fadeUp 0ms
 *   — Para: fadeUp 120ms
 *   — Cards: stagger fadeUp 80ms apart
 *   — Icons: scaleIn 50ms behind each card
 *   — Hover: y:-4 + border brighten + glow expand + icon scale
 *
 * Performance: opacity + transform only (GPU composited).
 */

import { motion, useReducedMotion } from 'framer-motion'
import {
  Lock,
  EyeOff,
  SlidersHorizontal,
  ShieldCheck,
  Zap,
  Globe,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// ─── Content ───────────────────────────────────────────────────────────────────

interface Feature {
  icon:  LucideIcon
  title: string
  body:  string
}

const FEATURES: Feature[] = [
  {
    icon:  Lock,
    title: 'Controlled AI Access',
    body:  'Institution-defined policies restrict selected AI tools while keeping approved learning resources available.',
  },
  {
    icon:  EyeOff,
    title: 'Privacy by Design',
    body:  'No webcam recording. No keystroke logging. No screen surveillance. Students are never treated as suspects.',
  },
  {
    icon:  SlidersHorizontal,
    title: 'Institution Control',
    body:  'Educators define assessment rules and retain complete control over every session — without IT complexity.',
  },
  {
    icon:  ShieldCheck,
    title: 'Verifiable Integrity',
    body:  'Assignments are completed inside a trusted assessment environment, giving submissions you can stand behind.',
  },
  {
    icon:  Zap,
    title: 'Fast Deployment',
    body:  'Simple setup with minimal disruption to existing institutional workflows. Up and running when you need it.',
  },
  {
    icon:  Globe,
    title: 'Built to Scale',
    body:  'Designed for universities, schools, and training organisations of every size — from single classrooms to entire institutions.',
  },
]

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
    initial:     { opacity: 0, scale: shouldReduce ? 1 : 0.76 },
    whileInView: { opacity: 1, scale: 1 },
    viewport:    { once: true, margin: '-80px 0px' },
    transition: {
      duration: 0.4,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }
}

// ─── Feature card ──────────────────────────────────────────────────────────────

interface FeatureCardProps {
  feature:      Feature
  index:        number
  shouldReduce: boolean | null
}

function FeatureCard({ feature, index, shouldReduce }: FeatureCardProps) {
  const Icon      = feature.icon
  const cardDelay = 0.06 + index * 0.08   /* faster stagger — 6 cards */

  return (
    <motion.article
      {...fadeUp(shouldReduce, cardDelay)}
      style={{
        position:      'relative',
        display:       'flex',
        flexDirection: 'column',
        height:        '100%',
        background:    'var(--color-bg-elevated)',
        border:        '1px solid rgba(34, 197, 94, 0.14)',
        borderRadius:  'var(--radius-2xl)',
        padding:       'var(--space-8)',
        boxShadow:     'var(--shadow-lg), 0 0 36px 0 rgba(34, 197, 94, 0.05)',
        overflow:      'visible',
        willChange:    'transform',
        cursor:        'default',
      }}
      whileHover={shouldReduce ? {} : {
        y:         -4,
        boxShadow: [
          'var(--shadow-xl)',
          '0 0 64px 0 rgba(34, 197, 94, 0.14)',
          '0 0 0 1px rgba(34, 197, 94, 0.28)',
        ].join(', '),
      }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      {/* Top edge glow stripe */}
      <span
        aria-hidden="true"
        style={{
          position:   'absolute',
          top:        0,
          left:       '10%',
          right:      '10%',
          height:     1,
          background: 'linear-gradient(to right, transparent, rgba(34,197,94,0.20), transparent)',
        }}
      />

      {/* Icon badge — larger than Problem/Solution to feel "premium" */}
      <motion.div
        {...scaleIn(shouldReduce, cardDelay + 0.05)}
        style={{
          display:        'inline-flex',
          alignItems:     'center',
          justifyContent: 'center',
          width:          52,
          height:         52,
          borderRadius:   'var(--radius-xl)',
          background:     'rgba(34, 197, 94, 0.09)',
          border:         '1px solid rgba(34, 197, 94, 0.18)',
          marginBottom:   'var(--space-6)',
          flexShrink:     0,
        }}
        whileHover={shouldReduce ? {} : { scale: 1.10 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        <Icon
          size={24}
          strokeWidth={1.6}
          style={{ color: 'var(--color-accent)' }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Title */}
      <h3
        style={{
          fontSize:      'var(--text-lg)',
          fontWeight:    'var(--font-bold)',
          color:         'var(--color-text-primary)',
          lineHeight:    'var(--leading-snug)',
          letterSpacing: 'var(--tracking-snug)',
          marginBottom:  'var(--space-3)',
        }}
      >
        {feature.title}
      </h3>

      {/* Body */}
      <p
        style={{
          fontSize:   'var(--text-sm)',
          color:      '#B0C4B2',
          lineHeight: 'var(--leading-relaxed)',
          flexGrow:   1,
        }}
      >
        {feature.body}
      </p>
    </motion.article>
  )
}

// ─── Main section ──────────────────────────────────────────────────────────────

function CoreFeatures() {
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      style={{
        position:        'relative',
        backgroundColor: 'var(--color-bg-base)',
        paddingTop:      'var(--space-24)',
        paddingBottom:   'var(--space-24)',
        overflow:        'hidden',
      }}
    >
      {/* ── Background ────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-dots" style={{ opacity: 0.45 }} />

        {/* Centered top glow */}
        <div
          style={{
            position:   'absolute',
            top:        '-5%',
            left:       '50%',
            transform:  'translateX(-50%)',
            width:      '65%',
            height:     300,
            background: 'radial-gradient(ellipse, rgba(34,197,94,0.07) 0%, transparent 70%)',
            filter:     'blur(50px)',
          }}
        />
      </div>

      <div className="container-v2">

        {/* ── Badge ─────────────────────────────────────────────────────────── */}
        <motion.div {...fadeUp(shouldReduce, 0)} style={{ marginBottom: 'var(--space-10)' }}>
          <div
            style={{
              display:      'inline-flex',
              alignItems:   'center',
              gap:          7,
              padding:      '5px 14px',
              borderRadius: 'var(--radius-full)',
              border:       '1px solid rgba(34,197,94,0.28)',
              background:   'rgba(34,197,94,0.07)',
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
              Core Features
            </span>
          </div>
        </motion.div>

        {/* ── Heading ───────────────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(shouldReduce, 0.06)}
          style={{ maxWidth: 600, marginBottom: 'var(--space-5)' }}
        >
          <h2
            id="features-heading"
            style={{ margin: 0 }}
          >
            <span
              className="text-gradient-accent"
              style={{
                display:       'block',
                fontSize:      'clamp(2.25rem, 4.5vw, 3.75rem)',
                fontWeight:    'var(--font-extrabold)',
                lineHeight:    1.05,
                letterSpacing: 'var(--tracking-tight)',
                marginBottom:  '0.2em',
              }}
            >
              Built for integrity.
            </span>
            <span
              style={{
                display:       'block',
                fontSize:      'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight:    'var(--font-bold)',
                lineHeight:    'var(--leading-snug)',
                letterSpacing: 'var(--tracking-snug)',
                color:         'var(--color-text-primary)',
              }}
            >
              Designed for trust.
            </span>
          </h2>
        </motion.div>

        {/* ── Supporting paragraph ───────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(shouldReduce, 0.12)}
          style={{ maxWidth: 520, marginBottom: 'var(--space-16)' }}
        >
          <p
            style={{
              fontSize:   'var(--text-lg)',
              color:      '#B0C4B2',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            Every feature exists to protect learning, preserve privacy,
            and give institutions confidence without relying on surveillance.
          </p>
        </motion.div>

        {/* ── Feature grid (3×2 desktop · 2×3 tablet · 1 col mobile) ───────── */}
        <div
          className="problem-grid"
          style={{ display: 'grid', gap: 'var(--space-5)' }}
        >
          {FEATURES.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={i}
              shouldReduce={shouldReduce}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default CoreFeatures
