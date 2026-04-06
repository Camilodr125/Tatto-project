import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { motion, useReducedMotion } from 'framer-motion'
import { artists } from '../data/artists'
import { placementOptions, tattooStyleOptions } from '../data/booking'
import { STUDIO_EMAIL } from '../constants'
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

const inputClass =
  'mt-2 w-full rounded border border-border bg-ink px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 disabled:opacity-60'
const selectClass = inputClass
const labelClass = 'block text-sm font-medium text-zinc-200'
const req = <span className="text-zinc-500">*</span>

export default function ContactForm() {
  const reduce = useReducedMotion()
  const location = useLocation()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  const [is18, setIs18] = useState(false)
  const [placement, setPlacement] = useState('')
  const [tattooStyle, setTattooStyle] = useState('')
  const [tattooDescription, setTattooDescription] = useState('')
  const [budget, setBudget] = useState('')
  const [isLocal, setIsLocal] = useState(false)
  const [isTravelling, setIsTravelling] = useState(false)
  const [isNewClient, setIsNewClient] = useState(false)
  const [isReturningClient, setIsReturningClient] = useState(false)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState(null)
  const [preferredArtist, setPreferredArtist] = useState('')

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
    if (!preferredDate) next.preferredDate = 'Pick a preferred appointment date.'
    if (!is18) next.is18 = 'You must confirm you are 18 or older.'
    if (!placement) next.placement = 'Select tattoo placement.'
    if (!tattooStyle) next.tattooStyle = 'Select a tattoo style.'
    if (!tattooDescription.trim()) next.tattooDescription = 'Describe your tattoo idea.'
    if (!budget.trim()) next.budget = 'Please share an approximate budget or range.'
    if (!isLocal && !isTravelling) {
      next.travel = 'Check whether you are local or travelling.'
    }
    if (isLocal && isTravelling) next.travel = 'Choose only one: local or travelling.'
    if (!isNewClient && !isReturningClient) {
      next.client = 'Let us know if you are a new or returning client.'
    }
    if (isNewClient && isReturningClient) next.client = 'Choose only one: new or returning client.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const buildSummary = (travelLabel, clientLabel) =>
    [
      `Preferred date: ${preferredDate}`,
      `Name: ${firstName.trim()} ${lastName.trim()}`,
      `Email: ${email.trim()}`,
      `Phone: ${phone.trim()}`,
      `18+: Yes (confirmed)`,
      `Placement: ${placement}`,
      `Style: ${tattooStyle}`,
      `Budget: ${budget.trim()}`,
      `${travelLabel}`,
      `${clientLabel}`,
      preferredArtist ? `Preferred artist: ${preferredArtist}` : null,
      '',
      'Description:',
      tattooDescription.trim(),
    ]
      .filter(Boolean)
      .join('\n')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus(null)
    if (!validate()) return

    const { publicKey, serviceId, templateId } = getEnv()
    if (!publicKey || !serviceId || !templateId) {
      setStatus({
        type: 'error',
        text: import.meta.env.PROD
          ? 'EmailJS is not set on the server. In Vercel: Project → Settings → Environment Variables, add VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID, and VITE_EMAILJS_TEMPLATE_ID (same values as local `.env`), enable for Production, then Deployments → Redeploy. `.env` is not uploaded to git.'
          : 'Email is not configured yet. Add your EmailJS keys to a `.env` file in the project root (see README), save, and restart `npm run dev`.',
      })
      return
    }

    const diag = emailJsEnvDiagnostics(import.meta.env)
    if (
      diag.publicKey.looksPlaceholder ||
      diag.serviceId.looksPlaceholder ||
      diag.templateId.looksPlaceholder
    ) {
      setStatus({
        type: 'error',
        text: import.meta.env.PROD
          ? 'EmailJS values look like placeholders. In Vercel → Environment Variables, replace any dummy `VITE_EMAILJS_*` values with your real EmailJS keys and redeploy.'
          : '`.env` still contains placeholder text (e.g. REPLACE_WITH_…). Save the file on disk with your real EmailJS keys, then restart `npm run dev`. Vite only reads saved files — unsaved tabs in the editor are ignored.',
      })
      return
    }

    const travelLabel = isLocal ? 'Location: Local' : 'Location: Travelling'
    const clientLabel = isNewClient ? 'Client: New' : 'Client: Returning'
    const fullName = `${firstName.trim()} ${lastName.trim()}`
    const summary = buildSummary(travelLabel, clientLabel)

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
          preferred_date: preferredDate,
          placement,
          tattoo_style: tattooStyle,
          tattoo_description: tattooDescription.trim(),
          budget: budget.trim(),
          is_18: 'Yes',
          travel_status: isLocal ? 'Local' : 'Travelling',
          client_status: isNewClient ? 'New' : 'Returning',
          preferred_artist: preferredArtist || 'Not specified',
          message: summary,
          reply_to: email.trim(),
        },
        { publicKey }
      )
      setStatus({
        type: 'success',
        text: 'Booking request sent. We will get back to you shortly.',
      })
      setFirstName('')
      setLastName('')
      setEmail('')
      setPhone('')
      setPreferredDate('')
      setIs18(false)
      setPlacement('')
      setTattooStyle('')
      setTattooDescription('')
      setBudget('')
      setIsLocal(false)
      setIsTravelling(false)
      setIsNewClient(false)
      setIsReturningClient(false)
      setPreferredArtist('')
      setErrors({})
    } catch (err) {
      console.error(err)
      const apiText = typeof err?.text === 'string' ? err.text : ''
      const publicKeyRejected =
        err?.status === 400 && /public key is invalid/i.test(apiText)
      setStatus({
        type: 'error',
        text: publicKeyRejected
          ? 'EmailJS rejected this public key (the request reached their API). Fix it in the dashboard: Account → General — copy the Public Key again (not the Service or Template ID). Account → Security — turn off “Use private key”; the browser SDK cannot send a private key safely. If you use allowed origins / domain allowlist, add your dev URL (e.g. http://localhost:5173) and your production domain.'
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
      id="contact-form"
      className="bg-surface py-12 sm:py-16"
      aria-labelledby="contact-sidebar-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h2
              id="contact-sidebar-heading"
              className="font-display text-2xl tracking-wide text-zinc-100 sm:text-3xl"
            >
              Studio details
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Submit the booking form — requests go to{' '}
              <a
                href={`mailto:${STUDIO_EMAIL}`}
                className="text-zinc-300 underline decoration-zinc-600 underline-offset-4 hover:text-white hover:decoration-zinc-400"
              >
                {STUDIO_EMAIL}
              </a>{' '}
              when EmailJS is configured. We will confirm date availability and next steps
              by email.
            </p>
            <dl className="mt-10 space-y-4 text-sm text-zinc-400">
              <div>
                <dt className="font-semibold text-zinc-300">Studio hours</dt>
                <dd>Tue — Sat · 11:00 — 19:00 (by appointment)</dd>
              </div>
              <div>
                <dt className="font-semibold text-zinc-300">Location</dt>
                <dd>Downtown creative district — exact address after booking.</dd>
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
            aria-describedby={status ? 'form-status' : undefined}
          >
            <h3 className="font-display text-xl tracking-wide text-zinc-100">Booking request</h3>
            <p className="mt-2 text-sm text-muted">
              Fields marked {req} are required. Pick a preferred date from the calendar — we
              will confirm if that slot works.
            </p>

            <div className="mt-8 space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="booking-first" className={labelClass}>
                    First name {req}
                  </label>
                  <input
                    id="booking-first"
                    name="first_name"
                    type="text"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(ev) => setFirstName(ev.target.value)}
                    className={inputClass}
                    aria-invalid={errors.firstName ? 'true' : 'false'}
                    aria-describedby={errors.firstName ? 'err-first' : undefined}
                    disabled={sending}
                  />
                  {errors.firstName && (
                    <p id="err-first" className="mt-1.5 text-sm text-red-400" role="alert">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="booking-last" className={labelClass}>
                    Last name {req}
                  </label>
                  <input
                    id="booking-last"
                    name="last_name"
                    type="text"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(ev) => setLastName(ev.target.value)}
                    className={inputClass}
                    aria-invalid={errors.lastName ? 'true' : 'false'}
                    aria-describedby={errors.lastName ? 'err-last' : undefined}
                    disabled={sending}
                  />
                  {errors.lastName && (
                    <p id="err-last" className="mt-1.5 text-sm text-red-400" role="alert">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="booking-email" className={labelClass}>
                    Email {req}
                  </label>
                  <input
                    id="booking-email"
                    name="from_email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    className={inputClass}
                    placeholder="you@example.com"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'err-email' : undefined}
                    disabled={sending}
                  />
                  {errors.email && (
                    <p id="err-email" className="mt-1.5 text-sm text-red-400" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="booking-phone" className={labelClass}>
                    Phone {req}
                  </label>
                  <input
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(ev) => setPhone(ev.target.value)}
                    className={inputClass}
                    placeholder="+1 · (555) 000-0000"
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    aria-describedby={errors.phone ? 'err-phone' : undefined}
                    disabled={sending}
                  />
                  {errors.phone && (
                    <p id="err-phone" className="mt-1.5 text-sm text-red-400" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:max-w-xs">
                <label htmlFor="booking-date" className={labelClass}>
                  Preferred date {req}
                </label>
                <input
                  id="booking-date"
                  name="preferred_date"
                  type="date"
                  min={todayISODate()}
                  value={preferredDate}
                  onChange={(ev) => setPreferredDate(ev.target.value)}
                  className={inputClass}
                  aria-invalid={errors.preferredDate ? 'true' : 'false'}
                  aria-describedby={errors.preferredDate ? 'err-date' : undefined}
                  disabled={sending}
                />
                {errors.preferredDate && (
                  <p id="err-date" className="mt-1.5 text-sm text-red-400" role="alert">
                    {errors.preferredDate}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="booking-artist" className={labelClass}>
                  Preferred artist
                </label>
                <select
                  id="booking-artist"
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
                      {a.status === 'temporary' && a.availableFrom && a.availableTo
                        ? ` (guest)`
                        : ''}
                    </option>
                  ))}
                </select>
                <p className="mt-1.5 text-xs text-zinc-500">
                  Pre-filled when you tap &quot;Request&quot; on an artist profile.
                </p>
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
                <label htmlFor="booking-placement" className={labelClass}>
                  Tattoo placement {req}
                </label>
                <select
                  id="booking-placement"
                  name="placement"
                  value={placement}
                  onChange={(ev) => setPlacement(ev.target.value)}
                  className={selectClass}
                  aria-invalid={errors.placement ? 'true' : 'false'}
                  aria-describedby={errors.placement ? 'err-placement' : undefined}
                  disabled={sending}
                >
                  {placementOptions.map((o) => (
                    <option key={o.value || 'empty'} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                {errors.placement && (
                  <p id="err-placement" className="mt-1.5 text-sm text-red-400" role="alert">
                    {errors.placement}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="booking-style" className={labelClass}>
                  Tattoo style {req}
                </label>
                <select
                  id="booking-style"
                  name="tattoo_style"
                  value={tattooStyle}
                  onChange={(ev) => setTattooStyle(ev.target.value)}
                  className={selectClass}
                  aria-invalid={errors.tattooStyle ? 'true' : 'false'}
                  aria-describedby={errors.tattooStyle ? 'err-style' : undefined}
                  disabled={sending}
                >
                  {tattooStyleOptions.map((o) => (
                    <option key={o.value || 'empty'} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                {errors.tattooStyle && (
                  <p id="err-style" className="mt-1.5 text-sm text-red-400" role="alert">
                    {errors.tattooStyle}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="booking-desc" className={labelClass}>
                  Tattoo description {req}
                </label>
                <textarea
                  id="booking-desc"
                  name="tattoo_description"
                  rows={5}
                  value={tattooDescription}
                  onChange={(ev) => setTattooDescription(ev.target.value)}
                  className={`${inputClass} resize-y`}
                  placeholder="Size, meaning, reference links, black & grey vs color…"
                  aria-invalid={errors.tattooDescription ? 'true' : 'false'}
                  aria-describedby={errors.tattooDescription ? 'err-desc' : undefined}
                  disabled={sending}
                />
                {errors.tattooDescription && (
                  <p id="err-desc" className="mt-1.5 text-sm text-red-400" role="alert">
                    {errors.tattooDescription}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="booking-budget" className={labelClass}>
                  Budget {req}
                </label>
                <input
                  id="booking-budget"
                  name="budget"
                  type="text"
                  value={budget}
                  onChange={(ev) => setBudget(ev.target.value)}
                  className={inputClass}
                  placeholder="e.g. $400–600 or flexible"
                  aria-invalid={errors.budget ? 'true' : 'false'}
                  aria-describedby={errors.budget ? 'err-budget' : undefined}
                  disabled={sending}
                />
                {errors.budget && (
                  <p id="err-budget" className="mt-1.5 text-sm text-red-400" role="alert">
                    {errors.budget}
                  </p>
                )}
              </div>

              <fieldset className="rounded border border-border/80 p-4">
                <legend className="px-1 text-sm font-medium text-zinc-200">
                  Are you local or travelling? {req}
                </legend>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-8">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
                    <input
                      type="checkbox"
                      checked={isLocal}
                      onChange={() => {
                        setIsLocal(true)
                        setIsTravelling(false)
                      }}
                      className="h-4 w-4 rounded border-border bg-ink focus:ring-zinc-500"
                      disabled={sending}
                    />
                    I am local
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
                    <input
                      type="checkbox"
                      checked={isTravelling}
                      onChange={() => {
                        setIsTravelling(true)
                        setIsLocal(false)
                      }}
                      className="h-4 w-4 rounded border-border bg-ink focus:ring-zinc-500"
                      disabled={sending}
                    />
                    I am travelling
                  </label>
                </div>
                {errors.travel && (
                  <p className="mt-2 text-sm text-red-400" role="alert">
                    {errors.travel}
                  </p>
                )}
              </fieldset>

              <fieldset className="rounded border border-border/80 p-4">
                <legend className="px-1 text-sm font-medium text-zinc-200">
                  Client status {req}
                </legend>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-8">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
                    <input
                      type="checkbox"
                      checked={isNewClient}
                      onChange={() => {
                        setIsNewClient(true)
                        setIsReturningClient(false)
                      }}
                      className="h-4 w-4 rounded border-border bg-ink focus:ring-zinc-500"
                      disabled={sending}
                    />
                    New client
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
                    <input
                      type="checkbox"
                      checked={isReturningClient}
                      onChange={() => {
                        setIsReturningClient(true)
                        setIsNewClient(false)
                      }}
                      className="h-4 w-4 rounded border-border bg-ink focus:ring-zinc-500"
                      disabled={sending}
                    />
                    Returning client
                  </label>
                </div>
                {errors.client && (
                  <p className="mt-2 text-sm text-red-400" role="alert">
                    {errors.client}
                  </p>
                )}
              </fieldset>
            </div>

            <div
              id="form-status"
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
              className="mt-4 w-full rounded-sm bg-accent py-3.5 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-accent-hot disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[200px]"
              disabled={sending}
              aria-busy={sending}
            >
              {sending ? 'Sending…' : 'Submit booking request'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
