import { Link } from 'react-router-dom'
import { emailJsEnvDiagnostics } from '../utils/emailjsEnv'

/**
 * Visit `/dev/emailjs-env` during `npm run dev` to see if Vite loaded your .env
 * (lengths only — keys are never printed).
 */
export default function EmailJsEnvDebugPage() {
  const isDev = import.meta.env.DEV
  const diag = emailJsEnvDiagnostics(import.meta.env)

  if (!isDev) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center text-muted">
        <p>This check only runs in development (`npm run dev`).</p>
        <Link to="/" className="mt-6 inline-block text-zinc-300 hover:text-white">
          Home
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      <h1 className="font-display text-3xl tracking-wide text-white">
        EmailJS env check (dev only)
      </h1>
      <p className="mt-3 text-sm text-muted">
        Open this page with the dev server running. Use it to see whether Vite injected
        your variables and whether values look like placeholders — the real keys are{' '}
        <strong className="text-zinc-400">never</strong> shown.
      </p>

      <ul className="mt-8 space-y-4 rounded-sm border border-border bg-surface-elevated p-6 font-mono text-sm">
        {[diag.publicKey, diag.serviceId, diag.templateId].map((f) => (
          <li key={f.name} className="border-b border-border pb-4 last:border-0 last:pb-0">
            <div className="text-zinc-400">{f.name}</div>
            <div className="mt-1 text-zinc-200">
              {f.present ? (
                <>
                  Loaded · length <strong>{f.length}</strong>
                  {f.looksPlaceholder && (
                    <span className="ml-2 text-amber-400">
                      · looks like placeholder text — use real IDs from EmailJS
                    </span>
                  )}
                </>
              ) : (
                <span className="text-red-400">Missing (empty after load)</span>
              )}
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm text-muted">
        <strong className="text-zinc-300">Interpretation:</strong> If any line is{' '}
        <em>Missing</em>, Vite did not see that variable — check <code>.env</code> name,
        <code> VITE_</code> prefix, and restart <code>npm run dev</code>. If lengths are
        tiny or <em>placeholder</em> warns, fix the value.
      </p>
      <p className="mt-4 text-sm text-muted">
        If all three look loaded but the API still returns{' '}
        <span className="font-mono text-zinc-400">Public Key is invalid</span>, that
        message comes from EmailJS servers (the key was sent, but the account rejected it).
        In the dashboard, open{' '}
        <a
          href="https://dashboard.emailjs.com/admin/account/security"
          className="text-zinc-400 underline hover:text-white"
          target="_blank"
          rel="noreferrer"
        >
          Account → Security
        </a>{' '}
        and, for browser-only forms, turn <strong className="text-zinc-400">off</strong>{' '}
        “Use private key (recommended).” The <code className="text-zinc-500">@emailjs/browser</code>{' '}
        package does not attach a private <code className="text-zinc-500">accessToken</code>, so
        that mode breaks client-side forms. If you use an allowed-domain / origin list, add your
        Vite dev origin (port included) and production URL. Also confirm service ID, template ID,
        and public key are from the <em>same</em> account.
      </p>

      <p className="mt-6">
        <Link to="/contact" className="text-zinc-400 hover:text-white">
          ← Back to booking form
        </Link>
      </p>
    </div>
  )
}
