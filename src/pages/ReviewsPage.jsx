import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Testimonials from '../components/Testimonials'
import { reviewsExtended } from '../data/reviews'

export default function ReviewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Social proof"
        title="Reviews & stories"
        subtitle="Sample feedback written in the tone of real studio reviews — replace with quotes from Google, Instagram DMs, or your booking app whenever you are ready."
      />

      <section className="border-b border-border bg-surface/40 py-10" aria-label="Summary">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-10 px-4 sm:gap-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="font-display text-4xl text-white sm:text-5xl">5.0</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">
              Target average
            </p>
          </div>
          <div className="text-center">
            <p className="font-display text-4xl text-zinc-100 sm:text-5xl">100%</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">
              By appointment
            </p>
          </div>
          <div className="text-center">
            <p className="font-display text-4xl text-zinc-100 sm:text-5xl">6+</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">
              Sample reviews below
            </p>
          </div>
        </div>
      </section>

      <Testimonials
        reviews={reviewsExtended}
        showIntro={false}
        className="border-b border-border pb-20 pt-8 sm:pt-12"
      />

      <section className="py-16 sm:py-20" aria-label="Leave a review">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl tracking-wide text-zinc-100 sm:text-3xl">
            Got something to say?
          </h2>
          <p className="mt-3 text-muted">
            After your session, we will send a link to leave feedback. Prefer to start a
            new project instead?
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-sm bg-accent px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-accent-hot"
          >
            Contact the studio
          </Link>
        </div>
      </section>
    </>
  )
}
