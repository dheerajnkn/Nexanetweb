import Link from 'next/link'
import type { Metadata } from 'next'
import { services } from '@/content/services'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Services',
  description: 'Technology consulting, workforce solutions, and project delivery built around how you actually need to scale.',
  path: '/services',
})

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Expertise and capacity, aligned to your outcome."
        description="From a critical specialist to a complete delivery team, we shape each engagement around the work that needs to get done."
      />
      <Section>
        <div className="grid grid-cols-1 divide-y divide-line border border-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {services.map((service, i) => (
            <Link key={service.slug} href={`/${service.slug}`} className="group flex flex-col p-8 transition-colors hover:bg-canvas">
              <span className="font-mono text-xs text-accent-blue">0{i + 1}</span>
              <h2 className="mt-6 text-xl font-semibold text-ink">{service.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{service.summary}</p>
              <div className="mt-6 border-t border-line pt-6">
                <ul className="flex flex-col gap-2.5">
                  {service.bullets.map(bullet => (
                    <li key={bullet} className="flex items-center gap-2 text-sm text-ink">
                      <span aria-hidden className="text-accent-blue">+</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent-blue">
                Learn more <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
