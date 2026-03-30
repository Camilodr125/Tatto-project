import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'

export default function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      className="relative overflow-hidden border-b border-border"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-25%,rgba(255,255,255,0.06),transparent)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:py-32">
        <div className="flex-1 text-left">
          <motion.p
            className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            By appointment · Client-first studio
          </motion.p>
          <motion.h1
            id="hero-heading"
            className="font-display text-5xl leading-[0.95] tracking-wide text-white sm:text-6xl lg:text-7xl"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            Ink that
            <span className="block text-zinc-400">outlasts trends</span>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-lg text-muted"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            Custom blackwork, fine line, and realism — sterile setup, clear
            aftercare, and tattoos drawn to look right for years, not just on
            day one.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            <Link
              to="/book"
              className="inline-flex items-center justify-center rounded-sm bg-accent px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-accent-hot"
            >
              Request a consult
            </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center justify-center rounded-sm border border-zinc-600 px-8 py-3.5 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-400 hover:text-white"
            >
              View work
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="relative flex flex-1 justify-center lg:justify-end"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm border border-border shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_28px_60px_-14px_rgba(0,0,0,0.85)]">
            <img
              src="https://images.unsplash.com/photo-1590246814883-57c511ccc0a9?w=900&q=80&auto=format&fit=crop"
              alt=""
              width={720}
              height={900}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-90"
              aria-hidden="true"
            />
            <p className="absolute bottom-4 left-4 right-4 font-display text-xl tracking-wide text-zinc-200">
              PRECISION · PATIENCE · PERMANENCE
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
