import Link from 'next/link'
import { services } from '@/content/services'
import { Section, SectionHeading } from '@/components/ui/Section'

export function Services() {
  return (
    <Section className="bg-[#F5F9FD]">
      <SectionHeading
        eyebrow="What we do"
        title="Three ways to build your team"
        description="Match the engagement model to how you actually need to scale — not a one-size-fits-all staffing pitch."
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {services.map((service, index) => (
          <Link
            key={service.slug}
            href={`/${service.slug}`}
            className="group relative flex min-h-[340px] flex-col overflow-hidden rounded-[1.5rem] border border-[#D6E3ED] bg-white p-8 shadow-[0_14px_32px_rgba(15,52,91,0.06)] transition-all duration-500 ease-precise hover:-translate-y-2 hover:border-[#20BCE6]/50 hover:shadow-[0_28px_55px_rgba(15,80,135,0.14)]"
          >
            <div aria-hidden className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#20BCE6]/0 blur-3xl transition-all duration-500 group-hover:bg-[#20BCE6]/15" />
            <div className="relative flex items-center justify-between">
              <div className="font-mono text-xs tracking-[0.14em] text-[#5680A5]">0{index + 1}</div>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-[#BCD3E7] text-lg text-[#1A83B5] transition-all duration-500 group-hover:border-[#20BCE6] group-hover:bg-[#20BCE6] group-hover:text-[#071A3A]">↗</span>
            </div>
            <h3 className="relative mt-14 text-2xl font-semibold tracking-[-0.04em] text-[#0A1D35]">{service.name}</h3>
            <p className="relative mt-4 text-sm leading-relaxed text-ink-muted">{service.summary}</p>
            <span className="relative mt-auto border-t border-[#E1EBF3] pt-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#1687B7]">
              Explore engagement
            </span>
          </Link>
        ))}
      </div>
    </Section>
  )
}
