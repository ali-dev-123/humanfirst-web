/**
 * Solution.tsx — HumanF1RST v2
 *
 * "The Solution" section. Narrative pivot from Problem → optimism.
 *
 * Layout:
 *   — Green badge: "The Solution"
 *   — H2: "A third path." + subline
 *   — Supporting paragraph
 *   — 3 solution cards (Privacy First · Controlled AI Access · Verifiable Human Work)
 *   — Bottom trust statement (centered display text)
 *
 * Design: Identical token system as Hero and Problem.
 * Cards lean green/teal (optimistic) vs Problem's red/amber (warning).
 *
 * Animations: Same fadeUp/scaleIn/whileInView system, same timing/easing.
 */

import { motion, useReducedMotion } from 'framer-motion'
import { Shield, Lock, BadgeCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// ─── Content ───────────────────────────────────────────────────────────────────

type CardContent =
  | { type: 'list';      items: string[] }
  | { type: 'paragraph'; text:  string   }

interface SolutionCardData {
  icon:      LucideIcon
  eyebrow:   string
  title:     string
  content:   CardContent
  accentHue: 'green' | 'teal'
}

const SOLUTION_CARDS: SolutionCardData[] = [
  {
    icon:      Shield,
    eyebrow:   'Card 01',
    title:     'Privacy First',
    content: {
      type:  'list',
      items: [
        'No webcams.',
        'No screen recording.',
        'No keystroke logging.',
        'No personal surveillance.',
      ],
    },
    accentHue: 'green',
  },
  {
    icon:      Lock,
    eyebrow:   'Card 02',
    title:     'Controlled AI Access',
    content: {
      type: 'paragraph',
      text: 'Institution-defined policies block selected AI tools during assessments while allowing approved educational resources.',
    },
    accentHue: 'teal',
  },
  {
    icon:      BadgeCheck,
    eyebrow:   'Card 03',
    title:     'Verifiable Human Work',
    content: {
      type: 'paragraph',
      text: 'Assignments are completed inside a controlled environment, giving educators confidence that submitted work genuinely reflects student ability.',
    },
    accentHue: 'green',
  },
]

// ─── Accent palette ────────────────────────────────────────────────────────────
// Both hues are "positive" — green = core brand, teal = complementary.

const ACCENT: Record<SolutionCardData['accentHue'], {
  icon:       string
  badge:      string
  border:     string
  borderHover:string
  glow:       string
  glowHover:  string
  list:       string     /* bullet and list-item accent color */
}> = {
  green: {
    icon:        'var(--color-brand-green)',
    badge:       'var(--color-accent)',
    border:      'rgba(202, 255, 112, 0.30)',
    borderHover: 'rgba(202, 255, 112, 0.40)',
    glow:        'rgba(202, 255, 112, 0.16)',
    glowHover:   'rgba(202, 255, 112, 0.24)',
    list:        'var(--color-accent)',
  },
  teal: {
    icon:        'var(--color-brand-green)',
    badge:       'var(--color-accent)',
    border:      'rgba(202, 255, 112, 0.30)',
    borderHover: 'rgba(202, 255, 112, 0.40)',
    glow:        'rgba(202, 255, 112, 0.16)',
    glowHover:   'rgba(202, 255, 112, 0.24)',
    list:        'var(--color-accent)',
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
    initial:     { opacity: 0, scale: shouldReduce ? 1 : 0.80 },
    whileInView: { opacity: 1, scale: 1 },
    viewport:    { once: true, margin: '-80px 0px' },
    transition: {
      duration: 0.42,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }
}

// ─── Solution card ─────────────────────────────────────────────────────────────

interface SolutionCardProps {
  card:         SolutionCardData
  index:        number
  shouldReduce: boolean | null
}

function SolutionCard({ card, index, shouldReduce }: SolutionCardProps) {
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
          `0 0 44px 0 ${colors.glow}`,
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
          `0 0 64px 0 ${colors.glowHover}`,
          `0 0 0 1px ${colors.borderHover}`,
        ].join(', '),
      }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      {/* Top edge glow line — green/teal */}
      <span
        aria-hidden="true"
        style={{
          position:   'absolute',
          top:        0,
          left:       '10%',
          right:      '10%',
          height:     1,
          background: `linear-gradient(to right, transparent, ${colors.border}, transparent)`,
        }}
      />

      {/* Icon badge */}
      <motion.div
        {...scaleIn(shouldReduce, cardDelay + 0.05)}
        style={{
          display:        'inline-flex',
          alignItems:     'center',
          justifyContent: 'center',
          width:          46,
          height:         46,
          borderRadius:   'var(--radius-xl)',
          background:     colors.badge,
          border:         `1px solid ${colors.border}`,
          marginBottom:   'var(--space-6)',
          flexShrink:     0,
        }}
      >
        <Icon
          size={22}
          strokeWidth={1.75}
          style={{ color: colors.icon }}
          aria-hidden="true"
        />
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
          marginBottom:  'var(--space-5)',
        }}
      >
        {card.title}
      </h3>

      {/* Content — list OR paragraph */}
      {card.content.type === 'list' ? (
        <ul
          style={{
            listStyle: 'none',
            margin:    0,
            padding:   0,
            display:   'flex',
            flexDirection: 'column',
            gap:       'var(--space-3)',
            flexGrow:  1,
          }}
          aria-label={`${card.title} guarantees`}
        >
          {card.content.items.map((item) => (
            <li
              key={item}
              style={{
                display:    'flex',
                alignItems: 'center',
                gap:        'var(--space-3)',
              }}
            >
              {/* Green filled dot as list marker */}
              <span
                aria-hidden="true"
                style={{
                  width:        6,
                  height:       6,
                  borderRadius: '50%',
                  background:   colors.list,
                  flexShrink:   0,
                  opacity:      0.9,
                }}
              />
              <span
                style={{
                  fontSize:   'var(--text-sm)',
                  color:      '#5F6D65',
                  lineHeight: 'var(--leading-snug)',
                  fontWeight: 'var(--font-medium)',
                }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p
          style={{
            fontSize:   'var(--text-sm)',
            color:      '#5F6D65',
            lineHeight: 'var(--leading-relaxed)',
            flexGrow:   1,
          }}
        >
          {card.content.text}
        </p>
      )}
    </motion.article>
  )
}

// ─── Main section ──────────────────────────────────────────────────────────────

function Solution() {
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="solution"
      aria-labelledby="solution-heading"
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

        {/* Gentle green glow — brighter than Problem to signal the pivot to optimism */}
        <div
          style={{
            position:   'absolute',
            top:        '-5%',
            left:       '50%',
            transform:  'translateX(-50%)',
            width:      '65%',
            height:     320,
            background: 'radial-gradient(ellipse, rgba(202,255,112,0.20) 0%, transparent 70%)',
            filter:     'blur(50px)',
          }}
        />
        {/* Secondary teal glow (right side, Card 02 accent) */}
        <div
          style={{
            position:   'absolute',
            top:        '20%',
            right:      '0',
            width:      '35%',
            height:     '60%',
            background: 'radial-gradient(ellipse, rgba(8,47,37,0.06) 0%, transparent 70%)',
            filter:     'blur(60px)',
          }}
        />
      </div>

      <div className="container-v2">

        {/* ── Eyebrow badge ─────────────────────────────────────────────────── */}
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
              The Solution
            </span>
          </div>
        </motion.div>

        {/* ── Section heading ────────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(shouldReduce, 0.06)}
          style={{ maxWidth: 700, marginBottom: 'var(--space-6)' }}
        >
          <h2
            id="solution-heading"
            style={{ margin: 0 }}
          >
            {/* First line — large, high-impact */}
            <span
              className="text-gradient-accent"
              style={{
                display:       'block',
                fontSize:      'clamp(2.6rem, 5.5vw, 4.5rem)',
                fontWeight:    'var(--font-extrabold)',
                lineHeight:    1,
                letterSpacing: 'var(--tracking-tight)',
                marginBottom:  '0.3em',
              }}
            >
              A third path.
            </span>

            {/* Second line — confident, white */}
            <span
              style={{
                display:       'block',
                fontSize:      'clamp(1.5rem, 3vw, 2.4rem)',
                fontWeight:    'var(--font-bold)',
                lineHeight:    'var(--leading-tight)',
                letterSpacing: 'var(--tracking-snug)',
                color:         'var(--color-text-primary)',
              }}
            >
              Protect academic integrity
              <br />
              <span style={{ color: '#5F6D65', fontWeight: 'var(--font-semibold)' }}>
                without violating privacy.
              </span>
            </span>
          </h2>
        </motion.div>

        {/* ── Supporting paragraph ───────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(shouldReduce, 0.12)}
          style={{ maxWidth: 560, marginBottom: 'var(--space-16)' }}
        >
          <p
            style={{
              fontSize:   'var(--text-lg)',
              color:      '#5F6D65',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            HumanFirst prevents AI-assisted work during assessments instead of
            trying to detect it afterward. Institutions preserve academic integrity
            while students keep their privacy.
          </p>
        </motion.div>

        {/* ── Solution cards ─────────────────────────────────────────────────── */}
        <div
          className="problem-grid"
          style={{ display: 'grid', gap: 'var(--space-5)' }}
        >
          {SOLUTION_CARDS.map((card, i) => (
            <SolutionCard
              key={card.eyebrow}
              card={card}
              index={i}
              shouldReduce={shouldReduce}
            />
          ))}
        </div>

        {/* ── Bottom trust statement ─────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(shouldReduce, 0.50)}
          style={{
            marginTop:      'var(--space-20)',
            textAlign:      'center',
            paddingTop:     'var(--space-16)',
            borderTop:      '1px solid rgba(8,47,37,0.08)',
          }}
        >
          {/* Decorative separator accent */}
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
              fontSize:      'clamp(1.25rem, 2.8vw, 2rem)',
              fontWeight:    'var(--font-semibold)',
              color:         'var(--color-text-primary)',
              lineHeight:    'var(--leading-snug)',
              letterSpacing: 'var(--tracking-snug)',
              marginBottom:  'var(--space-3)',
            }}
          >
            Academic integrity shouldn't require surveillance.
          </p>

          <p
            style={{
              fontSize:      'clamp(1.25rem, 2.8vw, 2rem)',
              fontWeight:    'var(--font-semibold)',
              lineHeight:    'var(--leading-snug)',
              letterSpacing: 'var(--tracking-snug)',
            }}
          >
            <span className="text-gradient-accent">
              HumanFirst proves both can exist together.
            </span>
          </p>
        </motion.div>

      </div>
    </section>
  )
}

export default Solution
