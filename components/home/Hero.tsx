import { LinkButton } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Container } from '@/components/ui/Container'
import { HeroSceneLoader } from './HeroSceneLoader'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0">
        <HeroSceneLoader />
      </div>
      <Container className="relative py-24 md:py-36">
        <div className="max-w-2xl">
          <Eyebrow>Technology talent partner</Eyebrow>
          <h1 className="mt-6 text-display-lg font-medium text-ink">
            Technology talent.<br />Delivered with precision.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-muted">
            NexaNet helps organizations build high-performing technology teams across
            cybersecurity, cloud, engineering, data and enterprise platforms.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <LinkButton href="/contact" variant="primary">Find Talent</LinkButton>
            <LinkButton href="/talent" variant="secondary">Join Our Network</LinkButton>
          </div>
        </div>
        <span className="sr-only">
          A network diagram connecting technology talent to enterprise roles, representing NexaNet&apos;s matching process.
        </span>
      </Container>
    </section>
  )
}
