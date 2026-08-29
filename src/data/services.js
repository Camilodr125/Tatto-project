import { artists } from './artists'

/**
 * Curated tags for the Services page (short list for mobile). Each artist profile
 * still lists their full specialties.
 */
const SERVICES_PUBLIC_STYLE_TAGS = [
  'Black & grey realism',
  'Portraits',
  'Anime & manga',
  'Neo-traditional',
  'Surrealism',
  'Drag dotwork',
]

/** Style pills on Services — curated subset; not every artist line item. */
export function getStudioStyleKeywords() {
  return SERVICES_PUBLIC_STYLE_TAGS
}

/** Two tattoo paths under “Tattoos” on Services — custom vs flash / pre-made */
export const tattooCategoryServices = [
  {
    title: 'Custom tattoos',
    summary:
      'The full process with your artist: you share a design or strong references, and we develop the piece together — drawing, revisions, stencil, and sessions — until it fits your body and how you want it to read long-term.',
    detail:
      'Nothing is one-size-fits-all. You can send art or mood boards ahead of time; your artist adapts the idea for placement, scale, and how ink heals on your skin. Expect clear communication about timeline, sittings, and aftercare before needle time.',
    bullets: [
      'Share your design or references; the artist builds on your idea (not a generic stencil)',
      'Collaborative drawing and adjustments before we lock the stencil',
      'Sessions booked once the design and placement are set',
    ],
    teamStyles: [],
  },
  {
    title: 'Flash & pre-made tattoos',
    summary:
      'Pre-drawn designs our artists already offer — pick a piece from their flash or pre-made books, then we size it for you and book the session. Faster than a full custom build when you love a design that’s already finished.',
    detail:
      'What’s available depends on the artist. Ask in consult, at the desk, or follow their socials for new drops. Placement and sizing are still tailored to you; you’re choosing a finished design rather than inventing one from scratch.',
    bullets: [
      'Choose from designs the artist has already created',
      'Ideal when you want a clear look without a long custom process',
      'Availability varies — check with your artist or the studio',
    ],
    teamStyles: [],
  },
]

/**
 * Signature artist + style pairings for the Services page. Each row shows the
 * artist, a short style label, and a strip of their portfolio images pulled
 * straight from `artists.js` (same source as the gallery). Edit the label or
 * reorder here; add/remove images in the artist's `workImages`.
 */
const ARTIST_STYLE_SPOTLIGHTS = [
  { slug: 'ale', styleLabel: 'Black & grey realism' },
  { slug: 'alejandro', styleLabel: 'Black & grey anime' },
  { slug: 'bulyorvis', styleLabel: 'Color / black & grey' },
  { slug: 'yessy', styleLabel: 'Color realism & illustrative' },
]

/** Resolved spotlights (artist + label + gallery images); skips anyone hidden/missing. */
export function getArtistStyleSpotlights({ maxImages = 8 } = {}) {
  return ARTIST_STYLE_SPOTLIGHTS.flatMap((entry) => {
    const artist = artists.find((a) => a.slug === entry.slug)
    if (!artist) return []
    return [
      {
        slug: artist.slug,
        name: artist.name,
        styleLabel: entry.styleLabel,
        images: (artist.workImages ?? []).slice(0, maxImages).map((src, i) => ({
          id: `${artist.slug}-style-${i}`,
          src,
          alt: `${entry.styleLabel} tattoo by ${artist.name}`,
        })),
      },
    ]
  })
}

export const seminarsService = {
  title: 'Seminars',
  summary:
    'Focused blocks for artists and apprentices — technique, theory, and studio practice when we schedule them.',
  detail:
    'Topics and dates rotate. We announce upcoming seminars on the studio’s social channels and at the shop — ask at the desk or message us if you want to be notified when the next block opens.',
  bullets: [
    'Announced on Instagram and in-studio',
    'Small groups when we run a class',
    'Email or DM the studio to get on the interest list',
  ],
  teamStyles: [],
}

export const shortConsultationService = {
  title: 'Artist consults',
  summary:
    'A conversation with an artist about your idea, placement, references, and timing — not a tattoo session.',
  detail:
    'These are short sit-downs — usually about 10–15 minutes — with no needle time. Book when you want to talk things through before committing to a full session. We listen, sketch rough directions, and point you toward the right artist or a follow-up booking.',
  bullets: [
    'Not a tattoo appointment — talk and planning only',
    'Bring references and questions',
    'Full tattoo sessions are booked separately after you’re ready',
  ],
  teamStyles: [],
}

/** Ordered sections for Services page: tattoos → short consultations → seminars */
export const serviceSections = [
  {
    id: 'tattoos',
    title: 'Tattoos',
    description:
      'Custom work is built with your artist from your idea; flash and pre-made are designs the team already has ready to book. Specialty tags below show what our artists focus on for custom projects.',
    items: tattooCategoryServices,
  },
  {
    id: 'artist-styles',
    title: 'Signature styles',
    description:
      'Where each resident artist focuses for custom work — with a strip of their portfolio. Open a portfolio for the full set.',
    items: [],
  },
  {
    id: 'short-consults',
    title: 'Short consultations',
    description: null,
    items: [shortConsultationService],
  },
  {
    id: 'seminars',
    title: 'Seminars',
    description: null,
    items: [seminarsService],
  },
]

/** Flat list (tattoo styles + seminars + short consults) for anything that needs one array */
export const services = serviceSections.flatMap((s) => s.items)
