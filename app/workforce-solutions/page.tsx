import type { Metadata } from 'next'
import { getServiceBySlug } from '@/content/services'
import { ServiceDetail } from '@/components/services/ServiceDetail'
import { buildMetadata } from '@/lib/seo'

const service = getServiceBySlug('workforce-solutions')

export const metadata: Metadata = service
  ? buildMetadata({ title: service.name, description: service.summary, path: '/workforce-solutions' })
  : {}

export default function WorkforceSolutionsPage() {
  return <ServiceDetail slug="workforce-solutions" />
}
