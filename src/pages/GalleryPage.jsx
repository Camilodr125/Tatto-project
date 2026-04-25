import { Link, useLocation } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Gallery from '../components/Gallery'
import { getArtistGallerySections } from '../data/gallery'

const sections = getArtistGallerySections()

export default function GalleryPage() {
  const { hash } = useLocation()
  const slug = (hash || '').replace(/^#/, '').trim()
  const single = slug ? sections.find((s) => s.slug === slug) : null

  return (
    <>
      <PageHeader
        compact
        eyebrow="Portfolio"
        title="Gallery"
        subtitle={
          single
            ? `Showing ${single.name}'s portfolio only.`
            : 'Work from our artists — see their dedication, their pieces, and the range of styles we work with at the studio. Guest artists may rotate throughout the year. Tap an image to enlarge.'
        }
      >
        {single ? (
          <p className="mt-4">
            <Link
              to={{ pathname: '/gallery', hash: '' }}
              replace
              className="text-sm font-semibold uppercase tracking-wider text-zinc-400 underline decoration-zinc-600 underline-offset-4 transition-colors hover:text-white hover:decoration-zinc-400"
            >
              View all artists
            </Link>
          </p>
        ) : null}
      </PageHeader>
      <Gallery className="border-b-0" />
    </>
  )
}
