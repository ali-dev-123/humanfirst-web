/**
 * useSmartNavigate.ts — HumanF1RST v2
 *
 * Returns a `go` function that handles all routing and anchor link navigation:
 *
 *   1. Home navigation ("/", "#hero", "/#hero"):
 *      — If on "/", smoothly scrolls to top (0, 0).
 *      — If on a sub-page ("/about", "/contact"), navigates to "/".
 *
 *   2. Cross-page route ("/about", "/contact", etc.):
 *      — Navigates directly via React Router `navigate()`.
 *
 *   3. Hash anchor ("#problem", "#solution", "#privacy", "#pilot", etc.):
 *      — If on "/", smoothly scrolls to the section element.
 *      — If on a sub-page, sets `scrollTarget` in sessionStorage and navigates to "/".
 *        The `ScrollToTop` component picks it up after mount and scrolls smoothly.
 */

import { useNavigate, useLocation } from 'react-router-dom'
import { useCallback } from 'react'

type SmartNavigate = {
  /** Navigate smartly to any route string or anchor target. */
  go: (href: string) => void
}

export function useSmartNavigate(): SmartNavigate {
  const navigate  = useNavigate()
  const { pathname } = useLocation()

  const go = useCallback(
    (href: string) => {
      if (!href) return

      // Clean up common bad path patterns
      let cleanHref = href.trim()
      if (cleanHref.includes('/pages/About') || cleanHref.includes('/pages/about')) {
        cleanHref = '/about'
      } else if (cleanHref.includes('/pages/Contact') || cleanHref.includes('/pages/contact')) {
        cleanHref = '/contact'
      }

      // Handle Home routes
      if (cleanHref === '/' || cleanHref === '#hero' || cleanHref === '/#hero') {
        if (pathname === '/') {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          navigate('/')
        }
        return
      }

      // Handle direct routes without hash (e.g. '/about', '/contact')
      if (cleanHref.startsWith('/') && !cleanHref.includes('#')) {
        navigate(cleanHref)
        return
      }

      // Handle anchor links (e.g. '#problem', '/#pilot', '#pilot', '#opportunity')
      let hashTarget = ''
      if (cleanHref.startsWith('#')) {
        hashTarget = cleanHref.slice(1)
      } else if (cleanHref.startsWith('/#')) {
        hashTarget = cleanHref.slice(2)
      }

      if (hashTarget) {
        if (pathname === '/') {
          const el = document.getElementById(hashTarget)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        } else {
          sessionStorage.setItem('scrollTarget', hashTarget)
          navigate('/')
        }
        return
      }

      // Fallback
      navigate(cleanHref)
    },
    [navigate, pathname]
  )

  return { go }
}
