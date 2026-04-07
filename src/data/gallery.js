import { artists } from './artists'

/** Artist folders under /public/artists — each `workImages` entry becomes a tile + lightbox */
export function getArtistGallerySections() {
  return artists
    .filter((a) => Array.isArray(a.workImages) && a.workImages.length > 0)
    .map((a) => ({
      slug: a.slug,
      name: a.name,
      intro:
        typeof a.portfolioIntro === 'string' ? a.portfolioIntro.trim() : '',
      items: a.workImages.map((src, i) => ({
        id: `${a.slug}-work-${i}`,
        src,
        thumb: src,
        alt: `${a.name} — portfolio ${i + 1}`,
      })),
    }))
}
