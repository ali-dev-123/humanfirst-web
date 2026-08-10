/**
 * AuthNavbar.tsx — HumanF1RST Phase 1
 * Isolated minimal navigation bar for authentication pages (/login and /signup).
 *
 * Requirements:
 * - Height: 72px (h-[72px])
 * - LEFT: HumanF1RST Logo
 * - RIGHT: Rectangular "Back to Home" button navigating to "/"
 * - No navigation links, no investors, no CTA buttons.
 * - Mobile responsive (320px+ support, no overflow)
 */

import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function AuthNavbar() {
  return (
    <header
      role="banner"
      className="sticky top-0 left-0 right-0 z-50 bg-[#0B0F0D] border-b border-white/[0.08] h-[72px]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px]">
        {/* LEFT: HumanF1RST Logo */}
        <div
          aria-label="HumanF1RST branding"
          className="auth-nav-logo min-w-0 flex items-center select-none no-underline text-lg sm:text-xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity"
        >
          <span>Human</span>
          <span className="text-[#22C55E] font-extrabold">F1RST</span>
        </div>

        {/* RIGHT: Minimal Back to Home button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 flex-shrink-0 text-xs sm:text-sm font-semibold text-white px-3.5 sm:px-4 h-[40px] rounded-[8px] border bg-white/5 transition-all duration-200 cursor-pointer select-none"
          style={{
            borderColor: 'rgba(8, 47, 37, 0.15)',
            background: 'rgba(255, 255, 255, 0.05)',
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
            target.style.background = 'rgba(255, 255, 255, 0.05)'
            target.style.borderColor = 'rgba(8, 47, 37, 0.15)'
            target.style.transform = 'none'
          }}
        >
          <ArrowLeft className="w-4 h-4 text-[#22C55E]" />
          <span>Back to Home</span>
        </Link>
      </div>
    </header>
  )
}

export default AuthNavbar
