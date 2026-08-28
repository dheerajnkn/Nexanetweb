'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Job } from '@/content/jobs'
import { expertiseAreas, getExpertiseBySlug } from '@/content/expertise'

export function JobBoard({ jobs, initialQuery = '', initialArea = '' }: { jobs: Job[]; initialQuery?: string; initialArea?: string }) {
  const [query, setQuery] = useState(initialQuery)
  const [area, setArea] = useState(initialArea)
  const [remoteOnly, setRemoteOnly] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return jobs
      .filter(job => (area ? job.expertiseSlug === area : true))
      .filter(job => (remoteOnly ? job.remote : true))
      .filter(job => {
        if (!q) return true
        const haystack = `${job.title} ${job.summary} ${job.qualifications.join(' ')}`.toLowerCase()
        return haystack.includes(q)
      })
      .sort((a, b) => b.postedAt.localeCompare(a.postedAt))
  }, [jobs, query, area, remoteOnly])

  return (
    <div>
      <div className="flex flex-col gap-4 border border-line bg-white p-6 md:flex-row md:items-center">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by title, skill or keyword"
          aria-label="Search open roles"
          className="w-full flex-1 border border-line px-4 py-3 text-sm text-ink outline-none focus-visible:border-signal"
        />
        <label className="flex items-center gap-2 text-sm text-ink-muted">
          <input type="checkbox" checked={remoteOnly} onChange={e => setRemoteOnly(e.target.checked)} />
          Remote only
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setArea('')}
          className={`border px-3 py-1.5 text-xs font-medium transition-colors ${area === '' ? 'border-signal bg-signal-soft text-signal' : 'border-line text-ink-muted hover:border-ink'}`}
        >
          All areas
        </button>
        {expertiseAreas.map(item => (
          <button
            key={item.slug}
            type="button"
            onClick={() => setArea(current => (current === item.slug ? '' : item.slug))}
            aria-pressed={area === item.slug}
            className={`border px-3 py-1.5 text-xs font-medium transition-colors ${
              area === item.slug ? 'border-signal bg-signal-soft text-signal' : 'border-line text-ink-muted hover:border-ink'
            }`}
          >
            {item.shortName}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-ink-faint">{filtered.length} open role{filtered.length === 1 ? '' : 's'}</p>

      <div className="mt-2 divide-y divide-line border-t border-line">
        {filtered.map(job => (
          <Link key={job.slug} href={`/jobs/${job.slug}`} className="group flex flex-col gap-2 py-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-base font-medium text-ink group-hover:text-signal">{job.title}</h3>
              <p className="mt-1 text-sm text-ink-muted">{getExpertiseBySlug(job.expertiseSlug)?.name} · {job.location}</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-ink-faint">
              <span className="border border-line px-2 py-1">{job.employmentType}</span>
              <span className="border border-line px-2 py-1">{job.level}</span>
              <span aria-hidden className="text-signal transition-transform group-hover:translate-x-1">→</span>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-ink-muted">No roles match those filters right now.</p>
        )}
      </div>
    </div>
  )
}
