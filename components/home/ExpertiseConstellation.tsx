import { Section, SectionHeading } from '@/components/ui/Section'
import { ConstellationLoader } from './ConstellationLoader'

export function ExpertiseConstellation() {
  return (
    <Section className="bg-canvas">
      <SectionHeading
        eyebrow="Where we specialize"
        title="Five practice areas, one network"
        description="Each area draws on a dedicated technical network and screening process — select one to see how we staff it."
        align="center"
      />
      <ConstellationLoader />
    </Section>
  )
}
