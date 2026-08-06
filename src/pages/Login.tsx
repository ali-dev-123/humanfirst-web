/**
 * Login.tsx — HumanF1RST Phase 2
 * Fluid Responsive Page Layout Architecture
 *
 * Page Architecture:
 * - <Navbar /> (Fixed 80px top)
 * - <main className="login-page">
 *     Fluid Top Padding: clamp(128px, 12vw, 180px) -> 80px navbar + clamp(48px, 8vw, 100px) gap space
 *     Fluid Bottom Padding: clamp(48px, 8vw, 100px) gap space before footer
 *     <section className="...">
 *       <LoginCard />
 *     </section>
 * - <Footer /> (Homepage Footer)
 */

import Seo from '../components/Seo'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import LoginCard from '../components/auth/LoginCard'

function Login() {
  return (
    <>
      <Seo
        title="Login | HumanF1RST"
        description="Sign in to your HumanF1RST account."
      />

      {/* SECTION 1: FIXED HOMEPAGE NAVBAR */}
      <Navbar />

      {/* SECTION 2: MAIN AUTHENTICATION CONTAINER (Fluid clamp responsive padding) */}
      <main
        className="login-page min-h-[calc(100vh-80px)] flex flex-col justify-between bg-[#080A09] text-[#F0F5F1]"
        style={{
          paddingTop: 'clamp(128px, 12vw, 180px)',
          paddingBottom: 'clamp(48px, 8vw, 100px)',
        }}
      >
        <section className="flex-grow flex items-center justify-center px-4 sm:px-6">
          <LoginCard />
        </section>
      </main>

      {/* SECTION 3: HOMEPAGE FOOTER */}
      <Footer />
    </>
  )
}

export default Login
