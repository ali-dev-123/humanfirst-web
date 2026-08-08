/**
 * Signup.tsx — HumanF1RST Phase 2
 * Refactored Sign Up Authentication Page using Modular Component Architecture
 *
 * Reuses identical layout architecture, fluid responsive clamp spacing,
 * Navbar, and Footer from Login.tsx.
 */

import Seo from '../components/Seo'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import SignupCard from '../components/auth/SignupCard'

function Signup() {
  return (
    <>
      <Seo
        title="Sign Up | HumanF1RST"
        description="Create your HumanF1RST account."
      />

      {/* SECTION 1: FIXED HOMEPAGE NAVBAR */}
      <Navbar />

      {/* SECTION 2: MAIN AUTHENTICATION CONTAINER (Fluid clamp responsive padding matching Login) */}
      <main
        className="signup-page min-h-[calc(100vh-80px)] flex flex-col justify-between"
        style={{
          background: 'var(--color-bg-base)',
          color: 'var(--color-text-primary)',
          paddingTop: 'clamp(128px, 12vw, 180px)',
          paddingBottom: 'clamp(48px, 8vw, 100px)',
        }}
      >
        <section className="flex-grow flex items-center justify-center px-4 sm:px-6">
          <SignupCard />
        </section>
      </main>

      {/* SECTION 3: HOMEPAGE FOOTER */}
      <Footer />
    </>
  )
}

export default Signup
