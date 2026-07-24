import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import googleReviewsHandler from './api/google-reviews.js'

/**
 * Dev-only shim so `npm run dev` serves the Vercel serverless function at
 * `/api/google-reviews` (Vite alone doesn't run `api/`). Reads GOOGLE_* from
 * `.env`. `apply: 'serve'` → this never touches the production build; on Vercel
 * the real serverless function in `api/google-reviews.js` is used instead.
 */
function googleReviewsDevApi() {
  return {
    name: 'google-reviews-dev-api',
    apply: 'serve',
    config(_, { mode }) {
      // Load non-VITE_ vars into process.env so the handler can read them.
      const env = loadEnv(mode, process.cwd(), '')
      process.env.GOOGLE_PLACES_API_KEY ??= env.GOOGLE_PLACES_API_KEY
      process.env.GOOGLE_PLACE_ID ??= env.GOOGLE_PLACE_ID
    },
    configureServer(server) {
      server.middlewares.use('/api/google-reviews', async (req, res) => {
        // Give the raw Node response the express-like helpers the handler uses.
        res.status = (code) => {
          res.statusCode = code
          return res
        }
        res.json = (obj) => {
          res.setHeader('content-type', 'application/json')
          res.end(JSON.stringify(obj))
          return res
        }
        try {
          await googleReviewsHandler(req, res)
        } catch (err) {
          res.statusCode = 500
          res.setHeader('content-type', 'application/json')
          res.end(JSON.stringify({ configured: false, reviews: [], error: String(err) }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), googleReviewsDevApi()],
})
