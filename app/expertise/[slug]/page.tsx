import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { expertiseAreas, getExpertiseBySlug } from '@/content/expertise'
import { jobs } from '@/content/jobs'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { LinkButton } from '@/components/ui/Button'
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo'

export function generateStaticParams() {
  return expertiseAreas.map(area => ({ slug: area.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const area = getExpertiseBySlug(slug)
  if (!area) return {}
  return buildMetadata({ title: area.name, description: area.summary, path: `/expertise/${area.slug}` })
}

export default async function ExpertiseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const area = getExpertiseBySlug(slug)
  if (!area) return notFound()

  const relatedJobs = jobs.filter(job => job.expertiseSlug === area.slug)
  const breadcrumb = breadcrumbJsonLd([
    { name: 'Expertise', path: '/expertise' },
    { name: area.name, path: `/expertise/${area.slug}` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <PageHero eyebrow="Expertise" title={area.name} description={area.summary} />
      <Section border={false}>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_320px]">
          <div>
            <p className="text-base leading-relaxed text-ink-muted">{area.description}</p>
            <h2 className="mt-10 text-sm font-medium uppercase tracking-wide text-ink-faint">Capabilities</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {area.capabilities.map(cap => (
                <li key={cap} className="flex items-start gap-2 text-sm text-ink">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 bg-signal" />
                  {cap}
                </li>
              ))}
            </ul>

            {relatedJobs.length > 0 && (
              <>
                <h2 className="mt-10 text-sm font-medium uppercase tracking-wide text-ink-faint">Open roles</h2>
                <div className="mt-4 divide-y divide-line border-t border-line">
                  {relatedJobs.map(job => (
                    <Link key={job.slug} href={`/jobs/${job.slug}`} className="flex items-center justify-between py-4 hover:text-signal">
                      <span className="text-sm font-medium">{job.title}</span>
                      <span aria-hidden>→</span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
          <aside className="h-fit border border-line p-6">
            <h2 className="text-sm font-medium uppercase tracking-wide text-ink-faint">Common roles</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {area.roles.map(role => (
                <li key={role} className="border border-line px-3 py-2 text-sm text-ink">{role}</li>
              ))}
            </ul>
            <LinkButton href="/contact" variant="primary" className="mt-6 w-full">Find Talent</LinkButton>
          </aside>
        </div>
      </Section>
    </>
  )
}
