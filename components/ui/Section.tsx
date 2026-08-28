import type { ReactNode } from 'react'
import { Container } from './Container'
import { Eyebrow } from './Eyebrow'

export function Section({
  children,
  className = '',
  tone = 'light',
  id,
}: {
  children: ReactNode
  className?: string
  tone?: 'light' | 'dark' | 'canvas'
  id?: string
}) {
  const toneClasses = {
    light: 'bg-surface text-ink',
    canvas: 'bg-canvas text-ink',
    dark: 'bg-navy-900 text-onDark',
  }[tone]

  return (
    <section id={id} className={`py-20 md:py-28 ${toneClasses} ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
}: {
  eyebrow: string
  title: ReactNode
  description?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
}) {
  return (
    <div className={`mb-14 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <div className="mb-5"><Eyebrow on={tone}>{eyebrow}</Eyebrow></div>
      <h2 className={`font-display text-display-sm font-bold ${tone === 'dark' ? 'text-white' : 'text-ink'}`}>{title}</h2>
      {description && <p className={`mt-4 text-base leading-relaxed ${tone === 'dark' ? 'text-onDark-muted' : 'text-ink-muted'}`}>{description}</p>}
    </div>
  )
}
