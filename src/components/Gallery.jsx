import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { galleryItems } from '../data/gallery'

export default function Gallery({
  heading = 'Selected work',
  subheading = 'Hover for depth — click any tile for a larger preview. Images are representative of studio process and atmosphere.',
  className = '',
}) {
  const [active, setActive] = useState(null)
  const reduce = useReducedMotion()
  const panelRef = useRef(null)

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
      className={`border-b border-border py-20 sm:py-24 ${className}`.trim()}
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="gallery-heading"
              className="font-display text-4xl tracking-wide text-zinc-50 sm:text-5xl"
            >
              {heading}
            </h2>
            <p className="mt-3 max-w-xl text-muted">{subheading}</p>
          </div>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {galleryItems.map((g, i) => (
            <li key={g.id}>
              <motion.button
                type="button"
                className="group relative aspect-square w-full overflow-hidden rounded-sm border border-border bg-surface-elevated text-left outline-none transition-[border-color,transform] hover:border-white/25 focus-visible:ring-2 focus-visible:ring-zinc-400"
                onClick={() => setActive(g)}
                whileHover={reduce ? undefined : { scale: 1.02 }}
                whileTap={reduce ? undefined : { scale: 0.99 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                aria-haspopup="dialog"
                aria-expanded={active?.id === g.id}
                aria-label={`Open preview: ${g.alt}`}
              >
                <img
                  src={g.thumb}
                  alt=""
                  width={600}
                  height={600}
                  loading={i < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="sr-only">{g.alt}</span>
                <span
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
                <span className="pointer-events-none absolute bottom-3 left-3 right-3 font-display text-lg tracking-wide text-zinc-100 opacity-0 transition-opacity group-hover:opacity-100">
                  View
                </span>
              </motion.button>
            </li>
          ))}
        </ul>
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
              className="absolute inset-0 bg-ink/85 backdrop-blur-sm"
              aria-label="Close gallery preview"
              onClick={() => setActive(null)}
            />
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="gallery-dialog-title"
              className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-sm border border-border bg-surface-elevated shadow-2xl"
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
                  className="shrink-0 rounded border border-border px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
                  onClick={() => setActive(null)}
                >
                  Close
                </button>
              </div>
              <div className="max-h-[calc(90vh-4rem)] overflow-auto">
                <img
                  src={active.src}
                  alt={active.alt}
                  width={1200}
                  height={1200}
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
