import { LinkButton } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

const paths = [
  { number: '01', label: 'For businesses', title: <>Build capability<br />without the noise.</>, description: 'Specialized talent, technology consulting, and accountable delivery support.', href: '/solutions', action: 'Explore business solutions', tone: 'from-[#08265A] via-[#1459BD] to-[#0C8BB0]' },
  { number: '02', label: 'For candidates', title: <>Make your next<br />move count.</>, description: 'Career positioning, interview preparation, and relevant opportunity support.', href: '/talent', action: 'Explore candidate support', tone: 'from-[#087F96] via-[#00B8C9] to-[#1284D3]' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#D8E7F5] bg-[#F7FBFF] text-[#071A3A]">
      <div aria-hidden className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(34,105,180,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,105,180,0.08)_1px,transparent_1px)] [background-size:74px_74px] [mask-image:linear-gradient(90deg,black_0%,black_42%,transparent_78%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-[35rem] -top-[24rem] h-[74rem] w-[74rem] rounded-full border border-[#1554DA]/15" />
      <div aria-hidden className="pointer-events-none absolute -right-[19rem] -top-[8rem] h-[48rem] w-[48rem] rounded-full border border-[#00B8C9]/20" />

      <Container className="relative grid min-h-[760px] gap-10 py-16 lg:grid-cols-[0.95fr_1.1fr] lg:items-center lg:gap-20 lg:py-20">
        <div className="self-start pt-6 lg:pt-14">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#087E9D]">NexaNet LLC <span className="mx-2 text-[#5D8AAF]">•</span> Newark, Delaware</div>
          <p className="mt-12 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#1554DA]">One network. Two ways forward.</p>
          <h1 className="mt-4 text-[clamp(3.3rem,5.8vw,5.35rem)] font-semibold leading-[0.91] tracking-[-0.075em] text-[#071A3A]">Start where<br />the work <span className="text-[#08AABA]">matters.</span></h1>
          <p className="mt-8 max-w-md text-[17px] leading-relaxed text-[#61718A]">Choose the path that fits your next move. We connect ambitious technology work with the people who can deliver it.</p>
          <div className="mt-11 flex items-center gap-3 text-[#0D3F78]"><span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-[#0F8BA4]">THE NEXANET METHOD</span>{['Align.', 'Prepare.', 'Move.'].map((step, index) => <span key={step} className={`grid h-14 w-14 place-items-center rounded-full border border-[#A9CAE7] bg-white/70 text-[11px] font-semibold shadow-[0_8px_20px_rgba(33,89,150,0.08)] ${index === 1 ? '-translate-y-3' : ''}`}>{step}</span>)}</div>
        </div>

        <div className="relative grid gap-4">
          {paths.map(path => (
            <LinkButton key={path.number} href={path.href} variant="primary" className={`group min-h-[244px] w-full !items-stretch !justify-start !rounded-[18px] !border-0 !bg-gradient-to-br ${path.tone} !p-7 !text-left !text-white shadow-[0_25px_52px_rgba(9,55,120,0.22)] transition-transform hover:-translate-x-2`}>
              <span className="flex w-full flex-col"><span className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70">{path.number} / {path.label}</span><span className="mt-6 text-[31px] font-semibold leading-[1.02] tracking-[-0.045em]">{path.title}</span><span className="mt-3 max-w-md text-sm leading-relaxed text-white/75">{path.description}</span><span className="mt-auto flex items-center justify-between border-t border-white/25 pt-5 text-[13px] font-semibold">{path.action}<b className="text-xl font-normal">↗</b></span></span>
            </LinkButton>
          ))}
        </div>
      </Container>
    </section>
  )
}
