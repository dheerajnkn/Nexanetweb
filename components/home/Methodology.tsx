'use client'

import { useEffect, useRef } from 'react'
import { methodology } from '@/content/methodology'
import { Section, SectionHeading } from '@/components/ui/Section'
import { usePrefersReducedMotion } from '@/lib/motion'

export function Methodology() {
  const containerRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return

    let ctx: { revert: () => void } | undefined
    let cancelled = false

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (cancelled || !containerRef.current) return
      gsap.registerPlugin(ScrollTrigger)

      const context = gsap.context(() => {
        const steps = stepRefs.current.filter((el): el is HTMLDivElement => Boolean(el))

        gsap.set(steps, { opacity: 0.35 })

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 0.4,
          onUpdate: self => {
            if (fillRef.current) fillRef.current.style.width = `${self.progress * 100}%`
            const activeIndex = Math.min(steps.length - 1, Math.floor(self.progress * steps.length))
            steps.forEach((el, i) => {
              gsap.to(el, { opacity: i <= activeIndex ? 1 : 0.35, duration: 0.3 })
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
    <Section>
      <SectionHeading
        eyebrow="How we work"
        title="A methodology, not a resume dump"
        description="Every engagement runs through the same five stages — designed to filter for fit before you spend time in interviews."
      />
      <div ref={containerRef} className="relative">
        <div className="relative mb-10 h-px w-full bg-line">
          <div ref={fillRef} className="absolute left-0 top-0 h-px bg-signal" style={{ width: reducedMotion ? '100%' : '0%' }} />
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-6">
          {methodology.map((step, i) => (
            <div key={step.step} ref={el => { stepRefs.current[i] = el }} className="border-t border-line pt-4 md:border-t-0 md:pt-0">
              <div className="font-mono text-xs text-ink-faint">0{step.step}</div>
              <h3 className="mt-3 text-base font-medium text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
