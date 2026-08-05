/**
 * App.tsx — HumanF1RST v2
 * Root application shell. V2 is dark-mode-first.
 * Home page sections will be imported from components/sections/
 * as they are built phase by phase.
 *
 * Existing pages (About, Contact, Login, Signup, Dashboard)
 * are preserved — they will be updated in later phases.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
// ── V2 Layout ─────────────────────────────────────────────
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// ── V2 Sections (built phase by phase) ────────────────────
import Hero from './components/sections/Hero'
import Problem from './components/sections/Problem'
import Solution from './components/sections/Solution'
import HowItWorks from './components/sections/HowItWorks'
import CoreFeatures from './components/sections/CoreFeatures'
import PrivacySecurity from './components/sections/PrivacySecurity'
import WhyHumanFirst from './components/sections/WhyHumanFirst'
import CallToAction from './components/sections/CallToAction'

// ── V2 Home — grows section by section as each is approved ─
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
      {/* V2: dark-mode-first, no class toggling needed — always dark */}
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--color-bg-base)',
          color: 'var(--color-text-primary)',
        }}
      >
        {/* V2 Navbar — fixed, persists across all pages */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        {/* Footer — added in Phase 6 */}
      </div>
    </BrowserRouter>
  )
}

export default App