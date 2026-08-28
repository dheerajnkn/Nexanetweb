'use client'

import Link from 'next/link'
import { useState } from 'react'
import { primaryNav } from '@/content/site'
import { LinkButton } from '@/components/ui/Button'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6 md:px-10">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-ink">
          <span aria-hidden className="inline-block h-2 w-2 bg-signal" />
          NexaNet
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map(item => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => item.children && setOpenMenu(item.label)}
              onMouseLeave={() => item.children && setOpenMenu(null)}
            >
              {item.children ? (
                <button
                  className="flex items-center gap-1 px-3 py-2 text-sm text-ink-muted transition-colors hover:text-ink"
                  aria-expanded={openMenu === item.label}
                  onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                >
                  {item.label}
                  <span aria-hidden className="text-[10px]">▾</span>
                </button>
              ) : (
                <Link href={item.href} className="block px-3 py-2 text-sm text-ink-muted transition-colors hover:text-ink">
                  {item.label}
                </Link>
              )}

              {item.children && openMenu === item.label && (
                <div className="absolute left-0 top-full w-72 border border-line bg-white py-2 shadow-[0_16px_40px_rgba(16,17,19,0.08)]">
                  {item.children.map(child => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-3 transition-colors hover:bg-canvas"
                      onClick={() => setOpenMenu(null)}
                    >
                      <div className="text-sm font-medium text-ink">{child.label}</div>
                      <div className="mt-0.5 text-xs text-ink-faint">{child.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LinkButton href="/talent" variant="secondary" className="text-xs">Join Our Network</LinkButton>
          <LinkButton href="/contact" variant="primary" className="text-xs">Find Talent</LinkButton>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center border border-line lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen(v => !v)}
        >
          <span aria-hidden className="font-mono text-sm">{mobileOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {mobileOpen && (
        <div id="mobile-nav" className="border-t border-line bg-white lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col px-6 py-4">
            {primaryNav.map(item => (
              <div key={item.href} className="border-b border-line py-2 last:border-0">
                <Link href={item.href} className="block py-2 text-sm font-medium text-ink" onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
                {item.children && (
                  <div className="flex flex-col pl-3">
                    {item.children.map(child => (
                      <Link key={child.href} href={child.href} className="py-2 text-sm text-ink-muted" onClick={() => setMobileOpen(false)}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 flex flex-col gap-2">
              <LinkButton href="/talent" variant="secondary" className="w-full">Join Our Network</LinkButton>
              <LinkButton href="/contact" variant="primary" className="w-full">Find Talent</LinkButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
