import { Section } from '@/components/ui/Section'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { aboutStats } from '@/content/home'

export function AboutTeaser() {
  return (
    <Section tone="light" id="about">
      <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-[380px_1fr]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 via-accent-blue to-accent-cyan">
          <div aria-hidden className="absolute inset-0">
            <div className="absolute inset-0 rounded-full border border-white/15" style={{ margin: '18%' }} />
            <div className="absolute inset-0 rounded-full border border-white/10" style={{ margin: '30%', transform: 'rotate(20deg)' }} />
          </div>
          <span className="absolute inset-0 flex items-center justify-center font-display text-[7rem] font-extrabold text-white">N</span>
        </div>

        <div>
          <Eyebrow>About NexaNet</Eyebrow>
          <h2 className="mt-5 font-display text-display-sm font-bold text-ink">
            Technology partnerships built around contribution — not headcount.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-muted">
            NexaNet LLC is a US-based IT consulting and workforce solutions company delivering high-quality technology
            talent and project support to businesses nationwide.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Our team brings experience across software development, data analytics, cybersecurity, cloud platforms,
            and enterprise applications. We operate as an extension of client teams — prioritizing responsiveness,
            accountability, and long-term success in every engagement.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-6 border-t border-line pt-8">
            {aboutStats.map(stat => (
              <div key={stat.label}>
                <div className="text-sm font-semibold text-ink">{stat.label}</div>
                <div className="mt-1 text-xs text-ink-faint">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
