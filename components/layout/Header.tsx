'use client'

import Link from 'next/link'
import { useState } from 'react'
import { primaryNav } from '@/content/site'
import { LinkButton } from '@/components/ui/Button'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 border-b border-[#24435F] bg-[#061A31]/95 text-white backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-content items-center justify-between px-6 md:px-10">
        <Link href="/" className="flex items-center gap-2.5 text-white">
          <span aria-hidden className="grid h-8 w-8 place-items-center rounded-[8px_3px_8px_3px] bg-gradient-to-br from-[#5FE1F3] via-[#2688F7] to-[#6058EB] shadow-[0_8px_20px_rgba(37,132,255,0.3)] ring-1 ring-white/25">
            <span className="text-xl font-bold tracking-[-0.14em] text-white">N</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="text-[19px] font-semibold leading-none tracking-[-0.055em]">NexaNet</span>
            <span className="border-l border-white/20 pl-2 font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-[#A8CBEB]">LLC</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-2 lg:flex">
          {primaryNav.map(item => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => item.children && setOpenMenu(item.label)}
              onMouseLeave={() => item.children && setOpenMenu(null)}
            >
              {item.children ? (
                <button
                  className="flex items-center gap-1 px-3 py-2 text-sm text-white/70 transition-colors hover:text-white"
                  aria-expanded={openMenu === item.label}
                  onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                >
                  {item.label}
                  <span aria-hidden className="text-[10px]">▾</span>
                </button>
              ) : (
                <Link href={item.href} className="block px-3 py-2 text-sm text-white/70 transition-colors hover:text-white">
                  {item.label}
                </Link>
              )}

              {item.children && openMenu === item.label && (
                <div className="absolute left-0 top-full w-72 border border-[#2E5275] bg-[#09223D] py-2 shadow-[0_16px_40px_rgba(0,0,0,0.25)]">
                  {item.children.map(child => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-3 transition-colors hover:bg-white/10"
                      onClick={() => setOpenMenu(null)}
                    >
                      <div className="text-sm font-medium text-white">{child.label}</div>
                      <div className="mt-0.5 text-xs text-white/55">{child.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LinkButton href="/talent" variant="secondary" className="border-[#4A7097] !text-white hover:border-signal">Join Our Network</LinkButton>
          <LinkButton href="/contact" variant="primary" className="border-signal bg-signal !text-[#061A31] hover:border-white hover:bg-white">Find Talent</LinkButton>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center border border-[#4A7097] text-white lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen(v => !v)}
        >
          <span aria-hidden className="font-mono text-sm">{mobileOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {mobileOpen && (
        <div id="mobile-nav" className="border-t border-[#24435F] bg-[#09223D] lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col px-6 py-4">
            {primaryNav.map(item => (
              <div key={item.href} className="border-b border-white/10 py-2 last:border-0">
                <Link href={item.href} className="block py-2 text-sm font-medium text-white" onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
                {item.children && (
                  <div className="flex flex-col pl-3">
                    {item.children.map(child => (
                      <Link key={child.href} href={child.href} className="py-2 text-sm text-white/65" onClick={() => setMobileOpen(false)}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 flex flex-col gap-2">
              <LinkButton href="/talent" variant="secondary" className="w-full border-[#4A7097] !text-white">Join Our Network</LinkButton>
              <LinkButton href="/contact" variant="primary" className="w-full border-signal bg-signal !text-[#061A31]">Find Talent</LinkButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
