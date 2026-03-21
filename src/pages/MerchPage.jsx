import { motion, useReducedMotion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import { merchItems } from '../data/merch'
import { STUDIO_EMAIL } from '../constants'

function orderHref(productName) {
  const subject = encodeURIComponent(`Merch order: ${productName}`)
  const body = encodeURIComponent(
    `Hi — I'd like to order: ${productName}\n\nSize / qty:\nShipping or pickup:\n`,
  )
  return `mailto:${STUDIO_EMAIL}?subject=${subject}&body=${body}`
}

export default function MerchPage() {
  const reduce = useReducedMotion()

  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="Merch"
        subtitle="Caps, shirts, hoodies, and bags — studio-branded pieces. Sizes and stock are confirmed by email; pickup at the shop or shipping where available."
      />

      <section className="border-b border-border py-16 sm:py-20" aria-label="Products">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {merchItems.map((item, i) => (
              <motion.li
                key={item.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex flex-col overflow-hidden rounded-sm border border-border bg-surface-elevated"
              >
                <div className="aspect-square overflow-hidden bg-surface">
                  <img
                    src={item.image}
                    alt={item.alt}
                    width={800}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    {item.category}
                  </p>
                  <h3 className="mt-1 font-display text-xl tracking-wide text-zinc-100">
                    {item.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.blurb}</p>
                  <p className="mt-4 font-display text-2xl text-white">{item.price}</p>
                  <a
                    href={orderHref(item.name)}
                    className="mt-4 inline-flex justify-center rounded-sm border border-zinc-600 bg-white/5 py-3 text-center text-xs font-bold uppercase tracking-wider text-zinc-200 transition-colors hover:border-zinc-400 hover:bg-white/10 hover:text-white"
                  >
                    Email to order
                  </a>
                </div>
              </motion.li>
            ))}
          </ul>

          <p className="mt-14 max-w-2xl text-sm leading-relaxed text-muted">
            <strong className="text-zinc-300">How it works:</strong> send an email with the
            product name, size, and whether you want pickup or mail. We will confirm total
            with tax (if applicable) and timing. No cart checkout on this site — orders are
            handled personally.
          </p>
        </div>
      </section>
    </>
  )
}
