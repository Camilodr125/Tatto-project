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
    <div ref={wrapRef} className={`w-full ${className}`.trim()}>
      {/* Stage: fills the row so side margins feel designed; video scales with viewport height */}
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-zinc-900/45 via-zinc-950/80 to-ink px-4 py-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] sm:px-8 sm:py-10">
        <div
          className="relative mx-auto overflow-hidden rounded-2xl border border-border/90 bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_24px_64px_-20px_rgba(0,0,0,0.75),0_0_80px_-30px_rgba(196,165,116,0.12)] ring-1 ring-inset ring-studio-gold/20"
          style={{
            aspectRatio: '9 / 16',
            height: 'min(82svh, 860px)',
            width: 'auto',
            maxWidth: 'min(calc(100vw - 2rem), calc(min(82svh, 860px) * 9 / 16))',
          }}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-contain object-center"
            controls
            playsInline
            muted
            preload="metadata"
            src={STUDIO_SHOWREEL_VIDEO_SRC}
            aria-label="Studio showreel"
          />
        </div>
      </div>
    </div>
  )
}
