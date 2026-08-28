'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { industries } from '@/content/industries'
import { Section, SectionHeading } from '@/components/ui/Section'
import { usePrefersReducedMotion } from '@/lib/motion'

export function Industries() {
  const [active, setActive] = useState(industries[0].slug)
  const reducedMotion = usePrefersReducedMotion()
  const current = industries.find(i => i.slug === active) ?? industries[0]

  return (
    <Section className="bg-canvas">
      <SectionHeading eyebrow="Who we serve" title="Industries we support" />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[280px_1fr]">
        <div role="tablist" aria-label="Industries" className="flex flex-col border border-line">
          {industries.map(industry => (
            <button
              key={industry.slug}
              role="tab"
              aria-selected={active === industry.slug}
              onClick={() => setActive(industry.slug)}
              className={`border-b border-line px-4 py-3 text-left text-sm font-medium last:border-b-0 transition-colors ${
                active === industry.slug ? 'bg-ink text-white' : 'text-ink-muted hover:bg-white'
              }`}
            >
              {industry.name}
            </button>
          ))}
        </div>
        <div role="tabpanel" className="border border-line p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.slug}
              initial={reducedMotion ? undefined : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-lg font-medium text-ink">{current.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{current.summary}</p>
              <ul className="mt-6 flex flex-col gap-2">
                {current.focusAreas.map(area => (
                  <li key={area} className="flex items-start gap-2 text-sm text-ink">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 bg-signal" />
                    {area}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  )
}
