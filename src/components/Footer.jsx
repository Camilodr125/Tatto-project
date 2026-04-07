import { Link } from 'react-router-dom'
import {
  FEATURE_MERCH,
  STUDIO_ADDRESS,
  STUDIO_EMAIL,
  STUDIO_MAPS_URL,
  STUDIO_PHONE_DISPLAY,
  STUDIO_PHONE_TEL,
} from '../constants'
import SocialLinks from './SocialLinks'
import StudioLogo from './StudioLogo'

const galleryTo = { pathname: '/gallery', hash: '' }

const links = [
  { to: '/services', label: 'Services' },
  { to: '/artists', label: 'Artists' },
  { to: galleryTo, label: 'Gallery' },
  ...(FEATURE_MERCH ? [{ to: '/merch', label: 'Merch' }] : []),
  { to: '/about', label: 'About' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/book', label: 'Book' },
]

export default function Footer() {
  return (
    <footer
      className="border-t border-border bg-ink py-12"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="inline-flex max-w-full flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2.5 md:gap-3"
              aria-label="oneblood studio — home"
            >
              <StudioLogo className="h-7 w-auto max-w-[min(120px,55vw)] object-contain object-left sm:h-8 sm:max-w-[130px]" />
              <span className="font-display text-base leading-tight tracking-[0.1em] text-zinc-100 sm:text-lg sm:tracking-[0.12em]">
                ONEBLOOD<span className="text-zinc-500"> STUDIO</span>
              </span>
            </Link>
            <p className="mt-2 max-w-xs text-sm text-muted">
              Dedication, respect for the client, and love for the art.
            </p>
            <SocialLinks className="mt-4" />
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-2" aria-label="Footer">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-sm text-muted transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Contact info */}
          <div className="text-sm text-muted lg:col-span-2">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-400">
              Contact
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${STUDIO_EMAIL}`}
                  className="text-zinc-200 transition-colors hover:text-white"
                >
                  {STUDIO_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${STUDIO_PHONE_TEL}`}
                  className="text-zinc-200 transition-colors hover:text-white"
                >
                  {STUDIO_PHONE_DISPLAY}
                </a>
              </li>
              <li className="leading-relaxed text-zinc-400">
                <a
                  href={STUDIO_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-200 transition-colors hover:text-white"
                >
                  {STUDIO_ADDRESS.line1}
                  <br />
                  {STUDIO_ADDRESS.line2}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-border pt-6 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} oneblood studio. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
