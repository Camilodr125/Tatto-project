import { useEffect, useState } from 'react'

/**
 * Fetches live Google reviews from our own serverless endpoint
 * (`/api/google-reviews`) and falls back to built-in reviews when the endpoint
 * is unavailable (e.g. local `vite` dev without `vercel dev`, not yet
 * configured, or a Google API hiccup).
 *
 * @param {Array} fallbackReviews - reviews shown when Google data isn't available
 * @returns {{
 *   reviews: Array,
 *   rating: number|null,
 *   total: number|null,
 *   googleUrl: string|null,
 *   source: 'google'|'fallback',
 *   loading: boolean,
 * }}
 */
export function useGoogleReviews(fallbackReviews = []) {
  const [state, setState] = useState({
    reviews: fallbackReviews,
    rating: null,
    total: null,
    googleUrl: null,
    source: 'fallback',
    loading: true,
  })

  useEffect(() => {
    let active = true

    async function load() {
      try {
        const res = await fetch('/api/google-reviews', {
          headers: { Accept: 'application/json' },
        })
        // In `vite` dev the route may not exist and returns HTML — guard for it.
        const contentType = res.headers.get('content-type') || ''
        if (!res.ok || !contentType.includes('application/json')) {
          throw new Error('reviews endpoint unavailable')
        }

        const data = await res.json()
        if (!active) return

        if (data.configured && Array.isArray(data.reviews) && data.reviews.length > 0) {
          setState({
            reviews: data.reviews,
            rating: data.rating ?? null,
            total: data.total ?? null,
            googleUrl: data.googleUrl ?? null,
            source: 'google',
            loading: false,
          })
          return
        }

        // Configured but empty, or not configured → keep fallback content.
        setState((prev) => ({ ...prev, loading: false }))
      } catch {
        if (!active) return
        setState((prev) => ({ ...prev, loading: false }))
      }
    }

    load()
    return () => {
      active = false
    }
  }, [])

  return state
}
