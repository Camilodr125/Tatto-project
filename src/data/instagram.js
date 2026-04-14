/**
 * Instagram embeds (Home page block). Paste shortcodes from your public posts or reels:
 *   Post: https://www.instagram.com/p/SHORTCODE/  →  kind: 'p'
 *   Reel: https://www.instagram.com/reel/SHORTCODE/  →  kind: 'reel'
 * Leave the array empty to show the “Follow us” block without embeds.
 */
export const instagramPostEmbeds = [
  { shortcode: 'DXFFQ9MkZyo', kind: 'p' },
]

/** Build official embed URL (iframe src). */
export function instagramEmbedSrc({ shortcode, kind = 'p' }) {
  const segment = kind === 'reel' ? 'reel' : 'p'
  return `https://www.instagram.com/${segment}/${shortcode}/embed`
}
