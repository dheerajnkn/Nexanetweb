import type { Metadata } from 'next'
import { getServiceBySlug } from '@/content/services'
import { ServiceDetail } from '@/components/services/ServiceDetail'
import { buildMetadata } from '@/lib/seo'

const service = getServiceBySlug('technology-consulting')

export const metadata: Metadata = service
  ? buildMetadata({ title: service.name, description: service.summary, path: '/technology-consulting' })
  : {}

export default function TechnologyConsultingPage() {
  return <ServiceDetail slug="technology-consulting" />
}
