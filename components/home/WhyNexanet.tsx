import { Section, SectionHeading } from '@/components/ui/Section'
import { whyNexanetPillars } from '@/content/home'

export function WhyNexanet() {
  return (
    <Section id="why-nexanet" tone="canvas">
      <SectionHeading
        eyebrow="Why NexaNet"
        title="A partner that works like part of your team."
        description="Focused attention, thoughtful matching, and delivery discipline from the first conversation onward."
        align="center"
      />
      <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {whyNexanetPillars.map((pillar, i) => (
          <div key={pillar.title} className="bg-surface p-7">
            <span className="font-mono text-xs text-accent-blue">0{i + 1}</span>
            <h3 className="mt-5 text-base font-semibold text-ink">{pillar.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{pillar.description}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
