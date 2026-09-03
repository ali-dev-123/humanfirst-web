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

import { Fragment, type ComponentType, type SVGProps } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useSmartNavigate } from '../../hooks/useSmartNavigate'

// ─── Content ───────────────────────────────────────────────────────────────────

type IconSvgProps = SVGProps<SVGSVGElement> & { size?: string | number }

type IconComponent = ComponentType<IconSvgProps>

type ShieldIconProps = IconSvgProps

interface Step {
  number:  string
  icon:    IconComponent
  title:   string
  body:    string
  isFirst?: boolean
}

function ShieldCheckmarkIcon({ size = 24, ...rest }: ShieldIconProps) {
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

export function ChecklistDocumentIcon({ size = 24, ...rest }: IconSvgProps) {
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
        x2="46"
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
        x2="40"
        y2="47"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function DocumentPencilIcon({ size = 24, ...rest }: IconSvgProps) {
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
      <path
        d="M14 6H36L50 20V54C50 56.2 48.2 58 46 58H14C11.8 58 10 56.2 10 54V10C10 7.8 11.8 6 14 6Z"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="white"
      />
      <path
        d="M36 6V20H50"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="white"
      />
      <line
        x1="18"
        y1="24"
        x2="38"
        y2="24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="18"
        y1="30"
        x2="38"
        y2="30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="18"
        y1="36"
        x2="34"
        y2="36"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="18"
        y1="42"
        x2="30"
        y2="42"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <g transform="rotate(45 40 40)">
        <rect x="38" y="26" width="6" height="22" fill="currentColor" />
        <polygon points="38,26 44,26 41,20" fill="currentColor" />
        <polygon points="39.5,26 42.5,26 41,22.5" fill="white" />
        <rect x="38" y="48" width="6" height="4" fill="currentColor" />
      </g>
    </svg>
  )
}

function VerifiableBadgeIcon({ size = 22, ...rest }: IconSvgProps) {
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

const STEPS: Step[] = [
  {
    number:  '01',
    icon:    ChecklistDocumentIcon,
    title:   'Set the rules.',
    body:    'Institution configures AI access policies before the session begins. One setup. Consistent enforcement across every submission.',
    isFirst: true,
  },
  {
    number: '02',
    icon:   ShieldCheckmarkIcon,
    title:  'Block AI at the source.',
    body:   'Selected AI tools are blocked network-wide. Approved educational resources stay fully accessible. No ambiguity, no gaps.',
  },
  {
    number: '03',
    icon:   DocumentPencilIcon,
    title:  'Work freely.',
    body:   'No webcams. No screen recording. No keystroke logging. Students focus on their work — not on being watched.',
  },
  {
    number: '04',
    icon:   VerifiableBadgeIcon,
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
            background:   'rgba(8, 47, 37, 0.08)',
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
            background:      'linear-gradient(to right, rgba(8,47,37,0.70), rgba(202,255,112,0.40))',
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
            borderLeft:   '7px solid rgba(8, 47, 37, 0.72)',
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
          background:   'linear-gradient(to bottom, rgba(8,47,37,0.70), rgba(202,255,112,0.28))',
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
          borderTop:   '6px solid rgba(8, 47, 37, 0.60)',
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
  const borderColor    = 'rgba(202, 255, 112, 0.30)'
  const glowBase       = step.isFirst
    ? '0 0 56px 0 rgba(202, 255, 112, 0.22)'
    : '0 0 36px 0 rgba(202, 255, 112, 0.10)'
  const glowHover      = step.isFirst
    ? '0 0 72px 0 rgba(202, 255, 112, 0.24)'
    : '0 0 60px 0 rgba(202, 255, 112, 0.24)'
  const borderHover    = 'rgba(202, 255, 112, 0.40)'

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
              ? 'linear-gradient(to right, transparent, rgba(202,255,112,0.40), transparent)'
              : 'linear-gradient(to right, transparent, rgba(8,47,37,0.10), transparent)',
          }}
        />

        {/* Icon badge */}
        <div
          style={{
            display:        'flex',
            alignItems:     'flex-start',
            justifyContent: 'flex-start',
            marginBottom:   'var(--space-6)',
          }}
        >
          <motion.div
            {...scaleIn(shouldReduce, cardDelay + 0.05)}
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              justifyContent: 'center',
              width:          46,
              height:         46,
              borderRadius:   'var(--radius-xl)',
              background:     'transparent',
              border:         '1px solid #32CD32',
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
            color:      '#5F6D65',
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
  const { go } = useSmartNavigate()

  return (
    <section
      id="how-it-works"
      aria-labelledby="hiw-heading"
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

        {/* ── Badge ──────────────────────────────────────────────────────────── */}
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
            {/* Pulsing dot — same premium treatment as Hero badge */}
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
              How It Works
            </span>
          </div>
        </motion.div>

        {/* ── Heading — first line dominant, second line lighter ─────────────── */}
        <motion.div
          {...fadeUp(shouldReduce, 0.06)}
          style={{ maxWidth: 640, marginBottom: 'var(--space-4)' }}
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
          style={{ maxWidth: 500, marginBottom: 'var(--space-12)' }}
        >
          <p
            style={{
              fontSize:   'var(--text-lg)',
              color:      '#5F6D65',
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
            marginTop:      'var(--space-12)',
            paddingTop:     'var(--space-8)',
            borderTop:      '1px solid rgba(8,47,37,0.08)',
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
              href="/contact#request-pilot"
              className="btn btn-primary btn-lg"
              aria-label="Request a pilot programme"
              onClick={(e) => { e.preventDefault(); go('/contact#request-pilot') }}
              whileHover={shouldReduce ? {} : {
                y:         -2,
                boxShadow: '0 10px 28px rgba(202, 255, 112, 0.36)',
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
                color:         'var(--color-text-secondary)',
                letterSpacing: '0.01em',
                textDecoration:'none',
              }}
              whileHover={shouldReduce ? {} : { color: 'var(--color-forest-700)' }}
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
