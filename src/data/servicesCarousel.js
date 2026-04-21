import { artists } from './artists'

/**
 * Slides for Services → Custom tattoos carousel.
 * Excludes images already used on the home hero (first 2 portfolio shots per artist — see Hero.jsx).
 * Round-robin across artists so the strip mixes different people.
 */
export function getCustomWorkCarouselSlides({ max = 12 } = {}) {
  const heroSrcs = new Set()
  for (const a of artists) {
    ;(a.workImages ?? []).slice(0, 2).forEach((src) => heroSrcs.add(src))
  }

  const perArtist = artists.map((a) => {
    const rest = (a.workImages ?? []).filter((src) => !heroSrcs.has(src))
    return rest.map((src) => ({
      id: `${a.slug}-${src}`,
      src,
      artistName: a.name,
      slug: a.slug,
      alt: `Custom tattoo by ${a.name}`,
    }))
  })

  const out = []
  let round = 0
  let added = true
  while (added && out.length < max) {
    added = false
    for (const list of perArtist) {
      if (list[round]) {
        out.push(list[round])
        added = true
      }
    }
    round++
  }
  return out
}
