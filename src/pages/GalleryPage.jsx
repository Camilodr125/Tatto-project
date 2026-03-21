import PageHeader from '../components/PageHeader'
import Gallery from '../components/Gallery'

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Gallery"
        subtitle="A mix of process shots and healed-friendly compositions. This grid is a starting point — your piece will be drawn specifically for you."
      />
      <Gallery
        heading="Selected work"
        subheading="Hover tiles on desktop, tap to preview. Images are representative of technique and studio mood."
        className="border-b-0 py-12 sm:py-16"
      />
    </>
  )
}
