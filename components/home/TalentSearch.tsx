'use client'

import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { expertiseAreas } from '@/content/expertise'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'

export function TalentSearch() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [area, setArea] = useState<string | null>(null)

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (area) params.set('area', area)
    router.push(`/jobs${params.toString() ? `?${params.toString()}` : ''}`)
  }

  return (
    <Section className="bg-canvas">
      <SectionHeading
        eyebrow="Find the right fit"
        title="Search technology talent by role or skill"
        description="Search across open roles by title, skill or practice area."
      />
      <form onSubmit={submit} className="flex flex-col gap-4 border border-line bg-white p-6 md:flex-row md:items-center">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="e.g. Kubernetes, IAM, backend engineer"
          aria-label="Search roles by title or skill"
          className="w-full flex-1 border border-line px-4 py-3 text-sm text-ink outline-none focus-visible:border-signal"
        />
        <Button type="submit" variant="primary" className="w-full md:w-auto">Search roles</Button>
      </form>
      <div className="mt-4 flex flex-wrap gap-2">
        {expertiseAreas.map(item => (
          <button
            key={item.slug}
            type="button"
            onClick={() => setArea(current => (current === item.slug ? null : item.slug))}
            aria-pressed={area === item.slug}
            className={`border px-3 py-1.5 text-xs font-medium transition-colors ${
              area === item.slug ? 'border-signal bg-signal-soft text-signal' : 'border-line text-ink-muted hover:border-ink'
            }`}
          >
            {item.shortName}
          </button>
        ))}
      </div>
    </Section>
  )
}
