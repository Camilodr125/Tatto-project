import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { services, sessionInfo } from '../data/services'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
}

export default function ServicesPage() {
  const reduce = useReducedMotion()

  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title="Services & styles"
        subtitle="No flash walls — every tattoo is drawn for your body, your skin tone, and how you want it to read in five years, not just under ring light."
      />

      <section className="border-b border-border py-16 sm:py-20" aria-label="Service details">
        <div className="mx-auto max-w-6xl space-y-16 px-4 sm:px-6 lg:px-8">
          <motion.ul
            className="space-y-10"
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
                className="rounded-sm border border-border bg-surface-elevated p-6 sm:p-8"
              >
                <div className="mb-4 h-px w-10 bg-zinc-600" />
                <h2 className="font-display text-2xl tracking-wide text-zinc-100 sm:text-3xl">
                  {s.title}
                </h2>
                <p className="mt-3 text-muted">{s.summary}</p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-300">{s.detail}</p>
                <ul className="mt-5 space-y-2 text-sm text-zinc-400">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </motion.ul>

          <div className="grid gap-8 border-t border-border pt-16 md:grid-cols-3">
            {sessionInfo.map((block) => (
              <div key={block.title}>
                <h3 className="font-display text-lg tracking-wide text-zinc-100">
                  {block.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{block.text}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted">
            Ready to talk specifics?{' '}
            <Link to="/contact" className="font-semibold text-zinc-200 hover:text-white">
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
