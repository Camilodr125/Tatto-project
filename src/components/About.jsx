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

        <div className="min-w-0 max-w-prose lg:max-w-none">
          <h2
            id="about-heading"
            className="font-display text-4xl tracking-wide text-zinc-50 sm:text-5xl"
          >
            The studio
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              One Blood Tattoo Studio is a Dallas-based tattoo studio built around quality,
              intention, and respect for the craft.
            </p>
            <p>
              Founded by artist Alejandro Montilla, the studio brings together a team of
              artists working under one standard: precision, professionalism, and long-term
              quality in every piece.
            </p>
            <p>
              We don&apos;t rush work, we don&apos;t replicate designs, and we don&apos;t cut
              corners. Every tattoo is created to fit your body, your skin, and your idea —
              ensuring it not only looks good today, but ages the right way over time.
            </p>
            <p>
              Our process is collaborative. Designs are developed with your input, making
              sure each piece flows naturally with your anatomy while maintaining a strong
              artistic direction.
            </p>
            <p>
              We welcome both appointments and walk-ins, depending on availability. Whether
              you&apos;re starting a large project or coming in for something smaller,
              you&apos;ll receive the same level of attention and care.
            </p>
            <p className="text-zinc-300">
              At One Blood, the goal is simple: create tattoos that last — in quality, in
              meaning, and in experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
