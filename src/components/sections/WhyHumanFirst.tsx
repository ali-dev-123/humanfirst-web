/**
 * WhyHumanFirst.tsx — HumanF1RST v2
 *
 * "Why HumanFirst" — value proposition section.
 * Answers: "Why choose HumanFirst over existing approaches?"
 *
 * Layout:
 *   Desktop  (≥768px): 2 × 2 card grid (4 cards, equal heights)
 *   Mobile   (<768px): single column stack
 *
 * Design: spacious, elegant, trust-first.
 * Cards are larger/more padded than feature cards — this is a value
 * proposition, not a feature list.
 *
 * Animations (viewport-triggered, once:true, prefers-reduced-motion safe):
 *   — Badge + heading: fadeUp
 *   — Cards: stagger fadeUp, 110ms apart
 *   — Icons: scaleIn, 55ms behind card
 *   — Hover: y:-4 + glow + border brighten + icon scale
 *
 * Performance: opacity + transform only (GPU composited).
 */

import { motion, useReducedMotion } from 'framer-motion'
import { MdPeople } from 'react-icons/md'
import { PiShootingStarFill } from 'react-icons/pi'
import { FaGraduationCap } from 'react-icons/fa'
import type { ComponentType, SVGProps } from 'react'

type IconSvgProps = SVGProps<SVGSVGElement> & { size?: string | number }

function ShieldCheckmarkIcon({ size = 24, ...rest }: IconSvgProps) {
  const passedStyle = (rest as any).style || {}
  const mergedStyle = { display: 'block', margin: 'auto', ...passedStyle }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      {...rest}
      style={mergedStyle}
    >
      <g transform="translate(256 256) scale(1.0925) translate(-256 -256)">
        <path
          d="M256 20 L460 140 V260 C460 380 360 470 256 500 C152 470 52 380 52 260 V140 Z"
          fill="currentColor"
        />
        <path
          d="M256 60 L420 150 V260 C420 360 340 430 256 460 C172 430 92 360 92 260 V150 Z"
          fill="rgba(255,255,255,0.65)"
        />
        <path
          d="M256 90 L390 170 V260 C390 340 320 400 256 430 C192 400 122 340 122 260 V170 Z"
          fill="currentColor"
        />
        <path
          d="M180 260 L240 320 L360 200"
          fill="none"
          stroke="#ffffff"
          strokeWidth="40"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

// ─── Content ───────────────────────────────────────────────────────────────────

interface ValueCard {
  icon:  ComponentType<IconSvgProps>
  title: string
  body:  string
}

function GraduationCapIcon({ size = 24, style, ...rest }: IconSvgProps) {
  const { strokeWidth, ...safeProps } = rest as any
  return <FaGraduationCap size={size} style={style} {...safeProps} />
}

const VALUE_CARDS: ValueCard[] = [
  {
    icon:  ShieldCheckmarkIcon,
    title: 'Privacy Without Compromise',
    body:  'Protect student privacy without sacrificing academic integrity. HumanFirst proves you never have to choose.',
  },
  {
    icon:  GraduationCapIcon,
    title: 'Institution First',
    body:  'Universities define the rules and remain in control of every assessment. No automated decisions. No black boxes.',
  },
  {
    icon:  PiShootingStarFill,
    title: 'Future Ready',
    body:  'Built for an education system where AI is permanent — not a problem to be solved once and forgotten.',
  },
  {
    icon:  MdPeople,
    title: 'Trust by Design',
    body:  'Reduce friction between students and educators through transparent assessment practices that everyone can understand.',
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
      duration: 0.42,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }
}

// ─── Value card ────────────────────────────────────────────────────────────────

interface ValueCardProps {
  card:         ValueCard
  index:        number
  shouldReduce: boolean | null
}

function ValueCardItem({ card, index, shouldReduce }: ValueCardProps) {
  const Icon      = card.icon
  const cardDelay = 0.08 + index * 0.11

  return (
    <motion.article
      {...fadeUp(shouldReduce, cardDelay)}
      style={{
        position:        'relative',
        display:         'flex',
        flexDirection:   'column',
        /* No fixed height — grid stretch gives equal heights automatically */
        background:      'var(--color-bg-elevated)',
        border:          '1px solid rgba(34, 197, 94, 0.12)',
        borderRadius:    'var(--radius-2xl)',
        /* Asymmetric padding: extra top/bottom breathing room */
        paddingTop:      'var(--space-10)',
        paddingBottom:   'var(--space-10)',
        paddingLeft:     'var(--space-8)',
        paddingRight:    'var(--space-8)',
        boxShadow:       'var(--shadow-lg), 0 0 32px 0 rgba(202, 255, 112, 0.10)',
        overflow:        'visible',
        willChange:      'transform',
        cursor:          'default',
      }}
      whileHover={shouldReduce ? {} : {
        y:         -4,
        boxShadow: [
          'var(--shadow-xl)',
          '0 0 64px 0 rgba(202, 255, 112, 0.16)',
          '0 0 0 1px rgba(8, 47, 37, 0.12)',
        ].join(', '),
      }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      {/* Top edge glow */}
      <span
        aria-hidden="true"
        style={{
          position:   'absolute',
          top:        0,
          left:       '10%',
          right:      '10%',
          height:     1,
          background: 'linear-gradient(to right, transparent, rgba(202,255,112,0.24), transparent)',
        }}
      />

      {/* Icon badge — larger for spacious cards */}
      <motion.div
        {...scaleIn(shouldReduce, cardDelay + 0.055)}
        style={{
          display:        'inline-flex',
          alignItems:     'center',
          justifyContent: 'center',
          width:          54,
          height:         54,
          borderRadius:   'var(--radius-xl)',
          background:     'transparent',
          border:         '1px solid #32CD32',
          marginBottom:   'var(--space-8)',
          flexShrink:     0,
        }}
        whileHover={shouldReduce ? {} : { scale: 1.10 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        <Icon
          size={27.6}
          strokeWidth={1.6}
          style={{ color: 'var(--color-brand-green)' }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Title */}
      <h3
        style={{
          fontSize:      'var(--text-xl)',
          fontWeight:    'var(--font-bold)',
          color:         'var(--color-text-primary)',
          lineHeight:    'var(--leading-snug)',
          letterSpacing: 'var(--tracking-snug)',
          marginBottom:  'var(--space-5)',
        }}
      >
        {card.title}
      </h3>

      {/* Body */}
      <p
        style={{
          fontSize:   'var(--text-base)',
          color:      '#5F6D65',
          lineHeight: 1.85,
          /* No flexGrow — card grows with content when height is unconstrained */
        }}
      >
        {card.body}
      </p>
    </motion.article>
  )
}

// ─── Main section ──────────────────────────────────────────────────────────────

function WhyHumanFirst() {
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="about"
      aria-labelledby="why-heading"
      style={{
        position:        'relative',
        backgroundColor: 'var(--color-bg-base)',
        paddingTop:      'var(--space-20)',
        paddingBottom:   'var(--space-20)',
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
            width:      '60%',
            height:     300,
            background: 'radial-gradient(ellipse, rgba(202,255,112,0.20) 0%, transparent 70%)',
            filter:     'blur(50px)',
          }}
        />
      </div>

      <div className="container-v2">

        {/* ── Badge ─────────────────────────────────────────────────────────── */}
        <motion.div {...fadeUp(shouldReduce, 0)} style={{ marginBottom: 'var(--space-8)' }}>
          <div
            style={{
              display:      'inline-flex',
              alignItems:   'center',
              gap:          7,
              padding:      '5px 14px',
              borderRadius: 'var(--radius-full)',
              border:       '1px solid rgba(8,47,37,0.10)',
              background:   'var(--color-accent)',
            }}
          >
            <span
              className="animate-pulse"
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
                color:         'var(--color-brand-green)',
              }}
            >
              Why HumanFirst
            </span>
          </div>
        </motion.div>

        {/* ── Heading ───────────────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(shouldReduce, 0.06)}
          style={{ maxWidth: 640, marginBottom: 'var(--space-4)' }}
        >
          <h2 id="why-heading" style={{ margin: 0 }}>
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
              Built for trust.
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
              Designed for the future of education.
            </span>
          </h2>
        </motion.div>

        {/* ── Supporting paragraph ───────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(shouldReduce, 0.12)}
          style={{ maxWidth: 560, marginBottom: 'var(--space-12)' }}
        >
          <p
            style={{
              fontSize:   'var(--text-lg)',
              color:      '#5F6D65',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            HumanFirst helps institutions preserve academic integrity while
            respecting student privacy. Every decision in the platform is guided
            by transparency, ethical design, and long-term trust.
          </p>
        </motion.div>

        {/* ── Value cards 2×2 ──────────────────────────────────────────────────
            .why-grid: 1-col mobile → 2-col tablet and desktop (no 3-col shift)
        ─────────────────────────────────────────────────────────────────────── */}
        <div
          className="why-grid"
          style={{ display: 'grid', gap: 'var(--space-5)' }}
        >
          {VALUE_CARDS.map((card, i) => (
            <ValueCardItem
              key={card.title}
              card={card}
              index={i}
              shouldReduce={shouldReduce}
            />
          ))}
        </div>

        {/* ── Bottom trust statement ─────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(shouldReduce, 0.52)}
          style={{
            marginTop:   'var(--space-14)',
            paddingTop:  'var(--space-10)',
            borderTop:   '1px solid rgba(8,47,37,0.08)',
            textAlign:   'center',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              width:        40,
              height:       2,
              borderRadius: 1,
              background:   'var(--color-accent)',
              margin:       '0 auto var(--space-8)',
              opacity:      0.7,
            }}
          />
          <p
            style={{
              fontSize:      'clamp(1.1rem, 2.2vw, 1.65rem)',
              fontWeight:    'var(--font-semibold)',
              color:         'var(--color-text-primary)',
              lineHeight:    'var(--leading-relaxed)',
              letterSpacing: 'var(--tracking-snug)',
              maxWidth:      680,
              margin:        '0 auto',
            }}
          >
            Technology should strengthen trust between students and institutions
            {' '}
            <span className="text-gradient-accent">
              — not replace it.
            </span>
          </p>
        </motion.div>

      </div>
    </section>
  )
}

export default WhyHumanFirst
