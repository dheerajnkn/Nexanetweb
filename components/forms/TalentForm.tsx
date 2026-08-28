'use client'

import { useState, type FormEvent } from 'react'
import { talentFormSchema } from '@/lib/validation'
import { expertiseAreas } from '@/content/expertise'
import { FormField, inputClass } from './FormField'
import { Button } from '@/components/ui/Button'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function TalentForm({ kind }: { kind: 'network' | 'resume' }) {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const values = { ...Object.fromEntries(formData.entries()), kind }
    const parsed = talentFormSchema.safeParse(values)

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
      const response = await fetch('/api/talent', {
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
        <h3 className="text-lg font-medium text-ink">You&apos;re on the list.</h3>
        <p className="mt-2 text-sm text-ink-muted">We&apos;ll reach out when a matching role comes up.</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-6 border border-line bg-white p-8">
      <div aria-live="polite" className="sr-only">
        {status === 'submitting' && 'Submitting form'}
        {status === 'error' && 'There was a problem submitting the form'}
      </div>

      <div aria-hidden className="absolute -left-[9999px]" tabIndex={-1}>
        <label htmlFor={`website-${kind}`}>Website</label>
        <input id={`website-${kind}`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField label="Full name" htmlFor={`name-${kind}`} error={errors.name} required>
          <input id={`name-${kind}`} name="name" type="text" required className={inputClass} />
        </FormField>
        <FormField label="Email" htmlFor={`email-${kind}`} error={errors.email} required>
          <input id={`email-${kind}`} name="email" type="email" required className={inputClass} />
        </FormField>
      </div>

      <FormField label="Area of interest" htmlFor={`area-${kind}`} error={errors.areaOfInterest} required>
        <select id={`area-${kind}`} name="areaOfInterest" required defaultValue="" className={inputClass}>
          <option value="" disabled>Select a practice area</option>
          {expertiseAreas.map(area => (
            <option key={area.slug} value={area.name}>{area.name}</option>
          ))}
        </select>
      </FormField>

      <FormField label="LinkedIn or portfolio URL (optional)" htmlFor={`link-${kind}`} error={errors.linkedinOrPortfolio}>
        <input id={`link-${kind}`} name="linkedinOrPortfolio" type="url" placeholder="https://" className={inputClass} />
      </FormField>

      <FormField
        label={kind === 'resume' ? 'Summarize your background' : 'Anything else we should know? (optional)'}
        htmlFor={`message-${kind}`}
        error={errors.message}
      >
        <textarea id={`message-${kind}`} name="message" rows={5} className={inputClass} />
      </FormField>

      <Button type="submit" variant="primary" disabled={status === 'submitting'} className="self-start">
        {status === 'submitting' ? 'Submitting…' : kind === 'resume' ? 'Submit background' : 'Join the network'}
      </Button>
    </form>
  )
}
