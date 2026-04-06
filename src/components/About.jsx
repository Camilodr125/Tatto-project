import { motion, useReducedMotion } from 'framer-motion'

export default function About() {
  const reduce = useReducedMotion()

  return (
    <section
      className="border-b border-border bg-surface py-16 sm:py-20"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <motion.div
          className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border"
          initial={reduce ? false : { opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=1000&q=80&auto=format&fit=crop"
            alt="Artist refining a custom tattoo design at the studio desk"
            width={1000}
            height={750}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
            aria-hidden="true"
          />
        </motion.div>

        <div>
          <h2
            id="about-heading"
            className="font-display text-4xl tracking-wide text-zinc-50 sm:text-5xl"
          >
            The studio
          </h2>
          <p className="mt-6 text-muted">
            oneblood studio is a private appointment space built around focus:
            one client block at a time, medical-grade hygiene, and drawings that
            respect how ink settles over years — not just how it photographs on
            day one.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-zinc-300">
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-500" />
              Sterile setup, single-use consumables, and clear aftercare you can
              actually follow.
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-500" />
              Consultations for placement, flow, and skin tone — before needles
              touch skin.
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-500" />
              Inclusive booking — we work at a sustainable pace to protect your
              piece and our hands.
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
