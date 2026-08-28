export type Service = {
  slug: string
  name: string
  summary: string
  description: string
  bullets: string[]
}

export const services: Service[] = [
  {
    slug: 'technology-consulting',
    name: 'Technology Consulting',
    summary: 'Specialized expertise to plan, build, modernize, and support the technology that moves your business forward.',
    description:
      'From architecture reviews to hands-on modernization work, our consultants bring focused expertise to the specific technical problem in front of you — not a generic playbook.',
    bullets: ['Advisory & architecture', 'Engineering & modernization', 'Managed project support'],
  },
  {
    slug: 'workforce-solutions',
    name: 'Workforce Solutions',
    summary: 'Carefully evaluated technology professionals aligned to your technical needs, team dynamics, and delivery goals.',
    description:
      'We evaluate every candidate for technical fit, communication, and readiness to contribute — then match them to your team and delivery model, not just a job description.',
    bullets: ['Contract talent', 'Direct hire', 'Workforce operations'],
  },
  {
    slug: 'project-delivery',
    name: 'Project Delivery',
    summary: 'Flexible delivery capacity that integrates with your team and stays accountable to scope, quality, and outcomes.',
    description:
      'For programs that need sustained delivery capacity, we assemble a team that integrates directly into your workflow and reports against your definition of done.',
    bullets: ['Dedicated delivery teams', 'Project augmentation', 'Outcome-based execution'],
  },
]

export function getServiceBySlug(slug: string) {
  return services.find(s => s.slug === slug)
}
