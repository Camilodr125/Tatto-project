import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

export default function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-ink text-zinc-100">
        <Header />
        <main id="main-content" className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}
