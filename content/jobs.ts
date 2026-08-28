export type Job = {
  slug: string
  title: string
  expertiseSlug: string
  location: string
  remote: boolean
  employmentType: 'Contract' | 'Contract-to-hire' | 'Direct placement'
  level: 'Mid' | 'Senior' | 'Staff'
  postedAt: string
  summary: string
  responsibilities: string[]
  qualifications: string[]
}

export const jobs: Job[] = [
  {
    slug: 'senior-iam-engineer-remote',
    title: 'Senior IAM Engineer',
    expertiseSlug: 'cybersecurity-iam',
    location: 'Remote — United States',
    remote: true,
    employmentType: 'Contract-to-hire',
    level: 'Senior',
    postedAt: '2026-08-18',
    summary: 'Lead identity federation and access-governance work for an enterprise IAM modernization program.',
    responsibilities: ['Design and implement SSO/federation across enterprise applications', 'Lead access-review and governance workflow design', 'Partner with security and compliance stakeholders on control design'],
    qualifications: ['5+ years in IAM engineering', 'Hands-on experience with SAML/OIDC federation', 'Experience with identity governance tooling'],
  },
  {
    slug: 'soc-analyst-tier2-hybrid',
    title: 'SOC Analyst, Tier 2',
    expertiseSlug: 'cybersecurity-iam',
    location: 'Hybrid — New York, NY',
    remote: false,
    employmentType: 'Contract',
    level: 'Mid',
    postedAt: '2026-08-21',
    summary: 'Triage and escalate security incidents for a 24/7 security operations program.',
    responsibilities: ['Triage alerts across SIEM and EDR tooling', 'Lead incident investigation and escalation', 'Document and refine detection playbooks'],
    qualifications: ['3+ years in a SOC or incident-response role', 'Working knowledge of SIEM and EDR platforms', 'Comfortable working rotating on-call shifts'],
  },
  {
    slug: 'platform-engineer-kubernetes-remote',
    title: 'Platform Engineer, Kubernetes',
    expertiseSlug: 'cloud-infrastructure',
    location: 'Remote — United States',
    remote: true,
    employmentType: 'Direct placement',
    level: 'Senior',
    postedAt: '2026-08-15',
    summary: 'Own the internal Kubernetes platform for a multi-team engineering organization.',
    responsibilities: ['Operate and scale multi-tenant Kubernetes clusters', 'Build developer-facing platform tooling and golden paths', 'Drive cost and reliability engineering initiatives'],
    qualifications: ['4+ years operating Kubernetes in production', 'Experience with infrastructure-as-code (Terraform or similar)', 'Strong incident-response fundamentals'],
  },
  {
    slug: 'backend-engineer-payments-hybrid',
    title: 'Backend Engineer, Payments',
    expertiseSlug: 'software-engineering',
    location: 'Hybrid — Charlotte, NC',
    remote: false,
    employmentType: 'Contract-to-hire',
    level: 'Senior',
    postedAt: '2026-08-24',
    summary: 'Build core payment-processing services for a regulated financial platform.',
    responsibilities: ['Design and implement high-throughput payment services', 'Partner with compliance on control implementation', 'Improve test coverage and observability across the payments stack'],
    qualifications: ['5+ years backend engineering experience', 'Experience in a regulated or high-compliance environment', 'Strong grasp of distributed-systems fundamentals'],
  },
  {
    slug: 'ml-engineer-applied-ai-remote',
    title: 'ML Engineer, Applied AI',
    expertiseSlug: 'data-analytics-ai',
    location: 'Remote — United States',
    remote: true,
    employmentType: 'Contract',
    level: 'Mid',
    postedAt: '2026-08-20',
    summary: 'Build and productionize applied ML features for an enterprise data platform.',
    responsibilities: ['Take models from prototype to production service', 'Build evaluation and monitoring for deployed models', 'Partner with data engineering on feature pipelines'],
    qualifications: ['3+ years shipping ML systems to production', 'Comfortable owning a service end-to-end', 'Experience with MLOps tooling a plus'],
  },
  {
    slug: 'cloud-security-engineer-remote',
    title: 'Cloud Security Engineer',
    expertiseSlug: 'cybersecurity-iam',
    location: 'Remote — United States',
    remote: true,
    employmentType: 'Direct placement',
    level: 'Senior',
    postedAt: '2026-08-12',
    summary: 'Own cloud security posture management across a multi-account AWS environment.',
    responsibilities: ['Implement and tune cloud security posture management tooling', 'Lead remediation of high-severity findings', 'Partner with platform teams on secure-by-default infrastructure patterns'],
    qualifications: ['4+ years in cloud security', 'Deep familiarity with AWS security services', 'Experience communicating risk to non-security stakeholders'],
  },
]

export function getJobBySlug(slug: string) {
  return jobs.find(j => j.slug === slug)
}
