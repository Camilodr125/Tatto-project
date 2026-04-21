import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls to top on route changes. If the URL has a hash (e.g. /#faq), scrolls to
 * that element instead so anchor links work with the SPA router.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.startsWith('#') ? hash.slice(1) : hash
      if (!id) {
        window.scrollTo(0, 0)
        return
      }
      const scrollToTarget = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        } else {
          window.scrollTo(0, 0)
        }
      }
      // Wait for outlet content (e.g. Home) to paint so #id exists in the DOM.
      requestAnimationFrame(() => {
        requestAnimationFrame(scrollToTarget)
      })
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
