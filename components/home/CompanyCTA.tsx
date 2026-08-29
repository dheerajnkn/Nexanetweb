import { Container } from '@/components/ui/Container'
import { LinkButton } from '@/components/ui/Button'

export function CompanyCTA() {
  return (
    <section className="border-t border-line bg-ink py-20 text-white">
      <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">For hiring teams</div>
          <h2 className="mt-4 text-display-sm font-medium">Need to build out your team?</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
            Tell us about the role and timeline — we&apos;ll come back with a plan, not a generic pitch.
          </p>
        </div>
        <LinkButton
          href="/contact"
          variant="primary"
          className="shrink-0 border-white bg-white !text-ink hover:border-signal hover:bg-signal hover:!text-white"
        >
          Find Talent
        </LinkButton>
      </Container>
    </section>
  )
}
