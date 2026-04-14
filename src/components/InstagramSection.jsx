import { motion, useReducedMotion } from 'framer-motion'
import { socialLinks } from '../data/social'
import { instagramHighlights } from '../data/instagram'

const ig = socialLinks.find((s) => s.id === 'instagram')

function postImageSrc(post) {
  const u = post.imageUrl?.trim()
  if (u) return u
  const p = post.image?.trim()
  return p || null
}

export default function InstagramSection() {
  const reduce = useReducedMotion()
  const href = ig?.href ?? 'https://www.instagram.com/1bloodstudio/'
  const posts = instagramHighlights.filter((p) => p?.postUrl?.trim())

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
            Photos live on this site; tap any tile to open the matching post on Instagram.
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

        {posts.length > 0 ? (
          <ul className="mt-12 grid list-none gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => {
              const src = postImageSrc(post)
              const label = post.alt?.trim() || 'Publicación de Instagram'

              return (
                <motion.li
                  key={post.image || post.imageUrl || `${post.postUrl}-${i}`}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                >
                  <a
                    href={post.postUrl.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-surface-elevated shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition-[border-color,box-shadow] hover:border-zinc-600 hover:shadow-[0_0_48px_-12px_rgba(196,165,116,0.15)]"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900">
                      {src ? (
                        <img
                          src={src}
                          alt={label}
                          width={720}
                          height={900}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-end bg-[linear-gradient(160deg,#1c1c22_0%,#0a0a0c_45%,#14141a_100%)] px-5 pb-8 pt-12 text-center">
                          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                            <InstagramGlyph className="h-9 w-9 text-zinc-500" />
                          </span>
                          <p className="mt-6 text-xs leading-relaxed text-zinc-500">
                            Save the post photo to{' '}
                            <span className="text-zinc-400">public/instagram/</span> and set{' '}
                            <span className="text-zinc-400">image</span> in{' '}
                            <span className="text-zinc-400">instagram.js</span> so it appears here.
                          </p>
                        </div>
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                      <span className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-2 border-t border-white/10 bg-black/55 px-4 py-3 backdrop-blur-sm">
                        <span className="truncate text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-200">
                          Open on Instagram
                        </span>
                        <span className="shrink-0 text-sm text-zinc-300" aria-hidden="true">
                          ↗
                        </span>
                      </span>
                    </div>
                    {post.caption ? (
                      <p className="border-t border-border/80 p-4 text-sm leading-relaxed text-muted">
                        {post.caption}
                      </p>
                    ) : null}
                  </a>
                </motion.li>
              )
            })}
          </ul>
        ) : (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mx-auto mt-12 max-w-md text-center text-sm leading-relaxed text-muted"
          >
            Add highlights in the site data file, or use the button above for the full feed.
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
