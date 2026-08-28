import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { expertiseAreas } from '@/content/expertise'
import { jobs } from '@/content/jobs'
import { services } from '@/content/services'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    '',
    '/services',
    '/expertise',
    '/industries',
    '/jobs',
    '/talent',
    '/about',
    '/contact',
  ]

  const servicePaths = services.map(service => `/${service.slug}`)
  const expertisePaths = expertiseAreas.map(area => `/expertise/${area.slug}`)
  const jobPaths = jobs.map(job => `/jobs/${job.slug}`)

  return [...staticPaths, ...servicePaths, ...expertisePaths, ...jobPaths].map(path => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }))
}
