import { artists } from './artists'

/**
 * Flash & pre-made designs, shown only in the Services → "Flash & pre-made tattoos" card.
 * Kept apart from `workImages` so these sheets never appear in the gallery, hero or
 * portfolio strips. Files live in `public/flash/<folder>/`; list them here in display order.
 * Artists with no files (or who are hidden) are skipped.
 */
const FLASH_BY_ARTIST = [
  { slug: 'yessy', folder: 'yessy', count: 10 },
  { slug: 'alejandro', folder: 'david_bonilla', count: 6 },
  { slug: 'ale', folder: 'ale', count: 0 },
  { slug: 'bulyorvis', folder: 'bulyorvis', count: 3 },
  { slug: 'drex', folder: 'drex', count: 0 },
  { slug: 'juan_haka', folder: 'juan_haka', count: 0 },
  { slug: 'korthe', folder: 'korthe', count: 0 },
  { slug: 'mikey_weyer', folder: 'mikey_weyer', count: 0 },
]

/** Artists with flash to show, each with `designs` ({ id, src, alt }). */
export function getFlashCollections() {
  return FLASH_BY_ARTIST.flatMap(({ slug, folder, count }) => {
    const artist = artists.find((a) => a.slug === slug)
    if (!artist || count === 0) return []
    return [
      {
        slug,
        name: artist.name,
        designs: Array.from({ length: count }, (_, i) => ({
          id: `${slug}-flash-${i + 1}`,
          src: `/flash/${folder}/${folder}_flash_${i + 1}.jpeg`,
          alt: `Flash design ${i + 1} by ${artist.name}`,
        })),
      },
    ]
  })
}
