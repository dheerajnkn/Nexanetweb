import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { LinkButton } from '@/components/ui/Button'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: 'NexaNet is a technology staffing and workforce solutions partner focused on precision over volume.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About NexaNet"
        title="Precision over volume."
        description="NexaNet exists because most technical hiring is a volume game — wide nets, generic screens, and hope. We built a narrower, more deliberate process instead."
      />
      <Section border={false}>
        <SectionHeading
          eyebrow="Approach"
          title="How we operate"
          description="Every engagement follows the same discipline, regardless of role or practice area."
        />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h3 className="text-base font-medium text-ink">Specialize, don&apos;t generalize</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Our recruiters work within a single practice area — cybersecurity, cloud, IAM, engineering or data — so
              they can actually evaluate the work, not just the resume.
            </p>
          </div>
          <div>
            <h3 className="text-base font-medium text-ink">Screen before we present</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Candidates go through a technical screen with a practitioner in the relevant discipline before your team
              ever sees a profile.
            </p>
          </div>
          <div>
            <h3 className="text-base font-medium text-ink">Stay accountable</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              One point of contact owns the engagement from scoping through onboarding — no hand-offs between sales
              and delivery teams.
            </p>
          </div>
        </div>
      </Section>
      <Section className="bg-ink text-white">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-display-sm font-medium">Work with us</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
              Whether you&apos;re hiring or looking for your next role, we&apos;d like to hear from you.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <LinkButton href="/contact" variant="primary" className="border-white bg-white text-ink hover:bg-signal hover:border-signal hover:text-white">
              Find Talent
            </LinkButton>
            <LinkButton href="/talent" variant="secondary" className="border-white/40 text-white hover:border-white">
              Join Our Network
            </LinkButton>
          </div>
        </div>
      </Section>
    </>
  )
}
