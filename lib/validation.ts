import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Enter your full name').max(120),
  email: z.string().trim().email('Enter a valid email address').max(200),
  company: z.string().trim().min(2, 'Enter your company name').max(160),
  teamSize: z.string().trim().max(60).optional().default(''),
  message: z.string().trim().min(10, 'Tell us a bit more about what you need').max(4000),
  // Honeypot field — real users never fill this in.
  website: z.string().max(0, 'Spam detected').optional().default(''),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export const talentFormSchema = z.object({
  kind: z.enum(['network', 'resume']),
  name: z.string().trim().min(2, 'Enter your full name').max(120),
  email: z.string().trim().email('Enter a valid email address').max(200),
  areaOfInterest: z.string().trim().min(2, 'Select an area of interest').max(120),
  linkedinOrPortfolio: z.string().trim().max(300).optional().default(''),
  message: z.string().trim().max(4000).optional().default(''),
  website: z.string().max(0, 'Spam detected').optional().default(''),
})

export type TalentFormValues = z.infer<typeof talentFormSchema>
