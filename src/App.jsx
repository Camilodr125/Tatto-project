import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import ArtistsPage from './pages/ArtistsPage'
import GalleryPage from './pages/GalleryPage'
import AboutPage from './pages/AboutPage'
import ReviewsPage from './pages/ReviewsPage'
import MerchPage from './pages/MerchPage'
import BookPage from './pages/BookPage'
import EmailJsEnvDebugPage from './pages/EmailJsEnvDebugPage'
import NotFoundPage from './pages/NotFoundPage'
import { FEATURE_MERCH } from './constants'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="artists" element={<ArtistsPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route
            path="merch"
            element={
              FEATURE_MERCH ? <MerchPage /> : <Navigate to="/" replace />
            }
          />
          <Route path="book" element={<BookPage />} />
          <Route path="dev/emailjs-env" element={<EmailJsEnvDebugPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
