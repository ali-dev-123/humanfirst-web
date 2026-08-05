/**
 * Divider.tsx — HumanF1RST v2
 * Thin horizontal rule with gradient fade.
 * Used between sections and within cards.
 */

interface DividerProps {
  accent?:    boolean   // Use green accent instead of default
  className?: string
}

function Divider({ accent = false, className = '' }: DividerProps) {
  return (
    <div
      className={`${accent ? 'divider-accent' : 'divider'} ${className}`}
      role="separator"
      aria-hidden="true"
    />
  )
}

export default Divider
