import { LinkButton } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Container } from '@/components/ui/Container'
import { HeroSceneLoader } from './HeroSceneLoader'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#24435F] bg-[#061A31] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_34%,rgba(32,188,230,0.24),transparent_22%),radial-gradient(circle_at_70%_70%,rgba(35,92,197,0.28),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <HeroSceneLoader />
      </div>
      <Container className="relative z-10 py-28 md:py-40">
        <div className="max-w-2xl">
          <Eyebrow>IT consulting · Workforce solutions</Eyebrow>
          <h1 className="mt-6 text-display-lg font-semibold text-white">
            Technology talent.<br />Project outcomes.<br /><span className="text-[#CDEBFF]">Built to scale.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">
            NexaNet connects specialized expertise, exceptional talent, and focused project support to measurable business outcomes.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <LinkButton href="/contact" variant="primary" className="border-signal bg-signal !text-[#061A31] hover:border-white hover:bg-white">
              Discuss Your Needs <span aria-hidden>↗</span>
            </LinkButton>
            <LinkButton href="/services" variant="secondary" className="border-[#4A7097] !text-white hover:border-signal">
              Explore Services <span aria-hidden>↓</span>
            </LinkButton>
          </div>
        </div>
        <span className="sr-only">
          A network diagram connecting technology talent to enterprise roles, representing NexaNet&apos;s matching process.
        </span>
      </Container>
      <div className="relative z-10 border-t border-white/10 bg-[#041326]/80">
        <Container className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {['Quality over volume', 'US-based partnership', 'Scalable & secure'].map((item, index) => (
            <div key={item} className="flex items-center gap-4 py-6 text-sm font-medium text-white/80 md:px-8 md:first:pl-0">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-signal/70 font-mono text-xs text-signal">0{index + 1}</span>
              {item}
            </div>
          ))}
        </Container>
      </div>
    </section>
  )
}
