/**
 * GlassCard.tsx — HumanF1RST v2
 * Frosted-glass card surface. Used for floating panels,
 * overlays, and elevated UI within dark sections.
 */

import type { ReactNode, HTMLAttributes } from 'react'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children:   ReactNode
  padding?:   'none' | 'sm' | 'md' | 'lg'
  className?: string
}

const paddingClass = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
}

function GlassCard({
  children,
  padding   = 'md',
  className = '',
  ...props
}: GlassCardProps) {
  return (
    <div
      className={`card-glass ${paddingClass[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default GlassCard
