import { artists } from './artists'

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
        intro:
          typeof a.portfolioIntro === 'string' ? a.portfolioIntro.trim() : '',
        items: [...imageItems, ...videoItems],
      }
    })
}
