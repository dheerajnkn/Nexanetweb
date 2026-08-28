export type Expertise = {
  slug: string
  name: string
  shortName: string
  tagline: string
  summary: string
  description: string
  capabilities: string[]
  roles: string[]
}

export const expertiseAreas: Expertise[] = [
  {
    slug: 'software-engineering',
    name: 'Software Engineering',
    shortName: 'Engineering',
    tagline: 'Full-stack, backend, APIs, and application modernization.',
    summary: 'Full-stack and platform engineers who ship, not just prototype.',
    description:
      'Whether you need to extend an existing product team or stand up a new one, we place engineers matched to your actual stack and delivery model — not a generic resume keyword match.',
    capabilities: ['Full-stack web engineering', 'Backend & distributed systems', 'API design & integration', 'Application modernization', 'Developer platform & tooling'],
    roles: ['Senior Software Engineer', 'Backend Engineer', 'Frontend Engineer', 'Mobile Engineer'],
  },
  {
    slug: 'data-analytics-ai',
    name: 'Data, Analytics & AI',
    shortName: 'Data & AI',
    tagline: 'Data engineering, business intelligence, analytics, and AI-enabled solutions.',
    summary: 'Data and ML talent for teams building real production data and AI systems.',
    description:
      'From data platform engineering to applied ML, we place practitioners who understand the difference between a notebook demo and a production system with real reliability and governance requirements.',
    capabilities: ['Data platform engineering', 'Business intelligence & analytics', 'Machine learning engineering', 'MLOps', 'Applied AI integration'],
    roles: ['Data Engineer', 'Analytics Engineer', 'ML Engineer', 'AI Platform Engineer'],
  },
  {
    slug: 'cloud-infrastructure',
    name: 'Cloud & Infrastructure',
    shortName: 'Cloud',
    tagline: 'Secure cloud platforms, DevOps, SRE, automation, and infrastructure delivery.',
    summary: 'Platform and infrastructure talent for teams building on AWS, Azure and Google Cloud.',
    description:
      'Cloud migrations and platform rebuilds fail on execution, not strategy. We place infrastructure and platform engineers who design for reliability and cost from day one.',
    capabilities: ['Cloud platform architecture', 'Infrastructure as code', 'Site reliability engineering', 'Kubernetes & container platforms', 'Cost & capacity engineering'],
    roles: ['Cloud Architect', 'Platform Engineer', 'SRE', 'DevOps Engineer'],
  },
  {
    slug: 'cybersecurity-iam',
    name: 'Cybersecurity & IAM',
    shortName: 'Security & IAM',
    tagline: 'Identity, access, governance, privileged access, and security engineering.',
    summary: 'Security and identity practitioners who can operate under real incident and audit pressure.',
    description:
      'From security operations centers to identity governance programs, we place practitioners screened against the specific tooling and risk model of the engagement — not a certification checklist.',
    capabilities: ['Identity governance & administration', 'Single sign-on & federation', 'Privileged access management', 'Security operations & incident response', 'Application & cloud security'],
    roles: ['IAM Engineer', 'Security Engineer', 'SOC Analyst', 'AppSec Engineer'],
  },
  {
    slug: 'enterprise-applications',
    name: 'Enterprise Applications',
    shortName: 'Enterprise Apps',
    tagline: 'Implementation, integration, administration, and operational support.',
    summary: 'Talent for implementing, integrating, and running the enterprise platforms your business depends on.',
    description:
      'Enterprise platform rollouts and integrations need practitioners fluent in both the platform and your surrounding systems. We place implementation and administration specialists who keep the work moving.',
    capabilities: ['Platform implementation', 'Systems integration', 'Application administration', 'Operational & production support', 'Release & change management'],
    roles: ['Systems Analyst', 'Integration Engineer', 'Platform Administrator', 'Application Support Engineer'],
  },
  {
    slug: 'quality-devops',
    name: 'Quality & DevOps',
    shortName: 'QA & DevOps',
    tagline: 'CI/CD, test automation, release engineering, and delivery optimization.',
    summary: 'Quality and delivery engineers who tighten the loop between code and production.',
    description:
      'We place QA and DevOps practitioners who build the automation and release discipline that lets a team ship confidently and often, not just pass a final manual check.',
    capabilities: ['Test automation frameworks', 'CI/CD pipeline engineering', 'Release engineering', 'Delivery process optimization', 'Quality strategy & governance'],
    roles: ['QA Automation Engineer', 'DevOps Engineer', 'Release Engineer', 'Quality Lead'],
  },
]

export function getExpertiseBySlug(slug: string) {
  return expertiseAreas.find(area => area.slug === slug)
}
