/**
 * EmailJS env vars from Vite (`import.meta.env`).
 * Kept in one module so Vitest can verify parsing without the full app.
 */

/**
 * @param {unknown} v
 */
export function normalizeEnvValue(v) {
  if (v == null) return ''
  const s = String(v)
  return s
    .replace(/^\uFEFF/, '')
    .replace(/\u00A0/g, ' ')
    .replace(/\r/g, '')
    .trim()
    .replace(/^["']|["']$/g, '')
    .trim()
}

/**
 * Read the three VITE_EMAILJS_* keys from an env object (e.g. import.meta.env).
 * @param {Record<string, string | boolean | undefined>} env
 */
export function readEmailJsEnv(env) {
  return {
    publicKey: normalizeEnvValue(env.VITE_EMAILJS_PUBLIC_KEY),
    serviceId: normalizeEnvValue(env.VITE_EMAILJS_SERVICE_ID),
    templateId: normalizeEnvValue(env.VITE_EMAILJS_TEMPLATE_ID),
    /** Optional — if empty, consultation form uses `templateId` */
    consultTemplateId: normalizeEnvValue(env.VITE_EMAILJS_CONSULT_TEMPLATE_ID),
  }
}

/** Safe summary for debugging (no secret values). */
export function emailJsEnvDiagnostics(env) {
  const { publicKey, serviceId, templateId, consultTemplateId } = readEmailJsEnv(env)
  return {
    publicKey: fieldDiag(publicKey, 'VITE_EMAILJS_PUBLIC_KEY'),
    serviceId: fieldDiag(serviceId, 'VITE_EMAILJS_SERVICE_ID'),
    templateId: fieldDiag(templateId, 'VITE_EMAILJS_TEMPLATE_ID'),
    consultTemplateId: fieldDiag(consultTemplateId, 'VITE_EMAILJS_CONSULT_TEMPLATE_ID'),
    allPresent: Boolean(publicKey && serviceId && templateId),
  }
}

/** @param {string} value @param {string} name */
function fieldDiag(value, name) {
  const len = value.length
  const looksPlaceholder =
    /replace|your_|dummy|xxxxx|placeholder/i.test(value) || value === 'undefined'
  return {
    name,
    present: len > 0,
    length: len,
    looksPlaceholder,
  }
}
