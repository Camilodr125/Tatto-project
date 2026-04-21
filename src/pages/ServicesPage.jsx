import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import CustomWorkCarousel from '../components/CustomWorkCarousel'
import { getStudioStyleKeywords, serviceSections } from '../data/services'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

/** Thin studio-gold line fading right — same language as PageHeader / Gallery */
function GoldUnderline() {
  return (
    <span
      className="absolute -bottom-0.5 left-0 h-px w-10 rounded-full bg-gradient-to-r from-studio-gold/75 via-studio-gold/35 to-transparent sm:w-12"
      aria-hidden="true"
    />
  )
}

export default function ServicesPage() {
  const reduce = useReducedMotion()
  const styleKeywords = getStudioStyleKeywords()

  return (
    <>
      <PageHeader eyebrow="What we do" title="Services" />

      <section className="border-b border-border py-14 sm:py-20" aria-label="Services we offer">
        <div className="mx-auto max-w-6xl space-y-14 px-4 sm:space-y-16 sm:px-6 lg:px-8">
          {serviceSections.map((section, idx) => (
            <div
              key={section.id}
              className={
                idx > 0 ? 'border-t border-border pt-14 sm:pt-16' : ''
              }
            >
              <h2 className="font-display text-2xl tracking-wide text-zinc-100 sm:text-3xl">
                <span className="relative inline-block pb-0.5">
                  {section.title}
                  <GoldUnderline />
                </span>
              </h2>
              {section.description ? (
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                  {section.description}
                </p>
              ) : null}

              {section.id === 'tattoos' ? (
                <div className="mt-8 rounded-sm border border-border/80 bg-surface/40 p-5 sm:p-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-studio-gold-muted">
                    <span className="relative inline-block pb-0.5">
                      Styles across our team
                      <GoldUnderline />
                    </span>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    These tags reflect what our artists focus on for{' '}
                    <span className="text-zinc-400">custom</span> work. For flash and pre-made
                    pieces, ask the artist or the desk what&apos;s available — it changes over time.
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2 sm:gap-2.5">
                    {styleKeywords.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-zinc-700/90 bg-surface-elevated px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wider text-zinc-300 sm:text-xs"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm text-muted">
                    <Link to="/artists" className="font-semibold text-zinc-300 hover:text-zinc-100">
                      Meet the artists
                    </Link>
                    {' · '}
                    <Link
                      to={{ pathname: '/gallery', hash: '' }}
                      className="font-semibold text-zinc-400 hover:text-zinc-200"
                    >
                      Browse the gallery
                    </Link>
                  </p>
                </div>
              ) : null}

              <motion.ul
                className={`space-y-10 sm:space-y-12 ${section.id === 'tattoos' ? 'mt-10' : 'mt-8'}`}
                variants={reduce ? {} : container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
              >
                {section.items.map((s) => {
                  const showItemTitle =
                    section.items.length > 1 || s.title !== section.title
                  return (
                  <motion.li
                    key={s.title}
                    variants={reduce ? {} : item}
                    transition={{ duration: 0.45 }}
                    className="rounded-sm border border-border bg-surface-elevated p-6 sm:p-8 lg:p-10"
                  >
                    {showItemTitle ? (
                    <h3 className="font-display text-xl tracking-wide text-zinc-100 sm:text-2xl">
                      <span className="relative inline-block pb-0.5">
                        {s.title}
                        <GoldUnderline />
                      </span>
                    </h3>
                    ) : null}
                    {s.teamStyles?.length ? (
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {s.teamStyles.map((t) => (
                          <li
                            key={t}
                            className="rounded-sm border border-zinc-700/80 bg-zinc-900/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-400"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <p className="mt-4 text-muted">{s.summary}</p>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-300">{s.detail}</p>
                    <ul className="mt-5 space-y-2.5 text-sm text-zinc-400">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-500" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    {s.title === 'Custom tattoos' ? <CustomWorkCarousel /> : null}
                    {section.id === 'short-consults' ? (
                      <div className="mt-8 border-t border-border/80 pt-6">
                        <p className="text-sm leading-relaxed text-muted">
                          Consults run about <strong className="font-semibold text-zinc-400">10–15 minutes</strong> — conversation only, no setup in the chair. Use the form to request a slot; for a full tattoo booking, use{' '}
                          <Link
                            to="/book"
                            className="font-semibold text-zinc-300 underline decoration-zinc-600 underline-offset-4 hover:text-white"
                          >
                            Book an appointment
                          </Link>
                          .
                        </p>
                        <Link
                          to={{ pathname: '/book', search: '?type=consult' }}
                          className="mt-5 inline-flex items-center justify-center rounded-sm bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-accent-hot"
                        >
                          Request a consultation
                        </Link>
                      </div>
                    ) : null}
                  </motion.li>
                  )
                })}
              </motion.ul>
            </div>
          ))}

          <p className="border-t border-border pt-12 text-center text-sm text-muted sm:pt-14">
            Ready for a full session?{' '}
            <Link to="/book" className="font-semibold text-zinc-200 hover:text-white">
              Book a tattoo
            </Link>
            {' · '}
            <Link to="/artists" className="font-semibold text-zinc-400 hover:text-zinc-200">
              Choose an artist
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
