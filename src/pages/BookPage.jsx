import PageHeader from '../components/PageHeader'
import ContactForm from '../components/ContactForm'

export default function BookPage() {
  return (
    <>
      <PageHeader
        eyebrow="Booking"
        title="Book an appointment"
        subtitle="Use the form to request a date, share placement and style, budget, and whether you are local or visiting. We reply from the studio inbox in order."
      />
      <ContactForm />
    </>
  )
}
