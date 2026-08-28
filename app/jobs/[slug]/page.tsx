import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { jobs, getJobBySlug } from '@/content/jobs'
import { getExpertiseBySlug } from '@/content/expertise'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { LinkButton } from '@/components/ui/Button'
import { buildMetadata, jobPostingJsonLd, breadcrumbJsonLd } from '@/lib/seo'

export function generateStaticParams() {
  return jobs.map(job => ({ slug: job.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const job = getJobBySlug(slug)
  if (!job) return {}
  return buildMetadata({ title: job.title, description: job.summary, path: `/jobs/${job.slug}` })
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const job = getJobBySlug(slug)
  if (!job) return notFound()

  const expertise = getExpertiseBySlug(job.expertiseSlug)
  const jsonLd = jobPostingJsonLd(job)
  const breadcrumb = breadcrumbJsonLd([
    { name: 'Jobs', path: '/jobs' },
    { name: job.title, path: `/jobs/${job.slug}` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <PageHero eyebrow={expertise?.name ?? 'Open role'} title={job.title} description={job.summary} />
      <Section border={false}>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_320px]">
          <div>
            <h2 className="text-sm font-medium uppercase tracking-wide text-ink-faint">Responsibilities</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {job.responsibilities.map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 bg-signal" />
                  {item}
                </li>
              ))}
            </ul>
            <h2 className="mt-10 text-sm font-medium uppercase tracking-wide text-ink-faint">Qualifications</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {job.qualifications.map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 bg-signal" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <aside className="h-fit border border-line p-6">
            <dl className="flex flex-col gap-4 text-sm">
              <div>
                <dt className="text-ink-faint">Location</dt>
                <dd className="mt-1 text-ink">{job.location}</dd>
              </div>
              <div>
                <dt className="text-ink-faint">Engagement</dt>
                <dd className="mt-1 text-ink">{job.employmentType}</dd>
              </div>
              <div>
                <dt className="text-ink-faint">Level</dt>
                <dd className="mt-1 text-ink">{job.level}</dd>
              </div>
              <div>
                <dt className="text-ink-faint">Posted</dt>
                <dd className="mt-1 text-ink">{new Date(job.postedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</dd>
              </div>
            </dl>
            <LinkButton href="/talent" variant="primary" className="mt-6 w-full">Apply / submit background</LinkButton>
          </aside>
        </div>
      </Section>
    </>
  )
}
