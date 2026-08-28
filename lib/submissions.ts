import { getStore } from '@netlify/blobs'

/**
 * Persists a form submission to Netlify Blobs so it can be retrieved from
 * the Netlify dashboard or CLI. Netlify Blobs auto-provisions per-site when
 * deployed on Netlify; outside that context (local dev without `netlify
 * dev`) this fails gracefully and the submission is logged instead.
 *
 * This is a storage layer, not a notification system — wire a real email
 * or CRM/ATS integration (e.g. Resend, SendGrid, an ATS webhook) before
 * relying on this for time-sensitive lead follow-up.
 */
export async function saveSubmission(formName: string, data: Record<string, unknown>) {
  const record = { ...data, submittedAt: new Date().toISOString() }
  try {
    const store = getStore('form-submissions')
    const key = `${formName}/${Date.now()}-${crypto.randomUUID()}`
    await store.setJSON(key, record)
    return { persisted: true as const }
  } catch (error) {
    console.error(`[submissions] failed to persist "${formName}" submission to Netlify Blobs`, error)
    console.info(`[submissions] "${formName}" submission (not persisted):`, record)
    return { persisted: false as const }
  }
}
