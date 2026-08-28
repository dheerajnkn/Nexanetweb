export const site = {
  name: 'NexaNet',
  legalName: 'NexaNet LLC',
  domain: 'nexanetllc.com',
  url: 'https://nexanetllc.com',
  tagline: 'Technology talent. Project outcomes. Built to scale.',
  description:
    'NexaNet is a US-based technology partner connecting specialized expertise, exceptional talent, and focused project support to measurable business goals.',
  email: 'hr@nexanetllc.com',
  phone: '(469) 305-6204',
  address: {
    line1: '131 Continental Dr, Suite 305',
    line2: 'Newark, DE 19713',
  },
} as const

export type NavItem = {
  label: string
  href: string
  children?: { label: string; href: string; description: string }[]
}

export const primaryNav: NavItem[] = [
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Technology Consulting', href: '/technology-consulting', description: 'Advisory, architecture, and managed project support.' },
      { label: 'Workforce Solutions', href: '/workforce-solutions', description: 'Contract, direct-hire, and workforce operations.' },
      { label: 'Project Delivery', href: '/project-delivery', description: 'Dedicated delivery teams and outcome-based execution.' },
    ],
  },
  {
    label: 'Expertise',
    href: '/expertise',
    children: [
      { label: 'Software Engineering', href: '/expertise/software-engineering', description: 'Full-stack, backend, APIs, and application modernization.' },
      { label: 'Data, Analytics & AI', href: '/expertise/data-analytics-ai', description: 'Data engineering, BI, analytics, and AI-enabled solutions.' },
      { label: 'Cloud & Infrastructure', href: '/expertise/cloud-infrastructure', description: 'Secure cloud platforms, DevOps, SRE, and automation.' },
      { label: 'Cybersecurity & IAM', href: '/expertise/cybersecurity-iam', description: 'Identity, access, governance, and security engineering.' },
      { label: 'Enterprise Applications', href: '/expertise/enterprise-applications', description: 'Implementation, integration, and operational support.' },
      { label: 'Quality & DevOps', href: '/expertise/quality-devops', description: 'CI/CD, test automation, and delivery optimization.' },
    ],
  },
  { label: 'Why NexaNet', href: '/#why-nexanet' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'About', href: '/about' },
]

export const footerColumns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Navigate',
    links: [
      { label: 'Services', href: '/services' },
      { label: 'Expertise', href: '/expertise' },
      { label: 'Why NexaNet', href: '/#why-nexanet' },
      { label: 'About', href: '/about' },
    ],
  },
  {
    title: 'Talent',
    links: [
      { label: 'Open Roles', href: '/jobs' },
      { label: 'Join Our Network', href: '/talent' },
    ],
  },
]
