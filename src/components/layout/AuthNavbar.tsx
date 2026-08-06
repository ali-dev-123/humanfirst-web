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
        <Link
          to="/"
          aria-label="HumanF1RST — Return to Home"
          className="flex items-center select-none no-underline text-lg sm:text-xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity"
        >
          <span>Human</span>
          <span className="text-[#22C55E] font-extrabold">F1RST</span>
        </Link>

        {/* RIGHT: Minimal Back to Home button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white px-3.5 sm:px-4 h-[40px] rounded-[8px] border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer select-none"
        >
          <ArrowLeft className="w-4 h-4 text-[#22C55E]" />
          <span>Back to Home</span>
        </Link>
      </div>
    </header>
  )
}

export default AuthNavbar
