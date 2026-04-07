import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { STUDIO_SHOWREEL_VIDEO_SRC } from '../constants'

/**
 * Studio showreel — `public/gallery/showreel.mov`
 * Plays when scrolled into view (muted; browsers require this for autoplay).
 */
export default function StudioShowreel({ className = '' }) {
  const reduce = useReducedMotion()
  const wrapRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    if (reduce) return undefined
    const root = wrapRef.current
    const video = videoRef.current
    if (!root || !video) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) {
          video.muted = true
          void video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -5% 0px' },
    )

    observer.observe(root)
    return () => {
      observer.disconnect()
      video.pause()
    }
  }, [reduce])

  return (
    <div ref={wrapRef} className={`mx-auto max-w-5xl ${className}`.trim()}>
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/90 bg-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_24px_64px_-20px_rgba(0,0,0,0.75),0_0_80px_-30px_rgba(196,165,116,0.12)] ring-1 ring-inset ring-studio-gold/20">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-center"
          controls
          playsInline
          muted
          preload="metadata"
          src={STUDIO_SHOWREEL_VIDEO_SRC}
          aria-label="Studio showreel"
        />
      </div>
      <p className="mt-3 text-center text-xs text-zinc-600">
        Plays automatically when in view (muted). Unmute with the player if you like. On mobile,
        fullscreen works best.
      </p>
    </div>
  )
}
