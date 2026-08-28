import Link from 'next/link'
import { services } from '@/content/services'
import { Section, SectionHeading } from '@/components/ui/Section'

export function Services() {
  return (
    <Section>
      <SectionHeading
        eyebrow="What we do"
        title="Three ways to build your team"
        description="Match the engagement model to how you actually need to scale — not a one-size-fits-all staffing pitch."
      />
      <div className="grid grid-cols-1 divide-y divide-line border border-line md:grid-cols-3 md:divide-x md:divide-y-0">
        {services.map(service => (
          <Link key={service.slug} href={`/${service.slug}`} className="group block p-8 transition-colors hover:bg-canvas">
            <div className="font-mono text-xs text-ink-faint">0{services.indexOf(service) + 1}</div>
            <h3 className="mt-4 text-lg font-medium text-ink">{service.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{service.summary}</p>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-signal">
              Learn more
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </div>
    </Section>
  )
}
