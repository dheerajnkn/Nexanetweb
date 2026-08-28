import { Container } from './Container'
import { Eyebrow } from './Eyebrow'

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <section className="bg-navy-900 py-20 text-onDark md:py-28">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow on="dark">{eyebrow}</Eyebrow>
          <h1 className="mt-6 font-display text-display-md font-bold text-white">{title}</h1>
          {description && <p className="mt-5 text-lg leading-relaxed text-onDark-muted">{description}</p>}
        </div>
      </Container>
    </section>
  )
}
