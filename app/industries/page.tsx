import type { Metadata } from 'next'
import { industries } from '@/content/industries'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Industries',
  description: 'Technology talent for financial services, healthcare, public sector, technology, energy and insurance.',
  path: '/industries',
})

export default function IndustriesPage() {
  return (
    <>
      <PageHero eyebrow="Industries" title="Industries we support" description="Domain-aware staffing for regulated and high-stakes environments." />
      <Section>
        <div className="grid grid-cols-1 divide-y divide-line border border-line md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-3">
          {industries.map((industry, i) => (
            <div key={industry.slug} className="p-8">
              <div className="font-mono text-xs text-ink-faint">0{i + 1}</div>
              <h2 className="mt-4 text-lg font-medium text-ink">{industry.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{industry.summary}</p>
              <ul className="mt-6 flex flex-col gap-2">
                {industry.focusAreas.map(area => (
                  <li key={area} className="flex items-start gap-2 text-xs text-ink">
                    <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 bg-accent-blue" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
