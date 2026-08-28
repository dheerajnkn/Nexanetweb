export type Service = {
  slug: string
  name: string
  summary: string
  description: string
  goodFor: string[]
  engagementModels: string[]
}

export const services: Service[] = [
  {
    slug: 'technology-staffing',
    name: 'Technology Staffing',
    summary: 'Contract, contract-to-hire and direct-placement engineers matched to your stack and timeline.',
    description:
      'We run a specialized technical screen before a candidate ever reaches your team — not a keyword match against a resume. That means fewer interviews spent qualifying, and faster time to a signed offer.',
    goodFor: ['Backfilling a critical open role', 'Scaling a team ahead of a delivery deadline', 'Testing a role before converting to a permanent hire'],
    engagementModels: ['Contract', 'Contract-to-hire', 'Direct placement'],
  },
  {
    slug: 'workforce-solutions',
    name: 'Workforce Solutions',
    summary: 'Managed delivery pods and scalable engineering capacity, run as an extension of your team.',
    description:
      'For programs that need sustained capacity rather than a single hire, we assemble and manage a delivery team against your roadmap — with a single point of accountability for staffing, ramp-up and performance.',
    goodFor: ['Standing up a new product team quickly', 'Sustained multi-quarter delivery capacity', 'Offloading staffing overhead from internal recruiting'],
    engagementModels: ['Managed team', 'Staff augmentation pod', 'Dedicated delivery unit'],
  },
  {
    slug: 'consulting',
    name: 'Consulting',
    summary: 'Advisory and hands-on engineering engagements for specific technical initiatives.',
    description:
      'When the gap is expertise rather than headcount, we bring in senior practitioners for scoped advisory or hands-on engagements — architecture reviews, migration planning, and technical due diligence.',
    goodFor: ['Architecture and technical due diligence', 'Migration and modernization planning', 'Short-term expert engagement without a long hiring cycle'],
    engagementModels: ['Advisory engagement', 'Fixed-scope project', 'Fractional expert'],
  },
]

export function getServiceBySlug(slug: string) {
  return services.find(s => s.slug === slug)
}
