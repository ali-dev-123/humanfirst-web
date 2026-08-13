/**
 * Navbar.tsx — HumanF1RST v2
 *
 * Premium fixed navbar with:
 *   — Transparent when above Hero fold, glass when scrolled ≥20px
 *   — Desktop: hover underline slide + Framer Motion layoutId active indicator
 *   — Mobile: animated hamburger → X + staggered menu panel (AnimatePresence)
 *   — Active section detection via IntersectionObserver + React Router location
 *   — All animations GPU-composited (opacity + transform only)
 *   — prefers-reduced-motion respected
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { MdLogout } from 'react-icons/md'
import { useSmartNavigate } from '../../hooks/useSmartNavigate'
import { useAuth } from '../../context/AuthContext'
import { Link } from "react-router-dom";
import humanFirstLogo1 from '../../assets/human-first-logo-1.png'
// ─── Nav items ─────────────────────────────────────────────────────────────────

interface NavItem {
  label: string
  href: string
  id: string    /* matches section id or page route id */
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/', id: 'home' },
  { label: 'Problem', href: '#problem', id: 'problem' },
  { label: 'Solution', href: '#solution', id: 'solution' },
  { label: 'Privacy', href: '#privacy', id: 'privacy' },
  { label: 'About', href: '/about', id: 'about' },
  { label: 'Contact', href: '/contact', id: 'contact' },
]

// ─── Hooks ─────────────────────────────────────────────────────────────────────

/**
 * Returns true once the page has scrolled past `threshold` pixels.
 * Uses { passive: true } to avoid blocking the scroll thread.
 */
function useScrolled(threshold = 20): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}

/**
 * Tracks which section id is currently most visible in the viewport.
 * Uses IntersectionObserver with a -80px top root margin to account
 * for the fixed navbar height.
 */
function useActiveSection(ids: string[]): string {
  const [activeId, setActiveId] = useState<string>('home')

  useEffect(() => {
    const sectionEls = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (!sectionEls.length) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => ({
            id: entry.target.id,
            ratio: entry.intersectionRatio,
            top: entry.boundingClientRect.top,
          }))

        if (visible.length > 0) {
          visible.sort((a, b) => {
            if (b.ratio !== a.ratio) return b.ratio - a.ratio
            return a.top - b.top
          })

          const nextId = visible[0].id
          setActiveId((current) => (current !== nextId ? nextId : current))
          return
        }

        const above = entries
          .filter((entry) => entry.boundingClientRect.top < 0)
          .sort((a, b) => b.boundingClientRect.top - a.boundingClientRect.top)

        if (above.length > 0) {
          const nextId = above[0].target.id
          setActiveId((current) => (current !== nextId ? nextId : current))
        }
      },
      {
        threshold: [0, 0.15, 0.35, 0.5, 0.75],
        rootMargin: '-80px 0px -55% 0px',
      }
    )

    sectionEls.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return activeId
}

// ─── Sub-components ────────────────────────────────────────────────────────────

/**
 * Logo mark — "Human" regular + "F1RST" green gradient.
 * Non-interactive branding element.
 */
function NavLogo() {
  return (
    <motion.div
      className="nav-logo flex items-center gap-1 select-none"
      transition={{ duration: 0.18, ease: 'easeOut' }}
      style={{ textDecoration: 'none' }}
    >
      <img
        src={humanFirstLogo1}
        alt=""
        style={{
          display: 'block',
          width: 'auto',
          height: 68,
          maxHeight: '100%',
          objectFit: 'contain',
          transform: 'translateX(55px) translateY(-5px)',
        }}
      />
      {/* human-first-logo.png removed from navbar per request; kept only the mark image */}
    </motion.div>
  )
}

/**
 * Single desktop nav link.
 * Integrates useSmartNavigate for smooth cross-page and anchor links.
 */
interface NavLinkProps {
  item: NavItem
  isActive: boolean
}

function NavLink({ item, isActive }: NavLinkProps) {
  const { go } = useSmartNavigate()

  return (
    <a
      href={item.href}
      onClick={(e) => {
        e.preventDefault()
        go(item.href)
      }}
      className="relative group"
      style={{
        fontSize: 'var(--text-sm)',
        fontWeight: isActive ? 'var(--font-semibold)' : 'var(--font-medium)',
        color: isActive
          ? 'var(--color-text-primary)'
          : 'rgba(140, 154, 142, 0.90)',
        letterSpacing: 'var(--tracking-snug)',
        padding: '4px 2px',
        textDecoration: 'none',
        transition: 'color 200ms ease',
        cursor: 'pointer',
      }}
      aria-current={isActive ? 'page' : undefined}
    >
      {item.label}

      {/* Active indicator — layoutId lets Framer Motion animate between links */}
      {isActive && (
        <motion.span
          layoutId="nav-active-indicator"
          className="absolute -bottom-px left-0 right-0"
          style={{
            height: 1.5,
            background: 'var(--color-accent)',
            borderRadius: 1,
          }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        />
      )}

      {/* Hover indicator (non-active only) */}
      {!isActive && (
        <span
          className="
            absolute -bottom-px left-0 right-0
            origin-left scale-x-0 group-hover:scale-x-100
          "
          style={{
            height: 1,
            background: 'rgba(63, 213, 121, 0.45)',
            borderRadius: 1,
            transition: 'transform 220ms cubic-bezier(0.16,1,0.3,1)',
          }}
          aria-hidden="true"
        />
      )}
    </a>
  )
}

/**
 * Animated hamburger button.
 */
interface MenuButtonProps {
  isOpen: boolean
  onClick: () => void
  shouldReduce: boolean | null
  ariaControls?: string
  // accept either nullable or non-nullable ref object shapes to avoid
  // intermittent TS mismatches from different compiler passes
  buttonRef?: React.RefObject<HTMLButtonElement | null> | React.RefObject<HTMLButtonElement>
}

function MenuButton({ isOpen, onClick, shouldReduce, ariaControls, buttonRef }: MenuButtonProps) {
  const dur = shouldReduce ? 0 : 0.22

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      aria-controls={ariaControls}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
      className="relative flex flex-col justify-center items-center"
      style={{
        width: 36,
        height: 36,
        borderRadius: 'var(--radius-md)',
        border: '1px solid',
        borderColor: isOpen
          ? 'rgba(8, 47, 37, 0.16)'
          : 'rgba(8, 47, 37, 0.10)',
        background: isOpen
          ? 'rgba(202, 255, 112, 0.20)'
          : 'transparent',
        transition: 'border-color 200ms ease, background 200ms ease',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      <div
        className="relative"
        style={{ width: 16, height: 12 }}
        aria-hidden="true"
      >
        {/* Top bar */}
        <motion.span
          className="absolute left-0 right-0"
          style={{
            top: 0,
            height: 1.5,
            borderRadius: 1,
            background: 'var(--color-text-primary)',
            transformOrigin: 'center',
          }}
          animate={isOpen
            ? { rotate: 45, y: 5.25, scaleX: 1 }
            : { rotate: 0, y: 0, scaleX: 1 }
          }
          transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Mid bar */}
        <motion.span
          className="absolute left-0 right-0"
          style={{
            top: 5.25,
            height: 1.5,
            borderRadius: 1,
            background: 'var(--color-text-primary)',
          }}
          animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0.4 : 1 }}
          transition={{ duration: dur * 0.7, ease: 'easeOut' }}
        />
        {/* Bottom bar */}
        <motion.span
          className="absolute left-0 right-0"
          style={{
            bottom: 0,
            height: 1.5,
            borderRadius: 1,
            background: 'var(--color-text-primary)',
            transformOrigin: 'center',
          }}
          animate={isOpen
            ? { rotate: -45, y: -5.25, scaleX: 1 }
            : { rotate: 0, y: 0, scaleX: 1 }
          }
          transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </button>
  )
}

/**
 * Mobile menu panel.
 */
interface MobileMenuProps {
  isOpen: boolean
  activeId: string
  onClose: () => void
  shouldReduce: boolean | null
  panelId: string
  // accept either nullable or non-nullable ref object shapes
  firstLinkRef: React.RefObject<HTMLAnchorElement | null> | React.RefObject<HTMLAnchorElement>
  isAuthenticated?: boolean
  user?: { name: string; email: string; picture?: string | null } | null
  onLogout?: () => void
}

const MOBILE_ITEM_VARIANTS = {
  hidden: { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0 },
} as const

const MOBILE_CONTAINER_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
} as const

function MobileMenu({ isOpen, activeId, onClose, shouldReduce, panelId, firstLinkRef, isAuthenticated = false, user, onLogout }: MobileMenuProps) {
  const { go } = useSmartNavigate()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          id={panelId}
          initial={{ opacity: 0, y: shouldReduce ? 0 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: shouldReduce ? 0 : -8 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            maxHeight: 'calc(100vh - 80px)',
            overflowY: 'auto',
            overflowX: 'hidden',
            background: 'rgba(247, 248, 243, 0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(8, 47, 37, 0.08)',
            borderTop: '1px solid rgba(8, 47, 37, 0.06)',
            padding: '16px 24px 28px',
            zIndex: 40,
          }}
        >
          {/* Nav links */}
          <motion.nav
            variants={shouldReduce ? {} : MOBILE_CONTAINER_VARIANTS}
            initial="hidden"
            animate="visible"
            aria-label="Mobile navigation"
          >
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {NAV_ITEMS.map((item) => {
                const isActive = activeId === item.id
                return (
                  <motion.li
                    key={item.id}
                    variants={shouldReduce ? {} : MOBILE_ITEM_VARIANTS}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        onClose()
                        go(item.href)
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '18px 0',
                        fontSize: '18px',
                        fontWeight: 500,
                        color: isActive
                          ? 'var(--color-forest-700)'
                          : 'var(--color-text-secondary)',
                        textDecoration: 'none',
                        borderBottom: '1px solid rgba(8, 47, 37, 0.08)',
                        transition: 'color 200ms ease',
                        cursor: 'pointer',
                      }}
                    >
                      {item.label}
                      {isActive && (
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: 'var(--color-accent)',
                            flexShrink: 0,
                          }}
                          aria-hidden="true"
                        />
                      )}
                    </a>
                  </motion.li>
                )
              })}
            </ul>
          </motion.nav>

          {/* Mobile Action Buttons */}
          {!isAuthenticated ? (
            <motion.div
              variants={shouldReduce ? {} : MOBILE_ITEM_VARIANTS}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                marginTop: 20,
              }}
            >
              <a
                ref={firstLinkRef}
                href="#opportunity"
                onClick={(e) => {
                  e.preventDefault()
                  onClose()
                  go('#opportunity')
                }}
                className="inline-flex items-center justify-center w-full h-[48px] px-[20px] text-[15px] font-semibold text-[var(--color-forest-700)] bg-transparent border border-[rgba(8,47,37,0.14)] hover:border-[var(--color-forest-700)] hover:text-[var(--color-forest-700)] hover:bg-[rgba(202,255,112,0.24)] rounded-[10px] transition-all duration-200 cursor-pointer select-none no-underline text-center"
              >
                For Investors
              </a>

              <a
                href="#pilot"
                onClick={(e) => {
                  e.preventDefault()
                  onClose()
                  go('#pilot')
                }}
                className="inline-flex items-center justify-center w-full h-[48px] px-[20px] text-[15px] font-semibold text-[var(--color-forest-900)] bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] rounded-[10px] shadow-sm transition-all duration-200 cursor-pointer select-none no-underline text-center"
              >
                Request a Pilot
              </a>

              <Link
                to="/login"
                onClick={onClose}
                className="inline-flex items-center justify-center w-full h-[48px] px-[20px] text-[15px] font-semibold text-[var(--color-forest-700)] bg-transparent border border-[rgba(8,47,37,0.14)] hover:border-[var(--color-forest-700)] hover:text-[var(--color-forest-700)] hover:bg-[rgba(202,255,112,0.24)] rounded-[10px] transition-all duration-200 cursor-pointer select-none no-underline text-center"
              >
                Login
              </Link>
            </motion.div>
          ) : (
            <UserAccountDropdown
              isMobile={true}
              userName={user?.name}
              userEmail={user?.email}
              userImage={user?.picture}
              onLogout={onLogout || (() => {})}
              onClose={onClose}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── User Account Dropdown ──────────────────────────────────────────────────────

interface UserAccountDropdownProps {
  onLogout: () => void
  userName?: string
  userEmail?: string
  userImage?: string | null
  isMobile?: boolean
  onClose?: () => void
}

function UserAccountDropdown({
  onLogout,
  userName,
  userEmail,
  userImage,
  isMobile = false,
  onClose,
}: UserAccountDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [imageError, setImageError] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { go } = useSmartNavigate()

  const avatarLetter = userName?.charAt(0)?.toUpperCase() || 'U'
  const avatarSrc = userImage && !imageError ? userImage : undefined

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handleLogout = () => {
    setIsOpen(false)
    onLogout()
  }

  const renderAvatar = (size: number) => (
    <div
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: avatarSrc ? 'transparent' : 'linear-gradient(135deg, rgba(202,255,112,0.3), rgba(26,95,76,0.18))',
        border: '1.5px solid rgba(8, 47, 37, 0.1)',
        boxShadow: '0 1px 3px rgba(8,47,37,0.08)',
        flexShrink: 0,
      }}
    >
      {avatarSrc ? (
        <img
          src={avatarSrc}
          alt={userName ? `${userName} avatar` : 'User avatar'}
          onError={() => setImageError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      ) : (
        <span
          style={{
            fontSize: size > 38 ? '15px' : '12px',
            fontWeight: 700,
            color: '#082F25',
            lineHeight: 1,
          }}
        >
          {avatarLetter}
        </span>
      )}
    </div>
  )

  if (isMobile) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          marginTop: 20,
          borderTop: '1px solid rgba(8, 47, 37, 0.08)',
          paddingTop: 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 4px',
          }}
        >
          {renderAvatar(42)}
          <div
            style={{
              minWidth: 0,
              flex: 1,
            }}
          >
            {userName && (
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.3,
                  overflowWrap: 'anywhere',
                }}
              >
                {userName}
              </div>
            )}
            {userEmail && (
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                  marginTop: 4,
                  lineHeight: 1.4,
                  overflowWrap: 'anywhere',
                }}
              >
                {userEmail}
              </div>
            )}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(8, 47, 37, 0.08)', paddingTop: 12 }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              width: '100%',
              minHeight: '48px',
              padding: '12px 14px',
              borderRadius: '10px',
              border: '1px solid rgba(8, 47, 37, 0.08)',
              background: 'rgba(249, 250, 251, 0.8)',
              color: '#082F25',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 200ms ease, border-color 200ms ease',
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLButtonElement
              target.style.background = 'rgba(202, 255, 112, 0.14)'
              target.style.borderColor = 'rgba(8,47,37,0.18)'
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLButtonElement
              target.style.background = 'rgba(249, 250, 251, 0.8)'
              target.style.borderColor = 'rgba(8, 47, 37, 0.08)'
            }}
          >
            <MdLogout style={{ fontSize: '16px', flexShrink: 0 }} />
            Logout
          </button>
        </div>

        <a
          href="#pilot"
          onClick={(e) => {
            e.preventDefault()
            onClose?.()
            go('#pilot')
          }}
          className="inline-flex items-center justify-center w-full h-[48px] px-[20px] text-[15px] font-semibold text-[var(--color-forest-900)] bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] rounded-[10px] shadow-sm transition-all duration-200 cursor-pointer select-none no-underline text-center"
        >
          Request a Pilot
        </a>
      </div>
    )
  }

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 42,
          height: 42,
          borderRadius: '50%',
          padding: 0,
          background: 'rgba(202, 255, 112, 0.18)',
          border: '1.5px solid rgba(8, 47, 37, 0.08)',
          cursor: 'pointer',
          transition: 'transform 180ms ease, box-shadow 180ms ease',
          boxShadow: isOpen ? '0 0 0 3px rgba(202,255,112,0.18)' : '0 2px 8px rgba(8,47,37,0.08)',
          overflow: 'hidden',
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-expanded={isOpen}
        aria-label="User account menu"
      >
        {renderAvatar(42)}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              minWidth: 268,
              background: 'rgba(255, 255, 255, 0.98)',
              border: '1px solid #ECECEC',
              borderRadius: '16px',
              boxShadow: '0 12px 32px rgba(8, 47, 37, 0.12)',
              zIndex: 1000,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 14px 12px',
              }}
            >
              {renderAvatar(42)}
              <div
                style={{
                  minWidth: 0,
                  flex: 1,
                }}
              >
                {userName && (
                  <div
                    style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#111827',
                      lineHeight: 1.3,
                      overflowWrap: 'anywhere',
                    }}
                  >
                    {userName}
                  </div>
                )}
                {userEmail && (
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#6B7280',
                      marginTop: 3,
                      lineHeight: 1.4,
                      overflowWrap: 'anywhere',
                      wordBreak: 'break-word',
                    }}
                  >
                    {userEmail}
                  </div>
                )}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #ECECEC' }} />

            <div style={{ padding: '8px 8px 10px' }}>
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  minHeight: '44px',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'transparent',
                  color: '#082F25',
                  fontSize: '14px',
                  fontWeight: 600,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'background 200ms ease, color 200ms ease',
                }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget as HTMLButtonElement
                  target.style.background = 'rgba(202, 255, 112, 0.14)'
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLButtonElement
                  target.style.background = 'transparent'
                }}
              >
                <MdLogout style={{ fontSize: '16px', flexShrink: 0 }} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main Navbar ────────────────────────────────────────────────────────────────

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolled(20)
  const shouldReduce = useReducedMotion()
  const location = useLocation()
  const { go } = useSmartNavigate()
  const { isAuthenticated, user, logout } = useAuth()
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null)
  const mobileMenuFirstLinkRef = useRef<HTMLAnchorElement | null>(null)
  const prevMenuOpenRef = useRef(menuOpen)

  useEffect(() => {
    if (menuOpen && !prevMenuOpenRef.current) {
      mobileMenuFirstLinkRef.current?.focus()
    } else if (!menuOpen && prevMenuOpenRef.current) {
      mobileMenuButtonRef.current?.focus()
    }
    prevMenuOpenRef.current = menuOpen
  }, [menuOpen])

  const isAuthPage = ['/login', '/signup', '/forgot-password', '/reset-email-sent', '/reset-password', '/password-changed'].some((path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  })

  const currentHash = location.hash || ''
  const sectionIds = ['hero', 'problem', 'solution', 'privacy']
  const activeSectionId = useActiveSection(sectionIds)

  /* Active navigation state for current page or section */
  let activeId = 'home'
  if (location.pathname === '/about') {
    activeId = 'about'
  } else if (location.pathname === '/contact') {
    activeId = 'contact'
  } else if (location.pathname === '/') {
    if (currentHash === '#problem') {
      activeId = 'problem'
    } else if (currentHash === '#solution') {
      activeId = 'solution'
    } else if (currentHash === '#privacy') {
      activeId = 'privacy'
    } else if (activeSectionId === 'problem' || activeSectionId === 'solution' || activeSectionId === 'privacy') {
      activeId = activeSectionId
    } else {
      activeId = 'home'
    }
  }

  /* Close mobile menu on Escape */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setMenuOpen(false)
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  /* Close mobile menu on resize to ≥md */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const handler = (e: MediaQueryListEvent) => { if (e.matches) setMenuOpen(false) }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <motion.header
      role="banner"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: isAuthPage
          ? 'rgba(247, 248, 243, 0.86)'
          : scrolled
            ? 'rgba(247, 248, 243, 0.86)'
            : 'transparent',
        backdropFilter: isAuthPage ? 'blur(20px)' : scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isAuthPage ? 'blur(20px)' : scrolled ? 'blur(20px)' : 'none',
        borderBottom: isAuthPage
          ? '1px solid rgba(16, 32, 26, 0.08)'
          : '1px solid var(--color-brand-green)',
        transition: [
          'background 300ms ease',
          'backdrop-filter 300ms ease',
          '-webkit-backdrop-filter 300ms ease',
          'border-color 300ms ease',
        ].join(', '),
      }}
      initial={{ y: shouldReduce ? 0 : -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="container-v2"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
        }}
      >
        {/* ── Logo ── */}
        <NavLogo />

        {/* ── Desktop Navigation ── */}
        {!isAuthPage && (
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center"
            style={{ gap: 32 }}
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.id}
                item={item}
                isActive={activeId === item.id}
              />
            ))}
          </nav>
        )}

        {/* ── Desktop Actions ── */}
        <div className="hidden md:flex items-center" style={{ gap: 16, ...(isAuthPage ? { marginLeft: 'auto' } : {}) }}>
          {!isAuthPage && (
            <>
              <motion.a
                href="#opportunity"
                onClick={(e) => {
                  e.preventDefault()
                  go('#opportunity')
                }}
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-semibold)',
                  color: 'var(--color-text-secondary)',
                  letterSpacing: '0.01em',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  marginLeft: 32,
                  whiteSpace: 'nowrap',
                }}
                whileHover={{ color: 'var(--color-forest-700)' }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                For Investors
              </motion.a>

              <motion.a
                href="/contact#request-pilot"
                onClick={(e) => {
                  e.preventDefault()
                  go('/contact#request-pilot')
                }}
                className="btn btn-primary btn-sm h-[38px]"
                aria-label="Request a pilot programme"
                whileHover={{
                  y: -1,
                  boxShadow: '0 6px 20px rgba(202, 255, 112, 0.34)',
                }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                style={{ textDecoration: 'none', cursor: 'pointer' }}
              >
                Request a Pilot
              </motion.a>
            </>
          )}

          {isAuthenticated ? (
            <UserAccountDropdown
              userName={user?.name}
              userEmail={user?.email}
              onLogout={logout}
            />
          ) : (
            <Link
              to={isAuthPage ? '/' : '/login'}
              className="inline-flex items-center justify-center w-[110px] h-[38px] text-[15px] font-semibold transition-all duration-200 cursor-pointer select-none no-underline text-center"
              style={{
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-forest-700)',
                background: 'transparent',
                border: '1px solid rgba(8, 47, 37, 0.12)',
                transition: 'background 200ms ease, transform 200ms ease, border-color 200ms ease, color 200ms ease',
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLAnchorElement
              target.style.background = 'rgba(202, 255, 112, 0.12)'
              target.style.borderColor = 'rgba(8, 47, 37, 0.18)'
              target.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLAnchorElement
              target.style.background = 'transparent'
              target.style.borderColor = 'rgba(8, 47, 37, 0.12)'
              target.style.transform = 'none'
            }}
          >
            {isAuthPage ? 'Back to Home' : 'Login'}
            </Link>
          )}
        </div>

        {/* ── Mobile: Menu Button ── */}
        <div className="md:hidden">
          <MenuButton
            isOpen={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            shouldReduce={shouldReduce}
            ariaControls="mobile-menu-panel"
            buttonRef={mobileMenuButtonRef}
          />
        </div>
      </div>

      {/* ── Mobile Menu Panel ── */}
      <MobileMenu
        isOpen={menuOpen}
        activeId={activeId}
        onClose={() => setMenuOpen(false)}
        shouldReduce={shouldReduce}
        panelId="mobile-menu-panel"
        firstLinkRef={mobileMenuFirstLinkRef}
        isAuthenticated={isAuthenticated}
        user={user || undefined}
        onLogout={logout}
      />
    </motion.header>
  )
}

export default Navbar