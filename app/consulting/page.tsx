import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServiceBySlug } from '@/content/services'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { LinkButton } from '@/components/ui/Button'
import { buildMetadata } from '@/lib/seo'

const service = getServiceBySlug('consulting')

export const metadata: Metadata = service
  ? buildMetadata({ title: service.name, description: service.summary, path: '/consulting' })
  : {}

export default function ConsultingPage() {
  if (!service) return notFound()

  return (
    <>
      <PageHero eyebrow="Solutions" title={service.name} description={service.summary} />
      <Section border={false}>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_320px]">
          <div>
            <p className="text-base leading-relaxed text-ink-muted">{service.description}</p>
            <h2 className="mt-10 text-sm font-medium uppercase tracking-wide text-ink-faint">Good for</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {service.goodFor.map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 bg-signal" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <aside className="h-fit border border-line p-6">
            <h2 className="text-sm font-medium uppercase tracking-wide text-ink-faint">Engagement models</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {service.engagementModels.map(model => (
                <li key={model} className="border border-line px-3 py-2 text-sm text-ink">{model}</li>
              ))}
            </ul>
            <LinkButton href="/contact" variant="primary" className="mt-6 w-full">Find Talent</LinkButton>
          </aside>
        </div>
      </Section>
    </>
  )
}
