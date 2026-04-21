import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ContactForm from '../components/ContactForm'
import ConsultForm from '../components/ConsultForm'

const tabBase =
  'min-w-0 flex-1 rounded-sm px-3 py-2.5 text-center text-xs font-bold uppercase tracking-wider transition-colors sm:px-5'
const tabActive = 'bg-accent text-ink shadow-sm'
const tabInactive = 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'

export default function BookPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const type = searchParams.get('type')
  const isConsult = type === 'consult'

  useEffect(() => {
    if (type && type !== 'consult') {
      setSearchParams({}, { replace: true })
    }
  }, [type, setSearchParams])

  return (
    <>
      <PageHeader
        eyebrow="Booking"
        title={isConsult ? 'Request a consultation' : 'Book an appointment'}
        subtitle={
          isConsult
            ? 'Short consults are usually about 10–15 minutes — conversation only, not a tattoo session. For a full tattoo booking, use the Tattoo session tab.'
            : 'Use the form to request a date, share placement and style, budget, and whether you are local or visiting. We reply from the studio inbox in order. For a short consult only, use the other tab.'
        }
      />

      <div className="border-b border-border bg-surface/60">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500"
            id="book-type-label"
          >
            What do you need?
          </p>
          <div
            className="flex w-full max-w-md flex-col gap-2 rounded-sm border border-border bg-ink/50 p-1 sm:flex-row sm:gap-0"
            role="tablist"
            aria-labelledby="book-type-label"
          >
            <button
              type="button"
              role="tab"
              id="book-tab-session"
              aria-selected={!isConsult}
              aria-controls="booking-form-panel"
              tabIndex={!isConsult ? 0 : -1}
              className={`${tabBase} ${!isConsult ? tabActive : tabInactive}`}
              onClick={() => setSearchParams({}, { replace: true })}
            >
              Tattoo session
            </button>
            <button
              type="button"
              role="tab"
              id="book-tab-consult"
              aria-selected={isConsult}
              aria-controls="booking-form-panel"
              tabIndex={isConsult ? 0 : -1}
              className={`${tabBase} ${isConsult ? tabActive : tabInactive}`}
              onClick={() => setSearchParams({ type: 'consult' }, { replace: true })}
            >
              Short consult
            </button>
          </div>
        </div>
      </div>

      <div
        id="booking-form-panel"
        role="tabpanel"
        aria-labelledby={isConsult ? 'book-tab-consult' : 'book-tab-session'}
      >
        {isConsult ? (
          <ConsultForm embeddedInBookPage />
        ) : (
          <ContactForm />
        )}
      </div>
    </>
  )
}
