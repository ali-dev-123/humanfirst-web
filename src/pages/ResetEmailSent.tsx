/**
 * ResetEmailSent.tsx — HumanF1RST Phase 2
 * Reset Email Sent Authentication Page
 *
 * Reuses identical layout architecture, fluid responsive clamp spacing,
 * Navbar, and Footer from Login.tsx, Signup.tsx, and ForgotPassword.tsx.
 */

import Seo from '../components/Seo'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ResetEmailSentCard from '../components/auth/ResetEmailSentCard'

function ResetEmailSent() {
  return (
    <>
      <Seo
        title="Check Your Email | HumanF1RST"
        description="Password reset email sent to your inbox."
        noindex
      />

      {/* SECTION 1: FIXED HOMEPAGE NAVBAR */}
      <Navbar />

      {/* SECTION 2: MAIN AUTHENTICATION CONTAINER (Fluid clamp responsive padding matching Login) */}
      <main
        className="reset-email-sent-page min-h-[calc(100vh-80px)] flex flex-col justify-between"
        style={{
          background: 'var(--color-bg-base)',
          color: 'var(--color-text-primary)',
          paddingTop: 'clamp(128px, 12vw, 180px)',
          paddingBottom: 'clamp(48px, 8vw, 100px)',
        }}
      >
        <section className="flex-grow flex items-center justify-center px-4 sm:px-6">
          <ResetEmailSentCard />
        </section>
      </main>

      {/* SECTION 3: HOMEPAGE FOOTER */}
      <Footer />
    </>
  )
}

export default ResetEmailSent
