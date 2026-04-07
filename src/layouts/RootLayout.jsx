import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

export default function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-ink text-zinc-100">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="studio-vignette" />
          <div className="studio-grain" />
        </div>
        <Header />
        <main id="main-content" className="relative flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}
