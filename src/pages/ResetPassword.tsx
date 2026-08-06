/**
 * ResetPassword.tsx — HumanF1RST Phase 2
 * Create New Password Authentication Page
 *
 * Reuses identical layout architecture, fluid responsive clamp spacing,
 * Navbar, and Footer from all existing auth pages.
 */

import Seo from '../components/Seo'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ResetPasswordCard from '../components/auth/ResetPasswordCard'

function ResetPassword() {
  return (
    <>
      <Seo
        title="Create New Password | HumanF1RST"
        description="Set your new HumanF1RST account password."
      />

      {/* SECTION 1: FIXED HOMEPAGE NAVBAR */}
      <Navbar />

      {/* SECTION 2: MAIN AUTHENTICATION CONTAINER (Fluid clamp responsive padding matching Login) */}
      <main
        className="reset-password-page min-h-[calc(100vh-80px)] flex flex-col justify-between bg-[#080A09] text-[#F0F5F1]"
        style={{
          paddingTop: 'clamp(128px, 12vw, 180px)',
          paddingBottom: 'clamp(48px, 8vw, 100px)',
        }}
      >
        <section className="flex-grow flex items-center justify-center px-4 sm:px-6">
          <ResetPasswordCard />
        </section>
      </main>

      {/* SECTION 3: HOMEPAGE FOOTER */}
      <Footer />
    </>
  )
}

export default ResetPassword
