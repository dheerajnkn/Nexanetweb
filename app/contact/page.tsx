import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { ContactForm } from '@/components/forms/ContactForm'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Find Talent',
  description: 'Tell NexaNet about the role and timeline you need to hire for.',
  path: '/contact',
})

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ email?: string }> }) {
  const { email } = await searchParams

  return (
    <>
      <PageHero
        eyebrow="For hiring teams"
        title="Find talent"
        description="Tell us about the role, timeline and team you're hiring for — we'll come back with a plan, not a generic pitch."
      />
      <Section>
        <div className="max-w-2xl">
          <ContactForm initialEmail={email ?? ''} />
        </div>
      </Section>
    </>
  )
}
