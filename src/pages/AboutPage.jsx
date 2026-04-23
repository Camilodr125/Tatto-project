import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import About from '../components/About'
import FaqSection from '../components/FaqSection'

const values = [
  {
    title: 'Precision',
    text: 'Stencils are checked standing and seated. We adjust flow for how you actually move, not just how a flat print looks.',
  },
  {
    title: 'Respect',
    text: 'Clear timelines, honest expectations for tricky placements, and no pressure to size up a design.',
  },
  {
    title: 'Longevity',
    text: 'We design for healed skin — contrast, spacing, and detail scale that still reads after the first month.',
  },
]

export default function AboutPage() {
  const reduce = useReducedMotion()

  return (
    <>
      <PageHeader
        eyebrow="oneblood studio"
        title="About the studio"
        subtitle="A Dallas tattoo studio that welcomes walk-ins and appointments — built around focus in the chair, medical-grade hygiene, and tattoos meant to age with you."
      />
      <About />
      <section
        className="border-t border-border bg-surface py-16 sm:py-20"
        aria-labelledby="values-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2
            id="values-heading"
            className="font-display text-3xl tracking-wide text-zinc-50 sm:text-4xl"
          >
            How we work
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Three principles that show up in consults, drawings, and the chair — every
            session.
          </p>
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {values.map((v, i) => (
              <motion.li
                key={v.title}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-sm border border-border bg-surface-elevated p-6"
              >
                <h3 className="font-display text-xl tracking-wide text-zinc-100">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{v.text}</p>
              </motion.li>
            ))}
          </ul>
          <p className="mt-12 text-center text-sm text-muted">
            <Link to="/reviews" className="text-zinc-300 hover:text-white">
              Read client reviews
            </Link>
            {' · '}
            <Link
              to={{ pathname: '/book', search: '?type=consult' }}
              className="text-zinc-500 hover:text-zinc-300"
            >
              Book a consult
            </Link>
            {' · '}
            <Link to="/about#faq" className="text-zinc-500 hover:text-zinc-300">
              FAQ
            </Link>
          </p>
        </div>
      </section>
      <FaqSection />
    </>
  )
}
