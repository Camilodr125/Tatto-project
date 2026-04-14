/**
 * Profile + portfolio paths live under public/artists/<slug>/ — see public/artists/README.txt
 * Filenames: profile + work images (adjust extensions in this file — e.g. .jpeg, .webp).
 */
export const artists = [
  {
    id: '1',
    slug: 'alejandro',
    name: 'David Bonilla',
    status: 'permanent',
    styles: 'Micro realism · Meaningful pieces · Fine detail',
    portfolioIntro:
      'Micro realism and tattoos built to carry meaning — story-driven pieces rooted in drawing and a calm, intentional approach.',
    bio: `Meet David Bonilla, a tattoo artist specializing in micro realism.

With 3 years of experience, David focuses on creating tattoos that carry meaning — pieces that tell a story, hold a purpose, and represent something deeper than just a good tattoo.

His passion for tattooing comes from his love for drawing. He has been drawing since childhood, and being able to continue creating art as an adult is one of the things he enjoys most.

For David, the purpose of each day is simple: to be happy and at peace — and that mindset is reflected in every piece he creates.`,
    image: '/artists/alejandro/alejandro_profile.jpeg',
    workImages: [
      '/artists/alejandro/alejandro_1.jpeg',
      '/artists/alejandro/alejandro_2.jpeg',
      '/artists/alejandro/alejandro_3.jpeg',
      '/artists/alejandro/alejandro_4.jpeg',
      '/artists/alejandro/alejandro_5.jpeg',
    ],
    alt: 'Portrait of tattoo artist David Bonilla',
  },
  {
    id: '2',
    slug: 'daniel_avencilla',
    name: 'Daniel Avecilla',
    status: 'temporary',
    availableFrom: '2026-06-01',
    availableTo: '2026-06-30',
    styles: 'Black & grey realism · Portraits · High detail',
    portfolioIntro:
      'Refined black-and-grey realism with high-detail portraits, smooth shading, and lifelike compositions with depth and contrast—modern black-and-grey specialist.',
    bio: `Daniel Avecilla is a Spanish tattoo artist known for his refined black and grey realism. With several years of experience in the industry, he has developed a strong reputation for high-detail portraits, smooth shading, and clean, lifelike compositions with depth and contrast.

Daniel is currently based in Los Angeles, California, and continues to work with clients from around the world.

We're excited to welcome Daniel Avecilla as a guest artist at Oneblood Tattoo Studio this June, offering a unique opportunity to get tattooed by a specialist in modern black and grey realism.`,
    image: '/artists/daniel_avencilla/daniel_avencilla_profile.jpeg',
    workImages: [
      '/artists/daniel_avencilla/daniel_avencilla_1.jpeg',
      '/artists/daniel_avencilla/daniel_avencilla_2.jpeg',
      '/artists/daniel_avencilla/daniel_avencilla_3.webp',
      '/artists/daniel_avencilla/daniel_avencilla_4.webp',
      '/artists/daniel_avencilla/daniel_avencilla_5.webp',
      '/artists/daniel_avencilla/daniel_avencilla_6.jpeg',
      '/artists/daniel_avencilla/daniel_avencilla_7.jpeg',
    ],
    alt: 'Portrait of tattoo artist Daniel Avecilla',
    // 1081×1921 is much taller than ~1081×1351: object-cover zooms to fill width and crops top/bottom (nameplate). contain shows the full poster like other cards; gutters match bg-surface. For full-bleed, re-export profile at ~1081×1351.
    profileIntrinsic: { w: 1081, h: 1921 },
    profileObjectFit: 'contain',
  },
  {
    id: '3',
    slug: 'drex',
    name: 'Drex',
    status: 'temporary',
    availabilityLabel: 'Now booking',
    styles:
      'Bold style fusion · Black & grey realism · Neo-traditional · Asian & anime-inspired',
    bio: `Drex is a Colombian tattoo artist with over seven years of experience, specializing in bold style fusion. His work moves between soft black-and-grey realism and striking neo-traditional compositions—often blending both to create pieces that feel unique, intentional, and visually powerful.

This versatility has led him to develop a signature approach—often blending styles or incorporating solid, striking color accents into black-and-grey compositions, creating pieces that feel both dynamic and balanced.

Deeply inspired by Asian art and anime since the beginning of his career, Drex naturally gravitates toward these themes in his work. Whether you're drawn to Asian folklore or you're an anime enthusiast, his style offers a unique way to bring those influences to life on skin.`,
    portfolioIntro:
      'Bold fusion of black-and-grey realism and neo-traditional with optional striking color accents—dynamic, balanced pieces rooted in Asian art and anime influences.',
    image: '/artists/drex/drex_profile.png',
    workImages: [
      '/artists/drex/drex_1.jpeg',
      '/artists/drex/drex_2.jpeg',
      '/artists/drex/drex_3.jpeg',
      '/artists/drex/drex_4.jpeg',
      '/artists/drex/drex_5.jpeg',
    ],
    alt: 'Portrait of tattoo artist Drex',
  },
  {
    id: '4',
    slug: 'juan_haka',
    name: 'Juan Haka',
    status: 'temporary',
    styles: 'Black & grey realism · Portraits · Surrealism',
    portfolioIntro:
      'Black & grey realism and portraiture with a strong surrealist signature—depth, creativity, and compositions shaped by years of work across 30+ countries.',
    bio: `Originally from Medellín, Colombia, Juan Haka is an accomplished tattoo artist with over 16 years of experience in the industry. In 2024, he moved to the United States to explore new opportunities and continue evolving both personally and artistically.

Throughout his career, Juan has traveled extensively, working in more than 30 countries around the world. This global experience has deeply influenced his artistic perspective, allowing him to blend different cultural elements into his work and develop a unique, refined style.

He specializes in black and grey realism and portraiture, with a strong focus on surrealism—his true signature style. His work is known for its depth, creativity, and ability to transform concepts into powerful, visually striking compositions that flow naturally with the body.

Currently, Juan is traveling across the United States, immersing himself in different cultures and artistic environments while tattooing in various cities. At Oneblood studio, he brings a high level of experience, versatility, and a distinctive artistic approach to every project.`,
    image: '/artists/juan_haka/juan_haka_profile.png',
    workImages: [
      '/artists/juan_haka/juan_haka_1.jpeg',
      '/artists/juan_haka/juan_haka_2.jpeg',
      '/artists/juan_haka/juan_haka_3.jpeg',
      '/artists/juan_haka/juan_haka_4.jpeg',
      '/artists/juan_haka/juan_haka_5.jpeg',
      '/artists/juan_haka/juan_haka_6.jpeg',
    ],
    alt: 'Portrait of tattoo artist Juan Haka',
  },
  {
    id: '5',
    slug: 'korthe',
    name: 'Korthe',
    status: 'temporary',
    availableFrom: '2026-07-01',
    availableTo: '2026-07-31',
    styles: 'Add styles here',
    bio: 'Bio coming soon — update this text in src/data/artists.js.',
    portfolioIntro: '',
    image: '/artists/korthe/korthe_profile.png',
    workImages: [
      '/artists/korthe/korthe_1.jpeg',
      '/artists/korthe/korthe_2.jpeg',
      '/artists/korthe/korthe_3.jpeg',
      '/artists/korthe/korthe_4.jpeg',
      '/artists/korthe/korthe_5.jpeg',
      '/artists/korthe/korthe_6.jpeg',
      '/artists/korthe/korthe_7.jpeg',
    ],
    alt: 'Portrait of tattoo artist Korthe',
  },
  {
    id: '6',
    slug: 'robert_hernandez',
    name: 'Robert Hernandez',
    status: 'temporary',
    availableFrom: '2026-07-01',
    availableTo: '2026-07-31',
    styles: 'Black & grey realism · Surrealism · Fine-art finish',
    portfolioIntro:
      "Exceptional black-and-grey realism and dark surreal compositions—depth, precision, and a fine-art finish from one of the genre's pioneers.",
    bio: `Robert Hernandez is an internationally recognized tattoo artist known for his exceptional black and grey realism and dark, surreal compositions. With over three decades of experience, his work stands out for its depth, precision, and artistic approach, often resembling fine art on skin. Based in Madrid, Spain, Robert has influenced the global tattoo industry and continues to push the boundaries of realism through his unique style.

We're excited to announce that Robert Hernandez will be joining Oneblood Tattoo Studio as a guest artist this July. This is a rare opportunity to get tattooed by one of the pioneers of black and grey realism.`,
    image: '/artists/robert_hernandez/robert_hernandez_profile.png',
    workImages: [
      '/artists/robert_hernandez/robert_hernandez_1.jpeg',
      '/artists/robert_hernandez/robert_hernandez_2.jpeg',
      '/artists/robert_hernandez/robert_hernandez_3.jpeg',
      '/artists/robert_hernandez/robert_hernandez_4.jpeg',
      '/artists/robert_hernandez/robert_hernandez_5.jpeg',
    ],
    alt: 'Portrait of tattoo artist Robert Hernandez',
  },
]
