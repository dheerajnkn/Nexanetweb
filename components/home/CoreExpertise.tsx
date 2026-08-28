import Link from 'next/link'
import { expertiseAreas } from '@/content/expertise'
import { Section } from '@/components/ui/Section'
import { Eyebrow } from '@/components/ui/Eyebrow'

export function CoreExpertise() {
  return (
    <Section tone="dark" id="expertise">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-2">
        <div>
          <Eyebrow on="dark">Core expertise</Eyebrow>
          <h2 className="mt-5 font-display text-display-sm font-bold text-white">
            Built for the systems your business depends on.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-onDark-muted">
            Practical capability across modern engineering, cloud, data, security, and enterprise technology environments.
          </p>
          <Link href="/contact" className="mt-6 inline-flex items-center gap-1.5 border-b border-accent-blue pb-0.5 text-sm font-semibold text-accent-blue">
            Talk to our team <span aria-hidden>↗</span>
          </Link>
        </div>

        <div className="divide-y divide-line-dark border-t border-line-dark">
          {expertiseAreas.map((area, i) => (
            <Link key={area.slug} href={`/expertise/${area.slug}`} className="group flex gap-6 py-6">
              <span className="w-6 shrink-0 font-mono text-xs text-accent-cyan">0{i + 1}</span>
              <div>
                <h3 className="text-base font-semibold text-white group-hover:text-accent-cyan">{area.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-onDark-muted">{area.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  )
}
