import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const INTERVAL_MS = 6500

const photos = [
  { src: '/studio/1.jpeg', alt: 'One Blood Tattoo Studio interior' },
  { src: '/studio/2.jpeg', alt: 'One Blood Tattoo Studio workspace' },
  { src: '/studio/3.jpeg', alt: 'One Blood Tattoo Studio space' },
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

export default function StudioPhotos() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const n = photos.length

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

  const current = photos[index]

  return (
    <div
      className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-zinc-950"
      role="region"
      aria-roledescription="carousel"
      aria-label="Studio space"
    >
      <div className="pointer-events-none absolute inset-0 z-10 ring-1 ring-inset ring-white/10" aria-hidden="true" />

      <div className="relative h-full min-h-[220px] w-full">
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={current.src}
            src={current.src}
            alt={current.alt}
            loading="lazy"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${n}`}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.4 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </div>

      {n > 1 && (
        <>
          <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5 sm:bottom-4">
            {photos.map((p, i) => (
              <button
                key={p.src}
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
            className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-sm border border-zinc-700/80 bg-black/40 text-zinc-300 backdrop-blur-sm transition-colors hover:border-zinc-500 hover:text-white sm:left-3"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-sm border border-zinc-700/80 bg-black/40 text-zinc-300 backdrop-blur-sm transition-colors hover:border-zinc-500 hover:text-white sm:right-3"
          >
            <ChevronRight />
          </button>
        </>
      )}
    </div>
  )
}
