/**
 * App.tsx — HumanF1RST v2
 * Root application shell.
 *
 * Phase 1 Architecture:
 * - LandingLayout renders the marketing site (Navbar + Landing Page / About / Contact + Footer).
 * - Auth Pages (/login, /signup, /forgot-password, etc.) render with Navbar and Footer layout.
 */

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import ResetEmailSent from './pages/ResetEmailSent'
import ResetPassword from './pages/ResetPassword'
import PasswordChanged from './pages/PasswordChanged'
import NotFound from './pages/NotFound'

// ── V2 Marketing Layout ─────────────────────────────────────────────
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// ── V2 Marketing Sections ───────────────────────────────────────────
import Hero from './components/sections/Hero'
import Problem from './components/sections/Problem'
import Solution from './components/sections/Solution'
import HowItWorks from './components/sections/HowItWorks'
import CoreFeatures from './components/sections/CoreFeatures'
import PrivacySecurity from './components/sections/PrivacySecurity'
import WhyHumanFirst from './components/sections/WhyHumanFirst'
import CallToAction from './components/sections/CallToAction'

/** Layout Shell for Marketing Landing Pages */
function LandingLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

/** Home Page Assembly */
function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <CoreFeatures />
      <PrivacySecurity />
      <WhyHumanFirst />
      <CallToAction />
      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--color-bg-base)',
          color: 'var(--color-text-primary)',
        }}
      >
        <Routes>
          {/* Marketing Landing Routes */}
          <Route element={<LandingLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Isolated Phase 1 Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-email-sent" element={<ResetEmailSent />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/password-changed" element={<PasswordChanged />} />

          {/* Custom 404 Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App