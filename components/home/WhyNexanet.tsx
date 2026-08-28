import { Section, SectionHeading } from '@/components/ui/Section'

const pillars = [
  {
    title: 'Practitioner-led screening',
    description: 'Candidates are technically evaluated by people who have done the job, not a generic recruiter checklist.',
  },
  {
    title: 'Specialized networks',
    description: 'Each practice area draws on its own sourcing network, built around that discipline rather than a single generic pool.',
  },
  {
    title: 'One point of contact',
    description: 'A single accountable contact through sourcing, screening, placement and ramp-up — no hand-offs between teams.',
  },
]

export function WhyNexanet() {
  return (
    <Section>
      <SectionHeading eyebrow="Why NexaNet" title="Built around how technical hiring actually works" />
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {pillars.map(pillar => (
          <div key={pillar.title}>
            <h3 className="text-base font-medium text-ink">{pillar.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{pillar.description}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
