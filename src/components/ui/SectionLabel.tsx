/**
 * SectionLabel.tsx — HumanF1RST v2
 * Eyebrow label that appears above section headings.
 * Pattern: "— FEATURES" or "— HOW IT WORKS"
 * Communicates editorial structure and premium feel.
 */

import type { ReactNode } from 'react'

interface SectionLabelProps {
  children: ReactNode
  className?: string
}

function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <span className={`section-label ${className}`}>
      {children}
    </span>
  )
}

export default SectionLabel
