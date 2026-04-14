import { motion, useReducedMotion } from 'framer-motion'
import { socialLinks } from '../data/social'
import { instagramPostEmbeds, instagramEmbedSrc } from '../data/instagram'

const ig = socialLinks.find((s) => s.id === 'instagram')

export default function InstagramSection() {
  const reduce = useReducedMotion()
  const href = ig?.href ?? 'https://www.instagram.com/1bloodstudio/'
  const embeds = instagramPostEmbeds.filter((e) => e?.shortcode?.trim())

  return (
    <section
      className="border-b border-border bg-ink py-16 sm:py-20"
      aria-labelledby="instagram-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-studio-gold-muted">
            Social
          </p>
          <h2
            id="instagram-heading"
            className="mt-3 font-display text-3xl tracking-wide text-zinc-50 sm:text-4xl"
          >
            Follow us on Instagram
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            See more fresh work, guest artist drops, and studio updates — posts and reels straight
            from the shop.
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-sm border border-zinc-600 bg-white/[0.04] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-zinc-200 transition-colors hover:border-studio-gold/45 hover:bg-white/[0.07] hover:text-white"
          >
            <InstagramGlyph className="h-5 w-5 text-zinc-300" aria-hidden="true" />
            @1bloodstudio
          </a>
        </div>

        {embeds.length > 0 ? (
          <ul className="mt-12 grid list-none gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {embeds.map((post, i) => (
              <motion.li
                key={`${post.kind ?? 'p'}-${post.shortcode}`}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex justify-center"
              >
                <div className="w-full max-w-[340px] overflow-hidden rounded-sm border border-border bg-surface shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                  <iframe
                    src={instagramEmbedSrc({
                      shortcode: post.shortcode.trim(),
                      kind: post.kind === 'reel' ? 'reel' : 'p',
                    })}
                    title={`Instagram ${post.kind === 'reel' ? 'reel' : 'post'} ${post.shortcode}`}
                    className="h-[480px] w-full border-0"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </motion.li>
            ))}
          </ul>
        ) : (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mx-auto mt-12 max-w-md text-center text-sm leading-relaxed text-muted"
          >
            Recent posts from our feed can be featured below — use the Instagram button for the
            full gallery until then.
          </motion.p>
        )}
      </div>
    </section>
  )
}

function InstagramGlyph({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}
