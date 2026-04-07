import StudioLogo from './StudioLogo'

/**
 * Stacked mark: icon, “ONE BLOOD”, then “TATTOO STUDIO” (wide tracking).
 * Used in the footer — centered stack.
 */
export default function StudioBrand({ logoClassName }) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <StudioLogo
        className={[logoClassName, 'mx-auto object-center'].join(' ')}
      />
      <span className="font-display text-[0.9375rem] font-semibold leading-tight tracking-tight text-zinc-100 sm:text-lg md:text-xl lg:text-2xl">
        ONE BLOOD
      </span>
      <span className="font-display text-[10px] font-medium uppercase leading-tight tracking-[0.2em] text-zinc-500 sm:text-[11px] sm:tracking-[0.26em] md:tracking-[0.28em]">
        TATTOO STUDIO
      </span>
    </div>
  )
}
