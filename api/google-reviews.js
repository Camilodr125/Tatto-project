/**
 * Vercel Serverless Function — GET /api/google-reviews
 *
 * Fetches the studio's Google reviews via the Places API (New) and returns a
 * small, normalized JSON payload. The Google API key stays on the server and is
 * never shipped to the browser.
 *
 * Response is cached at Vercel's edge (see Cache-Control below) so Google is hit
 * roughly once a day rather than on every visit — this keeps billing near-zero
 * and stays within Google's caching guidance for ratings/reviews.
 *
 * Required environment variables (set in Vercel → Settings → Environment
 * Variables, NOT prefixed with VITE_ so they never reach the client bundle):
 *   GOOGLE_PLACES_API_KEY  — a Google Cloud key with "Places API (New)" enabled
 *   GOOGLE_PLACE_ID        — your studio's Place ID (looks like "ChIJ...")
 *
 * Notes / limitations:
 *   - Google returns at most 5 reviews (its "most relevant" set). There is no
 *     official way to fetch every review. This is a hard Google API limit.
 *   - On any misconfiguration or upstream error we respond 200 with
 *     `configured:false` (or an empty list) so the frontend can fall back to the
 *     built-in reviews instead of showing an error to visitors.
 */

const PLACES_ENDPOINT = 'https://places.googleapis.com/v1/places'
const FIELD_MASK = 'id,displayName,rating,userRatingCount,googleMapsUri,reviews'

/**
 * Only show reviews at or above this star rating on the site (4★ and 5★).
 * The overall `rating`/`total` below still reflect the studio's FULL Google
 * totals — only the individual quote cards are filtered.
 */
const MIN_DISPLAY_RATING = 4

export default async function handler(req, res) {
  if (req.method && req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  // Not configured yet → let the client fall back to built-in reviews silently.
  if (!apiKey || !placeId) {
    res.setHeader('Cache-Control', 'no-store')
    return res.status(200).json({
      configured: false,
      reviews: [],
      rating: null,
      total: null,
      googleUrl: null,
    })
  }

  try {
    const url = `${PLACES_ENDPOINT}/${encodeURIComponent(placeId)}?languageCode=en`
    const upstream = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': FIELD_MASK,
      },
    })

    if (!upstream.ok) {
      const body = await upstream.text().catch(() => '')
      // Log for server-side debugging; keep the client response clean.
      console.error('[google-reviews] upstream error', upstream.status, body)
      res.setHeader('Cache-Control', 'no-store')
      return res.status(200).json({
        configured: true,
        error: 'upstream_error',
        reviews: [],
        rating: null,
        total: null,
        googleUrl: null,
      })
    }

    const data = await upstream.json()

    const reviews = Array.isArray(data.reviews)
      ? data.reviews
          .map((r) => ({
            name: r.authorAttribution?.displayName ?? 'Google user',
            text: r.text?.text ?? r.originalText?.text ?? '',
            rating: typeof r.rating === 'number' ? r.rating : null,
            relativeTime: r.relativePublishTimeDescription ?? '',
            photo: r.authorAttribution?.photoUri ?? '',
            authorUrl: r.authorAttribution?.uri ?? '',
            publishTime: r.publishTime ?? '',
            source: 'google',
          }))
          .filter(
            (r) =>
              r.text.trim().length > 0 &&
              typeof r.rating === 'number' &&
              r.rating >= MIN_DISPLAY_RATING,
          )
          // Best-rated first, then keep Google's relevance order within a tier.
          .sort((a, b) => b.rating - a.rating)
      : []

    // Cache at the edge: serve for 24h, then revalidate in the background for
    // another 24h window so visitors never wait on Google.
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=86400, stale-while-revalidate=86400',
    )

    return res.status(200).json({
      configured: true,
      reviews,
      rating: typeof data.rating === 'number' ? data.rating : null,
      total: typeof data.userRatingCount === 'number' ? data.userRatingCount : null,
      googleUrl: data.googleMapsUri ?? null,
    })
  } catch (err) {
    console.error('[google-reviews] unexpected error', err)
    res.setHeader('Cache-Control', 'no-store')
    return res.status(200).json({
      configured: true,
      error: 'unexpected_error',
      reviews: [],
      rating: null,
      total: null,
      googleUrl: null,
    })
  }
}
