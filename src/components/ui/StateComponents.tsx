/**
 * StateComponents.tsx — HumanF1RST v2
 * Reusable Project-Wide UI State Components
 *
 * Included Components:
 * 1. LoadingSpinner — Size variants (sm, md, lg) with optional label
 * 2. SkeletonCard — Animated pulse skeleton card placeholder
 * 3. SkeletonForm — Animated pulse skeleton form placeholder
 * 4. EmptyState — Generic empty content state with title, text, & action
 * 5. NoResultsFound — Search & filter empty state
 * 6. ErrorState — Generic error state with retry callback
 * 7. NetworkError — Network connection error state
 */

import React from 'react'
import {
  Loader2,
  FolderOpen,
  SearchX,
  AlertTriangle,
  WifiOff,
  RefreshCw,
} from 'lucide-react'

// ── 1. LOADING SPINNER ──────────────────────────────────────────────────
export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  label?: string
  className?: string
}

export function LoadingSpinner({
  size = 'md',
  label,
  className = '',
}: LoadingSpinnerProps) {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div
      className={`inline-flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <Loader2
        className={`${sizeMap[size]} text-[#22C55E] animate-spin flex-shrink-0`}
      />
      {label && (
        <span className="text-xs font-semibold uppercase tracking-wider text-[#8C9A8E]">
          {label}
        </span>
      )}
    </div>
  )
}

// ── 2. SKELETON CARD ────────────────────────────────────────────────────
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-[#111712] border border-white/[0.08] rounded-[16px] p-6 animate-pulse space-y-4 ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-white/10" />
      <div className="h-6 bg-white/10 rounded-[6px] w-3/4" />
      <div className="space-y-2">
        <div className="h-4 bg-white/5 rounded-[4px] w-full" />
        <div className="h-4 bg-white/5 rounded-[4px] w-5/6" />
      </div>
    </div>
  )
}

// ── 3. SKELETON FORM ────────────────────────────────────────────────────
export function SkeletonForm({
  fieldsCount = 3,
  className = '',
}: {
  fieldsCount?: number
  className?: string
}) {
  return (
    <div
      className={`bg-[#111712] border border-white/[0.08] rounded-[16px] p-8 animate-pulse space-y-6 w-full max-w-[500px] mx-auto ${className}`}
    >
      <div className="text-center space-y-2 mb-8">
        <div className="h-8 bg-white/10 rounded-[8px] w-1/2 mx-auto" />
        <div className="h-4 bg-white/5 rounded-[4px] w-3/4 mx-auto" />
      </div>

      {Array.from({ length: fieldsCount }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-3 bg-white/10 rounded-[4px] w-1/4" />
          <div className="h-[52px] bg-white/5 rounded-[12px] w-full" />
        </div>
      ))}

      <div className="h-[52px] bg-[#22C55E]/30 rounded-[12px] w-full mt-8" />
    </div>
  )
}

// ── 4. EMPTY STATE ──────────────────────────────────────────────────────
export interface EmptyStateProps {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  icon?: React.ReactNode
  className?: string
}

export function EmptyState({
  title = 'No Data Found',
  description = 'There is no content to display at this time.',
  actionLabel,
  onAction,
  icon,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`bg-[#111712] border border-white/[0.08] rounded-[16px] p-8 sm:p-12 text-center max-w-[480px] mx-auto ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-5 text-[#8C9A8E]">
        {icon || <FolderOpen className="w-8 h-8" />}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-[#8C9A8E] mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="h-[44px] px-6 bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold rounded-[10px] shadow-md transition-all duration-200 cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

// ── 5. NO RESULTS FOUND ─────────────────────────────────────────────────
export interface NoResultsFoundProps {
  query?: string
  onReset?: () => void
  className?: string
}

export function NoResultsFound({
  query,
  onReset,
  className = '',
}: NoResultsFoundProps) {
  return (
    <div
      className={`bg-[#111712] border border-white/[0.08] rounded-[16px] p-8 text-center max-w-[480px] mx-auto ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center mx-auto mb-4 text-[#22C55E]">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">No Matches Found</h3>
      <p className="text-sm text-[#8C9A8E] mb-6">
        {query ? (
          <>
            We couldn't find anything matching{' '}
            <span className="text-white font-medium">"{query}"</span>.
          </>
        ) : (
          'Try adjusting your search terms or filters.'
        )}
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="h-[40px] px-5 bg-transparent hover:bg-white/5 border border-white/[0.18] hover:border-white/30 text-white text-xs font-semibold rounded-[8px] transition-all duration-200 cursor-pointer"
        >
          Clear Search
        </button>
      )}
    </div>
  )
}

// ── 6. ERROR STATE ──────────────────────────────────────────────────────
export interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = 'Something Went Wrong',
  message = 'An unexpected error occurred while loading content.',
  onRetry,
  className = '',
}: ErrorStateProps) {
  return (
    <div
      className={`bg-[#111712] border border-red-500/20 rounded-[16px] p-8 text-center max-w-[480px] mx-auto ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4 text-red-400">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-[#8C9A8E] mb-6">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 h-[44px] px-6 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-sm font-semibold rounded-[10px] transition-all duration-200 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  )
}

// ── 7. NETWORK ERROR ────────────────────────────────────────────────────
export interface NetworkErrorProps {
  message?: string
  onRetry?: () => void
  className?: string
}

export function NetworkError({
  message = 'Unable to connect to the server. Please check your internet connection.',
  onRetry,
  className = '',
}: NetworkErrorProps) {
  return (
    <div
      className={`bg-[#111712] border border-amber-500/20 rounded-[16px] p-8 text-center max-w-[480px] mx-auto ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4 text-amber-400">
        <WifiOff className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">Network Connection Error</h3>
      <p className="text-sm text-[#8C9A8E] mb-6">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 h-[44px] px-6 bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold rounded-[10px] shadow-md transition-all duration-200 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reconnect</span>
        </button>
      )}
    </div>
  )
}
