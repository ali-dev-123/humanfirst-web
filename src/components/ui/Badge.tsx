/**
 * Badge.tsx — HumanF1RST v2
 * Status/label badge primitive. Replaces V1 Badge.
 * Three variants: accent | neutral | success
 * Optional animated dot pulse indicator.
 */

import type { ReactNode } from 'react'

type BadgeVariant = 'accent' | 'neutral' | 'success'

interface BadgeProps {
  children:    ReactNode
  variant?:    BadgeVariant
  dot?:        boolean   // Show animated pulse dot
  dotPulse?:  boolean   // If dot, should it pulse?
  className?:  string
}

const variantClass: Record<BadgeVariant, string> = {
  accent:  'badge badge-accent',
  neutral: 'badge badge-neutral',
  success: 'badge badge-success',
}

const dotColor: Record<BadgeVariant, string> = {
  accent:  'bg-[var(--color-forest-700)]',
  neutral: 'bg-[var(--color-text-muted)]',
  success: 'bg-[var(--color-accent)]',
}

function Badge({
  children,
  variant   = 'accent',
  dot       = false,
  dotPulse  = false,
  className = '',
}: BadgeProps) {
  return (
    <span className={`${variantClass[variant]} ${className}`}>
      {dot && (
        <span
          className={`badge-dot ${dotColor[variant]} ${dotPulse ? 'animate-pulse' : ''}`}
        />
      )}
      {children}
    </span>
  )
}

export default Badge