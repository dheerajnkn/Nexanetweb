import { Container } from '@/components/ui/Container'
import { LinkButton } from '@/components/ui/Button'

export function CandidateCTA() {
  return (
    <section className="border-t border-line bg-canvas py-20">
      <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal">For technologists</div>
          <h2 className="mt-4 text-display-sm font-medium text-ink">Looking for your next role?</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
            Join our network or submit your resume for current and future engagements.
          </p>
        </div>
        <LinkButton href="/talent" variant="primary" className="shrink-0">Join Our Network</LinkButton>
      </Container>
    </section>
  )
}
