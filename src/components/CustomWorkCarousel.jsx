import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { getCustomWorkCarouselSlides } from '../data/servicesCarousel'

function ChevronLeft({ className = '' }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRight({ className = '' }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function CustomWorkCarousel() {
  const reduce = useReducedMotion()
  const slides = getCustomWorkCarouselSlides()
  const n = slides.length
  const scrollerRef = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    const max = scrollWidth - clientWidth
    setAtStart(scrollLeft <= 2)
    setAtEnd(max <= 2 || scrollLeft >= max - 2)
  }, [])

  useEffect(() => {
    updateScrollState()
  }, [n, updateScrollState])

  useLayoutEffect(() => {
    const el = scrollerRef.current
    if (!el || typeof ResizeObserver === 'undefined') return undefined
    const ro = new ResizeObserver(() => updateScrollState())
    ro.observe(el)
    return () => ro.disconnect()
  }, [updateScrollState])

  const scrollByDir = useCallback(
    (dir) => {
      const el = scrollerRef.current
      if (!el) return
      const first = el.querySelector('[data-carousel-card]')
      const gap = typeof window !== 'undefined' ? parseFloat(getComputedStyle(el).gap) || 16 : 16
      const step = first ? first.getBoundingClientRect().width + gap : el.clientWidth * 0.85
      el.scrollBy({ left: dir * step, behavior: reduce ? 'auto' : 'smooth' })
      requestAnimationFrame(() => updateScrollState())
    },
    [reduce, updateScrollState],
  )

  const onKeyDown = (e) => {
    if (n <= 1) return
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scrollByDir(-1)
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      scrollByDir(1)
    }
  }

  if (n === 0) return null

  return (
    <div className="mt-8 border-t border-border/80 pt-8">
      <div
        className="relative"
        onKeyDown={onKeyDown}
        role="region"
        aria-roledescription="carousel"
        aria-label="Custom tattoo work samples"
        tabIndex={0}
      >
        {!atStart ? (
          <div
            className="pointer-events-none absolute left-0 top-0 z-[1] h-full w-8 bg-gradient-to-r from-surface-elevated to-transparent sm:w-12"
            aria-hidden
          />
        ) : null}
        {!atEnd ? (
          <div
            className="pointer-events-none absolute right-0 top-0 z-[1] h-full w-8 bg-gradient-to-r from-transparent to-surface-elevated sm:w-12"
            aria-hidden
          />
        ) : null}

        <div
          ref={scrollerRef}
          onScroll={updateScrollState}
          className="flex min-h-0 gap-3 overflow-x-auto overflow-y-hidden scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory sm:gap-4 [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide, i) => (
            <motion.article
              key={slide.id}
              data-carousel-card
              className="w-[min(260px,calc(88vw-2rem))] shrink-0 snap-start sm:w-[min(280px,calc(45vw-1rem))]"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.2) }}
            >
              <div className="overflow-hidden rounded-sm border border-border/80 bg-zinc-900/30">
                <div className="relative aspect-[4/5]">
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    width={640}
                    height={800}
                    loading={i < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="border-t border-border/60 px-3 py-2.5">
                  <p className="truncate text-xs font-semibold text-zinc-200">{slide.artistName}</p>
                  <Link
                    to={`/gallery#${slide.slug}`}
                    className="mt-0.5 inline-block text-[11px] font-medium uppercase tracking-wider text-zinc-500 transition-colors hover:text-zinc-300"
                  >
                    Portfolio →
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {n > 1 ? (
          <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-between px-1 sm:px-2">
            <button
              type="button"
              aria-label="Scroll left"
              disabled={atStart}
              onClick={() => scrollByDir(-1)}
              className="pointer-events-auto flex h-10 w-10 shrink-0 touch-manipulation items-center justify-center rounded-full border border-white/10 bg-zinc-800/95 text-zinc-100 shadow-lg backdrop-blur-sm transition hover:bg-zinc-700 disabled:pointer-events-none disabled:opacity-30 sm:h-11 sm:w-11"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              disabled={atEnd}
              onClick={() => scrollByDir(1)}
              className="pointer-events-auto flex h-10 w-10 shrink-0 touch-manipulation items-center justify-center rounded-full border border-white/10 bg-zinc-800/95 text-zinc-100 shadow-lg backdrop-blur-sm transition hover:bg-zinc-700 disabled:pointer-events-none disabled:opacity-30 sm:h-11 sm:w-11"
            >
              <ChevronRight />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
