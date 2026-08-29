import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { getArtistStyleSpotlights } from '../data/services'

const spotlights = getArtistStyleSpotlights()

const row = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

/**
 * Services → "Signature styles": one card per resident artist with a style label
 * and a horizontal strip of their portfolio images (from data/services →
 * getArtistStyleSpotlights, which reads artists.js `workImages`). Images and the
 * heading link through to that artist's section on the gallery page.
 */
export default function ArtistStyleSpotlights() {
  const reduce = useReducedMotion()
  if (spotlights.length === 0) return null

  return (
    <div className="mt-10 space-y-8 sm:space-y-10">
      {spotlights.map((s, idx) => (
        <motion.article
          key={s.slug}
          variants={reduce ? {} : row}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: Math.min(idx * 0.05, 0.2) }}
          className="rounded-sm border border-border bg-surface-elevated p-5 sm:p-6"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-display text-lg tracking-wide text-zinc-100 sm:text-xl">
              <span className="relative inline-block pb-0.5">
                {s.name}
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-10 rounded-full bg-gradient-to-r from-studio-gold/75 via-studio-gold/35 to-transparent sm:w-12"
                  aria-hidden="true"
                />
              </span>
            </h3>
            <Link
              to={`/gallery#${s.slug}`}
              className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 transition-colors hover:text-zinc-300"
            >
              View portfolio →
            </Link>
          </div>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-studio-gold-muted">
            {s.styleLabel}
          </p>

          {s.images.length > 0 ? (
            <div className="relative mt-4">
              <div
                className="pointer-events-none absolute right-0 top-0 z-[1] h-full w-8 bg-gradient-to-r from-transparent to-surface-elevated sm:w-12"
                aria-hidden
              />
              <ul className="flex gap-3 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] snap-x sm:gap-4 [&::-webkit-scrollbar]:hidden">
                {s.images.map((img, i) => (
                  <li
                    key={img.id}
                    className="w-[min(200px,60vw)] shrink-0 snap-start sm:w-[220px]"
                  >
                    <Link
                      to={`/gallery#${s.slug}`}
                      className="block overflow-hidden rounded-sm border border-border/80 bg-zinc-900/30 outline-none ring-offset-2 ring-offset-surface-elevated focus-visible:ring-2 focus-visible:ring-zinc-400"
                      aria-label={`Open ${s.name}'s portfolio`}
                    >
                      <div className="relative aspect-[4/5]">
                        <img
                          src={img.src}
                          alt={img.alt}
                          width={440}
                          height={550}
                          loading={idx === 0 && i < 2 ? 'eager' : 'lazy'}
                          decoding="async"
                          className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-[1.03]"
                        />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </motion.article>
      ))}
    </div>
  )
}
