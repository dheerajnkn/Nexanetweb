export const site = {
  name: 'NexaNet',
  legalName: 'NexaNet LLC',
  domain: 'nexanetllc.com',
  url: 'https://nexanetllc.com',
  tagline: 'Technology talent. Delivered with precision.',
  description:
    'NexaNet helps organizations build high-performing technology teams across cybersecurity, cloud, engineering, data and enterprise platforms.',
} as const

export type NavItem = {
  label: string
  href: string
  children?: { label: string; href: string; description: string }[]
}

export const primaryNav: NavItem[] = [
  {
    label: 'Solutions',
    href: '/solutions',
    children: [
      { label: 'Technology Staffing', href: '/technology-staffing', description: 'Contract, contract-to-hire and direct placement.' },
      { label: 'Workforce Solutions', href: '/workforce-solutions', description: 'Managed teams and scalable delivery pods.' },
      { label: 'Consulting', href: '/consulting', description: 'Advisory and hands-on engineering engagements.' },
    ],
  },
  {
    label: 'Expertise',
    href: '/expertise',
    children: [
      { label: 'Identity & Access Management', href: '/expertise/identity-access-management', description: 'IAM architecture and delivery talent.' },
      { label: 'Cybersecurity', href: '/expertise/cybersecurity', description: 'Security engineering and operations talent.' },
      { label: 'Cloud', href: '/expertise/cloud', description: 'Cloud platform and infrastructure talent.' },
      { label: 'Software Engineering', href: '/expertise/software-engineering', description: 'Full-stack and platform engineering talent.' },
      { label: 'AI & Data', href: '/expertise/ai-data', description: 'Data, ML and AI-platform talent.' },
    ],
  },
  { label: 'Industries', href: '/industries' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'About', href: '/about' },
]

export const footerColumns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Solutions',
    links: [
      { label: 'Technology Staffing', href: '/technology-staffing' },
      { label: 'Workforce Solutions', href: '/workforce-solutions' },
      { label: 'Consulting', href: '/consulting' },
    ],
  },
  {
    title: 'Expertise',
    links: [
      { label: 'Identity & Access Management', href: '/expertise/identity-access-management' },
      { label: 'Cybersecurity', href: '/expertise/cybersecurity' },
      { label: 'Cloud', href: '/expertise/cloud' },
      { label: 'Software Engineering', href: '/expertise/software-engineering' },
      { label: 'AI & Data', href: '/expertise/ai-data' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Industries', href: '/industries' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
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
