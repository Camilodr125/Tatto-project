import { motion, useReducedMotion } from 'framer-motion'
import StudioPhotosPlaceholder from './StudioPhotosPlaceholder'

export default function About() {
  const reduce = useReducedMotion()

  return (
    <section
      className="border-b border-border bg-surface py-16 sm:py-20"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <StudioPhotosPlaceholder />
        </motion.div>

        <div>
          <h2
            id="about-heading"
            className="font-display text-4xl tracking-wide text-zinc-50 sm:text-5xl"
          >
            The studio
          </h2>
          <p className="mt-6 text-muted">
            Oneblood studio welcomes walk-ins and booked appointments — built
            around focus in the chair, medical-grade hygiene, and drawings that
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
