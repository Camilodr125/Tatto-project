import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Hero from '../components/Hero'
import Testimonials from '../components/Testimonials'

const explore = [
  {
    to: '/services',
    title: 'Services',
    desc: 'Styles we tattoo, how sessions work, and what to expect from a consult.',
  },
  {
    to: '/artists',
    title: 'Artists',
    desc: 'Meet the resident team — specialties, booking rhythm, and guest spots.',
  },
  {
    to: '/gallery',
    title: 'Gallery',
    desc: 'Selected work and studio atmosphere — click any image for a larger view.',
  },
  {
    to: '/merch',
    title: 'Merch',
    desc: 'Caps, tees, hoodies, and bags — email to order sizes and pickup or shipping.',
  },
  {
    to: '/about',
    title: 'The studio',
    desc: 'Hygiene standards, how we plan pieces, and why we work by appointment.',
  },
  {
    to: '/reviews',
    title: 'Reviews',
    desc: 'Client experiences — healing, communication, and long-term results.',
  },
  {
    to: '/book',
    title: 'Book',
    desc: 'Send your idea, placement, and timing. We reply within a few business days.',
  },
]

export default function HomePage() {
  const reduce = useReducedMotion()

  return (
    <>
      <Hero />
      <section
        className="border-b border-border bg-surface py-16 sm:py-20"
        aria-labelledby="explore-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2
            id="explore-heading"
            className="font-display text-3xl tracking-wide text-zinc-50 sm:text-4xl"
          >
            Explore the studio
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Each section lives on its own page — jump in wherever you need detail.
          </p>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {explore.map((item, i) => (
              <motion.li
                key={item.to}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  to={item.to}
                  className="group flex h-full flex-col rounded-sm border border-border bg-surface-elevated p-6 transition-colors hover:border-zinc-600"
                >
                  <span className="font-display text-xl tracking-wide text-zinc-100 group-hover:text-white">
                    {item.title}
                  </span>
                  <span className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {item.desc}
                  </span>
                  <span className="mt-4 text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Open →
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
      <Testimonials />
      <section className="border-b border-border bg-surface py-10 text-center" aria-label="More reviews">
        <Link
          to="/reviews"
          className="text-sm font-bold uppercase tracking-wider text-zinc-400 transition-colors hover:text-white"
        >
          All reviews →
        </Link>
      </section>
    </>
  )
}
