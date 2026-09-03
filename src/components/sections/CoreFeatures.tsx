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
import { FaGraduationCap } from 'react-icons/fa'
import type { ComponentType, SVGProps } from 'react'

type FeatureIcon = ComponentType<SVGProps<SVGSVGElement> & {
  size?: number
  strokeWidth?: number
}>

function LockAccessScan({ size = 24, strokeWidth = 1.6, ...props }: SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 8.5V5H8.5" />
      <path d="M15.5 5H19V8.5" />
      <path d="M5 15.5V19H8.5" />
      <path d="M15.5 19H19V15.5" />
      <rect x="8" y="11" width="8" height="6.5" rx="2" />
      <path d="M10 11V8.5a2 2 0 0 1 4 0V11" />
    </svg>
  )
}

function UserProtectionShieldIcon({ size = 22, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  const passedStyle = (rest as any).style || {}
  const mergedStyle = { display: 'block', margin: 'auto', ...passedStyle }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      {...rest}
      style={mergedStyle}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 .499939c-.82843 0-1.5.671571-1.5 1.500001v2.67544c0 2.39651.92056 4.6316 2.47575 6.30852 1.0355 1.1166 2.35234 1.9858 3.86614 2.4904.10263.0342.21359.0342.31622 0 1.5138-.5046 2.83065-1.3738 3.86619-2.4903C12.5794 9.30698 13.5 7.07188 13.5 4.67538V1.99994c0-.82843-.6716-1.500001-1.5-1.500001H2ZM3.88577 9.75161C4.69421 8.97635 5.79147 8.49994 7 8.49994c1.20854 0 2.3058.47641 3.1142 1.25167C9.2897 10.7085 8.22872 11.4692 7 11.9383c-1.22872-.4691-2.28971-1.2298-3.11423-2.18669ZM7 6.99994c1.10457 0 2-.89543 2-2s-.89543-2-2-2-2 .89543-2 2 .89543 2 2 2Z"
      />
    </svg>
  )
}

function VerifiableBadgeIcon({ size = 24, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
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
      <g transform="translate(256 256) scale(1.12) translate(-256 -256)">
        <path
          d="M256 60 C290 60, 300 90, 330 95 C360 100, 390 80, 410 110 C430 140, 410 170, 420 200 C430 230, 470 250, 470 256 C470 262, 430 282, 420 312 C410 342, 430 372, 410 402 C390 432, 360 412, 330 417 C300 422, 290 452, 256 452 C222 452, 212 422, 182 417 C152 412, 122 432, 102 402 C82 372, 102 342, 92 312 C82 282, 42 262, 42 256 C42 250, 82 230, 92 200 C102 170, 82 140, 102 110 C122 80, 152 100, 182 95 C212 90, 222 60, 256 60 Z"
          fill="currentColor"
        />
        <path
          d="M180 260 L230 310 L340 200"
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

function ChecklistDocumentIcon({ size = 24, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  const passedStyle = (rest as any).style || {}
  const mergedStyle = { display: 'block', margin: 'auto', ...passedStyle }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      {...rest}
      style={mergedStyle}
    >
      <rect x="10" y="6" width="44" height="52" rx="6" fill="currentColor" />
      <rect x="20" y="12" width="24" height="6" rx="3" fill="white" />
      <rect x="14" y="24" width="6" height="6" rx="2" fill="white" />
      <polyline
        points="15.5,27 17,28.5 19,25.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="24"
        y1="27"
        x2="46"
        y2="27"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="14" y="34" width="6" height="6" rx="2" fill="white" />
      <polyline
        points="15.5,37 17,38.5 19,35.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="24"
        y1="37"
        x2="40"
        y2="37"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="14" y="44" width="6" height="6" rx="2" fill="white" />
      <polyline
        points="15.5,47 17,48.5 19,45.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="24"
        y1="47"
        x2="46"
        y2="47"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function SpeedLinesLightning({ size = 24, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      viewBox="0 0 256 256"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <rect x="50" y="70" width="60" height="10" rx="5" fill="#ffffff" />
      <rect x="45" y="95" width="40" height="10" rx="5" fill="#ffffff" />
      <rect x="55" y="120" width="45" height="10" rx="5" fill="#ffffff" />
      <rect x="45" y="145" width="50" height="10" rx="5" fill="#ffffff" />
      <path
        d="M150 40 L105 110 L150 110 L120 200 L200 110 L155 110 Z"
        fill="#ffffff"
      />
    </svg>
  )
}


// ─── Content ───────────────────────────────────────────────────────────────────

interface Feature {
  icon:  FeatureIcon
  title: string
  body:  string
}

const FEATURES: Feature[] = [
  {
    icon:  LockAccessScan,
    title: 'Controlled AI Access',
    body:  'Institution-defined policies restrict selected AI tools while keeping approved learning resources available.',
  },
  {
    icon:  UserProtectionShieldIcon,
    title: 'Privacy by Design',
    body:  'No webcam recording. No keystroke logging. No screen surveillance. Students are never treated as suspects.',
  },
  {
    icon:  ChecklistDocumentIcon,
    title: 'Institution Control',
    body:  'Educators define assessment rules and retain complete control over every session — without IT complexity.',
  },
  {
    icon:  VerifiableBadgeIcon,
    title: 'Verifiable Integrity',
    body:  'Assignments are completed inside a trusted assessment environment, giving submissions you can stand behind.',
  },
  {
    icon:  SpeedLinesLightning,
    title: 'Fast Deployment',
    body:  'Simple setup with minimal disruption to existing institutional workflows. Up and running when you need it.',
  },
  {
    icon:  FaGraduationCap,
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
        border:        '1px solid rgba(202, 255, 112, 0.30)',
        borderRadius:  'var(--radius-2xl)',
        padding:       'var(--space-8)',
        boxShadow:     'var(--shadow-lg), 0 0 36px 0 rgba(202, 255, 112, 0.10)',
        overflow:      'visible',
        willChange:    'transform',
        cursor:        'default',
      }}
      whileHover={shouldReduce ? {} : {
        y:         -4,
        boxShadow: [
          'var(--shadow-xl)',
          '0 0 64px 0 rgba(202, 255, 112, 0.24)',
          '0 0 0 1px rgba(202, 255, 112, 0.40)',
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
          background: 'linear-gradient(to right, transparent, rgba(202,255,112,0.24), transparent)',
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
          background:     'white',
          border:         '1px solid #32CD32',
          marginBottom:   'var(--space-6)',
          flexShrink:     0,
        }}
        whileHover={shouldReduce ? {} : { scale: 1.10 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        {index === 4 ? (
          <div
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              justifyContent: 'center',
              width:          26,
              height:         26,
              borderRadius:   10,
              background:     'var(--color-brand-green)',
            }}
          >
            <svg
              viewBox="0 0 256 256"
              width={26.1855}
              height={26.1855}
              aria-hidden="true"
            >
              <rect x="50" y="70" width="60" height="10" rx="5" fill="#ffffff" />
              <rect x="45" y="95" width="40" height="10" rx="5" fill="#ffffff" />
              <rect x="55" y="120" width="45" height="10" rx="5" fill="#ffffff" />
              <rect x="45" y="145" width="50" height="10" rx="5" fill="#ffffff" />
              <path
                d="M150 40 L105 110 L150 110 L120 200 L200 110 L155 110 Z"
                fill="#ffffff"
              />
            </svg>
          </div>
        ) : (
          <Icon
            size={index === 0 ? 38.021346 : index === 5 ? 30.36 : 27.6}
            strokeWidth={1.6}
            style={{ color: 'var(--color-brand-green)' }}
            aria-hidden="true"
          />
        )}
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
          color:      '#5F6D65',
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
            width:      '65%',
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
              border:       '1px solid rgba(202, 255, 112, 0.30)',
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
                color:         'var(--color-text-primary)',
              }}
            >
              Core Features
            </span>
          </div>
        </motion.div>

        {/* ── Heading ───────────────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(shouldReduce, 0.06)}
          style={{ maxWidth: 600, marginBottom: 'var(--space-4)' }}
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
              color:      '#5F6D65',
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
