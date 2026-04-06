import { STUDIO_LOGO_SRC } from '../constants'

/**
 * Decorative logo — parent should set aria-label (e.g. Link to home).
 */
export default function StudioLogo({ className }) {
  return (
    <img
      src={STUDIO_LOGO_SRC}
      alt=""
      width={200}
      height={48}
      decoding="async"
      className={className}
    />
  )
}
