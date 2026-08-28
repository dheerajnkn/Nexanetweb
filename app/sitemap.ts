import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { expertiseAreas } from '@/content/expertise'
import { jobs } from '@/content/jobs'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    '',
    '/solutions',
    '/technology-staffing',
    '/workforce-solutions',
    '/consulting',
    '/expertise',
    '/industries',
    '/jobs',
    '/talent',
    '/about',
    '/contact',
  ]

  const expertisePaths = expertiseAreas.map(area => `/expertise/${area.slug}`)
  const jobPaths = jobs.map(job => `/jobs/${job.slug}`)

  return [...staticPaths, ...expertisePaths, ...jobPaths].map(path => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }))
}
