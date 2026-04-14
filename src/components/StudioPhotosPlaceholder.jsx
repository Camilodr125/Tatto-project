import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { STUDIO_ADDRESS } from '../constants'

const INTERVAL_MS = 6500

const slides = [
  {
    key: 'soon',
    bg: 'bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,rgba(196,165,116,0.12),transparent_55%)] bg-zinc-950',
    content: (
      <div className="px-6 py-8 text-center sm:px-10">
        <p className="font-display text-2xl tracking-wide text-zinc-100 sm:text-3xl">Coming soon</p>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted">
          We&apos;re finishing the studio build. Photos of the space will go here once everything
          is ready to show.
        </p>
      </div>
    ),
  },
  {
    key: 'social',
    bg: 'bg-[radial-gradient(ellipse_70%_50%_at_30%_30%,rgba(255,255,255,0.06),transparent_50%)] bg-zinc-950',
    content: (
      <div className="px-6 py-8 text-center sm:px-10">
        <p className="font-display text-xl tracking-wide text-zinc-100 sm:text-2xl">Stay in the loop</p>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted">
          Follow{' '}
          <a
            href="https://www.instagram.com/1bloodstudio/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-zinc-300 underline decoration-zinc-600 underline-offset-2 transition-colors hover:text-white"
          >
            @1bloodstudio
          </a>{' '}
          on Instagram for progress and opening updates.
        </p>
      </div>
    ),
  },
  {
    key: 'location',
    bg: 'bg-[radial-gradient(ellipse_75%_55%_at_70%_25%,rgba(196,165,116,0.08),transparent_55%)] bg-zinc-950',
    content: (
      <div className="px-6 py-8 text-center sm:px-10">
        <p className="font-display text-xl tracking-wide text-zinc-100 sm:text-2xl">Where we&apos;ll be</p>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted">
          {STUDIO_ADDRESS.line1}
          <br />
          {STUDIO_ADDRESS.line2}
        </p>
        <p className="mt-5">
          <Link
            to="/book"
            className="text-xs font-bold uppercase tracking-wider text-studio-gold-muted transition-colors hover:text-studio-gold"
          >
            Book a consult →
          </Link>
        </p>
      </div>
    ),
  },
]

function ChevronLeft({ className = '' }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRight({ className = '' }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function StudioPhotosPlaceholder() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const n = slides.length

  const go = useCallback(
    (dir) => {
      setIndex((i) => (i + dir + n) % n)
    },
    [n],
  )

  useEffect(() => {
    if (reduce || n <= 1) return
    const id = setInterval(() => go(1), INTERVAL_MS)
    return () => clearInterval(id)
  }, [reduce, go, n])

  const current = slides[index]

  return (
    <div
      className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-zinc-950"
      role="region"
      aria-roledescription="carousel"
      aria-label="Studio space — photos coming soon"
    >
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" aria-hidden="true" />

      <div className="relative h-full min-h-[220px] w-full">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={current.key}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${n}`}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.4 }}
            className={`absolute inset-0 flex items-center justify-center ${current.bg}`}
          >
            {current.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {n > 1 && (
        <>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 sm:bottom-4">
            {slides.map((s, i) => (
              <button
                key={s.key}
                type="button"
                aria-label={`Show slide ${i + 1} of ${n}`}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => setIndex(i)}
                className={[
                  'h-1.5 shrink-0 rounded-full transition-all',
                  i === index ? 'w-6 bg-studio-gold' : 'w-1.5 bg-zinc-600 hover:bg-zinc-500',
                ].join(' ')}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-sm border border-zinc-700/80 bg-black/40 text-zinc-300 backdrop-blur-sm transition-colors hover:border-zinc-500 hover:text-white sm:left-3"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-sm border border-zinc-700/80 bg-black/40 text-zinc-300 backdrop-blur-sm transition-colors hover:border-zinc-500 hover:text-white sm:right-3"
          >
            <ChevronRight />
          </button>
        </>
      )}
    </div>
  )
}
