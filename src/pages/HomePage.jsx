import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Hero from '../components/Hero'
import InstagramSection from '../components/InstagramSection'
import StudioShowreel from '../components/StudioShowreel'
import Testimonials from '../components/Testimonials'
import { FEATURE_MERCH } from '../constants'

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
    to: { pathname: '/gallery', hash: '' },
    title: 'Gallery',
    desc: 'Selected work and studio atmosphere — click any image for a larger view.',
  },
  ...(FEATURE_MERCH
    ? [
        {
          to: '/merch',
          title: 'Merch',
          desc: 'Caps, tees, hoodies, and bags — email to order sizes and pickup or shipping.',
        },
      ]
    : []),
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
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-8 lg:gap-10 xl:gap-14">
            <div className="order-2 w-full md:order-1 md:max-w-[min(100%,440px)] md:flex-shrink-0 lg:max-w-[min(100%,460px)] xl:max-w-[min(100%,500px)]">
              <StudioShowreel variant="split" className="md:mt-0" />
            </div>
            <div className="order-1 min-w-0 flex-1 md:order-2 md:pt-0.5 lg:pt-1">
              <h2
                id="explore-heading"
                className="font-display text-3xl tracking-wide text-zinc-50 sm:text-4xl"
              >
                Explore the studio
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-muted sm:mt-5 sm:text-lg">
                <p>
                  Each section lives on its own page — jump in wherever you need detail. Browse
                  styles and how sessions work, meet resident and guest artists, and see a reel
                  and gallery of work from the team.
                </p>
                <p className="text-zinc-400">
                  Oneblood studio is a private appointment-based shop in Dallas. We focus on
                  clear consults, sterile setup, and tattoos composed to age well — from black and
                  grey to color, fine line, and larger pieces. Use the links below for services,
                  artist bios, portfolios, studio standards, client reviews, and booking.
                </p>
                <p className="text-zinc-400">
                  When you are ready, the Book page is the place to send references, placement,
                  timing, and budget so we can reply with next steps. We answer within a few
                  business days.
                </p>
              </div>
            </div>
          </div>
          <ul className="mt-14 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
            {explore.map((item, i) => (
              <motion.li
                key={item.title}
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
      <InstagramSection />
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
