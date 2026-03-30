import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { artists } from '../data/artists'

function formatRange(from, to) {
  const fmt = (d) =>
    new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  return `${fmt(from)} – ${fmt(to)}`
}

export default function ArtistsPage() {
  const reduce = useReducedMotion()

  return (
    <>
      <PageHeader
        eyebrow="Team"
        title="Artists"
        subtitle="Resident artists work in focused blocks so drawings get real time — not a rushed stencil five minutes before the needle. Guest artists are announced on socials."
      />

      <section className="py-16 sm:py-20" aria-label="Artist profiles">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {artists.map((a, i) => (
              <motion.li
                key={a.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex flex-col overflow-hidden rounded-sm border border-border bg-surface-elevated"
              >
                <div className="aspect-[4/5] overflow-hidden bg-surface">
                  <img
                    src={a.image}
                    alt={a.alt}
                    width={600}
                    height={750}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2">
                    <span
                      className={[
                        'inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest',
                        a.status === 'permanent'
                          ? 'bg-zinc-800 text-zinc-300'
                          : 'bg-amber-900/40 text-amber-400',
                      ].join(' ')}
                    >
                      {a.status === 'permanent' ? 'Permanent' : 'Guest'}
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-2xl tracking-wide text-zinc-100">
                    {a.name}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500">{a.styles}</p>
                  {a.status === 'temporary' && a.availableFrom && a.availableTo && (
                    <p className="mt-2 text-xs text-amber-400/80">
                      Available {formatRange(a.availableFrom, a.availableTo)}
                    </p>
                  )}
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{a.bio}</p>
                  <Link
                    to="/book"
                    state={{ artist: a.name }}
                    className="mt-6 inline-flex items-center justify-center rounded-sm border border-zinc-600 bg-white/5 py-3 text-center text-xs font-bold uppercase tracking-wider text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-white/10"
                  >
                    Request {a.name.split(' ')[0]}
                  </Link>
                </div>
              </motion.li>
            ))}
          </ul>

          <p className="mt-14 max-w-2xl text-sm leading-relaxed text-muted">
            <strong className="text-zinc-300">Booking note:</strong> mention your preferred
            artist in the booking form. If their books are closed, we will suggest another
            artist with a matching style or add you to a waitlist.
          </p>
        </div>
      </section>
    </>
  )
}
