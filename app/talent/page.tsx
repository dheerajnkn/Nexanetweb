import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { TalentForm } from '@/components/forms/TalentForm'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Talent Network',
  description: 'Join the NexaNet talent network or submit your background for current and future engagements.',
  path: '/talent',
})

export default function TalentPage() {
  return (
    <>
      <PageHero
        eyebrow="For technologists"
        title="Join our network"
        description="Tell us about your background and the kind of role you're looking for. We'll reach out when there's a real match."
      />
      <Section>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-medium text-ink">Join the network</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              A lightweight way to be considered for future roles in your area of interest.
            </p>
            <div className="mt-6">
              <TalentForm kind="network" />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-medium text-ink">Submit your background</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Looking for something more active? Share more detail and we&apos;ll match you against open roles.
            </p>
            <div className="mt-6">
              <TalentForm kind="resume" />
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
