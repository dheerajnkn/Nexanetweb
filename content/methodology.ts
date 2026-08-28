export type MethodologyStep = {
  step: number
  title: string
  description: string
}

export const methodology: MethodologyStep[] = [
  {
    step: 1,
    title: 'Scope',
    description: 'We define the role against your actual stack, team structure and delivery timeline — not a generic job description.',
  },
  {
    step: 2,
    title: 'Source',
    description: 'Our recruiters draw on specialized technical networks built around each practice area, not a single generic candidate pool.',
  },
  {
    step: 3,
    title: 'Technical screen',
    description: 'Candidates are evaluated by practitioners in the relevant discipline before your team ever sees a profile.',
  },
  {
    step: 4,
    title: 'Present',
    description: 'You receive a short list of qualified candidates with context on fit, not a stack of unfiltered resumes.',
  },
  {
    step: 5,
    title: 'Place & support',
    description: 'We stay engaged through onboarding and ramp-up, with a single point of contact for the life of the engagement.',
  },
]
