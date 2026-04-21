import { artists } from './artists'

function formatDateRange(from, to) {
  const fmt = (d) =>
    new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  return `${fmt(from)} – ${fmt(to)}`
}

/** Same rules as ArtistsPage: label, date range, or socials fallback */
function guestAvailabilityLine(a) {
  if (a.status !== 'temporary') return null
  if (typeof a.availabilityLabel === 'string' && a.availabilityLabel.trim()) {
    return a.availabilityLabel.trim()
  }
  if (a.availableFrom && a.availableTo) {
    return `Available ${formatDateRange(a.availableFrom, a.availableTo)}`
  }
  return 'Visit dates announced on socials.'
}

/** Artist folders under /public/artists — `workImages` + optional `workVideos` become tiles + lightbox */
export function getArtistGallerySections() {
  return artists
    .filter(
      (a) =>
        (Array.isArray(a.workImages) && a.workImages.length > 0) ||
        (Array.isArray(a.workVideos) && a.workVideos.length > 0),
    )
    .map((a) => {
      const imageItems = (a.workImages || []).map((src, i) => ({
        id: `${a.slug}-work-${i}`,
        src,
        thumb: src,
        alt: `${a.name} — portfolio ${i + 1}`,
        mediaType: 'image',
      }))
      const videoItems = (a.workVideos || []).map((src, i) => ({
        id: `${a.slug}-video-${i}`,
        src,
        thumb: src,
        alt: `${a.name} — video ${i + 1}`,
        mediaType: 'video',
      }))
      return {
        slug: a.slug,
        name: a.name,
        roleLabel: a.status === 'permanent' ? 'Resident' : 'Guest',
        guestAvailabilityLine: guestAvailabilityLine(a),
        intro:
          typeof a.portfolioIntro === 'string' ? a.portfolioIntro.trim() : '',
        items: [...imageItems, ...videoItems],
      }
    })
}
