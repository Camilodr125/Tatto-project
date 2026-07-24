import { motion, useReducedMotion } from 'framer-motion'
import { reviewsShort } from '../data/reviews'

export default function Testimonials({
  reviews: reviewsProp,
  showIntro = true,
  className = '',
}) {
  const reduce = useReducedMotion()
  const quotes = reviewsProp ?? reviewsShort

  return (
    <section
      id="testimonials"
      className={`border-b border-border py-20 sm:py-24 ${className}`.trim()}
      aria-labelledby={showIntro ? 'testimonials-heading' : undefined}
      aria-label={showIntro ? undefined : 'Client reviews'}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {showIntro && (
          <>
            <h2
              id="testimonials-heading"
              className="font-display text-4xl tracking-wide text-zinc-50 sm:text-5xl"
            >
              Client stories
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Sessions, healing, and how the work held up — the kind of feedback we’re
              grateful to hear.
            </p>
          </>
        )}

        <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${showIntro ? 'mt-12' : 'mt-0'}`.trim()}>
          {quotes.map((q, i) => {
            const subtitle = q.role ?? q.relativeTime
            const isGoogle = q.source === 'google'
            return (
              <motion.blockquote
                key={`${q.name}-${i}`}
                className="flex flex-col rounded-sm border border-border bg-surface-elevated p-6"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
              >
                {q.rating != null && (
                  <p className="mb-2 text-zinc-500" aria-label={`${q.rating} out of 5 stars`}>
                    {'★'.repeat(Math.round(q.rating))}
                    <span className="sr-only"> {q.rating} out of 5</span>
                  </p>
                )}
                <p className="flex-1 text-sm leading-relaxed text-zinc-200">“{q.text}”</p>
                <footer className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  {q.photo ? (
                    <img
                      src={q.photo}
                      alt=""
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-9 w-9 shrink-0 rounded-full object-cover"
                    />
                  ) : null}
                  <cite className="min-w-0 flex-1 not-italic">
                    <span className="block truncate font-semibold text-zinc-100">{q.name}</span>
                    {subtitle ? (
                      <span className="mt-0.5 block truncate text-xs text-muted">{subtitle}</span>
                    ) : null}
                  </cite>
                  {isGoogle ? (
                    q.authorUrl ? (
                      <a
                        href={q.authorUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-muted transition-colors hover:text-zinc-200"
                        aria-label={`Read ${q.name}’s review on Google`}
                        title="View on Google"
                      >
                        <GoogleGlyph className="h-4 w-4" />
                      </a>
                    ) : (
                      <span className="shrink-0" aria-label="Review from Google" title="From Google">
                        <GoogleGlyph className="h-4 w-4" />
                      </span>
                    )
                  ) : null}
                </footer>
              </motion.blockquote>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/** Google "G" mark (official four-color logo) for review attribution. */
function GoogleGlyph({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.82-.07-1.6-.2-2.36H12v4.46h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.73z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.29v3.1A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58v-3.1H1.29a12 12 0 0 0 0 10.78l3.98-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44A11.96 11.96 0 0 0 12 0 12 12 0 0 0 1.29 6.61l3.98 3.1C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  )
}
