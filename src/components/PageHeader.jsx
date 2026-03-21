export default function PageHeader({ eyebrow, title, subtitle, children }) {
  return (
    <header className="border-b border-border bg-surface/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 font-display text-4xl tracking-wide text-zinc-50 sm:text-5xl lg:text-6xl">
          {title}
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
