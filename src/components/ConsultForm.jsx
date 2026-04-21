import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { motion, useReducedMotion } from 'framer-motion'
import { artists } from '../data/artists'
import {
  STUDIO_ADDRESS,
  STUDIO_EMAIL,
  STUDIO_HOURS_NOTE,
  STUDIO_PHONE_DISPLAY,
  STUDIO_PHONE_TEL,
  STUDIO_WALKIN_HOURS,
} from '../constants'
import { emailJsEnvDiagnostics, readEmailJsEnv } from '../utils/emailjsEnv'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function todayISODate() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function digitsOnly(s) {
  return s.replace(/\D/g, '')
}

function getEnv() {
  return readEmailJsEnv(import.meta.env)
}

function templateIdForConsult(env) {
  return env.consultTemplateId || env.templateId
}

const inputClass =
  'mt-2 w-full rounded border border-border bg-ink px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 disabled:opacity-60'
const selectClass = inputClass
const labelClass = 'block text-sm font-medium text-zinc-200'
const req = <span className="text-zinc-500">*</span>

export default function ConsultForm({ embeddedInBookPage = false }) {
  const reduce = useReducedMotion()
  const location = useLocation()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [preferredArtist, setPreferredArtist] = useState('')
  const [preferredConsultDate, setPreferredConsultDate] = useState('')
  const [preferredTiming, setPreferredTiming] = useState('')
  const [topic, setTopic] = useState('')
  const [is18, setIs18] = useState(false)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const fromArtist = location.state?.artist
    if (typeof fromArtist === 'string' && fromArtist.trim()) {
      setPreferredArtist(fromArtist.trim())
    }
  }, [location.state?.artist])

  const validate = () => {
    const next = {}
    if (!firstName.trim()) next.firstName = 'Please enter your first name.'
    if (!lastName.trim()) next.lastName = 'Please enter your last name.'
    if (!email.trim()) next.email = 'Please enter your email.'
    else if (!EMAIL_RE.test(email.trim())) next.email = 'Enter a valid email address.'
    const phoneDigits = digitsOnly(phone)
    if (!phone.trim()) next.phone = 'Please enter your phone number.'
    else if (phoneDigits.length < 10) next.phone = 'Enter a valid phone number (at least 10 digits).'
    if (!topic.trim()) next.topic = 'Tell us what you want to discuss in the consult.'
    if (!preferredConsultDate) next.preferredConsultDate = 'Pick a preferred day for the consult.'
    if (!is18) next.is18 = 'You must confirm you are 18 or older.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const buildMessage = () =>
    [
      'Request type: Short consultation (discussion only — not a tattoo session)',
      '',
      `Name: ${firstName.trim()} ${lastName.trim()}`,
      `Email: ${email.trim()}`,
      `Phone: ${phone.trim()}`,
      `Preferred artist: ${preferredArtist || 'No preference'}`,
      `Preferred date: ${preferredConsultDate}`,
      preferredTiming.trim() ? `Preferred timing: ${preferredTiming.trim()}` : null,
      '18+: Yes (confirmed)',
      '',
      'What to discuss:',
      topic.trim(),
    ]
      .filter(Boolean)
      .join('\n')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus(null)
    if (!validate()) return

    const env = getEnv()
    const { publicKey, serviceId } = env
    const templateId = templateIdForConsult(env)

    if (!publicKey || !serviceId || !templateId) {
      setStatus({
        type: 'error',
        text: import.meta.env.PROD
          ? 'EmailJS is not set on the server. Add VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID, and VITE_EMAILJS_TEMPLATE_ID in your host’s environment variables, then redeploy.'
          : 'Email is not configured yet. Add your EmailJS keys to `.env`, save, and restart `npm run dev`.',
      })
      return
    }

    const diag = emailJsEnvDiagnostics(import.meta.env)
    const templateLooksPlaceholder = env.consultTemplateId
      ? diag.consultTemplateId.looksPlaceholder
      : diag.templateId.looksPlaceholder
    if (
      diag.publicKey.looksPlaceholder ||
      diag.serviceId.looksPlaceholder ||
      templateLooksPlaceholder
    ) {
      setStatus({
        type: 'error',
        text: import.meta.env.PROD
          ? 'EmailJS values look like placeholders. Replace dummy `VITE_EMAILJS_*` values and redeploy.'
          : '`.env` still contains placeholder text. Save real EmailJS keys and restart `npm run dev`.',
      })
      return
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`
    const message = buildMessage()

    setSending(true)
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: fullName,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          from_email: email.trim(),
          user_email: email.trim(),
          email: email.trim(),
          to_email: STUDIO_EMAIL,
          phone: phone.trim(),
          preferred_artist: preferredArtist || 'Not specified',
          preferred_consult_date: preferredConsultDate,
          preferred_date: preferredConsultDate,
          preferred_timing: preferredTiming.trim() || 'Not specified',
          consultation_topic: topic.trim(),
          request_type: 'Short consultation',
          is_18: 'Yes',
          message,
          reply_to: email.trim(),
        },
        { publicKey },
      )
      setStatus({
        type: 'success',
        text: 'Consultation request sent. We will get back to you shortly.',
      })
      setFirstName('')
      setLastName('')
      setEmail('')
      setPhone('')
      setPreferredArtist('')
      setPreferredConsultDate('')
      setPreferredTiming('')
      setTopic('')
      setIs18(false)
      setErrors({})
    } catch (err) {
      console.error(err)
      const apiText = typeof err?.text === 'string' ? err.text : ''
      const publicKeyRejected =
        err?.status === 400 && /public key is invalid/i.test(apiText)
      setStatus({
        type: 'error',
        text: publicKeyRejected
          ? 'EmailJS rejected this public key. In the dashboard: Account → General — copy the Public Key. Account → Security — turn off “Use private key” for browser forms. Add your dev URL to allowed origins if required.'
          : apiText ||
            err?.message ||
            'Something went wrong. Please try again in a moment.',
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <section
      id="consult-form"
      className="bg-surface py-12 sm:py-16"
      aria-labelledby="consult-sidebar-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h2
              id="consult-sidebar-heading"
              className="font-display text-2xl tracking-wide text-zinc-100 sm:text-3xl"
            >
              Short consultations
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              This form is for a <strong className="font-semibold text-zinc-300">short consult</strong>{' '}
              (typically 10–15 minutes) — conversation only, not a tattoo session.{' '}
              {embeddedInBookPage ? (
                <>
                  For a full booking with placement, budget, and session details, switch to the{' '}
                  <strong className="font-semibold text-zinc-400">Tattoo session</strong> tab above.
                </>
              ) : (
                <>
                  For a full booking with placement, budget, and session details, use{' '}
                  <Link
                    to="/book"
                    className="text-zinc-300 underline decoration-zinc-600 underline-offset-4 hover:text-white"
                  >
                    Book an appointment
                  </Link>
                  .
                </>
              )}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Submissions go to{' '}
              <a
                href={`mailto:${STUDIO_EMAIL}`}
                className="text-zinc-300 underline decoration-zinc-600 underline-offset-4 hover:text-white"
              >
                {STUDIO_EMAIL}
              </a>
              , the same address used for booking requests. We reply from the studio inbox.
            </p>
            <dl className="mt-10 space-y-4 text-sm text-zinc-400">
              <div>
                <dt className="font-semibold text-zinc-300">Hours</dt>
                <dd className="leading-relaxed">
                  <span className="block">{STUDIO_HOURS_NOTE}</span>
                  <span className="mt-2 block">
                    <span className="font-semibold text-zinc-300">Walk-ins:</span>{' '}
                    {STUDIO_WALKIN_HOURS}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-zinc-300">Location</dt>
                <dd className="leading-relaxed">
                  {STUDIO_ADDRESS.line1}
                  <br />
                  {STUDIO_ADDRESS.line2}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-zinc-300">Phone</dt>
                <dd>
                  <a
                    href={`tel:${STUDIO_PHONE_TEL}`}
                    className="text-zinc-300 hover:text-white"
                  >
                    {STUDIO_PHONE_DISPLAY}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="lg:col-span-8 rounded-sm border border-border bg-surface-elevated p-6 sm:p-8"
            noValidate
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45 }}
            aria-describedby={status ? 'consult-form-status' : undefined}
          >
            <h3 className="font-display text-xl tracking-wide text-zinc-100">Consultation request</h3>
            <p className="mt-2 text-sm text-muted">
              Fields marked {req} are required. We use this to match you with the right artist and
              reply by email — no needle time is booked from this form alone.
            </p>

            <div className="mt-8 space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="consult-first" className={labelClass}>
                    First name {req}
                  </label>
                  <input
                    id="consult-first"
                    name="first_name"
                    type="text"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(ev) => setFirstName(ev.target.value)}
                    className={inputClass}
                    aria-invalid={errors.firstName ? 'true' : 'false'}
                    disabled={sending}
                  />
                  {errors.firstName && (
                    <p className="mt-1.5 text-sm text-red-400" role="alert">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="consult-last" className={labelClass}>
                    Last name {req}
                  </label>
                  <input
                    id="consult-last"
                    name="last_name"
                    type="text"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(ev) => setLastName(ev.target.value)}
                    className={inputClass}
                    aria-invalid={errors.lastName ? 'true' : 'false'}
                    disabled={sending}
                  />
                  {errors.lastName && (
                    <p className="mt-1.5 text-sm text-red-400" role="alert">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="consult-email" className={labelClass}>
                    Email {req}
                  </label>
                  <input
                    id="consult-email"
                    name="from_email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    className={inputClass}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    disabled={sending}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-sm text-red-400" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="consult-phone" className={labelClass}>
                    Phone {req}
                  </label>
                  <input
                    id="consult-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(ev) => setPhone(ev.target.value)}
                    className={inputClass}
                    placeholder={STUDIO_PHONE_DISPLAY}
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    disabled={sending}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-sm text-red-400" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="consult-artist" className={labelClass}>
                  Preferred artist
                </label>
                <select
                  id="consult-artist"
                  name="preferred_artist"
                  value={preferredArtist}
                  onChange={(ev) => setPreferredArtist(ev.target.value)}
                  className={selectClass}
                  disabled={sending}
                >
                  <option value="">No preference — we&apos;ll match you</option>
                  {artists.map((a) => (
                    <option key={a.id} value={a.name}>
                      {a.name}
                      {a.status === 'temporary' ? ' (guest)' : ''}
                    </option>
                  ))}
                </select>
                <p className="mt-1.5 text-xs text-zinc-500">
                  Pre-filled when you open this page from an artist profile.
                </p>
              </div>

              <div className="sm:max-w-xs">
                <label htmlFor="consult-date" className={labelClass}>
                  Preferred date {req}
                </label>
                <input
                  id="consult-date"
                  name="preferred_consult_date"
                  type="date"
                  min={todayISODate()}
                  value={preferredConsultDate}
                  onChange={(ev) => setPreferredConsultDate(ev.target.value)}
                  className={inputClass}
                  aria-invalid={errors.preferredConsultDate ? 'true' : 'false'}
                  aria-describedby={errors.preferredConsultDate ? 'err-consult-date' : undefined}
                  disabled={sending}
                />
                {errors.preferredConsultDate && (
                  <p id="err-consult-date" className="mt-1.5 text-sm text-red-400" role="alert">
                    {errors.preferredConsultDate}
                  </p>
                )}
                <p className="mt-1.5 text-xs text-zinc-500">
                  First choice — we&apos;ll confirm or suggest another slot by email.
                </p>
              </div>

              <div>
                <label htmlFor="consult-timing" className={labelClass}>
                  Preferred timing <span className="font-normal text-zinc-500">(optional)</span>
                </label>
                <input
                  id="consult-timing"
                  name="preferred_timing"
                  type="text"
                  value={preferredTiming}
                  onChange={(ev) => setPreferredTiming(ev.target.value)}
                  className={inputClass}
                  placeholder="e.g. weekday evenings, or a date range"
                  disabled={sending}
                />
              </div>

              <fieldset className="rounded border border-border/80 p-4">
                <legend className="px-1 text-sm font-medium text-zinc-200">Age</legend>
                <label className="mt-2 flex cursor-pointer items-start gap-3 text-sm text-zinc-300">
                  <input
                    type="checkbox"
                    checked={is18}
                    onChange={(ev) => setIs18(ev.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-border bg-ink text-zinc-100 focus:ring-zinc-500"
                    disabled={sending}
                  />
                  <span>
                    I confirm I am <strong className="text-zinc-100">18 years of age or older</strong>{' '}
                    {req}
                  </span>
                </label>
                {errors.is18 && (
                  <p className="mt-2 text-sm text-red-400" role="alert">
                    {errors.is18}
                  </p>
                )}
              </fieldset>

              <div>
                <label htmlFor="consult-topic" className={labelClass}>
                  What do you want to discuss? {req}
                </label>
                <textarea
                  id="consult-topic"
                  name="consultation_topic"
                  rows={5}
                  value={topic}
                  onChange={(ev) => setTopic(ev.target.value)}
                  className={`${inputClass} resize-y`}
                  placeholder="Ideas, placement questions, whether custom or flash, references…"
                  aria-invalid={errors.topic ? 'true' : 'false'}
                  disabled={sending}
                />
                {errors.topic && (
                  <p className="mt-1.5 text-sm text-red-400" role="alert">
                    {errors.topic}
                  </p>
                )}
              </div>
            </div>

            <div
              id="consult-form-status"
              className="mt-6 min-h-[1.5rem] text-sm"
              role="status"
              aria-live="polite"
            >
              {status?.type === 'success' && (
                <p className="text-emerald-400">{status.text}</p>
              )}
              {status?.type === 'error' && (
                <p className="text-red-400" role="alert">
                  {status.text}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-sm bg-accent py-3.5 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-accent-hot disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[220px]"
              disabled={sending}
              aria-busy={sending}
            >
              {sending ? 'Sending…' : 'Book a consult'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
