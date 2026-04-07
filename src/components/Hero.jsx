import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { artists } from '../data/artists'

/** Up to two portfolio images per artist; footer credits the artist. */
const slides = artists.flatMap((a) =>
  (a.workImages ?? []).slice(0, 2).map((src) => ({
    src,
    artistName: a.name,
    slug: a.slug,
    alt: `Tattoo work by ${a.name}`,
  })),
)

const INTERVAL_MS = 5500

export default function Hero() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const n = slides.length
  const current = slides[index] ?? slides[0]

  const go = useCallback(
    (dir) => {
      if (n <= 0) return
      setIndex((i) => (i + dir + n) % n)
    },
    [n],
  )

  useEffect(() => {
    if (reduce || n <= 1) return
    const id = setInterval(() => go(1), INTERVAL_MS)
    return () => clearInterval(id)
  }, [reduce, go, n])

  if (n === 0) {
    return (
      <section
        className="relative overflow-hidden border-b border-border"
        aria-labelledby="hero-heading"
      >
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-muted">
            Add portfolio images in <code className="text-zinc-400">artists.js</code> to
            populate the hero carousel.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section
      className="relative overflow-hidden border-b border-border"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-25%,rgba(255,255,255,0.06),transparent)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_15%_20%,rgba(196,165,116,0.09),transparent_50%)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:gap-12 sm:px-6 sm:py-28 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:py-32">
        <div className="min-w-0 flex-1 text-left">
          <motion.p
            className="mb-3 text-xs font-semibold uppercase leading-relaxed tracking-[0.2em] text-studio-gold-muted sm:text-sm sm:tracking-[0.25em]"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            By appointment only · Calm, client-first sessions
          </motion.p>
          <motion.h1
            id="hero-heading"
            className="font-display text-[clamp(2.25rem,8vw,3.75rem)] font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            Ink that
            <span className="block text-zinc-400">outlasts trends</span>
          </motion.h1>
          <motion.p
            className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:mt-6 sm:text-lg"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            Blackwork, fine line, and realism — sterile setup, honest aftercare,
            and work composed to settle into skin over years, not just read
            sharp for the first week.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            <Link
              to="/book"
              className="inline-flex w-full items-center justify-center rounded-sm bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-ink shadow-[0_0_42px_-10px_rgba(196,165,116,0.35)] transition-[background-color,box-shadow,color] hover:bg-accent-hot hover:shadow-[0_0_52px_-6px_rgba(196,165,116,0.45)] sm:w-auto sm:px-8"
            >
              Request a consult
            </Link>
            <Link
              to={{ pathname: '/gallery', hash: '' }}
              className="inline-flex w-full items-center justify-center rounded-sm border border-zinc-600 px-6 py-3.5 text-sm font-semibold text-zinc-300 transition-[border-color,box-shadow,color] hover:border-studio-gold/45 hover:text-white hover:shadow-[0_0_32px_-12px_rgba(196,165,116,0.2)] sm:w-auto sm:px-8"
            >
              View work
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="relative flex w-full min-w-0 flex-1 justify-center lg:justify-end"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div
            className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm border border-border shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_28px_60px_-14px_rgba(0,0,0,0.85),0_0_80px_-24px_rgba(196,165,116,0.18)] ring-1 ring-inset ring-studio-gold/15"
            role="region"
            aria-roledescription="carousel"
            aria-label="Portfolio work from the team"
          >
            <div className="relative h-full w-full">
              <AnimatePresence initial={false} mode="wait">
                <motion.img
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  width={720}
                  height={900}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'low'}
                  decoding="async"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.45 }}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              </AnimatePresence>
            </div>
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-90"
              aria-hidden="true"
            />

            <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-1.5 p-3 pt-8 sm:gap-2 sm:p-4 sm:pt-10">
              <p className="font-display text-base tracking-wide text-zinc-200 sm:text-lg md:text-xl">
                <span className="block text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Made by
                </span>
                <span className="mt-1 block text-white">{current.artistName}</span>
              </p>
              <Link
                to="/artists"
                className="self-start text-xs font-bold uppercase tracking-wider text-zinc-400 transition-colors hover:text-white"
              >
                Meet the team →
              </Link>
              {n > 1 && (
                <div className="flex justify-center pt-1">
                  {n > 14 ? (
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      {index + 1} <span className="text-zinc-600">/</span> {n}
                    </p>
                  ) : (
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {slides.map((s, i) => (
                        <button
                          key={`${i}-${s.src}`}
                          type="button"
                          aria-label={`Show image ${i + 1} of ${n}`}
                          aria-current={i === index}
                          onClick={() => setIndex(i)}
                          className={[
                            'h-1.5 shrink-0 rounded-full transition-all',
                            i === index
                              ? 'w-6 bg-studio-gold'
                              : 'w-1.5 bg-zinc-600 hover:bg-zinc-500',
                          ].join(' ')}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {n > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={() => go(-1)}
                  className="absolute left-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 touch-manipulation items-center justify-center rounded-sm border border-zinc-700/80 bg-ink/40 text-zinc-200 backdrop-blur-sm transition-colors hover:border-zinc-500 hover:bg-ink/60 hover:text-white sm:left-2 sm:h-10 sm:w-10"
                >
                  <span aria-hidden="true" className="text-base leading-none sm:text-lg">
                    ‹
                  </span>
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={() => go(1)}
                  className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 touch-manipulation items-center justify-center rounded-sm border border-zinc-700/80 bg-ink/40 text-zinc-200 backdrop-blur-sm transition-colors hover:border-zinc-500 hover:bg-ink/60 hover:text-white sm:right-2 sm:h-10 sm:w-10"
                >
                  <span aria-hidden="true" className="text-base leading-none sm:text-lg">
                    ›
                  </span>
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
