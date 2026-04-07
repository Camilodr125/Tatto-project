import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { getArtistGallerySections } from '../data/gallery'

const artistGallerySections = getArtistGallerySections()

function ChevronLeft({ className = '' }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function ChevronRight({ className = '' }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

function GallerySectionCarousel({
  section,
  sectionIndex,
  reduce,
  onOpenImage,
}) {
  const n = section.items.length
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
  }, [section.slug, n, updateScrollState])

  useLayoutEffect(() => {
    const el = scrollerRef.current
    if (!el || typeof ResizeObserver === 'undefined') return undefined
    const ro = new ResizeObserver(() => updateScrollState())
    ro.observe(el)
    return () => ro.disconnect()
  }, [updateScrollState, section.slug])

  const scrollByDir = useCallback(
    (dir) => {
      const el = scrollerRef.current
      if (!el) return
      const first = el.querySelector('[data-gallery-card]')
      const gap =
        typeof window !== 'undefined'
          ? parseFloat(getComputedStyle(el).gap) || 16
          : 16
      const step = first
        ? first.getBoundingClientRect().width + gap
        : el.clientWidth * 0.85
      const behavior = reduce ? 'auto' : 'smooth'
      el.scrollBy({ left: dir * step, behavior })
      requestAnimationFrame(() => updateScrollState())
    },
    [reduce, updateScrollState],
  )

  const onScrollerScroll = useCallback(() => {
    updateScrollState()
  }, [updateScrollState])

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

  return (
    <div className="mt-8 w-full">
      <div
        className="relative"
        onKeyDown={onKeyDown}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${section.name} portfolio`}
        tabIndex={0}
      >
        {!atStart ? (
          <div
            className="pointer-events-none absolute left-0 top-0 z-[1] h-full w-10 bg-gradient-to-r from-ink to-transparent sm:w-14"
            aria-hidden
          />
        ) : null}
        {!atEnd ? (
          <div
            className="pointer-events-none absolute right-0 top-0 z-[1] h-full w-10 bg-gradient-to-r from-transparent to-ink sm:w-14"
            aria-hidden
          />
        ) : null}

        <div
          ref={scrollerRef}
          onScroll={onScrollerScroll}
          className="flex min-h-0 gap-4 overflow-x-auto overflow-y-hidden scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        >
          {section.items.map((item, i) => {
            const eager = sectionIndex === 0 && i < 3
            return (
              <motion.button
                key={item.id}
                type="button"
                data-gallery-card
                className="group relative aspect-[4/5] min-h-[12rem] w-[min(280px,calc(85vw-2rem))] shrink-0 snap-start overflow-hidden rounded-2xl border border-border/80 bg-zinc-900/40 text-left outline-none ring-offset-2 ring-offset-surface focus-visible:ring-2 focus-visible:ring-zinc-400 sm:min-h-0 sm:w-[min(300px,calc(45vw-1.5rem))] md:w-[min(320px,calc((100%-2rem)/2.4))] lg:w-[min(320px,calc((100%-3rem)/3))]"
                onClick={() => onOpenImage(item)}
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.99 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                aria-haspopup="dialog"
                aria-label={`Open preview: ${item.alt}`}
              >
                <img
                  src={item.thumb}
                  alt=""
                  width={640}
                  height={800}
                  loading={eager ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="sr-only">{item.alt}</span>
                <span
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-90"
                  aria-hidden="true"
                />
              </motion.button>
            )
          })}
        </div>

        {n > 1 ? (
          <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-between px-2 sm:px-4">
            <button
              type="button"
              aria-label="Scroll portfolio left"
              disabled={atStart}
              onClick={() => scrollByDir(-1)}
              className="pointer-events-auto flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full border border-white/10 bg-zinc-800/95 text-zinc-100 shadow-lg backdrop-blur-sm transition-[opacity,transform,background-color] hover:bg-zinc-700 hover:text-white disabled:pointer-events-none disabled:opacity-30 sm:h-12 sm:w-12"
            >
              <ChevronLeft className="sm:scale-110" />
            </button>
            <button
              type="button"
              aria-label="Scroll portfolio right"
              disabled={atEnd}
              onClick={() => scrollByDir(1)}
              className="pointer-events-auto flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full border border-white/10 bg-zinc-800/95 text-zinc-100 shadow-lg backdrop-blur-sm transition-[opacity,transform,background-color] hover:bg-zinc-700 hover:text-white disabled:pointer-events-none disabled:opacity-30 sm:h-12 sm:w-12"
            >
              <ChevronRight className="sm:scale-110" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default function Gallery({ className = '' }) {
  const [active, setActive] = useState(null)
  const reduce = useReducedMotion()
  const panelRef = useRef(null)
  const location = useLocation()

  const visibleSections = useMemo(() => {
    const raw = location.hash?.replace(/^#/, '').trim()
    if (!raw) return artistGallerySections
    const match = artistGallerySections.find((s) => s.slug === raw)
    return match ? [match] : artistGallerySections
  }, [location.hash])

  useLayoutEffect(() => {
    const raw = location.hash?.replace(/^#/, '')
    if (!raw) return
    const el = document.getElementById(raw)
    if (!el) return
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    })
  }, [location.pathname, location.hash, reduce])

  useEffect(() => {
    if (!active) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active])

  useEffect(() => {
    if (!active || !panelRef.current) return undefined
    const dialog = panelRef.current
    const getFocusable = () =>
      dialog.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
    const focusables = getFocusable()
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    const t = requestAnimationFrame(() => first?.focus?.())
    const onKeyDown = (e) => {
      if (e.key !== 'Tab' || focusables.length === 0) return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus?.()
        }
      } else if (document.activeElement === last) {
        e.preventDefault()
        first?.focus?.()
      }
    }
    dialog.addEventListener('keydown', onKeyDown)
    return () => {
      cancelAnimationFrame(t)
      dialog.removeEventListener('keydown', onKeyDown)
    }
  }, [active])

  return (
    <section
      className={`border-b border-border py-12 sm:py-16 ${className}`.trim()}
      aria-label="Artist portfolios"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {visibleSections.length === 0 ? (
          <p className="text-center text-sm text-muted">
            Portfolio images will appear here when added under{' '}
            <code className="text-zinc-500">public/artists/</code>.
          </p>
        ) : (
          <div className="flex flex-col gap-16 md:gap-20">
            {visibleSections.map((section, idx) => (
              <article
                key={section.slug}
                id={section.slug}
                className={`scroll-mt-24 md:scroll-mt-28 ${
                  idx > 0 ? 'border-t border-border pt-14 md:pt-16' : ''
                }`}
              >
                <header className="max-w-2xl">
                  <h2 className="font-display text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                    <span className="relative inline-block">
                      {section.name}
                      <span
                        className="absolute -bottom-0.5 left-0 h-px w-10 rounded-full bg-gradient-to-r from-studio-gold/70 to-transparent sm:w-12"
                        aria-hidden="true"
                      />
                    </span>
                  </h2>
                  {section.intro ? (
                    <p className="mt-3 text-base leading-relaxed text-zinc-400 sm:text-lg">
                      {section.intro}
                    </p>
                  ) : null}
                  <p
                    className={`text-sm leading-relaxed text-muted ${section.intro ? 'mt-3' : 'mt-2'}`}
                  >
                    Use the arrows or swipe the row to browse; tap an image to enlarge. In the
                    lightbox, swipe or scroll on small screens.
                  </p>
                </header>

                <GallerySectionCarousel
                  section={section}
                  sectionIndex={idx}
                  reduce={reduce}
                  onOpenImage={setActive}
                />
              </article>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-ink/90 backdrop-blur-sm"
              aria-label="Close gallery preview"
              onClick={() => setActive(null)}
            />
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="gallery-dialog-title"
              className="relative z-10 max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-lg border border-border bg-surface-elevated shadow-2xl"
              initial={reduce ? false : { opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.98, y: 4 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            >
              <div className="flex items-start justify-between gap-4 border-b border-border px-4 py-3 sm:px-6">
                <p
                  id="gallery-dialog-title"
                  className="pr-8 text-sm font-medium leading-snug text-zinc-200 sm:text-base"
                >
                  {active.alt}
                </p>
                <button
                  type="button"
                  className="shrink-0 rounded-md border border-border px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
                  onClick={() => setActive(null)}
                >
                  Close
                </button>
              </div>
              <div className="max-h-[calc(92vh-4rem)] overflow-auto bg-ink/50">
                <img
                  src={active.src}
                  alt={active.alt}
                  width={1600}
                  height={1600}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
