export type Industry = {
  slug: string
  name: string
  summary: string
  focusAreas: string[]
}

export const industries: Industry[] = [
  {
    slug: 'financial-services',
    name: 'Financial Services',
    summary: 'Engineering and security talent for regulated, high-availability financial platforms.',
    focusAreas: ['Core banking & payments platforms', 'Regulatory & compliance tooling', 'Fraud & risk engineering'],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    summary: 'Talent fluent in the operational and compliance realities of clinical and health-data systems.',
    focusAreas: ['Health data platforms', 'Clinical systems integration', 'Security & privacy engineering'],
  },
  {
    slug: 'public-sector',
    name: 'Public Sector',
    summary: 'Cleared and non-cleared technology talent for government and public-sector programs.',
    focusAreas: ['Modernization programs', 'Identity & access programs', 'Secure infrastructure delivery'],
  },
  {
    slug: 'technology',
    name: 'Technology',
    summary: 'Engineering talent for product companies scaling platform, infrastructure and AI teams.',
    focusAreas: ['Platform engineering', 'Applied AI & data', 'Developer tooling'],
  },
  {
    slug: 'energy-utilities',
    name: 'Energy & Utilities',
    summary: 'Talent for operational technology, grid modernization and industrial security programs.',
    focusAreas: ['OT/IT convergence', 'Industrial security', 'Infrastructure modernization'],
  },
  {
    slug: 'insurance',
    name: 'Insurance',
    summary: 'Engineering talent for policy, claims and underwriting platform modernization.',
    focusAreas: ['Policy & claims platforms', 'Data & analytics modernization', 'Legacy system migration'],
  },
]
