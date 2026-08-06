/**
 * HowItWorks.tsx — HumanF1RST v2 (polished)
 *
 * Polish pass addressing:
 *   1. Heading hierarchy — first line dominant gradient, second line white
 *   2. Secondary text +15% brightness (#9CAE9E → #B0C4B2)
 *   3. Visual process flow — Step 01 stronger glow/border as entry point
 *   4. Connector — more visible, gradient, animated flow
 *   5. Icons — 18px → 24px
 *   6. Copy — shorter, stronger, human
 *   7. Card padding increased (space-7 → space-8)
 *   8. Step number dominance reduced to balance with content
 *   9. Section CTA area added (Request a Pilot + secondary)
 *  10. Mobile vertical connector added
 *  11. Badge premium treatment with dot-pulse
 *  12. Consistent premium HumanFirst voice
 */

import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { SlidersHorizontal, ShieldCheck, PenLine, BadgeCheck, ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// ─── Content ───────────────────────────────────────────────────────────────────

interface Step {
  number:  string
  icon:    LucideIcon
  title:   string
  body:    string
  isFirst?: boolean
}

const STEPS: Step[] = [
  {
    number:  '01',
    icon:    SlidersHorizontal,
    title:   'Set the rules.',
    body:    'Institution configures AI access policies before the session begins. One setup. Consistent enforcement across every submission.',
    isFirst: true,
  },
  {
    number: '02',
    icon:   ShieldCheck,
    title:  'Block AI at the source.',
    body:   'Selected AI tools are blocked network-wide. Approved educational resources stay fully accessible. No ambiguity, no gaps.',
  },
  {
    number: '03',
    icon:   PenLine,
    title:  'Work freely.',
    body:   'No webcams. No screen recording. No keystroke logging. Students focus on their work — not on being watched.',
  },
  {
    number: '04',
    icon:   BadgeCheck,
    title:  'Submit with proof.',
    body:   'Work completed inside a verified environment. Educators receive submissions they can trust — without surveillance data.',
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

// ─── Horizontal connector (desktop only) ───────────────────────────────────────
// Visible at ≥1024px via .hiw-connector-wrap class.
// Fill animates scaleX 0→1; arrowhead pulses opacity.

interface ConnectorProps {
  index:        number
  shouldReduce: boolean | null
}

function ConnectorLine({ index, shouldReduce }: ConnectorProps) {
  return (
    <div className="hiw-connector-wrap" aria-hidden="true">
      <div style={{ position: 'relative', width: '100%', height: 2 }}>
        {/* Dim track — always visible */}
        <div
          style={{
            position:     'absolute',
            inset:        0,
            background:   'rgba(34, 197, 94, 0.12)',
            borderRadius: 1,
          }}
        />
        {/* Animated fill — left to right */}
        <motion.div
          style={{
            position:        'absolute',
            top:             0,
            left:            0,
            bottom:          0,
            background:      'linear-gradient(to right, rgba(34,197,94,0.70), rgba(34,197,94,0.30))',
            borderRadius:    1,
            transformOrigin: 'left center',
            scaleX:          0,
          }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-80px 0px' }}
          transition={{
            duration: shouldReduce ? 0 : 0.70,
            delay:    shouldReduce ? 0 : 0.32 + index * 0.22,
            ease:     [0.16, 1, 0.3, 1],
          }}
        />
        {/* Arrow tip — pulses gently after fill completes */}
        <motion.div
          style={{
            position:    'absolute',
            right:       -6,
            top:         '50%',
            transform:   'translateY(-50%)',
            width:       0,
            height:      0,
            borderTop:    '5px solid transparent',
            borderBottom: '5px solid transparent',
            borderLeft:   '7px solid rgba(34, 197, 94, 0.65)',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 1] }}
          viewport={{ once: true, margin: '-80px 0px' }}
          transition={{
            delay:    shouldReduce ? 0 : 0.95 + index * 0.22,
            duration: 0.3,
          }}
        />
      </div>
    </div>
  )
}

// ─── Vertical connector (mobile only) ─────────────────────────────────────────
// Shown between cards at <768px via .hiw-vertical-connector class.
// Simple green line + downward arrowhead.

function VerticalConnector({ shouldReduce }: { shouldReduce: boolean | null }) {
  return (
    <div
      className="hiw-vertical-connector"
      aria-hidden="true"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}
    >
      <motion.div
        style={{
          width:        1.5,
          height:       28,
          background:   'linear-gradient(to bottom, rgba(34,197,94,0.60), rgba(34,197,94,0.20))',
          borderRadius: 1,
          transformOrigin: 'top center',
          scaleY:       0,
        }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: '-40px 0px' }}
        transition={{
          duration: shouldReduce ? 0 : 0.4,
          ease:     [0.16, 1, 0.3, 1],
        }}
      />
      {/* Downward arrowhead */}
      <div
        style={{
          width:       0,
          height:      0,
          borderLeft:  '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop:   '6px solid rgba(34, 197, 94, 0.50)',
        }}
      />
    </div>
  )
}

// ─── Step card ─────────────────────────────────────────────────────────────────

interface StepCardProps {
  step:         Step
  index:        number
  shouldReduce: boolean | null
}

function StepCard({ step, index, shouldReduce }: StepCardProps) {
  const Icon      = step.icon
  const cardDelay = 0.08 + index * 0.13

  /*
   * Step 01 gets slightly stronger border + glow to signal it as the entry point.
   * All other cards use the standard treatment.
   */
  const borderColor    = step.isFirst ? 'rgba(34, 197, 94, 0.32)' : 'rgba(34, 197, 94, 0.14)'
  const glowBase       = step.isFirst
    ? '0 0 56px 0 rgba(34, 197, 94, 0.16)'
    : '0 0 36px 0 rgba(34, 197, 94, 0.06)'
  const glowHover      = step.isFirst
    ? '0 0 72px 0 rgba(34, 197, 94, 0.28)'
    : '0 0 60px 0 rgba(34, 197, 94, 0.16)'
  const borderHover    = step.isFirst ? 'rgba(34, 197, 94, 0.50)' : 'rgba(34, 197, 94, 0.30)'

  return (
    <div className="hiw-step-wrap">
      <motion.article
        {...fadeUp(shouldReduce, cardDelay)}
        style={{
          position:      'relative',
          display:       'flex',
          flexDirection: 'column',
          height:        '100%',
          background:    'var(--color-bg-elevated)',
          border:        `1px solid ${borderColor}`,
          borderRadius:  'var(--radius-2xl)',
          padding:       'var(--space-8)',
          boxShadow:     `var(--shadow-lg), ${glowBase}`,
          overflow:      'hidden',
          willChange:    'transform',
          cursor:        'default',
        }}
        whileHover={shouldReduce ? {} : {
          y:         -4,
          boxShadow: `var(--shadow-xl), ${glowHover}, 0 0 0 1px ${borderHover}`,
        }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        {/* Top edge glow line */}
        <span
          aria-hidden="true"
          style={{
            position:   'absolute',
            top:        0,
            left:       '8%',
            right:      '8%',
            height:     1,
            background: step.isFirst
              ? 'linear-gradient(to right, transparent, rgba(34,197,94,0.40), transparent)'
              : 'linear-gradient(to right, transparent, rgba(34,197,94,0.18), transparent)',
          }}
        />

        {/* Header: step number (left) + icon badge (right) */}
        <div
          style={{
            display:        'flex',
            alignItems:     'flex-start',
            justifyContent: 'space-between',
            marginBottom:   'var(--space-6)',
          }}
        >
          {/* Step number */}
          <span
            className="text-gradient-accent"
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      'clamp(1.6rem, 3vw, 2.25rem)',
              fontWeight:    'var(--font-extrabold)',
              lineHeight:    1,
              letterSpacing: '-0.02em',
              opacity:       step.isFirst ? 1 : 0.80,
            }}
            aria-label={`Step ${step.number}`}
          >
            {step.number}
          </span>

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
              background:     step.isFirst
                ? 'rgba(34, 197, 94, 0.14)'
                : 'rgba(34, 197, 94, 0.09)',
              border:         `1px solid ${borderColor}`,
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
        </div>

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
          {step.title}
        </h3>

        {/* Body — +15% brightness vs Problem/Solution body text */}
        <p
          style={{
            fontSize:   'var(--text-sm)',
            color:      '#B0C4B2',
            lineHeight: 'var(--leading-relaxed)',
            flexGrow:   1,
          }}
        >
          {step.body}
        </p>
      </motion.article>
    </div>
  )
}

// ─── Main section ──────────────────────────────────────────────────────────────

function HowItWorks() {
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="how-it-works"
      aria-labelledby="hiw-heading"
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
        <div
          style={{
            position:   'absolute',
            top:        '-5%',
            left:       '50%',
            transform:  'translateX(-50%)',
            width:      '60%',
            height:     300,
            background: 'radial-gradient(ellipse, rgba(34,197,94,0.07) 0%, transparent 70%)',
            filter:     'blur(50px)',
          }}
        />
      </div>

      <div className="container-v2">

        {/* ── Badge ──────────────────────────────────────────────────────────── */}
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
            {/* Pulsing dot — same premium treatment as Hero badge */}
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
              How It Works
            </span>
          </div>
        </motion.div>

        {/* ── Heading — first line dominant, second line lighter ─────────────── */}
        <motion.div
          {...fadeUp(shouldReduce, 0.06)}
          style={{ maxWidth: 640, marginBottom: 'var(--space-5)' }}
        >
          <h2
            id="hiw-heading"
            style={{ margin: 0 }}
          >
            {/* First line — gradient accent, strongest visual element */}
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
              Simple for students.
            </span>
            {/* Second line — white, slightly smaller, still highly readable */}
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
              Powerful for institutions.
            </span>
          </h2>
        </motion.div>

        {/* ── Supporting paragraph — two short lines, +15% brightness ──────── */}
        <motion.div
          {...fadeUp(shouldReduce, 0.12)}
          style={{ maxWidth: 500, marginBottom: 'var(--space-16)' }}
        >
          <p
            style={{
              fontSize:   'var(--text-lg)',
              color:      '#B0C4B2',    /* +15% from #9CAE9E — meets contrast, premium */
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            A controlled environment for every assessment.
            <br />
            No surveillance. No data. Just genuine work.
          </p>
        </motion.div>

        {/* ── Timeline ─────────────────────────────────────────────────────────
            Desktop (≥1024px): horizontal flex — [Card][Connector] × 3 [Card]
            Tablet  (768–1023): 2×2 CSS grid  — connectors display:none
            Mobile  (<768px):  column stack   — vertical connectors between
        ─────────────────────────────────────────────────────────────────────── */}
        <div className="hiw-row" role="list">
          {STEPS.map((step, i) => (
            <Fragment key={step.number}>
              {/* Mobile-only vertical connector above (except first) */}
              {i > 0 && (
                <div className="hiw-vertical-connector">
                  <VerticalConnector shouldReduce={shouldReduce} />
                </div>
              )}

              <StepCard
                step={step}
                index={i}
                shouldReduce={shouldReduce}
              />

              {/* Desktop-only horizontal connector after (except last) */}
              {i < STEPS.length - 1 && (
                <ConnectorLine
                  index={i}
                  shouldReduce={shouldReduce}
                />
              )}
            </Fragment>
          ))}
        </div>

        {/* ── Section CTA ───────────────────────────────────────────────────────
            After walking through the workflow, give visitors a clear next action.
            Primary: Request a Pilot (same btn-primary treatment as Hero)
            Secondary: text link with animated arrow (same as Hero secondary CTA)
        ─────────────────────────────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(shouldReduce, 0.52)}
          style={{
            marginTop:      'var(--space-16)',
            paddingTop:     'var(--space-12)',
            borderTop:      '1px solid rgba(255,255,255,0.06)',
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            gap:            'var(--space-3)',
            textAlign:      'center',
          }}
        >
          {/* Pre-CTA label */}
          <p
            style={{
              fontSize:      'var(--text-xs)',
              fontWeight:    'var(--font-semibold)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              color:         'var(--color-text-muted)',
              fontFamily:    'var(--font-mono)',
              marginBottom:  'var(--space-4)',
            }}
          >
            Ready to protect integrity without surveillance?
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center"
            style={{ gap: 'var(--space-5)' }}
          >
            {/* Primary CTA */}
            <motion.a
              href="#pilot"
              className="btn btn-primary btn-lg"
              aria-label="Request a pilot programme"
              whileHover={shouldReduce ? {} : {
                y:         -2,
                boxShadow: '0 10px 28px rgba(34, 197, 94, 0.42)',
              }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{ textDecoration: 'none' }}
            >
              Request a Pilot
            </motion.a>

            {/* Secondary CTA — ghost with animated arrow */}
            <motion.a
              href="#privacy"
              className="inline-flex items-center gap-2"
              style={{
                fontSize:      'var(--text-sm)',
                fontWeight:    600,
                color:         'rgba(240, 245, 241, 0.70)',
                letterSpacing: '0.01em',
                textDecoration:'none',
              }}
              whileHover={shouldReduce ? {} : { color: 'rgba(240, 245, 241, 1)' }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              aria-label="See privacy guarantees"
            >
              See Privacy Guarantees
              <motion.span
                className="inline-flex"
                whileHover={shouldReduce ? {} : { x: 3 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                aria-hidden="true"
              >
                <ArrowRight size={14} />
              </motion.span>
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default HowItWorks
