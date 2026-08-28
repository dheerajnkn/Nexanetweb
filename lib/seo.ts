import type { Metadata } from 'next'
import { site } from '@/content/site'

export function buildMetadata(options: { title: string; description: string; path: string }): Metadata {
  const url = `${site.url}${options.path}`
  return {
    title: options.title,
    description: options.description,
    alternates: { canonical: url },
    openGraph: {
      title: options.title,
      description: options.description,
      url,
      siteName: site.name,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: options.title,
      description: options.description,
    },
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.legalName,
    url: site.url,
    description: site.description,
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  }
}

export function jobPostingJsonLd(job: {
  title: string
  summary: string
  postedAt: string
  location: string
  remote: boolean
  employmentType: string
  slug: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.summary,
    datePosted: job.postedAt,
    employmentType: job.employmentType.toUpperCase().replace(/[^A-Z]/g, '_'),
    hiringOrganization: {
      '@type': 'Organization',
      name: site.legalName,
      sameAs: site.url,
    },
    jobLocationType: job.remote ? 'TELECOMMUTE' : undefined,
    jobLocation: job.remote
      ? undefined
      : {
          '@type': 'Place',
          address: job.location,
        },
    url: `${site.url}/jobs/${job.slug}`,
  }
}
