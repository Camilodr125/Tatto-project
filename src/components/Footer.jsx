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
import StudioBrand from './StudioBrand'

const galleryTo = { pathname: '/gallery', hash: '' }

const links = [
  { to: '/services', label: 'Services' },
  { to: '/artists', label: 'Artists' },
  { to: galleryTo, label: 'Gallery' },
  { to: '/about', label: 'Studio' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/#faq', label: 'FAQ' },
  ...(FEATURE_MERCH ? [{ to: '/merch', label: 'Merch' }] : []),
]

export default function Footer() {
  return (
    <footer
      className="border-t border-border bg-ink py-12"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-8 xl:gap-12">
          {/* Brand */}
          <div className="flex flex-col items-center text-center lg:flex-1 lg:min-w-0">
            <Link
              to="/"
              className="inline-flex max-w-full justify-center"
              aria-label="oneblood studio — home"
            >
              <StudioBrand logoClassName="h-8 w-auto max-w-[min(140px,55vw)] object-contain sm:h-9 sm:max-w-[150px]" />
            </Link>
            <SocialLinks className="mt-4 justify-center" />
            <Link
              to="/book"
              className="mt-5 inline-flex h-10 w-full max-w-[200px] items-center justify-center rounded-sm border border-white/25 bg-white/[0.04] px-4 text-xs font-bold uppercase tracking-[0.2em] text-zinc-100 shadow-[0_0_28px_-8px_rgba(196,165,116,0.15)] transition-[border-color,background-color,box-shadow,color] hover:border-studio-gold/50 hover:bg-white/10 hover:text-white hover:shadow-[0_0_36px_-6px_rgba(196,165,116,0.28)] sm:max-w-[220px] sm:px-5"
            >
              Book now
            </Link>
          </div>

          {/* Nav */}
          <nav
            className="flex flex-col items-center gap-2 sm:items-start lg:flex-1 lg:min-w-0 lg:items-start"
            aria-label="Footer"
          >
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
          <div className="text-center text-sm text-muted lg:flex-1 lg:min-w-0 lg:text-right">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-400">
              Contact
            </h3>
            <ul className="space-y-2 lg:ml-auto lg:max-w-sm">
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
