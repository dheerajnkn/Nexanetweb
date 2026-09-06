'use client'

import { useState } from 'react'
import { Section } from '@/components/ui/Section'

const principles = [
  {
    number: '01',
    title: 'Business context comes first.',
    copy: 'We start with the outcome, environment, and constraints before introducing people or delivery models.',
    label: 'Discovery',
  },
  {
    number: '02',
    title: 'Clear communication is part of delivery.',
    copy: 'A responsive point of contact, practical updates, and no unnecessary hand-offs from search through ramp-up.',
    label: 'Partnership',
  },
  {
    number: '03',
    title: 'The right fit matters more than volume.',
    copy: 'Technical alignment, collaboration style, and readiness to contribute are evaluated together.',
    label: 'Quality',
  },
]

export function PartnershipCarousel() {
  const [active, setActive] = useState(0)
  const item = principles[active]

  return (
    <Section className="overflow-hidden bg-[#071A3A] text-white">
      <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#52D8E8]">The NexaNet standard</p>
          <h2 className="mt-5 max-w-md text-display-md font-semibold tracking-[-0.05em] text-white">
            Built for partnerships that need to hold up under pressure.
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
            We do not publish invented client endorsements. Instead, this is the operating standard every NexaNet engagement is designed to meet.
          </p>
        </div>

        <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.055] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-10">
          <div aria-hidden className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#20BCE6]/20 blur-3xl" />
          <div className="relative">
            <div className="flex items-start justify-between gap-6">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#52D8E8]">{item.label} / {item.number}</span>
              <span className="text-5xl font-light leading-none text-white/20">“</span>
            </div>
            <h3 className="mt-12 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.04em] text-white md:text-4xl">{item.title}</h3>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70">{item.copy}</p>

            <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-6">
              <div className="flex gap-2">
                {principles.map((principle, index) => (
                  <button
                    key={principle.number}
                    aria-label={`Show ${principle.label} principle`}
                    aria-current={active === index}
                    onClick={() => setActive(index)}
                    className={`h-2 rounded-full transition-all duration-500 ${active === index ? 'w-10 bg-[#52D8E8]' : 'w-2 bg-white/25 hover:bg-white/50'}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setActive((active + principles.length - 1) % principles.length)} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-[#52D8E8] hover:text-white" aria-label="Previous principle">←</button>
                <button onClick={() => setActive((active + 1) % principles.length)} className="grid h-10 w-10 place-items-center rounded-full border border-[#52D8E8]/60 text-[#52D8E8] transition hover:bg-[#52D8E8] hover:text-[#071A3A]" aria-label="Next principle">→</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
