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
 * Backend:
 *   POST /api/contact
 *
 * Google Sheets:
 *   Backend handles saving the submission to Google Sheets.
 */

import { useState, useId, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Send,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
} from 'lucide-react'
import { IoTimeSharp } from 'react-icons/io5'
import { FaLocationDot } from 'react-icons/fa6'
import { MdEmail, MdPeople } from 'react-icons/md'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSmartNavigate } from '../hooks/useSmartNavigate'
import Seo from '../components/Seo'
import Footer from '../components/layout/Footer'

const CONTACT_CARD_ICON_SIZE = 22.68

// Use your local backend in development.
// For production, set VITE_API_BASE_URL in the frontend .env.
const API_BASE =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

// ─── Shared animation helpers ──────────────────────────────────────────────────

function fadeUp(shouldReduce: boolean | null, delay = 0) {
  return {
    initial: { opacity: 0, y: shouldReduce ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px 0px' },
    transition: {
      duration: 0.55,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }
}

function slideUp(shouldReduce: boolean | null, delay = 0) {
  return {
    initial: { opacity: 0, y: shouldReduce ? 0 : 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px 0px' },
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
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        padding: '5px 14px',
        borderRadius: 'var(--radius-full)',
        border: '1px solid rgba(8,47,37,0.10)',
        background: 'var(--color-accent)',
        marginBottom: 'var(--space-10)',
      }}
    >
      <span
        className="animate-pulse"
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: 'var(--color-brand-green)',
          flexShrink: 0,
        }}
        aria-hidden="true"
      />

      <span
        style={{
          fontSize: 'var(--text-xs)',
          fontWeight: 'var(--font-semibold)',
          letterSpacing: 'var(--tracking-widest)',
          textTransform: 'uppercase' as const,
          color: 'var(--color-brand-green)',
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
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { go } = useSmartNavigate()

  const handleRequestPilot = () => {
    if (pathname === '/contact') {
      // Already on Contact page — just navigate to the form hash
      navigate('#request-pilot', { replace: true })
      const el = document.getElementById('contact-form')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      // Navigate to Contact page with request-pilot flag
      go('/contact#request-pilot')
    }
  }

  return (
    <section
      id="contact-hero"
      aria-labelledby="contact-hero-heading"
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-bg-base)',
        paddingTop: 'clamp(5.25rem, 10vw, 8rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-dots" style={{ opacity: 0.45 }} />

        {/* Central radial glow */}
        <motion.div
          animate={
            shouldReduce
              ? {}
              : {
                  opacity: [0.55, 0.80, 0.55],
                  scale: [1, 1.08, 1],
                }
          }
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '70%',
            height: 420,
            background:
              'radial-gradient(ellipse, rgba(34,197,94,0.10) 0%, transparent 68%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Soft left ambient */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '-10%',
            width: 400,
            height: 400,
            background:
              'radial-gradient(ellipse, rgba(34,197,94,0.05) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div
        className="container-v2"
        style={{ position: 'relative', zIndex: 1 }}
      >
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
            fontSize: 'clamp(2.25rem, 6.5vw, 5.5rem)',
            fontWeight: 'var(--font-extrabold)',
            letterSpacing: 'var(--tracking-tight)',
            lineHeight: 1.04,
            color: 'var(--color-brand-green)',
            margin: '0 auto var(--space-5)',
            maxWidth: 680,
          }}
        >
          Let's <span className="text-gradient-accent">Talk.</span>
        </motion.h1>

        {/* Supporting text */}
        <motion.p
          {...fadeUp(shouldReduce, 0.16)}
          style={{
            fontSize: 'clamp(var(--text-base), 2vw, var(--text-lg))',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.75,
            maxWidth: 560,
            width: '100%',
            margin: '0 auto var(--space-8)',
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
            href="/contact#request-pilot"
            onClick={(e) => {
              e.preventDefault()
              handleRequestPilot()
            }}
            className="btn btn-primary btn-lg"
            aria-label="Go to contact form"
            whileHover={
              shouldReduce
                ? {}
                : {
                    y: -2,
                    boxShadow: '0 12px 32px rgba(202,255,112,0.42)',
                  }
            }
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              textDecoration: 'none',
              minHeight: '48px',
              justifyContent: 'center',
            }}
          >
            Request a Pilot
          </motion.a>

          <motion.a
            href="/about"
            onClick={(e) => {
              e.preventDefault()
              navigate('/about')
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-2)',
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              textDecoration: 'none',
              padding: '0.75rem 1.5rem',
              minHeight: '48px',
              border: '1px solid var(--color-border-default)',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(8, 47, 37, 0.04)',
              cursor: 'pointer',
            }}
            whileHover={shouldReduce ? {} : { y: -1 }}
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
  name: string
  email: string
  institution: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

// Simple email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email)
}

// Checks that a string contains no digits (0-9)
function containsNumbers(value: string): boolean {
  return /\d/.test(value)
}

function ContactForm() {
  const shouldReduce = useReducedMotion()

  const nameId = useId()
  const emailId = useId()
  const instId = useId()
  const subjectId = useId()
  const messageId = useId()

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    institution: '',
    subject: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const fieldName = e.target.name
    setForm((prev) => ({
      ...prev,
      [fieldName]: e.target.value,
    }))

    // Clear error for this field when user starts editing
    if (errors[fieldName as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: undefined,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSubmitting) return

    const newErrors: FormErrors = {}

    // Validate name
    if (!form.name.trim()) {
      newErrors.name = 'Please enter your full name.'
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.'
    } else if (containsNumbers(form.name)) {
      newErrors.name = 'Name should not contain numbers.'
    }

    // Validate email
    if (!form.email.trim()) {
      newErrors.email = 'Please enter your email address.'
    } else if (!validateEmail(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address.'
    }

    // Validate subject
    if (!form.subject.trim()) {
      newErrors.subject = 'Please enter a subject.'
    } else if (form.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters.'
    } else if (containsNumbers(form.subject)) {
      newErrors.subject = 'Subject should not contain numbers.'
    }

    // Validate message
     if (!form.message.trim()) {
      newErrors.message = 'Please enter your message.'
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.'
    } else if (form.message.trim().length > 2000) {
      newErrors.message = 'Message must be less than 2000 characters.'
    }

    // If there are any errors, display them and don't submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Clear errors if validation passed
    setErrors({})
    setIsSubmitting(true)

    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          institution: form.institution.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      })

      let data: {
        success?: boolean
        message?: string
        error?: string
      } | null = null

      try {
        data = await response.json()
      } catch {
        data = null
      }

      // Handle duplicate email specifically — show it under the Email field
      if (response.status === 409 && data?.error === 'DUPLICATE_EMAIL') {
        setErrors({
          email:
            data.message ||
            "This email has already submitted a message. We'll be in touch soon.",
        })
        return
      }

      if (!response.ok) {
        throw new Error(
          data?.message || 'Unable to send your message. Please try again.'
        )
      }

      if (data?.success === false) {
        throw new Error(
          data.message || 'Unable to send your message. Please try again.'
        )
      }

      // Only show success after backend confirms the submission.
      setSubmitted(true)

      // Reset the form after successful submission.
      setForm({
        name: '',
        email: '',
        institution: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      console.error('Contact form submission error:', error)

      // Show error at top of form or in a field-specific way
      if (error instanceof TypeError) {
        setErrors({
          name: 'Unable to connect to the server. Please make sure the backend is running.',
        })
      } else {
        setErrors({
          name: error instanceof Error
            ? error.message
            : 'Unable to send your message. Please try again.',
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputStyle = (field: string): React.CSSProperties => {
    const hasError = Boolean(errors[field as keyof FormErrors])
    return {
      width: '100%',
      background:
        focused === field
          ? 'rgba(34,197,94,0.04)'
          : 'rgba(255,255,255,0.03)',
      border:
        hasError
          ? '1px solid rgba(248,113,113,0.50)'
          : focused === field
            ? '1px solid var(--color-accent)'
            : '1px solid var(--color-border-strong)',
      borderRadius: 'var(--radius-lg)',
      padding: '12px 16px',
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text-primary)',
      outline: 'none',
      transition: 'border-color 180ms ease, background 180ms ease',
      boxSizing: 'border-box' as const,
    }
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--font-medium)',
    color: 'var(--color-text-secondary)',
    marginBottom: 'var(--space-2)',
    letterSpacing: '0.01em',
  }

  const fieldEvents = (field: string) => ({
    onFocus: () => setFocused(field),
    onBlur: () => setFocused(null),
  })

  return (
    <motion.div
      {...slideUp(shouldReduce, 0.06)}
      id="contact-form"
      style={{
        position: 'relative',
        background: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-accent)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-card)',
        padding: 'clamp(1rem, 3vw, 2.25rem)',
      }}
    >
      {submitted ? (
        /* Success state */
        <motion.div
          initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: 'var(--space-12) 0',
            gap: 'var(--space-4)',
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'rgba(34,197,94,0.12)',
              border: '1px solid rgba(34,197,94,0.30)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckCircle2
              size={26}
              color="var(--color-brand-green)"
              strokeWidth={1.8}
            />
          </div>

          <h3
            style={{
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-brand-green)',
              margin: 0,
            }}
          >
            Message Sent
          </h3>

          <p
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-inverse)',
              lineHeight: 1.70,
              maxWidth: 340,
              margin: 0,
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
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-brand-green)',
              marginBottom: 'var(--space-2)',
              letterSpacing: 'var(--tracking-snug)',
            }}
          >
            Send us a message
          </motion.h2>

          <motion.p
            {...fadeUp(shouldReduce, 0.10)}
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.70,
              marginBottom: 'var(--space-6)',
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
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 5,
                      height: 5,
                      minWidth: 5,
                      borderRadius: '9999px',
                      background: 'var(--color-accent)',
                      flexShrink: 0,
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
                  aria-invalid={Boolean(errors.name)}
                />

                {errors.name && (
                  <div
                    role="alert"
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: '#F87171',
                      marginTop: '4px',
                      lineHeight: 1.4,
                    }}
                  >
                    {errors.name}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor={emailId} style={labelStyle}>
                  Email Address{' '}
                  <span
                    aria-hidden="true"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 5,
                      height: 5,
                      minWidth: 5,
                      borderRadius: '9999px',
                      background: 'var(--color-accent)',
                      flexShrink: 0,
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
                  aria-invalid={Boolean(errors.email)}
                />

                {errors.email && (
                  <div
                    role="alert"
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: '#F87171',
                      marginTop: '4px',
                      lineHeight: 1.4,
                    }}
                  >
                    {errors.email}
                  </div>
                )}
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
                  <span
                    style={{
                      color: 'var(--color-text-secondary)',
                      fontWeight: 400,
                    }}
                  >
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
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 5,
                      height: 5,
                      minWidth: 5,
                      borderRadius: '9999px',
                      background: 'var(--color-accent)',
                      flexShrink: 0,
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
                  aria-invalid={Boolean(errors.subject)}
                />

                {errors.subject && (
                  <div
                    role="alert"
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: '#F87171',
                      marginTop: '4px',
                      lineHeight: 1.4,
                    }}
                  >
                    {errors.subject}
                  </div>
                )}
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
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 5,
                    height: 5,
                    minWidth: 5,
                    borderRadius: '9999px',
                    background: 'var(--color-accent)',
                    flexShrink: 0,
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
                  resize: 'vertical',
                  minHeight: 128,
                  lineHeight: 1.65,
                  fontFamily: 'inherit',
                }}
                aria-invalid={Boolean(errors.message)}
              />

              {errors.message && (
                <div
                  role="alert"
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: '#F87171',
                    marginTop: '4px',
                    lineHeight: 1.4,
                  }}
                >
                  {errors.message}
                </div>
              )}
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
                disabled={isSubmitting}
                whileHover={
                  shouldReduce || isSubmitting
                    ? {}
                    : {
                        y: -2,
                        boxShadow: '0 10px 28px rgba(34,197,94,0.40)',
                      }
                }
                transition={{ duration: 0.22, ease: 'easeOut' }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-2)',
                  minHeight: '48px',
                  cursor: isSubmitting ? 'wait' : 'pointer',
                  width: '100%',
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}

                {!isSubmitting && (
                  <Send size={14} aria-hidden="true" />
                )}
              </motion.button>

              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.55,
                  margin: 0,
                  textAlign: 'center',
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
  icon: React.ReactNode
  label: string
  children: React.ReactNode
  delay?: number
  shouldReduce: boolean | null
}

function InfoCard({
  icon,
  label,
  children,
  delay = 0,
  shouldReduce,
}: InfoCardProps) {
  return (
    <motion.div
      {...fadeUp(shouldReduce, delay)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--space-4)',
        background: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-accent)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-6)',
        boxShadow: 'var(--shadow-card)',
        width: '100%',
        boxSizing: 'border-box',
      }}
      whileHover={
        shouldReduce
          ? {}
          : {
              y: -4,
              boxShadow: [
                'var(--shadow-xl)',
                '0 0 60px 0 rgba(202, 255, 112, 0.16)',
                '0 0 0 1px rgba(202, 255, 112, 0.30)',
              ].join(', '),
            }
      }
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      {/* Icon badge */}
      <motion.div
        style={{
          width: 40,
          height: 40,
          borderRadius: 'var(--radius-md)',
          background: 'transparent',
          border: '1px solid #32CD32',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
        aria-hidden="true"
        whileHover={shouldReduce ? {} : { scale: 1.10 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        {icon}
      </motion.div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--font-semibold)',
            letterSpacing: 'var(--tracking-widest)',
            textTransform: 'uppercase' as const,
            color: 'var(--color-brand-green)',
            margin: '0 0 var(--space-1)',
          }}
        >
          {label}
        </p>

        <div
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.65,
            fontWeight: 'var(--font-medium)',
            wordBreak: 'break-word',
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
        position: 'relative',
        backgroundColor: 'var(--color-bg-base)',
        paddingTop: 'var(--space-4)',
        paddingBottom: 'var(--space-20)',
        overflow: 'hidden',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-dots" style={{ opacity: 0.35 }} />
      </div>

      <div
        className="container-v2"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div className="contact-layout-grid">
          <ContactForm />

          {/* Right column — stacked info cards */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
              width: '100%',
            }}
          >
            <InfoCard
              icon={
                <MdEmail
                  size={CONTACT_CARD_ICON_SIZE}
                  color="var(--color-brand-green)"
                />
              }
              label="Email"
              delay={0.10}
              shouldReduce={shouldReduce}
            >
              <a
                href="mailto:hello@humanfirst.app"
                style={{
                  textDecoration: 'none',
                  transition: 'color 150ms ease',
                }}
              >
                hello@humanfirst.app
              </a>
            </InfoCard>

            <InfoCard
              icon={
                <FaLocationDot
                  size={CONTACT_CARD_ICON_SIZE}
                  color="var(--color-brand-green)"
                />
              }
              label="Location"
              delay={0.18}
              shouldReduce={shouldReduce}
            >
              Faisalabad, Pakistan
            </InfoCard>

            <InfoCard
              icon={
                <IoTimeSharp
                  size={CONTACT_CARD_ICON_SIZE}
                  color="var(--color-brand-green)"
                />
              }
              label="Response Time"
              delay={0.26}
              shouldReduce={shouldReduce}
            >
              Usually within 24 hours
            </InfoCard>

            <InfoCard
              icon={
                <MdPeople
                  size={CONTACT_CARD_ICON_SIZE}
                  color="var(--color-brand-green)"
                />
              }
              label="Who We Work With"
              delay={0.34}
              shouldReduce={shouldReduce}
            >
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
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
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: '9999px',
                        background: 'var(--color-accent)',
                        flexShrink: 0,
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
  id: string
  question: string
  answer: string
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
  item: FaqItem
  isOpen: boolean
  onToggle: () => void
  delay: number
  shouldReduce: boolean | null
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
  delay,
  shouldReduce,
}: AccordionItemProps) {
  const headingId = `faq-heading-${item.id}`
  const panelId = `faq-panel-${item.id}`

  return (
    <motion.div
      {...fadeUp(shouldReduce, delay)}
      style={{
        background: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-accent)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden',
        transition: 'border-color 220ms ease, background 220ms ease',
        width: '100%',
      }}
    >
      <button
        id={headingId}
        aria-controls={panelId}
        aria-expanded={isOpen}
        onClick={onToggle}
        style={{
          width: '100%',
          minHeight: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-4)',
          padding: '14px var(--space-6)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left' as const,
        }}
      >
        <span
          style={{
            fontSize: 'var(--text-base)',
            fontWeight: isOpen
              ? 'var(--font-semibold)'
              : 'var(--font-medium)',
            color: 'var(--color-brand-green)',
            lineHeight: 1.55,
            letterSpacing: '0.005em',
            transition: 'color 200ms ease',
          }}
        >
          {item.question}
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{
            duration: shouldReduce ? 0 : 0.28,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ flexShrink: 0 }}
          aria-hidden="true"
        >
          <ChevronDown
            size={18}
            color={
              isOpen
                ? 'var(--color-accent)'
                : 'var(--color-brand-green)'
            }
            strokeWidth={2}
          />
        </motion.span>
      </button>

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
              height: {
                duration: shouldReduce ? 0 : 0.34,
                ease: [0.16, 1, 0.3, 1],
              },
              opacity: {
                duration: shouldReduce ? 0 : 0.22,
                ease: 'easeOut',
              },
            }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.80,
                margin: 0,
                padding: '0 var(--space-6) var(--space-6)',
                maxWidth: '68ch',
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
  const shouldReduce = useReducedMotion()
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) =>
    setOpenId((prev) => (prev === id ? null : id))

  return (
    <section
      id="contact-faq"
      style={{
        backgroundColor: 'var(--color-bg-base)',
        padding: 'var(--space-20) 0',
      }}
    >
      <div className="container-v2">
        <motion.div
          {...fadeUp(shouldReduce, 0)}
          style={{
            textAlign: 'center',
            marginBottom: 'var(--space-8)',
          }}
        >
          <SectionBadge>FAQ</SectionBadge>

          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 'var(--font-extrabold)',
              color: 'var(--color-brand-green)',
              margin: 0,
            }}
          >
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            maxWidth: 900,
            margin: '0 auto',
          }}
        >
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
              delay={index * 0.06}
              shouldReduce={shouldReduce}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section 4: CTA ────────────────────────────────────────────────────────────

function ContactCta() {
  const shouldReduce = useReducedMotion()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { go } = useSmartNavigate()

  const handleRequestPilot = () => {
    if (pathname === '/contact') {
      // Already on Contact page — just navigate to the form hash
      navigate('#request-pilot', { replace: true })
      const el = document.getElementById('contact-form')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      // Navigate to Contact page with request-pilot flag
      go('/contact#request-pilot')
    }
  }

  return (
    <section
      style={{
        backgroundColor: 'var(--color-bg-base)',
        padding: '0 0 var(--space-20)',
      }}
    >
      <div className="container-v2">
        <motion.div
          {...fadeUp(shouldReduce, 0)}
          style={{
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center',
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-accent)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-card)',
            padding: 'clamp(2rem, 6vw, 5rem)',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background:
                'radial-gradient(circle at center, rgba(34,197,94,0.08), transparent 65%)',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <SectionBadge>Start a conversation</SectionBadge>

            <h2
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 'var(--font-extrabold)',
                color: 'var(--color-brand-green)',
                margin: '0 0 var(--space-4)',
              }}
            >
              Ready to explore HUMΛNF1RST?
            </h2>

            <p
              style={{
                maxWidth: 650,
                margin: '0 auto var(--space-8)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.75,
              }}
            >
              Tell us about your institution and we'll help you understand
              how HUMΛNF1RST can fit into your assessment workflow.
            </p>

            <motion.a
              href="/contact#request-pilot"
              onClick={(e) => {
                e.preventDefault()
                handleRequestPilot()
              }}
              className="btn btn-primary btn-lg"
              style={{
                display: 'inline-flex',
                textDecoration: 'none',
              }}
              whileHover={
                shouldReduce
                  ? {}
                  : {
                      y: -2,
                      boxShadow: '0 12px 32px rgba(202,255,112,0.42)',
                    }
              }
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              Request a Pilot
              <ArrowRight size={15} aria-hidden="true" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Contact() {
  const { hash } = useLocation()

  useEffect(() => {
    // If navigated with #request-pilot hash, scroll to the form
    if (hash === '#request-pilot') {
      // Use a small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        const formEl = document.getElementById('contact-form')
        if (formEl) {
          formEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [hash])

  return (
    <>
      <Seo
        title="Contact | HumanF1RST"
        description="Get in touch with HumanF1RST."
      />

      <ContactHero />
      <ContactMain />
      <ContactFaq />
      <ContactCta />
      <Footer />
    </>
  )
}