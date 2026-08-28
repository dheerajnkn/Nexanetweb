import { Container } from './Container'
import { Eyebrow } from './Eyebrow'

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-display-md font-medium text-ink">{title}</h1>
          {description && <p className="mt-5 text-lg leading-relaxed text-ink-muted">{description}</p>}
        </div>
      </Container>
    </section>
  )
}
