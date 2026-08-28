import Link from 'next/link'
import type { Metadata } from 'next'
import { expertiseAreas } from '@/content/expertise'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Expertise',
  description: 'Five specialized technology practice areas, each backed by a dedicated sourcing and screening network.',
  path: '/expertise',
})

export default function ExpertisePage() {
  return (
    <>
      <PageHero
        eyebrow="Expertise"
        title="Five practice areas, one network"
        description="Each area draws on a dedicated technical network and screening process."
      />
      <Section border={false}>
        <div className="grid grid-cols-1 divide-y divide-line border border-line md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-3">
          {expertiseAreas.map((area, i) => (
            <Link key={area.slug} href={`/expertise/${area.slug}`} className="group block p-8 transition-colors hover:bg-canvas">
              <div className="font-mono text-xs text-ink-faint">0{i + 1}</div>
              <h2 className="mt-4 text-lg font-medium text-ink">{area.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{area.summary}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-signal">
                Explore roles
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
