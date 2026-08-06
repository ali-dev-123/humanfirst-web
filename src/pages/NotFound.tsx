/**
 * NotFound.tsx — HumanF1RST v2
 * Custom 404 Error Page
 *
 * Requirements:
 * - Uses homepage Navbar and Footer components
 * - Center illustration
 * - Large title: "404"
 * - Subtitle: "The page you're looking for doesn't exist."
 * - Buttons: "Back Home" & "Go Back"
 * - Fully responsive, dark theme, no animations
 */

import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { ShieldAlert, ArrowLeft, Home as HomeIcon } from 'lucide-react'

function NotFound() {
  return (
    <>
      <Seo
        title="404 — Page Not Found | HumanF1RST"
        description="The page you are looking for does not exist."
      />

      <div className="min-h-screen bg-[#080A09] text-[#F0F5F1] flex flex-col justify-between">
        {/* ── HOMEPAGE NAVBAR ─────────────────────────────────────────── */}
        <Navbar />

        {/* ── CENTERED 404 CONTENT CONTAINER ─────────────────────────── */}
        <main
          className="flex-grow flex items-center justify-center px-4 sm:px-6"
          style={{
            paddingTop: 'clamp(128px, 12vw, 180px)',
            paddingBottom: 'clamp(48px, 8vw, 100px)',
          }}
        >
          <div className="w-full max-w-[500px] mx-auto text-center">
            {/* Center Illustration */}
            <div className="w-20 h-20 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center mx-auto mb-6">
              <ShieldAlert className="w-10 h-10 text-[#22C55E]" />
            </div>

            {/* Large Title */}
            <h1 className="text-7xl sm:text-8xl font-bold tracking-tight text-white mb-3 leading-none">
              404
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#8C9A8E] mb-8 max-w-[380px] mx-auto">
              The page you're looking for doesn't exist.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary Button: Back Home */}
              <Link
                to="/"
                className="w-full sm:w-auto min-w-[160px] h-[52px] px-6 bg-[#22C55E] hover:bg-[#16A34A] text-white text-base font-semibold rounded-[12px] shadow-md shadow-green-500/20 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer no-underline select-none"
              >
                <HomeIcon className="w-4.5 h-4.5" />
                <span>Back Home</span>
              </Link>

              {/* Secondary Button: Go Back */}
              <button
                type="button"
                onClick={() => window.history.back()}
                className="w-full sm:w-auto min-w-[160px] h-[52px] px-6 bg-transparent hover:bg-white/5 border border-white/[0.18] hover:border-white/30 text-white text-base font-semibold rounded-[12px] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer select-none"
              >
                <ArrowLeft className="w-4.5 h-4.5" />
                <span>Go Back</span>
              </button>
            </div>
          </div>
        </main>

        {/* ── HOMEPAGE FOOTER ─────────────────────────────────────────── */}
        <Footer />
      </div>
    </>
  )
}

export default NotFound
