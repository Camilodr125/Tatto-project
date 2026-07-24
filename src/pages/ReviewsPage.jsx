import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Testimonials from '../components/Testimonials'
import { STUDIO_WALKIN_HOURS, STUDIO_MAPS_URL } from '../constants'
import { reviewsExtended } from '../data/reviews'
import { useGoogleReviews } from '../hooks/useGoogleReviews'

export default function ReviewsPage() {
  const { reviews, rating, total, googleUrl, source } =
    useGoogleReviews(reviewsExtended)

  const isGoogle = source === 'google'
  const ratingLabel = rating != null ? rating.toFixed(1) : '5.0'
  const ratingCaption = isGoogle ? 'Average on Google' : 'What we strive for'
  const countLabel = total != null ? String(total) : String(reviews.length)
  const countCaption = isGoogle ? 'Google reviews' : 'Client stories below'
  const reviewsGoogleUrl = googleUrl || STUDIO_MAPS_URL

  return (
    <>
      <PageHeader
        eyebrow="Social proof"
        title="Reviews & stories"
        subtitle="Hear from clients about sessions, aftercare, and how the work healed — we’re proud of the trust people place in the studio."
      />

      <section className="border-b border-border bg-surface/40 py-10" aria-label="Summary">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-10 px-4 sm:gap-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="font-display text-4xl text-white sm:text-5xl">{ratingLabel}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">
              {ratingCaption}
            </p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl text-zinc-100 sm:text-4xl">Walk-ins</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">
              {STUDIO_WALKIN_HOURS}
            </p>
          </div>
          <div className="text-center">
            <p className="font-display text-4xl text-zinc-100 sm:text-5xl">{countLabel}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">
              {countCaption}
            </p>
          </div>
        </div>

        {isGoogle && (
          <p className="mt-8 text-center text-xs text-muted">
            Live from{' '}
            <a
              href={reviewsGoogleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-zinc-300 underline underline-offset-2 transition-colors hover:text-white"
            >
              Google
            </a>
            . Google shows up to 5 of our most relevant reviews.
          </p>
        )}
      </section>

      <Testimonials
        reviews={reviews}
        showIntro={false}
        className="border-b border-border pb-20 pt-8 sm:pt-12"
      />

      <section className="py-16 sm:py-20" aria-label="Leave a review">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl tracking-wide text-zinc-100 sm:text-3xl">
            Got something to say?
          </h2>
          <p className="mt-3 text-muted">
            Loved your session? A quick Google review helps other people find the studio.
            Prefer to start a new project instead?
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={reviewsGoogleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-sm border border-white/25 bg-white/[0.04] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-zinc-100 transition-colors hover:border-white/45 hover:bg-white/10 hover:text-white"
            >
              Review us on Google
            </a>
            <Link
              to="/book"
              className="inline-flex rounded-sm bg-accent px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-accent-hot"
            >
              Contact the studio
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
