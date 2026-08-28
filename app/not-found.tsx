import { Container } from '@/components/ui/Container'
import { LinkButton } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <div className="font-mono text-xs text-ink-faint">404</div>
      <h1 className="mt-4 text-display-sm font-medium text-ink">Page not found</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <LinkButton href="/" variant="primary" className="mt-8">Back to homepage</LinkButton>
    </Container>
  )
}
