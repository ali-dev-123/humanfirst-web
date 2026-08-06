/**
 * AuthFooter.tsx — HumanF1RST Phase 1
 * Minimal footer component for authentication pages (/login and /signup).
 *
 * Requirements:
 * - Simple, centered layout
 * - © 2026 HumanF1RST
 * - Privacy & Terms links
 * - No marketing content, no CTAs, no grid
 */

import { Link } from 'react-router-dom'

function AuthFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      className="py-6 px-4 border-t border-white/[0.08] bg-[#090909] text-xs text-[#6B7280]"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p>© {currentYear} HumanF1RST. All rights reserved.</p>
        <div className="flex items-center gap-6 text-[#9CA3AF]">
          <Link
            to="/#privacy"
            className="hover:text-white transition-colors cursor-pointer"
          >
            Privacy
          </Link>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  )
}

export default AuthFooter
