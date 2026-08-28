import Link from 'next/link'
import { jobs } from '@/content/jobs'
import { getExpertiseBySlug } from '@/content/expertise'
import { Section, SectionHeading } from '@/components/ui/Section'
import { LinkButton } from '@/components/ui/Button'

export function FeaturedJobs() {
  const featured = [...jobs].sort((a, b) => b.postedAt.localeCompare(a.postedAt)).slice(0, 3)

  return (
    <Section>
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Open roles"
          title="Featured positions"
          description="A sample of current engagements. New roles are added as clients open them."
        />
        <LinkButton href="/jobs" variant="secondary" className="shrink-0">View all open roles</LinkButton>
      </div>
      <div className="divide-y divide-line border-t border-line">
        {featured.map(job => (
          <Link key={job.slug} href={`/jobs/${job.slug}`} className="group flex flex-col gap-2 py-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-base font-medium text-ink group-hover:text-signal">{job.title}</h3>
              <p className="mt-1 text-sm text-ink-muted">{getExpertiseBySlug(job.expertiseSlug)?.name} · {job.location}</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-ink-faint">
              <span className="border border-line px-2 py-1">{job.employmentType}</span>
              <span aria-hidden className="text-signal transition-transform group-hover:translate-x-1">→</span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  )
}
