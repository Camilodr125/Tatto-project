import { useId, useState } from 'react'
import { faqItems } from '../data/faq'

function Chevron({ open, className = '' }) {
  return (
    <svg
      className={`h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-200 ${open ? 'rotate-180' : ''} ${className}`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function FaqSection({ className = '' }) {
  const baseId = useId()
  const [openId, setOpenId] = useState(null)

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      id="faq"
      className={`scroll-mt-24 border-t border-border bg-surface py-16 sm:py-20 ${className}`}
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex justify-center" aria-hidden="true">
            <span className="h-px w-16 rounded-full bg-gradient-to-r from-transparent via-studio-gold/70 to-transparent sm:w-20" />
          </div>
          <h2
            id="faq-heading"
            className="mt-6 text-center font-display text-3xl tracking-wide text-zinc-50 sm:text-4xl"
          >
            Before You Book
          </h2>
          <p className="mt-3 text-center text-base leading-relaxed text-muted sm:text-lg">
            What to know before getting tattooed at One Blood
          </p>

          <ul className="mt-12 border-t border-border">
            {faqItems.map((item) => {
              const isOpen = openId === item.id
              const headingId = `${baseId}-q-${item.id}`
              const panelId = `${baseId}-a-${item.id}`

              return (
                <li key={item.id} className="border-b border-border">
                  <h3 className="font-display text-lg font-normal tracking-wide text-zinc-100 sm:text-xl">
                    <button
                      type="button"
                      id={headingId}
                      className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:text-white sm:py-6"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(item.id)}
                    >
                      <span className="min-w-0 flex-1">{item.question}</span>
                      <Chevron open={isOpen} className="mt-0.5" />
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headingId}
                    hidden={!isOpen}
                    className="pb-5 sm:pb-6"
                  >
                    <p className="text-sm leading-relaxed text-muted sm:text-base">{item.answer}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
