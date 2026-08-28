import type { ReactNode } from 'react'
import { Container } from './Container'
import { Eyebrow } from './Eyebrow'

export function Section({
  children,
  className = '',
  border = true,
  id,
}: {
  children: ReactNode
  className?: string
  border?: boolean
  id?: string
}) {
  return (
    <section id={id} className={`py-20 md:py-28 ${border ? 'border-t border-line' : ''} ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow: string
  title: ReactNode
  description?: string
  align?: 'left' | 'center'
}) {
  return (
    <div className={`mb-12 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <div className="mb-4"><Eyebrow>{eyebrow}</Eyebrow></div>
      <h2 className="text-display-sm font-medium text-ink">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-ink-muted">{description}</p>}
    </div>
  )
}
