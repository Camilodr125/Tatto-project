import { Link } from 'react-router-dom'
import { STUDIO_EMAIL } from '../constants'

const links = [
  { to: '/services', label: 'Services' },
  { to: '/artists', label: 'Artists' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/merch', label: 'Merch' },
  { to: '/about', label: 'About' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer
      className="border-t border-border bg-ink py-12"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-lg tracking-[0.12em] text-zinc-100">
              1BLOOD<span className="text-zinc-500"> STUDIO</span>
            </p>
            <p className="mt-2 max-w-xs text-sm text-muted">
              Dedication, respect for the client, and love for the art.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-2" aria-label="Footer">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm text-muted transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="text-sm text-muted sm:text-right">
            <a
              href={`mailto:${STUDIO_EMAIL}`}
              className="text-zinc-200 transition-colors hover:text-white"
            >
              {STUDIO_EMAIL}
            </a>
            <p className="mt-3 text-xs text-zinc-600">
              © {new Date().getFullYear()} 1blood studio. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
