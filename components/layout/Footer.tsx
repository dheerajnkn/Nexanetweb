import Link from 'next/link'
import { footerColumns, site } from '@/content/site'

export function Footer() {
  return (
    <footer className="border-t border-[#24435F] bg-[#061A31] text-white">
      <div className="mx-auto max-w-content px-6 py-16 md:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 text-lg font-semibold tracking-tight text-white">
              <span aria-hidden className="grid h-10 w-10 place-items-center rounded-[11px_4px_11px_4px] bg-gradient-to-br from-[#58DCEF] via-[#2584FF] to-[#625AF2] shadow-[0_10px_28px_rgba(37,132,255,0.35)] ring-1 ring-white/30">
                <span className="text-2xl font-bold tracking-[-0.14em] text-white">N</span>
              </span>
              <span className="grid gap-0.5">
                <span className="leading-none">NexaNet <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">LLC</span></span>
                <span className="font-mono text-[7px] font-medium tracking-[0.12em] text-[#9CC6E8]">IT CONSULTING + WORKFORCE SOLUTIONS</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">{site.description}</p>
            <address className="mt-6 border-l-2 border-signal pl-4 text-sm not-italic leading-relaxed text-white/80">
              <strong className="font-medium text-white">NexaNet LLC</strong><br />
              131 Continental Dr, Suite 305<br />
              Newark, DE 19713
            </address>
          </div>
          {footerColumns.map(column => (
            <div key={column.title}>
              <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#8BAFCF]">{column.title}</div>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-signal">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</span>
          <Link href="/contact" className="text-white/65 hover:text-signal">hr@nexanetllc.com</Link>
        </div>
      </div>
    </footer>
  )
}
