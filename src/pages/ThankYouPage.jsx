import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { STUDIO_EMAIL } from '../constants'

const INSTAGRAM_URL = 'https://www.instagram.com/1bloodstudio/'

/**
 * Post-submit confirmation and the Google Ads conversion landing page
 * (/thank-you). Both the booking and consult forms send visitors here after a
 * successful send. On mount it fires a standard `generate_lead` dataLayer event
 * (a clean GTM / GA4 trigger) and marks the page noindex so it stays out of
 * search results.
 */
export default function ThankYouPage() {
  const reduce = useReducedMotion()

  useEffect(() => {
    // Keep this conversion page out of search engines.
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex'
    document.head.appendChild(meta)

    // Standard lead event for Google Tag Manager / GA4 to trigger a conversion.
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: 'generate_lead', form: 'studio_form' })

    return () => {
      document.head.removeChild(meta)
    }
  }, [])

  const draw = reduce
    ? { hidden: { pathLength: 1, opacity: 1 }, show: { pathLength: 1, opacity: 1 } }
    : {
        hidden: { pathLength: 0, opacity: 0 },
        show: (i) => ({
          pathLength: 1,
          opacity: 1,
          transition: {
            pathLength: { delay: 0.15 + i * 0.55, duration: 0.65, ease: 'easeInOut' },
            opacity: { delay: 0.15 + i * 0.55, duration: 0.01 },
          },
        }),
      }

  const rise = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
      }

  return (
    <section
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-ink px-4 py-20 sm:px-6"
      aria-labelledby="thankyou-heading"
    >
      {/* Ambient gold wash, matching the site's page headers */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(196,165,116,0.12),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-xl text-center">
        {/* Signature: a single gold line laid down like tattoo linework */}
        <div className="mx-auto mb-9 flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
          <motion.svg
            viewBox="0 0 100 100"
            fill="none"
            className="h-full w-full text-studio-gold [filter:drop-shadow(0_0_18px_rgba(196,165,116,0.35))]"
            initial="hidden"
            animate="show"
            role="img"
            aria-label="Request confirmed"
          >
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              variants={draw}
              custom={0}
            />
            <motion.path
              d="M31 51 L44 65 L70 36"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={draw}
              custom={1}
            />
          </motion.svg>
        </div>

        <motion.p
          {...rise}
          transition={{ duration: 0.5, delay: reduce ? 0 : 0.9 }}
          className="text-sm font-semibold uppercase tracking-[0.24em] text-studio-gold"
        >
          Request received
        </motion.p>

        <motion.h1
          id="thankyou-heading"
          {...rise}
          transition={{ duration: 0.5, delay: reduce ? 0 : 1 }}
          className="mt-4 font-display text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl"
        >
          Thanks — your request is in.
        </motion.h1>

        <motion.p
          {...rise}
          transition={{ duration: 0.5, delay: reduce ? 0 : 1.1 }}
          className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg"
        >
          We&apos;ve got your details and we&apos;ll reply by email within a few business
          days. If nothing shows up, check your spam folder — our first message sometimes
          hides there.
        </motion.p>

        <motion.div
          {...rise}
          transition={{ duration: 0.5, delay: reduce ? 0 : 1.2 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            to="/"
            className="inline-flex w-full items-center justify-center rounded-sm bg-accent px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-accent-hot sm:w-auto"
          >
            Back to home
          </Link>
          <Link
            to="/gallery"
            className="inline-flex w-full items-center justify-center rounded-sm border border-border px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white sm:w-auto"
          >
            See recent work
          </Link>
        </motion.div>

        <motion.p
          {...rise}
          transition={{ duration: 0.5, delay: reduce ? 0 : 1.3 }}
          className="mt-8 text-sm text-zinc-500"
        >
          Prefer a faster reply? DM us on{' '}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-300 underline decoration-zinc-600 underline-offset-4 transition-colors hover:text-white hover:decoration-zinc-400"
          >
            Instagram
          </a>{' '}
          or email{' '}
          <a
            href={`mailto:${STUDIO_EMAIL}`}
            className="text-zinc-300 underline decoration-zinc-600 underline-offset-4 transition-colors hover:text-white hover:decoration-zinc-400"
          >
            {STUDIO_EMAIL}
          </a>
          .
        </motion.p>
      </div>
    </section>
  )
}
