import Link from 'next/link'
import { services } from '@/content/services'
import { Section } from '@/components/ui/Section'
import { Eyebrow } from '@/components/ui/Eyebrow'

export function Services() {
  return (
    <Section id="services" tone="canvas">
      <div className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-end">
        <div>
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-5 font-display text-display-sm font-bold text-ink">
            Expertise and capacity, aligned to your outcome.
          </h2>
        </div>
        <p className="text-base leading-relaxed text-ink-muted md:justify-self-end md:text-right">
          From a critical specialist to a complete delivery team, we shape each engagement around the work that needs to get done.
        </p>
      </div>

      <div className="grid grid-cols-1 divide-y divide-line border border-line bg-surface md:grid-cols-3 md:divide-x md:divide-y-0">
        {services.map((service, i) => (
          <div key={service.slug} className="flex flex-col p-8">
            <span className="font-mono text-xs text-accent-blue">0{i + 1}</span>
            <h3 className="mt-6 text-xl font-semibold text-ink">{service.name}</h3>
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
            <Link href={`/${service.slug}`} className="mt-6 text-sm font-medium text-accent-blue hover:underline">
              Learn more →
            </Link>
          </div>
        ))}
      </div>
    </Section>
  )
}
