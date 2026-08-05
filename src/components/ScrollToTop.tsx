import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    const scrollTarget = sessionStorage.getItem('scrollTarget')

    if (scrollTarget) {
      // Clear the flag immediately so it doesn't fire again on next navigation
      sessionStorage.removeItem('scrollTarget')

      // Delay to allow the page sections to render before scrolling
      const timer = setTimeout(() => {
        const el = document.getElementById(scrollTarget)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 120)

      return () => clearTimeout(timer)
    } else {
      // Default: scroll to top on every route change
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}

export default ScrollToTop