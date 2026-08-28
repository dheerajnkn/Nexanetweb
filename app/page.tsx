import { Hero } from '@/components/home/Hero'
import { Services } from '@/components/home/Services'
import { CoreExpertise } from '@/components/home/CoreExpertise'
import { WhyNexanet } from '@/components/home/WhyNexanet'
import { Methodology } from '@/components/home/Methodology'
import { AboutTeaser } from '@/components/home/AboutTeaser'
import { ConversationCTA } from '@/components/home/ConversationCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <CoreExpertise />
      <WhyNexanet />
      <Methodology />
      <AboutTeaser />
      <ConversationCTA />
    </>
  )
}
