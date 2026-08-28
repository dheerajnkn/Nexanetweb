import { notFound } from 'next/navigation'
import { getServiceBySlug } from '@/content/services'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { LinkButton } from '@/components/ui/Button'

export function ServiceDetail({ slug }: { slug: string }) {
  const service = getServiceBySlug(slug)
  if (!service) return notFound()

  return (
    <>
      <PageHero eyebrow="Services" title={service.name} description={service.summary} />
      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_320px]">
          <p className="text-base leading-relaxed text-ink-muted">{service.description}</p>
          <aside className="h-fit border border-line p-6">
            <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-ink-faint">What&apos;s included</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {service.bullets.map(bullet => (
                <li key={bullet} className="flex items-center gap-2 text-sm text-ink">
                  <span aria-hidden className="text-accent-blue">+</span>
                  {bullet}
                </li>
              ))}
            </ul>
            <LinkButton href="/contact" variant="primary" className="mt-6 w-full">Discuss Your Needs</LinkButton>
          </aside>
        </div>
      </Section>
    </>
  )
}
