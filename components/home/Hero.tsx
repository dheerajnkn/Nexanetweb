import { LinkButton } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Container } from '@/components/ui/Container'
import { site } from '@/content/site'
import { heroPrinciples } from '@/content/home'
import { HeroSceneLoader } from './HeroSceneLoader'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,rgba(52,225,234,0.10),transparent_55%)]" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-full w-full md:w-3/5">
        <HeroSceneLoader />
      </div>

      <Container className="relative py-24 md:py-32">
        <div className="max-w-xl">
          <Eyebrow on="dark">IT Consulting &middot; Workforce Solutions</Eyebrow>
          <h1 className="mt-6 font-display text-display-lg leading-[1.05] text-white">
            <span className="block font-bold">Technology talent.</span>
            <span className="block font-bold">Project outcomes.</span>
            <span className="block font-extrabold">Built to scale.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-onDark-muted">{site.description}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <LinkButton href="/contact" variant="primary">
              Discuss Your Needs <span aria-hidden>↗</span>
            </LinkButton>
            <LinkButton href="/services" variant="outline-dark">
              Explore Services <span aria-hidden>↓</span>
            </LinkButton>
          </div>
        </div>
        <span className="sr-only">
          A network diagram connecting technology talent to enterprise roles, representing NexaNet&apos;s matching process.
        </span>
      </Container>

      <div className="relative border-t border-line-dark">
        <Container>
          <div className="grid grid-cols-1 divide-y divide-line-dark py-8 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {heroPrinciples.map((item, i) => (
              <div key={item.label} className="flex items-center gap-3 py-4 sm:justify-center sm:py-0">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent-cyan/40 font-mono text-[11px] text-accent-cyan">
                  0{i + 1}
                </span>
                <span className="text-sm font-medium text-white">{item.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  )
}
