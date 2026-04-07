export default function PageHeader({ eyebrow, title, subtitle, children }) {
  return (
    <header className="relative overflow-hidden border-b border-border bg-surface/60">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-40%,rgba(196,165,116,0.07),transparent_55%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
          <span className="relative inline-block">
            {title}
            <span
              className="absolute -bottom-1 left-0 h-0.5 w-12 rounded-full bg-gradient-to-r from-studio-gold/80 via-studio-gold/30 to-transparent sm:w-16"
              aria-hidden="true"
            />
          </span>
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </header>
  )
}
