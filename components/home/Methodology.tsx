'use client'

import { useEffect, useRef } from 'react'
import { methodology } from '@/content/methodology'
import { Section } from '@/components/ui/Section'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { usePrefersReducedMotion } from '@/lib/motion'

export function Methodology() {
  const containerRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([])
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return

    let ctx: { revert: () => void } | undefined
    let cancelled = false

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (cancelled || !containerRef.current) return
      gsap.registerPlugin(ScrollTrigger)

      const context = gsap.context(() => {
        const dots = dotRefs.current.filter((el): el is HTMLSpanElement => Boolean(el))

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 45%',
          scrub: 0.4,
          onUpdate: self => {
            if (fillRef.current) fillRef.current.style.width = `${self.progress * 100}%`
            const activeIndex = Math.min(dots.length - 1, Math.floor(self.progress * dots.length))
            dots.forEach((el, i) => {
              el.classList.toggle('bg-accent-blue', i <= activeIndex)
              el.classList.toggle('border-accent-blue', i <= activeIndex)
              el.classList.toggle('bg-surface', i > activeIndex)
            })
          },
        })
      }, containerRef)

      ctx = context
    })

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [reducedMotion])

  return (
    <Section id="how-we-engage" tone="canvas">
      <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-end">
        <div>
          <Eyebrow>How we engage</Eyebrow>
          <h2 className="mt-5 font-display text-display-sm font-bold text-ink">Clear from need to impact.</h2>
        </div>
        <p className="text-base leading-relaxed text-ink-muted md:justify-self-end md:text-right">
          A simple, accountable process that keeps business context and technical fit connected at every step.
        </p>
      </div>

      <div ref={containerRef}>
        <div className="relative mb-10 h-px w-full bg-line">
          <div ref={fillRef} className="absolute left-0 top-0 h-px bg-accent-blue" style={{ width: reducedMotion ? '100%' : '0%' }} />
          <div className="absolute inset-x-0 top-0 flex -translate-y-1/2 justify-between">
            {methodology.map((step, i) => (
              <span
                key={step.step}
                ref={el => { dotRefs.current[i] = el }}
                className={`h-2.5 w-2.5 rounded-full border-2 ${reducedMotion ? 'border-accent-blue bg-accent-blue' : 'border-line-strong bg-surface'}`}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {methodology.map(step => (
            <div key={step.step}>
              <span className="font-mono text-xs text-accent-blue">0{step.step}</span>
              <h3 className="mt-3 text-base font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
