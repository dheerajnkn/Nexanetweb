import Link from 'next/link'
import { footerColumns, site } from '@/content/site'
import { Logo } from './Header'

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line-dark bg-navy-950">
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-6 left-6 select-none font-display text-[7rem] font-extrabold leading-none text-white/[0.03] md:text-[9rem]"
      >
        Nexanet
      </span>

      <div className="relative mx-auto max-w-content px-6 py-16 md:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-onDark-muted">
              IT consulting and workforce solutions aligned to measurable business outcomes.
            </p>
          </div>
          {footerColumns.map(column => (
            <div key={column.title}>
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-onDark-faint">{column.title}</div>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-onDark-muted transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-onDark-faint">Contact</div>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-onDark-muted">
              <li><a href={`mailto:${site.email}`} className="transition-colors hover:text-white">{site.email}</a></li>
              <li><a href={`tel:${site.phone.replace(/[^0-9+]/g, '')}`} className="transition-colors hover:text-white">{site.phone}</a></li>
              <li>{site.address.line1}<br />{site.address.line2}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line-dark pt-8 text-xs text-onDark-faint md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</span>
          <span>Technology. Talent. Outcomes.</span>
        </div>
      </div>
    </footer>
  )
}
