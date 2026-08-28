export type Expertise = {
  slug: string
  name: string
  shortName: string
  summary: string
  description: string
  capabilities: string[]
  roles: string[]
}

export const expertiseAreas: Expertise[] = [
  {
    slug: 'identity-access-management',
    name: 'Identity & Access Management',
    shortName: 'IAM',
    summary: 'Talent for identity governance, access control and directory modernization programs.',
    description:
      'Enterprises consolidating identity providers, rolling out zero-trust access, or modernizing legacy directory services need engineers who have done it before. We place IAM architects and engineers who understand both the protocol layer and the operational realities of large identity estates.',
    capabilities: ['Identity governance & administration', 'Single sign-on & federation', 'Privileged access management', 'Zero-trust architecture', 'Directory & LDAP modernization'],
    roles: ['IAM Architect', 'IAM Engineer', 'PAM Engineer', 'Identity Governance Analyst'],
  },
  {
    slug: 'cybersecurity',
    name: 'Cybersecurity',
    shortName: 'Security',
    summary: 'Security engineering and operations talent for teams defending production environments.',
    description:
      'From security operations centers to application security programs, we place practitioners who can operate under real incident pressure — not just pass a certification exam. Every candidate is screened against the specific tooling and threat model of the engagement.',
    capabilities: ['Security operations & incident response', 'Application security', 'Cloud security posture management', 'Threat detection engineering', 'Vulnerability management'],
    roles: ['Security Engineer', 'SOC Analyst', 'AppSec Engineer', 'Detection Engineer'],
  },
  {
    slug: 'cloud',
    name: 'Cloud',
    shortName: 'Cloud',
    summary: 'Platform and infrastructure talent for teams building on AWS, Azure and Google Cloud.',
    description:
      'Cloud migrations and platform rebuilds fail on execution, not strategy. We place infrastructure and platform engineers who can design for reliability and cost from day one, and who are fluent in the specific cloud provider your team has standardized on.',
    capabilities: ['Cloud platform architecture', 'Infrastructure as code', 'Site reliability engineering', 'Kubernetes & container platforms', 'Cost & capacity engineering'],
    roles: ['Cloud Architect', 'Platform Engineer', 'SRE', 'DevOps Engineer'],
  },
  {
    slug: 'software-engineering',
    name: 'Software Engineering',
    shortName: 'Engineering',
    summary: 'Full-stack and platform engineers who ship, not just prototype.',
    description:
      'Whether you need to extend an existing product team or stand up a new one, we place engineers matched to your actual stack and delivery model — not a generic resume keyword match.',
    capabilities: ['Full-stack web engineering', 'Backend & distributed systems', 'Mobile engineering', 'Developer platform & tooling', 'Quality & test engineering'],
    roles: ['Senior Software Engineer', 'Backend Engineer', 'Frontend Engineer', 'Mobile Engineer'],
  },
  {
    slug: 'ai-data',
    name: 'AI & Data',
    shortName: 'AI & Data',
    summary: 'Data and ML talent for teams building real production data and AI systems.',
    description:
      'From data platform engineering to applied ML, we place practitioners who understand the difference between a notebook demo and a production system with real reliability and governance requirements.',
    capabilities: ['Data platform engineering', 'Analytics engineering', 'Machine learning engineering', 'MLOps', 'Applied AI integration'],
    roles: ['Data Engineer', 'ML Engineer', 'Analytics Engineer', 'AI Platform Engineer'],
  },
]

export function getExpertiseBySlug(slug: string) {
  return expertiseAreas.find(area => area.slug === slug)
}
