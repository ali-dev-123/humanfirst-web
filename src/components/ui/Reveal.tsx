/**
 * Reveal.tsx — HumanF1RST v2
 * Scroll-triggered entrance animation primitive.
 * Wraps any content with the V2 motion signature:
 *   opacity: 0→1 + y: 24px→0 on scroll into view.
 *
 * Rules applied:
 * - Entrance only (viewport.once: true)
 * - Max 700ms duration ceiling
 * - Premium ease: [0.16, 1, 0.3, 1]
 * - Stagger via `delay` prop (multiples of 60ms)
 */

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children:   ReactNode
  delay?:     number    // in seconds (e.g. 0.06, 0.12, 0.18)
  duration?:  number    // in seconds — capped at 0.7
  y?:         number    // Y-offset distance in px (default: 24)
  className?: string
}

function Reveal({
  children,
  delay    = 0,
  duration = 0.6,
  y        = 24,
  className = '',
}: RevealProps) {
  // Enforce 700ms max ceiling
  const clampedDuration = Math.min(duration, 0.7)

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: clampedDuration,
        delay,
        ease: [0.16, 1, 0.3, 1],  // --ease-premium
      }}
    >
      {children}
    </motion.div>
  )
}

export default Reveal