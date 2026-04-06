import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { getArtistGallerySections } from '../data/gallery'

const artistGallerySections = getArtistGallerySections()

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

  const renderTile = (g, eagerFirst) => (
    <motion.button
      type="button"
      className="group relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-border/80 bg-zinc-900/40 text-left outline-none ring-offset-2 ring-offset-surface transition-[border-color,box-shadow,transform] hover:border-zinc-600 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-zinc-400"
      onClick={() => setActive(g)}
      whileHover={reduce ? undefined : { scale: 1.015 }}
      whileTap={reduce ? undefined : { scale: 0.995 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      aria-haspopup="dialog"
      aria-expanded={active?.id === g.id}
      aria-label={`Open preview: ${g.alt}`}
    >
      <img
        src={g.thumb}
        alt=""
        width={600}
        height={750}
        loading={eagerFirst ? 'eager' : 'lazy'}
        decoding="async"
        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <span className="sr-only">{g.alt}</span>
      <span
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-90"
        aria-hidden="true"
      />
      <span className="pointer-events-none absolute bottom-3 left-3 right-3 text-xs font-semibold uppercase tracking-wider text-zinc-200 opacity-0 transition-opacity group-hover:opacity-100">
        Enlarge
      </span>
    </motion.button>
  )

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
                  <h2 className="font-display text-3xl tracking-wide text-zinc-50 sm:text-4xl">
                    {section.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Tap an image to enlarge. Swipe or scroll the lightbox on small screens.
                  </p>
                </header>

                <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
                  {section.items.map((g, i) => (
                    <li key={g.id} className="min-w-0">
                      {renderTile(g, idx === 0 && i < 3)}
                    </li>
                  ))}
                </ul>
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
