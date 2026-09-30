import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { getFlashCollections } from '../data/flash'

const collections = getFlashCollections()

function Chevron({ dir }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={dir === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'}
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const navButton =
  'flex h-9 w-9 touch-manipulation items-center justify-center rounded-full border border-zinc-700 text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white disabled:pointer-events-none disabled:opacity-30'

/** One artist's flash: sheets shown whole on white, like pages pulled from their flash book. */
function FlashRow({ collection, reduce, onOpen }) {
  const scrollerRef = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const n = collection.designs.length

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setAtStart(el.scrollLeft <= 2)
    setAtEnd(max <= 2 || el.scrollLeft >= max - 2)
  }, [])

  useLayoutEffect(() => {
    const el = scrollerRef.current
    if (!el) return undefined
    updateScrollState()
    if (typeof ResizeObserver === 'undefined') return undefined
    const ro = new ResizeObserver(updateScrollState)
    ro.observe(el)
    return () => ro.disconnect()
  }, [updateScrollState])

  const scrollByDir = (dir) => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector('li')
    const gap = parseFloat(getComputedStyle(el).columnGap) || 16
    const step = card ? card.getBoundingClientRect().width + gap : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step * 2, behavior: reduce ? 'auto' : 'smooth' })
  }

  const headingId = `flash-${collection.slug}`

  return (
    <section aria-labelledby={headingId}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h4 id={headingId} className="font-display text-lg tracking-wide text-zinc-100 sm:text-xl">
            {collection.name}
          </h4>
          <p className="mt-0.5 text-xs text-zinc-500">
            {n} {n === 1 ? 'design' : 'designs'} ready to book
          </p>
        </div>
        {n > 1 ? (
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              className={navButton}
              aria-label={`Previous ${collection.name} designs`}
              disabled={atStart}
              onClick={() => scrollByDir(-1)}
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              className={navButton}
              aria-label={`More ${collection.name} designs`}
              disabled={atEnd}
              onClick={() => scrollByDir(1)}
            >
              <Chevron dir="right" />
            </button>
          </div>
        ) : null}
      </div>

      <ul
        ref={scrollerRef}
        onScroll={updateScrollState}
        className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {collection.designs.map((d, i) => (
          <li key={d.id} className="w-[min(190px,42vw)] shrink-0 snap-start sm:w-[210px]">
            <button
              type="button"
              onClick={() => onOpen(collection, i)}
              aria-label={`Enlarge ${d.alt}`}
              className="group block w-full rounded-[2px] bg-white p-2 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.9)] outline-none transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-studio-gold focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <span className="relative block aspect-[5/7] overflow-hidden">
                <img
                  src={d.src}
                  alt={d.alt}
                  width={500}
                  height={700}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

/** Full-size view of one sheet, with prev/next through that artist's flash. */
function FlashViewer({ open, onClose, onStep, reduce }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const returnTo = document.activeElement
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onStep(-1)
      if (e.key === 'ArrowRight') onStep(1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      returnTo?.focus?.()
    }
    // Only re-run when the viewer opens or closes, not on every step.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Boolean(open)])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
        >
          <button
            type="button"
            tabIndex={-1}
            className="absolute inset-0 bg-ink/95 backdrop-blur-sm"
            aria-label="Close"
            onClick={onClose}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={open.design.alt}
            className="relative z-10 flex max-h-full w-full max-w-3xl flex-col items-center"
          >
            <div className="mb-3 flex w-full items-center justify-between gap-4 text-sm">
              <p className="text-zinc-300">
                {open.collection.name}
                <span className="ml-3 text-zinc-500">
                  {open.index + 1} of {open.collection.designs.length}
                </span>
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="rounded-sm border border-zinc-700 px-3 py-1.5 text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="relative flex min-h-0 w-full items-center justify-center">
              <motion.img
                key={open.design.src}
                src={open.design.src}
                alt={open.design.alt}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="max-h-[calc(100vh-8rem)] w-auto max-w-full rounded-[2px] bg-white object-contain p-2 sm:p-3"
              />
              <button
                type="button"
                onClick={() => onStep(-1)}
                aria-label="Previous design"
                className="absolute left-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-900/90 text-zinc-100 shadow-lg transition hover:bg-zinc-800 sm:-left-14"
              >
                <Chevron dir="left" />
              </button>
              <button
                type="button"
                onClick={() => onStep(1)}
                aria-label="Next design"
                className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-900/90 text-zinc-100 shadow-lg transition hover:bg-zinc-800 sm:-right-14"
              >
                <Chevron dir="right" />
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

/**
 * Services → "Flash & pre-made tattoos": one carousel per artist with designs in
 * `public/flash/` (see data/flash.js). These sheets appear nowhere else on the site.
 */
export default function FlashDesigns() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(null)

  const openAt = useCallback((collection, index) => {
    setOpen({ collection, index, design: collection.designs[index] })
  }, [])

  const step = useCallback((dir) => {
    setOpen((cur) => {
      if (!cur) return cur
      const n = cur.collection.designs.length
      const index = (cur.index + dir + n) % n
      return { ...cur, index, design: cur.collection.designs[index] }
    })
  }, [])

  if (collections.length === 0) return null

  return (
    <div className="mt-8 space-y-10 border-t border-border/80 pt-8">
      {collections.map((c) => (
        <FlashRow key={c.slug} collection={c} reduce={reduce} onOpen={openAt} />
      ))}
      <FlashViewer open={open} onClose={() => setOpen(null)} onStep={step} reduce={reduce} />
    </div>
  )
}
