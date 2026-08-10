/**
 * PrivacySecurity.tsx — HumanF1RST v2
 *
 * "Privacy & Security" section.
 * Most trust-critical section on the page.
 *
 * Layout:
 *   Desktop  (≥1024px): 2-column split — left visual / right cards
 *   Tablet   (768–1023): visual above, cards below (single column)
 *   Mobile   (<768px):   single column stack
 *
 * Left column — PrivacyVisual:
 *   Premium glassmorphic trust panel. No cartoons. Built from UI elements:
 *   concentric rings, large Shield icon, 4 floating guarantee badges.
 *   Subtle idle float animations (≤5px, 7–10s) — prefers-reduced-motion safe.
 *
 * Right column — 4 TrustCard items stacked vertically:
 *   Each card: icon badge + title + description + left accent line.
 *
 * Bottom — centered trust statement (same pattern as Solution / HowItWorks CTA).
 *
 * Animations (all whileInView, once:true):
 *   — Heading: fadeUp 0ms
 *   — Visual:  scaleIn 60ms
 *   — Cards:   stagger fadeUp 100ms apart
 *   — Hover:   y:-3 + glow + border brighten
 */

import { motion, useReducedMotion } from 'framer-motion'
import { Shield, CheckCircle2 } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { IoEyeOffSharp } from 'react-icons/io5'

type PrivacySecurityIconSvgProps = SVGProps<SVGSVGElement> & { size?: string | number }

function CameraOffIcon({ size = 24, ...rest }: PrivacySecurityIconSvgProps) {
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
      <rect x="60" y="150" width="300" height="220" rx="50" ry="50" fill="currentColor" />
      <polygon points="360,200 470,150 470,360 360,310" fill="currentColor" />
      <line
        x1="60"
        y1="460"
        x2="460"
        y2="60"
        stroke="currentColor"
        strokeWidth="40"
        strokeLinecap="round"
      />
    </svg>
  )
}

function KeystrokeLoggingIcon({ size = 24, ...rest }: PrivacySecurityIconSvgProps) {
  const passedStyle = (rest as any).style || {}
  const mergedStyle = { display: 'block', margin: 'auto', ...passedStyle }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      style={mergedStyle}
    >
      <image
        href="/keystroke-logging.png"
        x="0"
        y="0"
        width="24"
        height="24"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  )
}

function ChecklistDocumentIcon({ size = 24, ...rest }: PrivacySecurityIconSvgProps) {
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

// ─── Content ───────────────────────────────────────────────────────────────────

interface TrustCard {
  icon:  ComponentType<PrivacySecurityIconSvgProps>
  title: string
  body:  string
}

const TRUST_CARDS: TrustCard[] = [
  {
    icon:  CameraOffIcon,
    title: 'No Webcam Recording',
    body:  'HumanFirst never records students through webcams. The camera is never accessed.',
  },
  {
    icon:  IoEyeOffSharp,
    title: 'No Screen Monitoring',
    body:  'No continuous screen recording or surveillance — ever. What students see stays private.',
  },
  {
    icon:  KeystrokeLoggingIcon,
    title: 'No Keystroke Logging',
    body:  'Typing behaviour is never collected or analysed. Writing remains the student\'s own.',
  },
  {
    icon:  ChecklistDocumentIcon,
    title: 'Institution Controlled',
    body:  'Assessment policies remain under institutional control, not automated surveillance systems.',
  },
]

// Floating badges shown inside the left visual
interface FloatingBadge {
  label:  string
  top?:   string
  bottom?:string
  left?:  string
  right?: string
  delay:  number
}

const FLOATING_BADGES: FloatingBadge[] = [
  { label: 'Privacy Active',    top: '6%',  left: '50%',  delay: 0    },
  { label: 'No Recording',      top: '34%', left: '2%',   delay: 0.8  },
  { label: 'No Tracking',       top: '34%', right: '2%',  delay: 1.6  },
  { label: 'Encrypted',         bottom: '8%', left: '50%', delay: 2.4 },
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
    initial:     { opacity: 0, scale: shouldReduce ? 1 : 0.88 },
    whileInView: { opacity: 1, scale: 1 },
    viewport:    { once: true, margin: '-80px 0px' },
    transition: {
      duration: 0.55,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }
}

// ─── Privacy Visual (left column) ─────────────────────────────────────────────

function PrivacyVisual({ shouldReduce }: { shouldReduce: boolean | null }) {
  return (
    <motion.div
      {...scaleIn(shouldReduce, 0.06)}
      style={{
        position:       'relative',
        width:          '100%',
        maxWidth:        420,
        margin:         '0 auto',
        minHeight:       420,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Background radial glow ── */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          background: 'radial-gradient(ellipse at center, rgba(202,255,112,0.28) 0%, transparent 68%)',
          filter:     'blur(12px)',
          borderRadius:'50%',
        }}
      />

      {/* ── Outer decorative ring ── */}
      <div
        aria-hidden="true"
        style={{
          position:    'absolute',
          inset:       '6%',
          border:      '1px solid rgba(34, 197, 94, 0.08)',
          borderRadius:'50%',
        }}
      />

      {/* ── Inner decorative ring ── */}
      <div
        aria-hidden="true"
        style={{
          position:    'absolute',
          inset:       '22%',
          border:      '1px solid rgba(34, 197, 94, 0.12)',
          borderRadius:'50%',
        }}
      />

      {/* ── Central shield panel ── */}
      <motion.div
        animate={shouldReduce ? {} : { scale: [1, 1.025, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position:       'relative',
          width:          124,
          height:         124,
          borderRadius:   'var(--radius-2xl)',
          background:     'var(--color-bg-elevated)',
          border:         '1px solid rgba(34, 197, 94, 0.28)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          boxShadow: [
            '0 0 0 12px rgba(202,255,112,0.04)',
            '0 0 60px 0 rgba(202,255,112,0.18)',
            'var(--shadow-xl)',
          ].join(', '),
          zIndex: 2,
        }}
      >
        {/* Inner glow ring */}
        <div
          aria-hidden="true"
          style={{
            position:    'absolute',
            inset:       -8,
            border:      '1px solid rgba(8,47,37,0.10)',
            borderRadius:'var(--radius-2xl)',
          }}
        />
        <Shield
          size={52}
          strokeWidth={1.5}
          style={{ color: 'var(--color-brand-green)' }}
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Floating guarantee badges ── */}
      {FLOATING_BADGES.map((badge) => (
        <motion.div
          key={badge.label}
          {...scaleIn(shouldReduce, 0.2 + badge.delay * 0.15)}
          animate={shouldReduce ? {} : {
            y: [0, -4, 0],
          }}
          transition={shouldReduce ? undefined : {
            duration: 8 + badge.delay,
            repeat:   Infinity,
            ease:     'easeInOut',
            delay:    badge.delay * 0.5,
          }}
          style={{
            position:   'absolute',
            top:        badge.top,
            bottom:     badge.bottom,
            left:       badge.left,
            right:      badge.right,
            transform:  (badge.left === '50%' || badge.right === '50%')
              ? 'translateX(-50%)'
              : undefined,
            display:    'inline-flex',
            alignItems: 'center',
            gap:        6,
            padding:    '6px 12px',
            borderRadius:'var(--radius-full)',
            background: 'var(--color-bg-elevated)',
            border:     '1px solid rgba(34, 197, 94, 0.22)',
            boxShadow:  '0 4px 16px rgba(0,0,0,0.25)',
            whiteSpace: 'nowrap',
            zIndex:     3,
          }}
          aria-hidden="true"
        >
          <CheckCircle2
            size={12}
            strokeWidth={2.5}
            style={{ color: 'var(--color-brand-green)', flexShrink: 0 }}
          />
          <span
            style={{
              fontSize:   'var(--text-xs)',
              fontWeight: 'var(--font-semibold)',
              color:      '#5F6D65',
            }}
          >
            {badge.label}
          </span>
        </motion.div>
      ))}

    </motion.div>
  )
}

// ─── Trust card (right column) ─────────────────────────────────────────────────

interface TrustCardProps {
  card:         TrustCard
  index:        number
  shouldReduce: boolean | null
}

function TrustCardItem({ card, index, shouldReduce }: TrustCardProps) {
  const Icon = card.icon

  return (
    <motion.article
      {...fadeUp(shouldReduce, 0.10 + index * 0.10)}
      style={{
        position:   'relative',
        display:    'flex',
        alignItems: 'flex-start',
        gap:        'var(--space-4)',
        background: 'var(--color-bg-elevated)',
        border:     '1px solid rgba(34, 197, 94, 0.14)',
        borderLeft: '3px solid rgba(34, 197, 94, 0.50)',
        borderRadius:'var(--radius-xl)',
        padding:    'var(--space-5) var(--space-6)',
        boxShadow:  'var(--shadow-lg), 0 0 28px 0 rgba(202,255,112,0.10)',
        overflow:   'hidden',
        willChange: 'transform',
        cursor:     'default',
      }}
      whileHover={shouldReduce ? {} : {
        y:         -3,
        boxShadow: [
          'var(--shadow-xl)',
          '0 0 48px 0 rgba(202,255,112,0.14)',
          '0 0 0 1px rgba(8,47,37,0.12)',
        ].join(', '),
      }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      {/* Icon badge */}
      <motion.div
        {...scaleIn(shouldReduce, 0.06)}
        style={{
          display:        'inline-flex',
          alignItems:     'center',
          justifyContent: 'center',
          width:          40,
          height:         40,
          borderRadius:   'var(--radius-lg)',
          background:     'transparent',
          border:         '1px solid #32CD32',
          flexShrink:     0,
          marginTop:      2,
        }}
        whileHover={shouldReduce ? {} : { scale: 1.10 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        <Icon
          size={24.84}
          strokeWidth={1.7}
          style={{ color: 'var(--color-brand-green)' }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Text */}
      <div style={{ minWidth: 0 }}>
        <h3
          style={{
            fontSize:      'var(--text-base)',
            fontWeight:    'var(--font-semibold)',
            color:         'var(--color-text-primary)',
            lineHeight:    'var(--leading-snug)',
            letterSpacing: 'var(--tracking-snug)',
            marginBottom:  'var(--space-1)',
          }}
        >
          {card.title}
        </h3>
        <p
          style={{
            fontSize:   'var(--text-sm)',
            color:      '#5F6D65',
            lineHeight: 'var(--leading-relaxed)',
            margin:     0,
          }}
        >
          {card.body}
        </p>
      </div>
    </motion.article>
  )
}

// ─── Main section ──────────────────────────────────────────────────────────────

function PrivacySecurity() {
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="privacy"
      aria-labelledby="privacy-heading"
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

        {/* Left-side glow — matches the visual panel */}
        <div
          style={{
            position:   'absolute',
            top:        '10%',
            left:       '-5%',
            width:      '50%',
            height:     '70%',
            background: 'radial-gradient(ellipse, rgba(202,255,112,0.18) 0%, transparent 65%)',
            filter:     'blur(60px)',
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
              Privacy &amp; Security
            </span>
          </div>
        </motion.div>

        {/* ── Heading ───────────────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(shouldReduce, 0.06)}
          style={{ maxWidth: 600, marginBottom: 'var(--space-5)' }}
        >
          <h2 id="privacy-heading" style={{ margin: 0 }}>
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
              Integrity without surveillance.
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
              Privacy by design.
            </span>
          </h2>
        </motion.div>

        {/* ── Supporting paragraph ───────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(shouldReduce, 0.12)}
          style={{ maxWidth: 540, marginBottom: 'var(--space-16)' }}
        >
          <p
            style={{
              fontSize:   'var(--text-lg)',
              color:      '#5F6D65',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            HumanFirst never relies on webcams, screen recording, or keystroke
            logging. Student privacy is protected from the very beginning
            because the platform is designed to prevent misuse — not monitor behaviour.
          </p>
        </motion.div>

        {/* ── Two-column split ─────────────────────────────────────────────────
            Desktop (≥1024px): side-by-side via .privacy-split
            Tablet / Mobile:   stacked — visual above, cards below
        ─────────────────────────────────────────────────────────────────────── */}
        <div className="privacy-split">

          {/* LEFT — Privacy visual */}
          <div
            style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
            }}
          >
            <PrivacyVisual shouldReduce={shouldReduce} />
          </div>

          {/* RIGHT — Trust cards */}
          <div
            style={{
              display:       'flex',
              flexDirection: 'column',
              gap:           'var(--space-4)',
              justifyContent:'center',
            }}
          >
            {TRUST_CARDS.map((card, i) => (
              <TrustCardItem
                key={card.title}
                card={card}
                index={i}
                shouldReduce={shouldReduce}
              />
            ))}
          </div>

        </div>

        {/* ── Bottom trust statement ─────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(shouldReduce, 0.55)}
          style={{
            marginTop:   'var(--space-20)',
            paddingTop:  'var(--space-14)',
            borderTop:   '1px solid rgba(8,47,37,0.08)',
            textAlign:   'center',
          }}
        >
          {/* Green accent rule */}
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
              fontSize:      'clamp(1.15rem, 2.4vw, 1.75rem)',
              fontWeight:    'var(--font-semibold)',
              color:         'var(--color-text-primary)',
              lineHeight:    'var(--leading-snug)',
              letterSpacing: 'var(--tracking-snug)',
              marginBottom:  'var(--space-3)',
            }}
          >
            Privacy should never be the price of academic integrity.
          </p>

          <p
            style={{
              fontSize:      'clamp(1.15rem, 2.4vw, 1.75rem)',
              fontWeight:    'var(--font-semibold)',
              lineHeight:    'var(--leading-snug)',
              letterSpacing: 'var(--tracking-snug)',
            }}
          >
            <span className="text-gradient-accent">
              HumanFirst proves institutions can have both.
            </span>
          </p>
        </motion.div>

      </div>
    </section>
  )
}

export default PrivacySecurity
