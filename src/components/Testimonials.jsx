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
              Fictionalized composite feedback styled like real studio reviews — replace
              with your own testimonials anytime.
            </p>
          </>
        )}

        <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${showIntro ? 'mt-12' : 'mt-0'}`.trim()}>
          {quotes.map((q, i) => (
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
                  {'★'.repeat(q.rating)}
                  <span className="sr-only"> {q.rating} out of 5</span>
                </p>
              )}
              <p className="flex-1 text-sm leading-relaxed text-zinc-200">“{q.text}”</p>
              <footer className="mt-6 border-t border-border pt-4">
                <cite className="not-italic">
                  <span className="font-semibold text-zinc-100">{q.name}</span>
                  <span className="mt-1 block text-xs text-muted">{q.role}</span>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
