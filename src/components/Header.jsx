import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import SocialLinks from './SocialLinks'
import StudioLogo from './StudioLogo'
import { FEATURE_MERCH } from '../constants'

const galleryTo = { pathname: '/gallery', hash: '' }

const nav = [
  { to: '/services', label: 'Services' },
  { to: '/artists', label: 'Artists' },
  { to: galleryTo, label: 'Gallery' },
  ...(FEATURE_MERCH ? [{ to: '/merch', label: 'Merch' }] : []),
  { to: '/about', label: 'About' },
  { to: '/reviews', label: 'Reviews' },
]

const linkClass = ({ isActive }) =>
  [
    'text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors',
    isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-200',
  ].join(' ')

const mobileLinkClass = ({ isActive }) =>
  [
    'border-b border-white/[0.06] px-1 py-4 text-sm font-semibold uppercase tracking-[0.18em] last:border-b-0',
    isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-100',
  ].join(' ')

export default function Header() {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const location = useLocation()

  return (
    <header
      className="sticky top-0 z-40 border-b border-white/[0.06] bg-ink/85 backdrop-blur-xl"
      role="banner"
    >
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-90 sm:gap-3.5"
          aria-label="oneblood studio — home"
        >
          <StudioLogo className="h-8 w-auto max-h-9 max-w-[120px] object-contain object-left sm:h-9 sm:max-w-[140px]" />
          <span className="font-display text-lg tracking-[0.14em] text-zinc-100 sm:text-xl md:text-2xl">
            ONEBLOOD<span className="text-zinc-500"> STUDIO</span>
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3 md:gap-0">
          <SocialLinks
            className="md:hidden"
            linkClassName="h-9 w-9"
            iconClassName="h-[15px] w-[15px]"
          />

          <nav
            className="hidden items-center gap-6 lg:gap-7 xl:gap-8 md:flex"
            aria-label="Primary"
          >
            {nav.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  linkClass({
                    isActive:
                      isActive ||
                      (item.label === 'Gallery' && location.pathname === '/gallery'),
                  })
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <span
            className="mx-2 hidden h-6 w-px bg-white/10 md:block lg:mx-3"
            aria-hidden="true"
          />

          <SocialLinks className="hidden md:flex" />

          <Link
            to="/book"
            className="ml-1 hidden rounded-sm border border-white/20 bg-white/[0.04] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-100 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white md:ml-2 md:inline-flex"
          >
            Book
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-white/15 text-zinc-200 transition-colors hover:border-white/35 hover:text-white md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="border-t border-white/[0.06] bg-surface/95 backdrop-blur-lg md:hidden"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav
              className="flex flex-col gap-0 px-4 py-2"
              aria-label="Mobile primary"
            >
              {nav.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    mobileLinkClass({
                      isActive:
                        isActive ||
                        (item.label === 'Gallery' && location.pathname === '/gallery'),
                    })
                  }
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/book"
                className="mt-3 mb-4 rounded-sm border border-white/25 bg-white/5 py-3.5 text-center text-xs font-bold uppercase tracking-[0.2em] text-zinc-100"
                onClick={() => setOpen(false)}
              >
                Book now
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
