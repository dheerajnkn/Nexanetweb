import Link from 'next/link'
import { footerColumns, site } from '@/content/site'

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="mx-auto max-w-content px-6 py-16 md:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-ink">
              <span aria-hidden className="inline-block h-2 w-2 bg-signal" />
              NexaNet
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">{site.description}</p>
          </div>
          {footerColumns.map(column => (
            <div key={column.title}>
              <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">{column.title}</div>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-ink-muted transition-colors hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-xs text-ink-faint md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</span>
          <Link href="/contact" className="text-ink-muted hover:text-ink">Contact us</Link>
        </div>
      </div>
    </footer>
  )
}
