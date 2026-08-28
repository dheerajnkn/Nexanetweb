'use client'

import { useState, type FormEvent } from 'react'
import { contactFormSchema } from '@/lib/validation'
import { FormField, inputClass } from './FormField'
import { Button } from '@/components/ui/Button'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const values = Object.fromEntries(formData.entries())
    const parsed = contactFormSchema.safeParse(values)

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of parsed.error.issues) {
        fieldErrors[String(issue.path[0])] = issue.message
      }
      setErrors(fieldErrors)
      setStatus('error')
      return
    }

    setErrors({})
    setStatus('submitting')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })
      if (!response.ok) throw new Error('Request failed')
      setStatus('success')
      event.currentTarget.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="border border-line bg-white p-8 text-center">
        <h3 className="text-lg font-medium text-ink">Thanks — we&apos;ll be in touch.</h3>
        <p className="mt-2 text-sm text-ink-muted">A member of our team will follow up within one business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-6 border border-line bg-white p-8">
      <div aria-live="polite" className="sr-only">
        {status === 'submitting' && 'Submitting form'}
        {status === 'error' && 'There was a problem submitting the form'}
      </div>

      {/* Honeypot — hidden from real users, bots often fill every field */}
      <div aria-hidden className="absolute -left-[9999px]" tabIndex={-1}>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField label="Full name" htmlFor="name" error={errors.name} required>
          <input id="name" name="name" type="text" required className={inputClass} />
        </FormField>
        <FormField label="Work email" htmlFor="email" error={errors.email} required>
          <input id="email" name="email" type="email" required className={inputClass} />
        </FormField>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField label="Company" htmlFor="company" error={errors.company} required>
          <input id="company" name="company" type="text" required className={inputClass} />
        </FormField>
        <FormField label="Team size (optional)" htmlFor="teamSize" error={errors.teamSize}>
          <input id="teamSize" name="teamSize" type="text" placeholder="e.g. 10–50" className={inputClass} />
        </FormField>
      </div>
      <FormField label="What are you hiring for?" htmlFor="message" error={errors.message} required>
        <textarea id="message" name="message" rows={5} required className={inputClass} />
      </FormField>

      <Button type="submit" variant="primary" disabled={status === 'submitting'} className="self-start">
        {status === 'submitting' ? 'Sending…' : 'Send request'}
      </Button>
    </form>
  )
}
