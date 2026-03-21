import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

export default function NotFoundPage() {
  return (
    <>
      <PageHeader
        eyebrow="404"
        title="Page not found"
        subtitle="That URL does not exist or has moved. Head home or open the menu to pick a section."
      />
      <section className="py-16 text-center" aria-label="Next steps">
        <Link
          to="/"
          className="inline-flex rounded-sm border border-border px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
        >
          Back to home
        </Link>
      </section>
    </>
  )
}
