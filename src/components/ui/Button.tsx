/**
 * Button.tsx — HumanF1RST v2
 * Primary interactive primitive. Matches btn-* classes from index.css.
 * Four variants: primary | ghost | outline | subtle
 * Three sizes: sm | md (default) | lg | xl
 */

import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'ghost' | 'outline' | 'subtle'
type ButtonSize    = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   ButtonVariant
  size?:      ButtonSize
  leftIcon?:  ReactNode
  rightIcon?: ReactNode
  loading?:   boolean
  children:   ReactNode
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'btn btn-primary',
  ghost:   'btn btn-ghost',
  outline: 'btn btn-outline',
  subtle:  'btn btn-subtle',
}

const sizeClass: Record<ButtonSize, string> = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
  xl: 'btn-xl',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant  = 'primary',
      size     = 'md',
      leftIcon,
      rightIcon,
      loading  = false,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const classes = [
      variantClass[variant],
      sizeClass[size],
      loading || disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <button ref={ref} className={classes} disabled={disabled || loading} {...props}>
        {loading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
