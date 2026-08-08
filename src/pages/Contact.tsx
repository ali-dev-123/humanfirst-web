/**
 * Contact.tsx — HumanF1RST v2
 *
 * Full v2 Contact page using the same design language as Landing & About.
 *
 * Page structure:
 *   1. ContactHero   — badge, heading, supporting copy, CTA buttons, premium glow
 *   2. ContactMain   — 60/40: glass form (left) + stacked info cards (right)
 *   3. ContactFaq    — accordion FAQ with smooth animated height
 *   4. ContactCta    — large centered glass panel, final conversion
 *   5. Footer        — global footer
 *
 * Design conventions follow HumanF1RST v2:
 *   container-v2 · text-gradient-accent · btn btn-primary btn-lg
 *   bg-dots · GPU-only transforms · prefers-reduced-motion safe
 */

import { useState, useId } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Mail,
  MapPin,
  Clock,
  Users,
  Send,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
} from 'lucide-react'
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

function slideUp(shouldReduce: boolean | null, delay = 0) {
  return {
    initial:     { opacity: 0, y: shouldReduce ? 0 : 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    { once: true, margin: '-60px 0px' },
    transition: {
      duration: 0.60,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }
}

/** Reusable section badge — matches About & Landing v2 style */
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
          textTransform: 'uppercase' as const,
          color:         'var(--color-brand-green)',
        }}
      >
        {children}
      </span>
    </div>
  )
}

// ─── Section 1: Hero ───────────────────────────────────────────────────────────

function ContactHero() {
  const shouldReduce = useReducedMotion()
  const navigate     = useNavigate()

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="contact-hero"
      aria-labelledby="contact-hero-heading"
      style={{
        position:        'relative',
        backgroundColor: 'var(--color-bg-base)',
        paddingTop:      'clamp(7rem, 16vw, 11rem)',
        paddingBottom:   'clamp(4rem, 9vw, 7rem)',
        overflow:        'hidden',
        textAlign:       'center',
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-dots" style={{ opacity: 0.45 }} />

        {/* Central radial glow — ambient animation */}
        <motion.div
          animate={shouldReduce ? {} : {
            opacity: [0.55, 0.80, 0.55],
            scale:   [1, 1.08, 1],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position:   'absolute',
            top:        '10%',
            left:       '50%',
            transform:  'translateX(-50%)',
            width:      '70%',
            height:     420,
            background: 'radial-gradient(ellipse, rgba(34,197,94,0.10) 0%, transparent 68%)',
            filter:     'blur(60px)',
          }}
        />

        {/* Soft left ambient */}
        <div
          style={{
            position:   'absolute',
            top:        '20%',
            left:       '-10%',
            width:      400,
            height:     400,
            background: 'radial-gradient(ellipse, rgba(34,197,94,0.05) 0%, transparent 70%)',
            filter:     'blur(80px)',
          }}
        />
      </div>

      <div className="container-v2" style={{ position: 'relative', zIndex: 1 }}>

        {/* Badge */}
        <motion.div
          {...fadeUp(shouldReduce, 0)}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <SectionBadge>Contact</SectionBadge>
        </motion.div>

        {/* Heading */}
        <motion.h1
          id="contact-hero-heading"
          {...fadeUp(shouldReduce, 0.08)}
          style={{
            fontSize:      'clamp(2.25rem, 6.5vw, 5.5rem)',
            fontWeight:    'var(--font-extrabold)',
            letterSpacing: 'var(--tracking-tight)',
            lineHeight:    1.04,
            color:         'var(--color-brand-green)',
            margin:        '0 auto var(--space-6)',
            maxWidth:      680,
          }}
        >
          Let's{' '}
          <span className="text-gradient-accent">Talk.</span>
        </motion.h1>

        {/* Supporting text */}
        <motion.p
          {...fadeUp(shouldReduce, 0.16)}
          style={{
            fontSize:    'clamp(var(--text-base), 2vw, var(--text-lg))',
            color:       'var(--color-text-secondary)',
            lineHeight:  1.75,
            maxWidth:    560,
            width:       '100%',
            margin:      '0 auto var(--space-10)',
          }}
        >
          Whether you're exploring HUMΛNF1RST for your institution, interested
          in partnering, or simply have a question — we'd love to hear from you.
          <br />
          <span style={{ color: 'var(--color-text-secondary)' }}>
            We usually respond within one business day.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(shouldReduce, 0.24)}
          className="responsive-btn-group"
          style={{ margin: '0 auto' }}
        >
          <motion.a
            href="#contact-form"
            onClick={scrollToForm}
            className="btn btn-primary btn-lg"
            aria-label="Go to contact form"
            whileHover={shouldReduce ? {} : {
              y:         -2,
              boxShadow: '0 12px 32px rgba(34,197,94,0.42)',
            }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{ textDecoration: 'none', minHeight: '48px', justifyContent: 'center' }}
          >
            Request a Pilot
          </motion.a>

          <motion.a
            href="/about"
            onClick={(e) => { e.preventDefault(); navigate('/about') }}
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              justifyContent: 'center',
              gap:            'var(--space-2)',
              fontSize:       'var(--text-sm)',
              fontWeight:     600,
              color:          'var(--color-text-primary)',
              textDecoration: 'none',
              padding:        '0.75rem 1.5rem',
              minHeight:      '48px',
              border:         '1px solid var(--color-border-default)',
              borderRadius:   'var(--radius-full)',
              background:     'rgba(8, 47, 37, 0.04)',
              cursor:         'pointer',
            }}
            whileHover={shouldReduce ? {} : {
              y: -1,
            }}
            whileTap={shouldReduce ? {} : { scale: 0.98 }}
            transition={{ duration: 0.20, ease: 'easeOut' }}
          >
            Learn More
            <ArrowRight size={14} aria-hidden="true" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Section 2a: Glass Form ────────────────────────────────────────────────────

interface FormState {
  name:        string
  email:       string
  institution: string
  subject:     string
  message:     string
}

function ContactForm() {
  const shouldReduce = useReducedMotion()
  const nameId       = useId()
  const emailId      = useId()
  const instId       = useId()
  const subjectId    = useId()
  const messageId    = useId()

  const [form, setForm]           = useState<FormState>({
    name: '', email: '', institution: '', subject: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused]     = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Contact form submitted:', form)
    setSubmitted(true)
  }

  const inputStyle = (field: string): React.CSSProperties => ({
    width:        '100%',
    background:   focused === field ? 'rgba(34,197,94,0.04)' : 'rgba(255,255,255,0.03)',
    border:       focused === field ? '1px solid var(--color-border-accent)' : '1px solid var(--color-border-strong)',
    borderRadius: 'var(--radius-lg)',
    padding:      '12px 16px',
    fontSize:     'var(--text-sm)',
    color:        'var(--color-text-primary)',
    outline:      'none',
    transition:   'border-color 180ms ease, background 180ms ease',
    boxSizing:    'border-box' as const,
  })

  const labelStyle: React.CSSProperties = {
    display:       'block',
    fontSize:      'var(--text-sm)',
    fontWeight:    'var(--font-medium)',
    color:         'var(--color-text-secondary)',
    marginBottom:  'var(--space-2)',
    letterSpacing: '0.01em',
  }

  const fieldEvents = (field: string) => ({
    onFocus: () => setFocused(field),
    onBlur:  () => setFocused(null),
  })

  return (
    <motion.div
      {...slideUp(shouldReduce, 0.06)}
      id="contact-form"
      style={{
        position:    'relative',
        background:  'var(--color-bg-elevated)',
        border:      '1px solid var(--color-border-default)',
        borderRadius:'var(--radius-xl)',
        boxShadow:   'var(--shadow-card)',
        padding:     'clamp(1.25rem, 4vw, 3rem)',
      }}
    >
      {submitted ? (
        /* Success state */
        <motion.div
          initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            textAlign:      'center',
            padding:        'var(--space-12) 0',
            gap:            'var(--space-4)',
          }}
        >
          <div
            style={{
              width:           56,
              height:          56,
              borderRadius:    '50%',
              background:      'rgba(34,197,94,0.12)',
              border:          '1px solid rgba(34,197,94,0.30)',
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
            }}
          >
            <CheckCircle2 size={26} color="var(--color-accent)" strokeWidth={1.8} />
          </div>
          <h3
            style={{
              fontSize:   'var(--text-xl)',
              fontWeight: 'var(--font-bold)',
              color:      'var(--color-brand-green)',
              margin:     0,
            }}
          >
            Message Sent
          </h3>
          <p
            style={{
              fontSize:   'var(--text-sm)',
              color:      'var(--color-text-inverse)',
              lineHeight: 1.70,
              maxWidth:   340,
              margin:     0,
            }}
          >
            Thank you for reaching out. We'll get back to you within one
            business day.
          </p>
        </motion.div>
      ) : (
        <>
          <motion.h2
            {...fadeUp(shouldReduce, 0.04)}
            style={{
              fontSize:      'var(--text-2xl)',
              fontWeight:    'var(--font-bold)',
              color:         'var(--color-brand-green)',
              marginBottom:  'var(--space-2)',
              letterSpacing: 'var(--tracking-snug)',
            }}
          >
            Send us a message
          </motion.h2>
          <motion.p
            {...fadeUp(shouldReduce, 0.10)}
            style={{
              fontSize:     'var(--text-sm)',
              color:        'var(--color-text-secondary)',
              lineHeight:   1.70,
              marginBottom: 'var(--space-8)',
            }}
          >
            Tell us a little about your institution or enquiry and we'll get
            back to you shortly.
          </motion.p>

          <form onSubmit={handleSubmit} noValidate>

            {/* Row 1 — Name + Email */}
            <motion.div
              {...fadeUp(shouldReduce, 0.14)}
              className="contact-form-row"
            >
              <div>
                <label htmlFor={nameId} style={labelStyle}>
                  Full Name{' '}
                  <span
                    aria-hidden="true"
                    style={{
                      display:      'inline-flex',
                      alignItems:    'center',
                      justifyContent:'center',
                      width:         5,
                      height:        5,
                      minWidth:      5,
                      borderRadius:  '9999px',
                      background:    'var(--color-accent)',
                      flexShrink:    0,
                      verticalAlign: 'middle',
                    }}
                  />
                </label>
                <input
                  id={nameId}
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Ahmed Khan"
                  value={form.name}
                  onChange={handleChange}
                  {...fieldEvents('name')}
                  style={inputStyle('name')}
                />
              </div>
              <div>
                <label htmlFor={emailId} style={labelStyle}>
                  Email Address{' '}
                  <span
                    aria-hidden="true"
                    style={{
                      display:      'inline-flex',
                      alignItems:    'center',
                      justifyContent:'center',
                      width:         5,
                      height:        5,
                      minWidth:      5,
                      borderRadius:  '9999px',
                      background:    'var(--color-accent)',
                      flexShrink:    0,
                      verticalAlign: 'middle',
                    }}
                  />
                </label>
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@institution.edu"
                  value={form.email}
                  onChange={handleChange}
                  {...fieldEvents('email')}
                  style={inputStyle('email')}
                />
              </div>
            </motion.div>

            {/* Row 2 — Institution + Subject */}
            <motion.div
              {...fadeUp(shouldReduce, 0.20)}
              className="contact-form-row"
            >
              <div>
                <label htmlFor={instId} style={labelStyle}>
                  Institution{' '}
                  <span style={{ color: 'var(--color-text-secondary)', fontWeight: 400 }}>
                    (Optional)
                  </span>
                </label>
                <input
                  id={instId}
                  name="institution"
                  type="text"
                  autoComplete="organization"
                  placeholder="University / College / School"
                  value={form.institution}
                  onChange={handleChange}
                  {...fieldEvents('institution')}
                  style={inputStyle('institution')}
                />
              </div>
              <div>
                <label htmlFor={subjectId} style={labelStyle}>
                  Subject{' '}
                  <span
                    aria-hidden="true"
                    style={{
                      display:      'inline-flex',
                      alignItems:    'center',
                      justifyContent:'center',
                      width:         5,
                      height:        5,
                      minWidth:      5,
                      borderRadius:  '9999px',
                      background:    'var(--color-accent)',
                      flexShrink:    0,
                      verticalAlign: 'middle',
                    }}
                  />
                </label>
                <input
                  id={subjectId}
                  name="subject"
                  type="text"
                  required
                  placeholder="e.g. Pilot Request, Partnership…"
                  value={form.subject}
                  onChange={handleChange}
                  {...fieldEvents('subject')}
                  style={inputStyle('subject')}
                />
              </div>
            </motion.div>

            {/* Row 3 — Message */}
            <motion.div
              {...fadeUp(shouldReduce, 0.26)}
              style={{ marginBottom: 'var(--space-7)' }}
            >
              <label htmlFor={messageId} style={labelStyle}>
                Message{' '}
                <span
                  aria-hidden="true"
                  style={{
                    display:      'inline-flex',
                    alignItems:    'center',
                    justifyContent:'center',
                    width:         5,
                    height:        5,
                    minWidth:      5,
                    borderRadius:  '9999px',
                    background:    'var(--color-accent)',
                    flexShrink:    0,
                    verticalAlign: 'middle',
                  }}
                />
              </label>
              <textarea
                id={messageId}
                name="message"
                required
                rows={5}
                placeholder="Tell us what you're looking for…"
                value={form.message}
                onChange={handleChange}
                {...fieldEvents('message')}
                style={{
                  ...inputStyle('message'),
                  resize:     'vertical',
                  minHeight:  128,
                  lineHeight: 1.65,
                  fontFamily: 'inherit',
                }}
              />
            </motion.div>

            {/* Submit row */}
            <motion.div
              {...fadeUp(shouldReduce, 0.32)}
              className="contact-submit-row"
            >
              <motion.button
                type="submit"
                className="btn btn-primary"
                aria-label="Send your message to HumanFirst"
                whileHover={shouldReduce ? {} : {
                  y:         -2,
                  boxShadow: '0 10px 28px rgba(34,197,94,0.40)',
                }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  gap:            'var(--space-2)',
                  minHeight:      '48px',
                  cursor:         'pointer',
                  width:          '100%',
                }}
              >
                Send Message
                <Send size={14} aria-hidden="true" />
              </motion.button>

              <p
                style={{
                  fontSize:   'var(--text-xs)',
                  color:      'var(--color-text-secondary)',
                  lineHeight: 1.55,
                  margin:     0,
                  textAlign:  'center',
                }}
              >
                We typically reply within one business day.
              </p>
            </motion.div>
          </form>
        </>
      )}
    </motion.div>
  )
}

// ─── Section 2b: Info Cards ────────────────────────────────────────────────────

interface InfoCardProps {
  icon:         React.ReactNode
  label:        string
  children:     React.ReactNode
  delay?:       number
  shouldReduce: boolean | null
}

function InfoCard({ icon, label, children, delay = 0, shouldReduce }: InfoCardProps) {
  return (
    <motion.div
      {...fadeUp(shouldReduce, delay)}
      style={{
        display:      'flex',
        alignItems:   'flex-start',
        gap:          'var(--space-4)',
        background:   'var(--color-bg-elevated)',
        border:       '1px solid var(--color-border-default)',
        borderRadius: 'var(--radius-xl)',
        padding:      'var(--space-6)',
        boxShadow:    'var(--shadow-card)',
        width:        '100%',
        boxSizing:    'border-box',
      }}
    >
      {/* Icon badge */}
      <div
        style={{
          width:        40,
          height:       40,
          borderRadius: 'var(--radius-md)',
          background:   'var(--color-accent)',
          border:       '1px solid rgba(202,255,112,0.40)',
          display:      'flex',
          alignItems:   'center',
          justifyContent: 'center',
          flexShrink:   0,
        }}
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize:      'var(--text-xs)',
            fontWeight:    'var(--font-semibold)',
            letterSpacing: 'var(--tracking-widest)',
            textTransform: 'uppercase' as const,
            color:         'var(--color-brand-green)',
            margin:        '0 0 var(--space-1)',
          }}
        >
          {label}
        </p>
        <div
          style={{
            fontSize:   'var(--text-sm)',
            color:      'var(--color-text-secondary)',
            lineHeight: 1.65,
            fontWeight: 'var(--font-medium)',
            wordBreak:  'break-word',
          }}
        >
          {children}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Section 2: Main Layout ────────────────────────────────────────────────────

function ContactMain() {
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="contact-main"
      aria-label="Contact form and information"
      style={{
        position:        'relative',
        backgroundColor: 'var(--color-bg-base)',
        paddingTop:      'var(--space-6)',
        paddingBottom:   'var(--space-24)',
        overflow:        'hidden',
      }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-dots" style={{ opacity: 0.35 }} />
      </div>

      <div className="container-v2" style={{ position: 'relative', zIndex: 1 }}>

        {/* 60/40 grid on desktop · stacked form first, cards below on mobile */}
        <div className="contact-layout-grid">
          <ContactForm />

          {/* Right column — stacked info cards */}
          <div
            style={{
              display:       'flex',
              flexDirection: 'column',
              gap:           'var(--space-4)',
              width:         '100%',
            }}
          >
            <InfoCard
              icon={<Mail size={18} color="var(--color-brand-green)" strokeWidth={1.8} />}
              label="Email"
              delay={0.10}
              shouldReduce={shouldReduce}
            >
              <a
                href="mailto:hello@humanfirst.app"
                style={{
                  color:          'var(--color-text-primary)',
                  textDecoration: 'none',
                  transition:     'color 150ms ease',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = 'var(--color-accent)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = 'var(--color-text-primary)')
                }
              >
                hello@humanfirst.app
              </a>
            </InfoCard>

            <InfoCard
              icon={<MapPin size={18} color="var(--color-brand-green)" strokeWidth={1.8} />}
              label="Location"
              delay={0.18}
              shouldReduce={shouldReduce}
            >
              Faisalabad, Pakistan
            </InfoCard>

            <InfoCard
              icon={<Clock size={18} color="var(--color-brand-green)" strokeWidth={1.8} />}
              label="Response Time"
              delay={0.26}
              shouldReduce={shouldReduce}
            >
              Usually within 24 hours
            </InfoCard>

            <InfoCard
              icon={<Users size={18} color="var(--color-brand-green)" strokeWidth={1.8} />}
              label="Who We Work With"
              delay={0.34}
              shouldReduce={shouldReduce}
            >
              <ul
                style={{
                  margin:        0,
                  padding:       0,
                  listStyle:     'none',
                  display:       'flex',
                  flexDirection: 'column',
                  gap:           4,
                }}
              >
                {[
                  'Universities',
                  'Schools',
                  'Training Institutions',
                  'Education Partners',
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      display:    'flex',
                      alignItems: 'center',
                      gap:        8,
                      fontSize:   'var(--text-sm)',
                      color:      'var(--color-text-secondary)',
                    }}
                  >
                    <span
                      style={{
                        width:        5,
                        height:       5,
                        borderRadius: '9999px',
                        background:   'var(--color-accent)',
                        flexShrink:   0,
                      }}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </InfoCard>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Section 3: FAQ ────────────────────────────────────────────────────────────

interface FaqItem {
  id:       string
  question: string
  answer:   string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'lms',
    question: 'Can HUMΛNF1RST work with our existing LMS?',
    answer:
      'Yes. HUMΛNF1RST is designed to integrate with common Learning Management Systems including Moodle, Canvas, Blackboard, and custom institutional platforms. Our team works with you during onboarding to ensure a smooth integration that fits your existing workflows.',
  },
  {
    id: 'recording',
    question: 'Does HUMΛNF1RST record students?',
    answer:
      'No. HUMΛNF1RST does not record, watch, or surveil students. We create a structured assessment environment that prevents AI-assisted work without any form of video or keystroke monitoring. Student privacy is a core principle — built into every layer of the platform.',
  },
  {
    id: 'pilot',
    question: 'Can we request a pilot programme?',
    answer:
      'Absolutely. We actively encourage institutions to run a pilot before making a full commitment. A pilot lets your educators and students experience HUMΛNF1RST in a low-risk, real-world setting. Use the form above or click "Request a Pilot" to start the conversation.',
  },
  {
    id: 'deployment',
    question: 'How long does deployment usually take?',
    answer:
      'For most institutions, initial deployment takes between one and three weeks depending on your LMS configuration and the number of users. We provide dedicated onboarding support throughout the process to ensure everything runs smoothly from day one.',
  },
]

interface AccordionItemProps {
  item:         FaqItem
  isOpen:       boolean
  onToggle:     () => void
  delay:        number
  shouldReduce: boolean | null
}

function AccordionItem({ item, isOpen, onToggle, delay, shouldReduce }: AccordionItemProps) {
  const headingId = `faq-heading-${item.id}`
  const panelId   = `faq-panel-${item.id}`

  return (
    <motion.div
      {...fadeUp(shouldReduce, delay)}
      style={{
        background:   'var(--color-bg-elevated)',
        border:       '1px solid var(--color-border-default)',
        borderRadius: 'var(--radius-xl)',
        boxShadow:    'var(--shadow-card)',
        overflow:     'hidden',
        transition:   'border-color 220ms ease, background 220ms ease',
        width:        '100%',
      }}
    >
      {/* Question button */}
      <button
        id={headingId}
        aria-controls={panelId}
        aria-expanded={isOpen}
        onClick={onToggle}
        style={{
          width:          '100%',
          minHeight:      '48px',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          gap:            'var(--space-4)',
          padding:        '14px var(--space-6)',
          background:     'none',
          border:         'none',
          cursor:         'pointer',
          textAlign:      'left' as const,
        }}
      >
        <span
          style={{
            fontSize:      'var(--text-base)',
            fontWeight:    isOpen ? 'var(--font-semibold)' : 'var(--font-medium)',
            color:         'var(--color-brand-green)',
            lineHeight:    1.55,
            letterSpacing: '0.005em',
            transition:    'color 200ms ease',
          }}
        >
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{ flexShrink: 0 }}
          aria-hidden="true"
        >
          <ChevronDown
            size={18}
            color={isOpen ? 'var(--color-accent)' : 'var(--color-brand-green)'}
            strokeWidth={2}
          />
        </motion.span>
      </button>

      {/* Answer — animated height */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headingId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height:  { duration: shouldReduce ? 0 : 0.34, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: shouldReduce ? 0 : 0.22, ease: 'easeOut' },
            }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                fontSize:   'var(--text-sm)',
                color:      'var(--color-text-secondary)',
                lineHeight: 1.80,
                margin:     0,
                padding:    '0 var(--space-6) var(--space-6)',
                maxWidth:   '68ch',
              }}
            >
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function ContactFaq() {
  const shouldReduce        = useReducedMotion()
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) =>
    setOpenId((prev) => (prev === id ? null : id))

  return (
    <section
      id="contact-faq"
      aria-labelledby="faq-heading"
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
        <div
          style={{
            position:   'absolute',
            top:        '-5%',
            left:       '50%',
            transform:  'translateX(-50%)',
            width:      '60%',
            height:     280,
            background: 'radial-gradient(ellipse, rgba(34,197,94,0.06) 0%, transparent 70%)',
            filter:     'blur(50px)',
          }}
        />
      </div>

      <div className="container-v2" style={{ position: 'relative', zIndex: 1 }}>

        <motion.div {...fadeUp(shouldReduce, 0)}>
          <SectionBadge>FAQ</SectionBadge>
        </motion.div>

        <motion.h2
          id="faq-heading"
          {...fadeUp(shouldReduce, 0.06)}
          style={{
            fontSize:      'clamp(1.85rem, 4vw, 3.25rem)',
            fontWeight:    'var(--font-extrabold)',
            letterSpacing: 'var(--tracking-tight)',
            lineHeight:    1.08,
            color:         'var(--color-brand-green)',
            marginBottom:  'var(--space-14)',
            maxWidth:      520,
          }}
        >
          Frequently Asked{' '}
          <span className="text-gradient-accent">Questions</span>
        </motion.h2>

        <div
          style={{
            display:       'flex',
            flexDirection: 'column',
            gap:           'var(--space-3)',
            maxWidth:      800,
            width:         '100%',
          }}
        >
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
              delay={0.08 + i * 0.06}
              shouldReduce={shouldReduce}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section 4: Final CTA ──────────────────────────────────────────────────────

function ContactCta() {
  const shouldReduce = useReducedMotion()
  const { go }       = useSmartNavigate()
  const navigate     = useNavigate()

  return (
    <section
      id="contact-cta"
      aria-labelledby="contact-cta-heading"
      style={{
        position:        'relative',
        backgroundColor: 'var(--color-bg-base)',
        paddingTop:      'clamp(4rem, 10vw, 7rem)',
        paddingBottom:   'clamp(4rem, 10vw, 7rem)',
        overflow:        'hidden',
      }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-dots" style={{ opacity: 0.45 }} />
        <motion.div
          animate={shouldReduce ? {} : {
            opacity: [0.60, 0.90, 0.60],
            scale:   [1, 1.08, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position:   'absolute',
            top:        '5%',
            left:       '50%',
            transform:  'translateX(-50%)',
            width:      '75%',
            height:     400,
            background: 'radial-gradient(ellipse, rgba(34,197,94,0.09) 0%, transparent 68%)',
            filter:     'blur(70px)',
          }}
        />
      </div>

      <div className="container-v2" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          {...slideUp(shouldReduce, 0)}
          style={{
            background:  'var(--color-bg-elevated)',
            border:      '1px solid var(--color-border-default)',
            borderRadius:'var(--radius-2xl)',
            boxShadow:   'var(--shadow-card)',
            padding:     'clamp(1.75rem, 5vw, 4rem)',
            textAlign:   'center',
          }}
        >
          <motion.h2
            id="contact-cta-heading"
            {...fadeUp(shouldReduce, 0.06)}
            style={{
              fontSize:      'clamp(1.75rem, 4.5vw, 3.5rem)',
              fontWeight:    'var(--font-extrabold)',
              letterSpacing: 'var(--tracking-tight)',
              lineHeight:    1.08,
              color:         'var(--color-brand-green)',
              marginBottom:  'var(--space-5)',
              maxWidth:      640,
              marginLeft:    'auto',
              marginRight:   'auto',
            }}
          >
            Let's build trusted assessment{' '}
            <span className="text-gradient-accent">together.</span>
          </motion.h2>

          <motion.p
            {...fadeUp(shouldReduce, 0.12)}
            style={{
              fontSize:    'var(--text-base)',
              color:       'var(--color-text-secondary)',
              lineHeight:  1.75,
              maxWidth:    540,
              margin:      '0 auto var(--space-10)',
            }}
          >
            HumanFirst is helping institutions prepare for the future of
            education without compromising student privacy.
          </motion.p>

          <motion.div
            {...fadeUp(shouldReduce, 0.18)}
            className="responsive-btn-group"
            style={{ margin: '0 auto' }}
          >
            <motion.a
              href="/#pilot"
              onClick={(e) => { e.preventDefault(); go('#pilot') }}
              className="btn btn-primary btn-lg"
              aria-label="Request a pilot programme"
              whileHover={shouldReduce ? {} : {
                y:         -2,
                boxShadow: '0 12px 32px rgba(34,197,94,0.42)',
              }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              style={{ textDecoration: 'none', minHeight: '48px', justifyContent: 'center' }}
            >
              Request a Pilot
            </motion.a>

            <motion.a
              href="/about"
              onClick={(e) => { e.preventDefault(); navigate('/about') }}
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                justifyContent: 'center',
                gap:            'var(--space-2)',
                fontSize:       'var(--text-sm)',
                fontWeight:     600,
                color:          'var(--color-text-primary)',
                textDecoration: 'none',
                padding:        '0.75rem 1.5rem',
                minHeight:      '48px',
                border:         '1px solid var(--color-border-default)',
                borderRadius:   'var(--radius-full)',
                background:     'rgba(8, 47, 37, 0.04)',
                cursor:         'pointer',
              }}
              whileHover={shouldReduce ? {} : {
                y: -1,
              }}
              whileTap={shouldReduce ? {} : { scale: 0.98 }}
              transition={{ duration: 0.20, ease: 'easeOut' }}
            >
              About HUMΛNF1RST
              <ArrowRight size={14} aria-hidden="true" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        description="Get in touch with HumanFirst. Request a pilot, ask a question, or explore bringing trusted academic integrity to your institution."
      />
      <ContactHero />
      <ContactMain />
      <ContactFaq />
      <ContactCta />
      <Footer />
    </>
  )
}

export default Contact
