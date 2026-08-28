export type MethodologyStep = {
  step: number
  title: string
  description: string
}

export const methodology: MethodologyStep[] = [
  {
    step: 1,
    title: 'Understand',
    description: 'Define the objective, environment, constraints, and success measures.',
  },
  {
    step: 2,
    title: 'Align',
    description: 'Shape the right engagement model, expertise, and delivery approach.',
  },
  {
    step: 3,
    title: 'Deliver',
    description: 'Integrate quickly, communicate clearly, and execute with ownership.',
  },
  {
    step: 4,
    title: 'Improve',
    description: 'Measure progress, respond to change, and strengthen long-term value.',
  },
]
