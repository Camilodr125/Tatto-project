import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { getStudioStyleKeywords, services, sessionInfo } from '../data/services'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

export default function ServicesPage() {
  const reduce = useReducedMotion()
  const styleKeywords = getStudioStyleKeywords()

  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title="Services & styles"
        subtitle="No flash walls — every tattoo is drawn for your body, your skin tone, and how you want it to read in five years, not just under ring light."
      />

      <section
        className="border-b border-border bg-surface/40 py-12 sm:py-14"
        aria-labelledby="team-styles-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2
            id="team-styles-heading"
            className="text-center font-display text-xl tracking-wide text-zinc-100 sm:text-2xl"
          >
            Styles across our team
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-muted">
            Specialties pulled from our artists&apos; profiles — from micro realism and black &amp; grey
            portraits to neo-traditional fusion and surreal work. Match your idea with someone whose
            portfolio fits.
          </p>
          <ul className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-2.5">
            {styleKeywords.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-zinc-700/90 bg-surface-elevated px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wider text-zinc-300 sm:text-xs"
              >
                {tag}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-sm text-muted">
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
      </section>

      <section className="border-b border-border py-16 sm:py-20" aria-label="Service details">
        <div className="mx-auto max-w-6xl space-y-20 px-4 sm:px-6 lg:px-8">
          <motion.ul
            className="space-y-16 sm:space-y-20"
            variants={reduce ? {} : container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
          >
            {services.map((s) => (
              <motion.li
                key={s.title}
                variants={reduce ? {} : item}
                transition={{ duration: 0.45 }}
                className="rounded-sm border border-border bg-surface-elevated p-6 sm:p-8 lg:p-10"
              >
                <div className="mb-4 h-px w-10 bg-zinc-600" />
                <h2 className="font-display text-2xl tracking-wide text-zinc-100 sm:text-3xl">
                  {s.title}
                </h2>
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
              </motion.li>
            ))}
          </motion.ul>

          <div className="grid gap-10 border-t border-border pt-16 sm:grid-cols-3 sm:gap-8">
            {sessionInfo.map((block) => (
              <div
                key={block.title}
                className="rounded-sm border border-border/80 bg-surface-elevated/50 p-6"
              >
                <h3 className="font-display text-lg tracking-wide text-zinc-100">{block.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{block.text}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted">
            Ready to talk specifics?{' '}
            <Link to="/book" className="font-semibold text-zinc-200 hover:text-white">
              Book a consult
            </Link>
            {' · '}
            <Link to="/artists" className="font-semibold text-zinc-300 hover:text-zinc-100">
              Choose an artist
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
