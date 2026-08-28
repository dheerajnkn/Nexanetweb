import Link from 'next/link'
import type { Metadata } from 'next'
import { services } from '@/content/services'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Solutions',
  description: 'Technology staffing, workforce solutions and consulting engagement models built around how you actually need to scale.',
  path: '/solutions',
})

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Three ways to build your team"
        description="Match the engagement model to your actual delivery need — not a one-size-fits-all staffing pitch."
      />
      <Section border={false}>
        <div className="grid grid-cols-1 divide-y divide-line border border-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {services.map(service => (
            <Link key={service.slug} href={`/${service.slug}`} className="group block p-8 transition-colors hover:bg-canvas">
              <h2 className="text-lg font-medium text-ink">{service.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{service.summary}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-signal">
                View engagement models
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
