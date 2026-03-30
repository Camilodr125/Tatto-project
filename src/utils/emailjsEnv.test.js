import { describe, it, expect } from 'vitest'
import {
  normalizeEnvValue,
  readEmailJsEnv,
  emailJsEnvDiagnostics,
} from './emailjsEnv'

describe('normalizeEnvValue', () => {
  it('returns empty string for null/undefined', () => {
    expect(normalizeEnvValue(null)).toBe('')
    expect(normalizeEnvValue(undefined)).toBe('')
  })

  it('trims whitespace', () => {
    expect(normalizeEnvValue('  abc  ')).toBe('abc')
  })

  it('strips UTF-8 BOM', () => {
    expect(normalizeEnvValue('\uFEFFmykey')).toBe('mykey')
  })

  it('strips CR from Windows CRLF', () => {
    expect(normalizeEnvValue('key\r\n')).toBe('key')
    expect(normalizeEnvValue('a\rb')).toBe('ab')
  })

  it('strips matching outer quotes', () => {
    expect(normalizeEnvValue('"quoted"')).toBe('quoted')
    expect(normalizeEnvValue("'quoted'")).toBe('quoted')
  })

  it('replaces NBSP with space then trims', () => {
    expect(normalizeEnvValue('\u00A0x\u00A0')).toBe('x')
  })
})

describe('readEmailJsEnv', () => {
  it('reads all three keys from a mock env object', () => {
    const env = {
      VITE_EMAILJS_PUBLIC_KEY: 'pk_test',
      VITE_EMAILJS_SERVICE_ID: 'service_1',
      VITE_EMAILJS_TEMPLATE_ID: 'template_1',
    }
    expect(readEmailJsEnv(env)).toEqual({
      publicKey: 'pk_test',
      serviceId: 'service_1',
      templateId: 'template_1',
    })
  })

  it('treats missing keys as empty string', () => {
    expect(readEmailJsEnv({})).toEqual({
      publicKey: '',
      serviceId: '',
      templateId: '',
    })
  })

  it('normalizes values from env', () => {
    expect(
      readEmailJsEnv({
        VITE_EMAILJS_PUBLIC_KEY: '\uFEFF"abc"\r',
        VITE_EMAILJS_SERVICE_ID: ' svc ',
        VITE_EMAILJS_TEMPLATE_ID: 'tpl',
      }),
    ).toEqual({
      publicKey: 'abc',
      serviceId: 'svc',
      templateId: 'tpl',
    })
  })
})

describe('emailJsEnvDiagnostics', () => {
  it('reports allPresent when everything set and not placeholder-ish', () => {
    const d = emailJsEnvDiagnostics({
      VITE_EMAILJS_PUBLIC_KEY: 'validPublicKeyString',
      VITE_EMAILJS_SERVICE_ID: 'service_abc',
      VITE_EMAILJS_TEMPLATE_ID: 'template_xyz',
    })
    expect(d.allPresent).toBe(true)
    expect(d.publicKey.present).toBe(true)
    expect(d.publicKey.looksPlaceholder).toBe(false)
  })

  it('reports looksPlaceholder for obvious dummy text', () => {
    const d = emailJsEnvDiagnostics({
      VITE_EMAILJS_PUBLIC_KEY: 'REPLACE_WITH_YOUR_PUBLIC_KEY',
      VITE_EMAILJS_SERVICE_ID: 'service_1',
      VITE_EMAILJS_TEMPLATE_ID: 'template_1',
    })
    expect(d.publicKey.looksPlaceholder).toBe(true)
  })

  it('reports missing keys', () => {
    const d = emailJsEnvDiagnostics({
      VITE_EMAILJS_PUBLIC_KEY: '',
    })
    expect(d.allPresent).toBe(false)
    expect(d.serviceId.present).toBe(false)
  })
})
