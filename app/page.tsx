import { Hero } from '@/components/home/Hero'
import { Services } from '@/components/home/Services'
import { ExpertiseConstellation } from '@/components/home/ExpertiseConstellation'
import { Methodology } from '@/components/home/Methodology'
import { TalentSearch } from '@/components/home/TalentSearch'
import { FeaturedJobs } from '@/components/home/FeaturedJobs'
import { Industries } from '@/components/home/Industries'
import { WhyNexanet } from '@/components/home/WhyNexanet'
import { CandidateCTA } from '@/components/home/CandidateCTA'
import { CompanyCTA } from '@/components/home/CompanyCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <ExpertiseConstellation />
      <Methodology />
      <TalentSearch />
      <FeaturedJobs />
      <Industries />
      <WhyNexanet />
      <CandidateCTA />
      <CompanyCTA />
    </>
  )
}
