import { artists } from './artists'

/** Unique style phrases from artist profiles (skips placeholders). */
export function getStudioStyleKeywords() {
  const out = []
  const seen = new Set()
  for (const a of artists) {
    if (!a.styles || /add styles here/i.test(a.styles)) continue
    for (const part of a.styles.split('·')) {
      const t = part.trim()
      const key = t.toLowerCase()
      if (t && !seen.has(key)) {
        seen.add(key)
        out.push(t)
      }
    }
  }
  return out
}

/** Styles & services — used on Services page (and grid where needed). */
export const services = [
  {
    title: 'Blackwork & ornamental',
    summary:
      'Bold saturation, ornamental geometry, and large-scale composition — in line with the bold fusion and neo-traditional work guests like Drex bring to the chair.',
    detail:
      'We map flow across muscle groups so large pieces read from a distance and stay balanced as they heal. Ornamental work is drafted with stencil checks and spacing rules tuned to your skin tone and lifestyle.',
    bullets: [
      'Sleeves, back pieces, and chest panels with clear hierarchy',
      'Geometry and patterning aligned to body curves',
      'Healing-forward ink loads — no muddy saturation',
    ],
    image: '/artists/drex/drex_1.jpeg',
    imageAlt: 'Bold black and grey tattoo composition',
    teamStyles: ['Bold style fusion', 'Neo-traditional', 'Asian & anime-inspired'],
  },
  {
    title: 'Fine line & micro realism',
    summary:
      'Delicate linework and micro-scale realism — the same attention to detail our resident artist applies to story-driven, meaningful pieces.',
    detail:
      'Fine line and micro work need room to breathe. We design with post-heal spread in mind, use stable needle groupings for your piece size, and avoid overcrowding that turns crisp lines into soft halos.',
    bullets: [
      'Micro realism, botanicals, and micro compositions',
      'Touch-up policy discussed upfront',
      'Aftercare tailored to placement (hands, ribs, etc.)',
    ],
    image: '/artists/alejandro/alejandro_2.jpeg',
    imageAlt: 'Fine detail tattoo work',
    teamStyles: ['Micro realism', 'Meaningful pieces', 'Fine detail'],
  },
  {
    title: 'Black & grey realism & portraits',
    summary:
      'High-contrast realism and portrait studies — aligned with how Daniel, Juan, Robert, and our guests approach black and grey, surreal themes, and fine-art finish.',
    detail:
      'Reference photos are a starting point, not a trace. We redesign contrast for skin, adjust focal points for the body, and set expectations for sittings, scale, and long-term contrast retention.',
    bullets: [
      'Black & grey realism, portraiture, and surreal compositions',
      'Portrait composition and facial readability checks',
      'Multi-session planning for large work',
    ],
    image: '/artists/daniel_avencilla/daniel_avencilla_1.jpeg',
    imageAlt: 'Black and grey realism tattoo',
    teamStyles: [
      'Black & grey realism',
      'Portraits',
      'Surrealism',
      'Fine-art finish',
    ],
  },
  {
    title: 'Cover-ups & rework',
    summary:
      'Strategic redesign sessions to transform older work — planned with the same realism and contrast discipline our artists use on fresh pieces.',
    detail:
      'Cover-ups are chemistry, contrast, and honesty. We measure existing ink, explain what can and cannot be hidden in one pass, and propose directions that age better than a quick dark blast.',
    bullets: [
      'Laser fade consults when needed (we partner with local clinics)',
      'Stencil tests before commitment',
      'Reworks that respect scar tissue and older linework',
    ],
    image: '/artists/robert_hernandez/robert_hernandez_2.jpeg',
    imageAlt: 'Tattoo rework and contrast study',
    teamStyles: ['Black & grey realism', 'High detail', 'Fine-art finish'],
  },
]

export const sessionInfo = [
  {
    title: 'Consultations',
    text: 'First meetings cover placement, size, skin history, and timeline. Bring references — we translate them into a tattoo plan, not a copy-paste.',
  },
  {
    title: 'Hygiene & safety',
    text: 'Single-use needles and barriers, documented setup, and a calm pace so nothing is rushed mid-session.',
  },
  {
    title: 'Deposits & scheduling',
    text: 'A deposit holds your date and applies to the final session. Reschedule windows are communicated clearly so both sides stay protected.',
  },
]
