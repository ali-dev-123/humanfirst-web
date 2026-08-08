/**
 * About.tsx — HumanF1RST v2
 *
 * Full redesign of the About page using the v2 design system.
 * Replaces the previous Tailwind-based implementation.
 *
 * Page structure:
 *   1. AboutHero          — hero with badge, heading, CTAs, glow
 *   2. OurStory           — split layout: pull quote (left) + story (right)
 *   3. OurPrinciples      — 6 glassmorphic principle cards (3×2 grid)
 *   4. OurVision          — large typographic statement block
 *   5. FounderMessage     — full-width glass card with quote
 *   6. AboutCTA           — final conversion CTA
 *   7. Footer             — global footer (not in Navbar wrapper)
 *
 * All sections reuse:
 *   — container-v2          (consistent max-width + padding)
 *   — problem-grid          (3-col desktop, 2-col tablet, 1-col mobile)
 *   — privacy-split         (45/55 desktop split, 1-col mobile)
 *   — text-gradient-accent  (green gradient text)
 *   — btn btn-primary btn-lg (CTA buttons)
 *   — bg-dots               (dot grid texture)
 *
 * Animations: all whileInView, once:true, GPU-only, prefers-reduced-motion safe.
 */

import { motion, useReducedMotion } from 'framer-motion'
import {
  ShieldCheck,
  BadgeCheck,
  Eye,
  Building2,
  Users,
  Sparkles,
  ArrowRight,
  Quote,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSmartNavigate } from '../hooks/useSmartNavigate'
import Seo from '../components/Seo'
import Footer from '../components/layout/Footer'

// ─── Shared animation helpers ──────────────────────────────────────────────────

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
      duration: 0.52,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }
}

/** Reusable section badge — same across all v2 sections */
function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display:      'inline-flex',
        alignItems:   'center',
        gap:          7,
        padding:      '5px 14px',
        borderRadius: 'var(--radius-full)',
        border:       '1px solid rgba(8,47,37,0.10)',
        background:   'var(--color-accent)',
        marginBottom: 'var(--space-10)',
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
        {children}
      </span>
    </div>
  )
}

// ─── Section 1: Hero ───────────────────────────────────────────────────────────

function AboutHero() {
  const shouldReduce = useReducedMotion()
  const { go }       = useSmartNavigate()
  const navigate     = useNavigate()

  return (
    <section
      id="about-hero"
      aria-labelledby="about-hero-heading"
      style={{
        position:        'relative',
        backgroundColor: 'var(--color-bg-base)',
        paddingTop:      'clamp(8rem, 16vw, 11rem)',
        paddingBottom:   'var(--space-24)',
        overflow:        'hidden',
        textAlign:       'center',
      }}
    >
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-dots" style={{ opacity: 0.45 }} />
        {/* Central ambient glow */}
        <motion.div
          animate={shouldReduce ? {} : { opacity: [0.7, 1, 0.7], y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position:   'absolute',
            top:        '10%',
            left:       '50%',
            transform:  'translateX(-50%)',
            width:      '70%',
            height:     400,
            background: 'radial-gradient(ellipse, var(--color-accent-glow) 0%, transparent 65%)',
            filter:     'blur(60px)',
          }}
        />
      </div>

      <div className="container-v2">
        <motion.div {...fadeUp(shouldReduce, 0)}>
          <SectionBadge>About HUMΛNF1RST</SectionBadge>
        </motion.div>

        <motion.h1
          id="about-hero-heading"
          {...fadeUp(shouldReduce, 0.06)}
          style={{ margin: '0 auto var(--space-6)', maxWidth: 700 }}
        >
          <span
            className="text-gradient-accent"
            style={{
              display:       'block',
              fontSize:      'clamp(2.75rem, 6vw, 5rem)',
              fontWeight:    'var(--font-extrabold)',
              lineHeight:    1.04,
              letterSpacing: 'var(--tracking-tight)',
            }}
          >
            Rebuilding trust
          </span>
          <span
            style={{
              display:       'block',
              fontSize:      'clamp(2.75rem, 6vw, 5rem)',
              fontWeight:    'var(--font-extrabold)',
              lineHeight:    1.04,
              letterSpacing: 'var(--tracking-tight)',
              color:         'var(--color-brand-green)',
            }}
          >
            in education.
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp(shouldReduce, 0.12)}
          style={{
            fontSize:    'var(--text-lg)',
            color:       'var(--color-text-secondary)',
            lineHeight:  1.80,
            maxWidth:    560,
            margin:      '0 auto var(--space-10)',
          }}
        >
          HumanFirst exists to help institutions preserve academic integrity
          in an AI-driven world — without sacrificing student privacy or trust.
        </motion.p>

        <motion.div
          {...fadeUp(shouldReduce, 0.18)}
          style={{
            display:        'flex',
            flexWrap:       'wrap',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            'var(--space-4)',
          }}
        >
          <motion.a
            href="/#pilot"
            className="btn btn-primary btn-lg"
            style={{ textDecoration: 'none' }}
            onClick={(e) => { e.preventDefault(); go('#pilot') }}
            whileHover={shouldReduce ? {} : {
              y: -2,
              boxShadow: '0 12px 32px rgba(202,255,112,0.42)',
            }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            Request a Pilot
          </motion.a>

          <motion.a
            href="/contact"
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            'var(--space-2)',
              fontSize:       'var(--text-sm)',
              fontWeight:     600,
              color:          'var(--color-text-primary)',
              textDecoration: 'none',
              padding:        '0.75rem 1.5rem',
              border:         '1px solid var(--color-border-default)',
              borderRadius:   'var(--radius-full)',
              background:     'rgba(8, 47, 37, 0.04)',
            }}
            onClick={(e) => { e.preventDefault(); navigate('/contact') }}
            whileHover={shouldReduce ? {} : {
              y: -1,
            }}
            whileTap={shouldReduce ? {} : { scale: 0.98 }}
            transition={{ duration: 0.20, ease: 'easeOut' }}
          >
            Contact Us
            <ArrowRight size={14} aria-hidden="true" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Section 2: Our Story ──────────────────────────────────────────────────────

function OurStory() {
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="our-story"
      aria-labelledby="story-heading"
      style={{
        position:        'relative',
        backgroundColor: 'var(--color-bg-base)',
        paddingTop:      'var(--space-24)',
        paddingBottom:   'var(--space-24)',
        overflow:        'hidden',
      }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-dots" style={{ opacity: 0.40 }} />
      </div>

      <div className="container-v2">

        {/* ── Section label ── */}
        <motion.div {...fadeUp(shouldReduce, 0)} style={{ marginBottom: 'var(--space-4)' }}>
          <SectionBadge>Our Story</SectionBadge>
        </motion.div>

        {/* ── Section heading — full-width, sits above both columns ── */}
        <motion.h2
          id="story-heading"
          {...fadeUp(shouldReduce, 0.06)}
          style={{
            fontSize:      'clamp(2rem, 4vw, 3.25rem)',
            fontWeight:    'var(--font-extrabold)',
            letterSpacing: 'var(--tracking-tight)',
            lineHeight:    1.08,
            color:         'var(--color-text-primary)',
            maxWidth:      560,
            marginBottom:  'var(--space-14)',
          }}
        >
          Why HumanFirst Exists
        </motion.h2>

        {/*
          ── Two-column layout ──────────────────────────────────────────────────
          align-items: flex-start aligns both columns on the same top baseline.
          privacy-split handles 45/55 on desktop, stacks on mobile.
        ─────────────────────────────────────────────────────────────────────── */}
        <div
          className="privacy-split"
          style={{ alignItems: 'flex-start' }}
        >

          {/* ── Left: quote card ─────────────────────────────────────────────── */}
          <motion.div
            {...scaleIn(shouldReduce, 0.08)}
            style={{
              position:            'relative',
              background:          'var(--color-bg-elevated)',
              border:              '1px solid var(--color-accent)',
              borderLeft:          '3px solid var(--color-accent)',
              borderRadius:        'var(--radius-2xl)',
              boxShadow:           'var(--shadow-lg)',
              marginTop:           'var(--space-10)',
              paddingTop:          'var(--space-8)',
              paddingRight:        'var(--space-9)',
              paddingBottom:       'var(--space-10)',
              paddingLeft:         'var(--space-9)',
            }}
          >
            {/* Quote icon — watermark in top-right corner, decorative not dominant */}
            <Quote
              size={20}
              strokeWidth={0}
              fill="currentColor"
              stroke="none"
              aria-hidden="true"
              style={{
                position:    'absolute',
                top:         'var(--space-5)',
                right:       'var(--space-6)',
                color:       'var(--color-accent)',
                opacity:     1,
                fillOpacity: 1,
                strokeOpacity: 0,
                flexShrink:   0,
              }}
            />

            <blockquote style={{ margin: 0 }}>
              <p
                style={{
                  fontSize:      'clamp(1.20rem, 2.2vw, 1.58rem)',
                  fontWeight:    'var(--font-semibold)',
                  color:         'var(--color-brand-green)',
                  lineHeight:    1.70,
                  letterSpacing: 'var(--tracking-snug)',
                  fontStyle:     'normal',
                  textAlign:     'center',
                  margin:        0,
                }}
              >
                {/* Lines 1–2: primary white — equal weight, parallel structure */}
                Students deserve trust.
                <br />
                Institutions deserve confidence.
                {/* Visual breathing room before the concluding line */}
                <br />
                <br />
                {/* Line 3: parrot accent — the resolution */}
                <span
                  style={{
                    color: 'var(--color-accent)',
                  }}
                >
                  HumanF1RST bridges that gap.
                </span>
              </p>
            </blockquote>
          </motion.div>


          {/* ── Right: story content ─────────────────────────────────────────── */}
          <motion.div
            {...fadeUp(shouldReduce, 0.14)}
            style={{
              display:       'flex',
              flexDirection: 'column',
              gap:           'var(--space-5)',
            }}
          >
            {/* Opening — the context */}
            <motion.p
              {...fadeUp(shouldReduce, 0.16)}
              style={{
                fontSize:   'var(--text-base)',
                color:      'var(--color-text-secondary)',
                lineHeight: 1.85,
                margin:     0,
                maxWidth:   '62ch',
              }}
            >
              Artificial intelligence is changing education forever.
              That is not a problem to be feared — it is a reality to
              be addressed thoughtfully.
            </motion.p>

            {/* Highlighted statement — the tension, set apart */}
            <motion.p
              {...fadeUp(shouldReduce, 0.24)}
              style={{
                fontSize:      'var(--text-base)',
                fontWeight:    'var(--font-semibold)',
                color:         'var(--color-brand-green)',
                lineHeight:    1.75,
                letterSpacing: '0.005em',
                margin:        0,
                maxWidth:      '56ch',
                paddingLeft:   'var(--space-4)',
                borderLeft:    '2px solid var(--color-accent)',
              }}
            >
              The answer isn't banning AI.
              <br />
              The answer isn't surveillance.
            </motion.p>

            {/* The problem with existing responses */}
            <motion.p
              {...fadeUp(shouldReduce, 0.32)}
              style={{
                fontSize:   'var(--text-base)',
                color:      'var(--color-text-secondary)',
                lineHeight: 1.85,
                margin:     0,
                maxWidth:   '62ch',
              }}
            >
              The instinctive response has been to ban AI tools during
              assessments, or to deploy surveillance: webcams, keystroke
              logging, screen recording. Banning AI ignores the world
              students will graduate into. Surveillance trades academic
              integrity for institutional distrust.
            </motion.p>

            {/* The HumanFirst answer */}
            <motion.p
              {...fadeUp(shouldReduce, 0.40)}
              style={{
                fontSize:   'var(--text-base)',
                color:      'var(--color-text-secondary)',
                lineHeight: 1.85,
                margin:     0,
                maxWidth:   '62ch',
              }}
            >
              HumanFirst was created to offer a third path — a platform
              that prevents AI-assisted work during assessments, not by
              watching students, but by creating a structured environment
              where authentic thinking happens first.
            </motion.p>

            {/* Mission statement */}
            <motion.p
              {...fadeUp(shouldReduce, 0.48)}
              style={{
                fontSize:   'var(--text-base)',
                color:      'var(--color-text-secondary)',
                lineHeight: 1.85,
                margin:     0,
                maxWidth:   '62ch',
              }}
            >
              Every institution that chooses HumanFirst is making a
              statement: that integrity and dignity are not opposites,
              and that trust can be built without surveillance.
            </motion.p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

// ─── Section 3: Our Principles ─────────────────────────────────────────────────

interface Principle {
  icon:  LucideIcon
  title: string
  body:  string
}

const PRINCIPLES: Principle[] = [
  {
    icon:  ShieldCheck,
    title: 'Privacy First',
    body:  'Student privacy should never be compromised. Every feature is designed with privacy as the foundation, not an afterthought.',
  },
  {
    icon:  BadgeCheck,
    title: 'Integrity',
    body:  'Protect genuine learning. Authentic thinking is the only currency that matters in education.',
  },
  {
    icon:  Eye,
    title: 'Transparency',
    body:  'Clear, understandable systems. Students and educators should always understand how HumanFirst works.',
  },
  {
    icon:  Building2,
    title: 'Institution Control',
    body:  'Educators stay in control. Policies, rules, and assessment structures remain with the people who understand their students.',
  },
  {
    icon:  Users,
    title: 'Human-Centered Design',
    body:  'Technology supports people — it does not replace them. HumanFirst is a tool, not a judge.',
  },
  {
    icon:  Sparkles,
    title: 'Future Ready',
    body:  'Built for the AI era. HumanFirst evolves alongside education, not against it.',
  },
]

function OurPrinciples() {
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="principles"
      aria-labelledby="principles-heading"
      style={{
        position:        'relative',
        backgroundColor: 'var(--color-bg-base)',
        paddingTop:      'var(--space-24)',
        paddingBottom:   'var(--space-24)',
        overflow:        'hidden',
      }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-dots" style={{ opacity: 0.45 }} />
        <div
          style={{
            position:   'absolute',
            top:        '-5%',
            left:       '50%',
            transform:  'translateX(-50%)',
            width:      '65%',
            height:     300,
            background: 'radial-gradient(ellipse, var(--color-accent-glow) 0%, transparent 70%)',
            filter:     'blur(50px)',
          }}
        />
      </div>

      <div className="container-v2">
        <motion.div {...fadeUp(shouldReduce, 0)}>
          <SectionBadge>Our Principles</SectionBadge>
        </motion.div>

        <motion.h2
          id="principles-heading"
          {...fadeUp(shouldReduce, 0.06)}
          style={{ margin: '0 0 var(--space-4)' }}
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
            Every decision
          </span>
          <span
            style={{
              display:       'block',
              fontSize:      'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight:    'var(--font-bold)',
              color:         'var(--color-text-primary)',
              lineHeight:    'var(--leading-snug)',
              letterSpacing: 'var(--tracking-snug)',
            }}
          >
            starts with trust.
          </span>
        </motion.h2>

        <motion.p
          {...fadeUp(shouldReduce, 0.12)}
          style={{
            fontSize:    'var(--text-lg)',
            color:       'var(--color-text-secondary)',
            lineHeight:  1.80,
            maxWidth:    520,
            margin:      '0 0 var(--space-16)',
          }}
        >
          Six principles guide every product decision at HumanFirst.
        </motion.p>

        <div
          className="problem-grid"
          style={{ display: 'grid', gap: 'var(--space-5)' }}
        >
          {PRINCIPLES.map((p, i) => {
            const Icon      = p.icon
            const cardDelay = 0.06 + i * 0.08
            return (
              <motion.article
                key={p.title}
                {...fadeUp(shouldReduce, cardDelay)}
                style={{
                  position:      'relative',
                  display:       'flex',
                  flexDirection: 'column',
                  alignItems:    'flex-start',
                  justifyContent:'flex-start',
                  height:        '100%',
                  background:    'var(--color-bg-elevated)',
                  border:        '1px solid var(--color-accent)',
                  borderRadius:  'var(--radius-2xl)',
                  padding:       'var(--space-8)',
                  boxShadow:     'var(--shadow-lg), 0 0 32px 0 rgba(202,255,112,0.04)',
                  overflow:      'visible',
                  willChange:    'transform',
                  cursor:        'default',
                }}
                whileHover={shouldReduce ? {} : {
                  y:         -4,
                  boxShadow: [
                    'var(--shadow-xl)',
                    '0 0 56px 0 rgba(202,255,112,0.14)',
                    '0 0 0 1px rgba(202,255,112,0.26)',
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
                    background: 'linear-gradient(to right, transparent, rgba(202,255,112,0.20), transparent)',
                  }}
                />

                {/* Icon badge */}
                <motion.div
                  {...scaleIn(shouldReduce, cardDelay + 0.05)}
                  style={{
                    display:        'inline-flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    width:          54,
                    height:         54,
                    borderRadius:   'var(--radius-xl)',
                    background:     'var(--color-accent)',
                    border:         '1px solid rgba(202,255,112,0.40)',
                    marginBottom:   'var(--space-6)',
                    flexShrink:     0,
                    alignSelf:      'flex-start',
                  }}
                  whileHover={shouldReduce ? {} : { scale: 1.10 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <Icon
                    size={24}
                    strokeWidth={1.6}
                    style={{ color: 'var(--color-brand-green)' }}
                    aria-hidden="true"
                  />
                </motion.div>

                <h3
                  style={{
                    fontSize:      'var(--text-lg)',
                    fontWeight:    'var(--font-bold)',
                    color:         'var(--color-text-primary)',
                    lineHeight:    'var(--leading-snug)',
                    letterSpacing: 'var(--tracking-snug)',
                    marginBottom:  'var(--space-3)',
                    marginTop:     0,
                  }}
                >
                  {p.title}
                </h3>

                <p
                  style={{
                    fontSize:   'var(--text-sm)',
                    color:      'var(--color-text-secondary)',
                    lineHeight: 1.80,
                    margin:     0,
                    flexGrow:   1,
                  }}
                >
                  {p.body}
                </p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Section 4: Our Vision ─────────────────────────────────────────────────────

function OurVision() {
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="vision"
      aria-labelledby="vision-heading"
      style={{
        position:        'relative',
        backgroundColor: 'var(--color-bg-base)',
        paddingTop:      'var(--space-24)',
        paddingBottom:   'var(--space-24)',
        overflow:        'hidden',
        textAlign:       'center',
      }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-dots" style={{ opacity: 0.40 }} />
        <motion.div
          animate={shouldReduce ? {} : { opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position:   'absolute',
            top:        '50%',
            left:       '50%',
            transform:  'translate(-50%, -50%)',
            width:      '80%',
            height:     '60%',
            background: 'radial-gradient(ellipse, var(--color-accent-glow) 0%, transparent 65%)',
            filter:     'blur(50px)',
          }}
        />
      </div>

      <div className="container-v2">
        <motion.div {...fadeUp(shouldReduce, 0)}>
          <SectionBadge>Our Vision</SectionBadge>
        </motion.div>

        <motion.h2
          id="vision-heading"
          {...fadeUp(shouldReduce, 0.06)}
          style={{
            fontSize:      'clamp(2.25rem, 5vw, 4.5rem)',
            fontWeight:    'var(--font-extrabold)',
            lineHeight:    1.08,
            letterSpacing: 'var(--tracking-tight)',
            maxWidth:      760,
            margin:        '0 auto var(--space-8)',
          }}
        >
          <span style={{ color: 'var(--color-text-primary)' }}>
            The future of assessment should{' '}
          </span>
          <span className="text-gradient-accent">
            reward human thinking.
          </span>
        </motion.h2>

        {/* Horizontal accent */}
        <motion.div
          {...fadeUp(shouldReduce, 0.10)}
          aria-hidden="true"
          style={{
            width:        48,
            height:       2,
            borderRadius: 1,
            background:   'var(--color-accent)',
            margin:       '0 auto var(--space-8)',
            opacity:      0.7,
          }}
        />

        <motion.div
          {...fadeUp(shouldReduce, 0.14)}
          style={{ maxWidth: 560, margin: '0 auto' }}
        >
          <p
            style={{
              fontSize:    'var(--text-xl)',
              color:       'var(--color-text-secondary)',
              lineHeight:  1.75,
              marginBottom:'var(--space-4)',
            }}
          >
            Education will continue to evolve with AI.
          </p>
          <p
            style={{
              fontSize:   'var(--text-xl)',
              color:      'var(--color-text-primary)',
              fontWeight: 'var(--font-semibold)',
              lineHeight: 1.75,
            }}
          >
            Our mission is to ensure that trust evolves with it.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Section 5: Founder Message ────────────────────────────────────────────────

function FounderMessage() {
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="founder"
      aria-labelledby="founder-heading"
      style={{
        position:        'relative',
        backgroundColor: 'var(--color-bg-base)',
        paddingTop:      'var(--space-16)',
        paddingBottom:   'var(--space-24)',
        overflow:        'hidden',
      }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-dots" style={{ opacity: 0.40 }} />
      </div>

      <div className="container-v2">
        <motion.div
          {...scaleIn(shouldReduce, 0)}
          style={{
            position:       'relative',
            background:     'var(--color-bg-elevated)',
            border:         '1px solid var(--color-border-default)',
            borderRadius:   'var(--radius-2xl)',
            padding:        'clamp(2.5rem, 6vw, 4.5rem)',
            boxShadow:      'var(--shadow-xl)',
            maxWidth:       820,
            margin:         '0 auto',
          }}
        >
          {/* Top edge accent */}
          <span
            aria-hidden="true"
            style={{
              position:   'absolute',
              top:        0,
              left:       '15%',
              right:      '15%',
              height:     1,
              background: 'linear-gradient(to right, transparent, rgba(202,255,112,0.40), transparent)',
            }}
          />

          <motion.h2
            id="founder-heading"
            {...fadeUp(shouldReduce, 0.06)}
            style={{
              fontSize:      'var(--text-sm)',
              fontWeight:    'var(--font-bold)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              color:         'var(--color-brand-green)',
              marginBottom:  'var(--space-8)',
            }}
          >
            A message from the founder
          </motion.h2>

          <Quote
            size={28}
            strokeWidth={0}
            fill="currentColor"
            stroke="none"
            style={{
              color:        'var(--color-accent)',
              opacity:      1,
              fillOpacity:  1,
              strokeOpacity: 0,
              marginBottom: 'var(--space-6)',
            }}
            aria-hidden="true"
          />

          {[
            'We don\'t believe AI is the enemy.',
            'We believe education needs a better way to preserve authentic learning while respecting every student\'s dignity.',
            'HUMΛNF1RST is our answer.',
          ].map((line, i) => (
            <motion.p
              key={i}
              {...fadeUp(shouldReduce, 0.10 + i * 0.10)}
              style={{
                fontSize:    i === 2 ? 'clamp(1.15rem, 2.5vw, 1.5rem)' : 'clamp(1rem, 2vw, 1.25rem)',
                fontWeight:  i === 2 ? 'var(--font-bold)' : 'var(--font-medium)',
                color:       i === 2 ? 'var(--color-brand-green)' : 'var(--color-text-secondary)',
                lineHeight:  1.70,
                marginBottom:i < 2 ? 'var(--space-4)' : 0,
              }}
            >
              {line}
            </motion.p>
          ))}

          {/* Founder label — no fake signature or photo */}
          <motion.div
            {...fadeUp(shouldReduce, 0.40)}
            style={{
              marginTop:   'var(--space-10)',
              paddingTop:  'var(--space-6)',
              borderTop:   '1px solid var(--color-border-default)',
              display:     'flex',
              alignItems:  'center',
              gap:         'var(--space-4)',
            }}
          >
            {/* Monogram badge */}
            <div
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                justifyContent: 'center',
                width:          44,
                height:         44,
                borderRadius:   'var(--radius-full)',
                background:     'var(--color-bg-elevated)',
                border:         '1px solid var(--color-accent-soft)',
                fontSize:       'var(--text-sm)',
                fontWeight:     'var(--font-bold)',
                color:          'var(--color-brand-green)',
                flexShrink:     0,
              }}
              aria-hidden="true"
            >
              AH
            </div>
            <div>
              <p
                style={{
                  fontSize:   'var(--text-sm)',
                  fontWeight: 'var(--font-semibold)',
                  color:      'var(--color-text-primary)',
                  lineHeight: 1.3,
                }}
              >
                Abdul Hafeez
              </p>
              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  color:    'var(--color-text-secondary)',
                  lineHeight: 1.3,
                }}
              >
                Founder, HumanFirst
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Section 6: Final CTA ──────────────────────────────────────────────────────

function AboutCTA() {
  const shouldReduce = useReducedMotion()
  const { go }       = useSmartNavigate()
  const navigate     = useNavigate()

  return (
    <section
      id="about-cta"
      aria-labelledby="about-cta-heading"
      style={{
        position:        'relative',
        backgroundColor: 'var(--color-bg-base)',
        paddingTop:      'clamp(5rem, 12vw, 8rem)',
        paddingBottom:   'clamp(5rem, 12vw, 8rem)',
        overflow:        'hidden',
        textAlign:       'center',
      }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-dots" style={{ opacity: 0.45 }} />
        <motion.div
          animate={shouldReduce ? {} : { y: [0, -10, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position:   'absolute',
            top:        '50%',
            left:       '50%',
            transform:  'translate(-50%, -50%)',
            width:      '70%',
            height:     '80%',
            background: 'radial-gradient(ellipse, var(--color-accent-glow) 0%, transparent 62%)',
            filter:     'blur(60px)',
          }}
        />
      </div>

      <div className="container-v2">
        <motion.div
          {...scaleIn(shouldReduce, 0)}
          style={{
            maxWidth:       680,
            margin:         '0 auto',
            background:     'var(--color-bg-elevated)',
            border:         '1px solid var(--color-accent)',
            borderRadius:   'var(--radius-2xl)',
            padding:        'clamp(2.5rem, 6vw, 4rem) clamp(1.5rem, 4vw, 3.5rem)',
            boxShadow:      'var(--shadow-xl)',
            position:       'relative',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position:   'absolute',
              top:        0,
              left:       '15%',
              right:      '15%',
              height:     1,
              background: 'linear-gradient(to right, transparent, rgba(202,255,112,0.40), transparent)',
            }}
          />

          <motion.h2
            id="about-cta-heading"
            {...fadeUp(shouldReduce, 0.06)}
            style={{
              fontSize:      'clamp(1.75rem, 4vw, 3rem)',
              fontWeight:    'var(--font-extrabold)',
              lineHeight:    1.12,
              letterSpacing: 'var(--tracking-tight)',
              color:         'var(--color-text-primary)',
              marginBottom:  'var(--space-6)',
            }}
          >
            Let's shape the future of{' '}
            <span className="text-gradient-accent">
              education together.
            </span>
          </motion.h2>

          <motion.p
            {...fadeUp(shouldReduce, 0.12)}
            style={{
              fontSize:    'var(--text-base)',
              color:       'var(--color-text-secondary)',
              lineHeight:  1.80,
              marginBottom:'var(--space-10)',
              maxWidth:    480,
              margin:      '0 auto var(--space-10)',
            }}
          >
            HumanFirst is pilot-ready. Bring academic integrity into the AI era
            — without surveillance, without compromise.
          </motion.p>

          <motion.div
            {...fadeUp(shouldReduce, 0.18)}
            style={{
              display:        'flex',
              flexWrap:       'wrap',
              justifyContent: 'center',
              gap:            'var(--space-4)',
            }}
          >
            <motion.a
              href="/#pilot"
              className="btn btn-primary btn-lg"
              style={{ textDecoration: 'none' }}
              onClick={(e) => { e.preventDefault(); go('#pilot') }}
              whileHover={shouldReduce ? {} : {
                y:         -2,
                boxShadow: '0 12px 32px rgba(202,255,112,0.42)',
              }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              Request a Pilot
            </motion.a>

            <motion.a
              href="/contact"
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                gap:            'var(--space-2)',
                fontSize:       'var(--text-sm)',
                fontWeight:     600,
                color:          'var(--color-text-primary)',
                textDecoration: 'none',
                padding:        '0.75rem 1.5rem',
                border:         '1px solid var(--color-border-default)',
                borderRadius:   'var(--radius-full)',
                background:     'rgba(8, 47, 37, 0.04)',
              }}
              onClick={(e) => { e.preventDefault(); navigate('/contact') }}
              whileHover={shouldReduce ? {} : {
                y: -1,
              }}
              whileTap={shouldReduce ? {} : { scale: 0.98 }}
              transition={{ duration: 0.20, ease: 'easeOut' }}
            >
              Get in Touch
              <ArrowRight size={14} aria-hidden="true" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Page root ─────────────────────────────────────────────────────────────────

function About() {
  return (
    <>
      <Seo
        title="About HumanFirst — Rebuilding Trust in Education"
        description="HumanFirst exists to help institutions preserve academic integrity in an AI-driven world — without sacrificing student privacy or trust. Learn our story, principles, and vision."
      />
      <main id="about-main">
        <AboutHero />
        <OurStory />
        <OurPrinciples />
        <OurVision />
        <FounderMessage />
        <AboutCTA />
      </main>
      <Footer />
    </>
  )
}

export default About