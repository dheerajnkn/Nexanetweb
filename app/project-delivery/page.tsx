import type { Metadata } from 'next'
import { getServiceBySlug } from '@/content/services'
import { ServiceDetail } from '@/components/services/ServiceDetail'
import { buildMetadata } from '@/lib/seo'

const service = getServiceBySlug('project-delivery')

export const metadata: Metadata = service
  ? buildMetadata({ title: service.name, description: service.summary, path: '/project-delivery' })
  : {}

export default function ProjectDeliveryPage() {
  return <ServiceDetail slug="project-delivery" />
}
