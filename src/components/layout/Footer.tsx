/**
 * Footer.tsx — HumanF1RST v2 (final structural + typography refinement)
 *
 * Layout (unchanged):
 *   Desktop  (≥1024px): 4-column 2fr·1fr·1fr·2fr
 *   Tablet   (768–1023): 2×2
 *   Mobile   (<768px):  single column, centered
 */

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useSmartNavigate } from '../../hooks/useSmartNavigate'
import humanFirstLogo from '../../assets/human-first-logo.png'

// ─── Content ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Home',         href: '/'             },
  { label: 'Problem',      href: '#problem'      },
  { label: 'Solution',     href: '#solution'     },
  { label: 'Features',     href: '#features'     },
  { label: 'Privacy',      href: '#privacy'      },
  { label: 'How It Works', href: '#how-it-works' },
]

const RESOURCE_LINKS = [
  { label: 'About',      href: '/about'       },
  { label: 'Investors',  href: '#opportunity' },
  { label: 'Contact',    href: '/contact'     },
  { label: 'Privacy',    href: '#privacy'     },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '#privacy'     },
  { label: 'Terms of Use',   href: '/'            },
  { label: 'Accessibility',  href: '/'            },
]

// ─── Color tokens ──────────────────────────────────────────────────────────────

const C_SECONDARY = '#9CA3AF'   /* description, link resting, col headings */
const C_META      = '#6B7280'   /* copyright, legal, bottom bar */

// ─── Animation helpers ─────────────────────────────────────────────────────────

function fadeUp(shouldReduce: boolean | null, delay = 0) {
  return {
    initial:     { opacity: 0, y: shouldReduce ? 0 : 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    { once: true, margin: '-40px 0px' },
    transition: {
      duration: 0.50,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }
}

// ─── Sub-components ────────────────────────────────────────────────────────────

/** Column heading — uppercase mono, secondary color */
function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize:      'var(--text-xs)',
        fontWeight:    'var(--font-semibold)',
        letterSpacing: 'var(--tracking-widest)',
        textTransform: 'uppercase',
        color:         C_SECONDARY,
        marginBottom:  'var(--space-5)',
        lineHeight:    1,
      }}
    >
      {children}
    </p>
  )
}

/** Nav/resource link — secondary resting, primary on hover */
interface FooterLinkProps {
  href:         string
  children:     React.ReactNode
  shouldReduce: boolean | null
  delay:        number
}

function FooterLink({ href, children, shouldReduce, delay }: FooterLinkProps) {
  const { go } = useSmartNavigate()
  return (
    <motion.li
      {...fadeUp(shouldReduce, delay)}
      style={{ listStyle: 'none' }}
    >
      <motion.a
        href={href}
        onClick={(e) => { e.preventDefault(); go(href) }}
        style={{
          display:        'inline-block',
          fontSize:       'var(--text-sm)',
          fontWeight:     'var(--font-medium)',
          color:          'var(--color-text-secondary)',
          textDecoration: 'none',
          letterSpacing:  '0.005em',
          lineHeight:     1.5,
          cursor:         'pointer',
        }}
        whileHover={shouldReduce ? {} : {
          x:     3,
          color: 'var(--color-brand-green)',
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        {children}
      </motion.a>
    </motion.li>
  )
}

/**
 * Footer wordmark/logo — non-interactive branding element.
 */
function FooterLogoLink() {
  return (
    <div
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        background:     'none',
        border:         'none',
        padding:        0,
        cursor:         'default',
        textDecoration: 'none',
      }}
    >
      <img
        src={humanFirstLogo}
        alt="HumanFirst"
        style={{
          display: 'block',
          width: 'auto',
          height: 42,
          maxHeight: 46,
          objectFit: 'contain',
          transform: 'translateY(-3px)',
        }}
      />
    </div>
  )
}

/**
 * Footer "Contact Us" link — navigates to /contact page.
 */
function FooterContactLink({ shouldReduce }: { shouldReduce: boolean | null }) {
  const { go } = useSmartNavigate()
  return (
    <motion.button
      onClick={() => go('/contact')}
      aria-label="Contact the HumanFirst team"
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        gap:            5,
        fontSize:       'var(--text-sm)',
        fontWeight:     'var(--font-medium)',
        color:          'var(--color-text-secondary)',
        textDecoration: 'none',
        letterSpacing:  '0.005em',
        background:     'none',
        border:         'none',
        padding:        0,
        cursor:         'pointer',
      }}
      whileHover={shouldReduce ? {} : {
        x:     2,
        color: 'var(--color-brand-green)',
      }}
      whileTap={shouldReduce ? {} : { scale: 0.98 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      Contact Us
      <motion.span
        whileHover={shouldReduce ? {} : { x: 2 }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
        aria-hidden="true"
      >
        <ArrowRight size={13} />
      </motion.span>
    </motion.button>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

function Footer() {
  const shouldReduce = useReducedMotion()
  const { go }       = useSmartNavigate()

  return (
    <footer
      role="contentinfo"
      style={{
        position:        'relative',
        backgroundColor: 'var(--color-bg-subtle)',
        paddingTop:      'var(--space-16)',
        paddingBottom:   'var(--space-8)',
        overflow:        'hidden',
      }}
    >
      {/* ── Footer separator line — clean page boundary ───────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          top:           0,
          left:          0,
          right:         0,
          height:        1,
          background:    'var(--color-brand-green)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Ambient top glow ─────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          top:           0,
          left:          '20%',
          right:         '20%',
          height:        120,
          background:    'radial-gradient(ellipse, rgba(202,255,112,0.16) 0%, transparent 70%)',
          filter:        'blur(30px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-v2">

        {/* ── Four-column grid ──────────────────────────────────────────────── */}
        <div className="footer-grid" style={{ marginBottom: 'var(--space-12)' }}>

          {/* ── Col 1: Brand ─────────────────────────────────────────────────── */}
          <motion.div {...fadeUp(shouldReduce, 0)} className="footer-col">

            {/* Group 1: Wordmark */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <FooterLogoLink />
            </div>

            {/* Group 2: Description */}
            <div>
              <p className="footer-brand-desc">
                Protecting academic integrity without compromising student privacy.
              </p>
            </div>

          </motion.div>

          {/* ── Col 2: Navigation ────────────────────────────────────────────── */}
          <motion.div {...fadeUp(shouldReduce, 0.08)} className="footer-col">
            <nav aria-label="Footer navigation">
              <ColHeading>Navigation</ColHeading>
              <ul className="footer-link-list">
                {NAV_LINKS.map((link, i) => (
                  <FooterLink
                    key={link.label}
                    href={link.href}
                    shouldReduce={shouldReduce}
                    delay={0.12 + i * 0.04}
                  >
                    {link.label}
                  </FooterLink>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* ── Col 3: Resources ─────────────────────────────────────────────── */}
          <motion.div {...fadeUp(shouldReduce, 0.16)} className="footer-col">
            <nav aria-label="Resources">
              <ColHeading>Resources</ColHeading>
              <ul className="footer-link-list">
                {RESOURCE_LINKS.map((link, i) => (
                  <FooterLink
                    key={link.label}
                    href={link.href}
                    shouldReduce={shouldReduce}
                    delay={0.20 + i * 0.04}
                  >
                    {link.label}
                  </FooterLink>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* ── Col 4: Get Started ───────────────────────────────────────────── */}
          <motion.div {...fadeUp(shouldReduce, 0.24)} className="footer-col">
            <ColHeading>Get Started</ColHeading>

            {/* Description */}
            <p
              style={{
                fontSize:    'var(--text-sm)',
                color:       C_SECONDARY,
                lineHeight:  1.70,
                marginBottom:'var(--space-6)',
              }}
            >
              Ready to explore HUMΛNF1RST?
            </p>

            {/* Primary button */}
            <motion.a
              href="#pilot"
              aria-label="Request a pilot programme"
              onClick={(e) => { e.preventDefault(); go('#pilot') }}
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                justifyContent: 'center',
                width:          '100%',
                minHeight:      '44px',
                padding:        '0.65rem 1.25rem',
                fontSize:       'var(--text-sm)',
                fontWeight:     'var(--font-semibold)',
                color:          '#111712',
                background:     'var(--color-accent)',
                border:         'none',
                borderRadius:   'var(--radius-full)',
                textDecoration: 'none',
                letterSpacing:  '0.01em',
                boxShadow:      '0 4px 16px rgba(202,255,112,0.28)',
                cursor:         'pointer',
                marginBottom:   'var(--space-4)',
              }}
              whileHover={shouldReduce ? {} : {
                y:         -2,
                boxShadow: '0 8px 24px rgba(202,255,112,0.34)',
              }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              Request a Pilot
            </motion.a>

            {/* Secondary text link */}
            <FooterContactLink shouldReduce={shouldReduce} />
          </motion.div>

        </div>

        {/* ── Divider ────────────────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(shouldReduce, 0.30)}
          style={{
            height:       1,
            background:   'rgba(8,47,37,0.08)',
            marginBottom: 'var(--space-6)',
          }}
          aria-hidden="true"
        />

        {/* ── Bottom meta bar ─────────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(shouldReduce, 0.34)}
          className="footer-bottom"
        >
          {/* Left — copyright + tagline */}
          <div>
            <p
              style={{
                fontSize:     '0.8125rem',
                color:        C_META,
                lineHeight:   1.55,
                letterSpacing:'0.01em',
                marginBottom: 'var(--space-1)',
                whiteSpace:   'nowrap',
              }}
            >
              © 2026 HUMΛNF1RST. All rights reserved.
            </p>
            <p
              style={{
                fontSize:     '0.8125rem',
                color:        C_META,
                lineHeight:   1.55,
                letterSpacing:'0.01em',
              }}
            >
              Built for modern education.
            </p>
          </div>

          {/* Right — legal links */}
          <div className="footer-bottom-legal">
            {LEGAL_LINKS.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  go(link.href)
                }}
                style={{
                  fontSize:       '0.8125rem',
                  fontWeight:     'var(--font-medium)',
                  color:          C_META,
                  textDecoration: 'none',
                  letterSpacing:  '0.01em',
                  lineHeight:     1,
                  minHeight:      '44px',
                  display:        'inline-flex',
                  alignItems:     'center',
                  padding:        '0 4px',
                  cursor:         'pointer',
                }}
                whileHover={shouldReduce ? {} : {
                  color: C_SECONDARY,
                }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </motion.div>

      </div>
    </footer>
  )
}

export default Footer
