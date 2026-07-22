import { STUDIO_EMAIL } from '../constants'

const INSTAGRAM_URL = 'https://www.instagram.com/1bloodstudio/'
const MAILTO = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent('Tattoo Artist Application — Portfolio')}`

export default function HiringBanner() {
  return (
    <section
      className="border-b border-border bg-ink py-12 sm:py-16"
      aria-labelledby="hiring-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg border border-studio-gold/25 bg-surface-elevated shadow-[0_0_80px_-40px_rgba(196,165,116,0.4)]">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950 md:aspect-auto md:h-full md:min-h-[340px]">
              <img
                src="/gallery/hiring.jpeg"
                alt="One Blood Tattoo Studio is hiring tattoo artists"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-studio-gold">
                Now Hiring · Estamos contratando
              </p>
              <h2
                id="hiring-heading"
                className="mt-3 font-display text-3xl tracking-wide text-zinc-50 sm:text-4xl"
              >
                We&apos;re hiring tattoo artists
              </h2>

              <p className="mt-4 text-base leading-relaxed text-muted">
                One Blood Tattoo Studio is looking for passionate artists eager to keep learning
                and grow professionally, in a space built on respect, commitment, and a genuine
                love for the craft. If quality and continuous growth matter to you, we&apos;d love
                to see your work.
              </p>
              <p className="mt-3 text-base leading-relaxed text-zinc-400">
                Buscamos artistas apasionados por el tatuaje, con ganas de seguir aprendiendo y
                crecer, en un ambiente basado en el respeto, el compromiso y el amor por el arte.
                Si la calidad y la evolución son tu prioridad, nos encantaría conocer tu trabajo.
              </p>

              <p className="mt-5 text-sm font-semibold text-zinc-300">
                📍 Dallas, TX (downtown) · Send us your portfolio / Envíanos tu portafolio
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={MAILTO}
                  className="inline-flex items-center justify-center rounded-sm bg-studio-gold px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:bg-studio-gold-muted"
                >
                  Email your portfolio
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-sm border border-zinc-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-200 transition-colors hover:border-zinc-400 hover:text-white"
                >
                  DM on Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
