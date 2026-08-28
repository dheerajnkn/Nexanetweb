import type { Metadata } from 'next'
import { jobs } from '@/content/jobs'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { JobBoard } from '@/components/jobs/JobBoard'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Jobs',
  description: 'Current open technology roles across cybersecurity, cloud, engineering, data and IAM.',
  path: '/jobs',
})

export default async function JobsPage({ searchParams }: { searchParams: Promise<{ q?: string; area?: string }> }) {
  const { q, area } = await searchParams

  return (
    <>
      <PageHero eyebrow="Jobs" title="Open roles" description="A sample of current engagements. New roles are added as clients open them." />
      <Section border={false}>
        <JobBoard jobs={jobs} initialQuery={q ?? ''} initialArea={area ?? ''} />
      </Section>
    </>
  )
}
