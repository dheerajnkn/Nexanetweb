'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { primaryNav } from '@/content/site'
import { LinkButton } from '@/components/ui/Button'

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-mark font-display text-base font-extrabold text-navy-950 shadow-[0_4px_16px_rgba(52,225,234,0.35)]"
      >
        N
      </span>
      <span className="flex items-baseline gap-1.5 font-display text-lg font-bold text-white">
        NexaNet
        <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-onDark-faint">LLC</span>
      </span>
    </Link>
  )
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-navy-950/95 backdrop-blur transition-colors ${
        scrolled ? 'border-line-dark' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-content items-center justify-between px-6 md:px-10">
        <Logo />

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
                  className="flex items-center gap-1 px-3 py-2 text-sm text-onDark-muted transition-colors hover:text-white"
                  aria-expanded={openMenu === item.label}
                  onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                >
                  {item.label}
                  <span aria-hidden className="text-[10px]">▾</span>
                </button>
              ) : (
                <Link href={item.href} className="block px-3 py-2 text-sm text-onDark-muted transition-colors hover:text-white">
                  {item.label}
                </Link>
              )}

              {item.children && openMenu === item.label && (
                <div className="absolute left-0 top-full w-72 rounded-xl border border-line-dark bg-navy-800 py-2 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                  {item.children.map(child => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-3 transition-colors hover:bg-white/5"
                      onClick={() => setOpenMenu(null)}
                    >
                      <div className="text-sm font-medium text-white">{child.label}</div>
                      <div className="mt-0.5 text-xs text-onDark-faint">{child.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:block">
          <LinkButton href="/contact" variant="outline-dark" className="text-xs">Contact</LinkButton>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-line-dark text-white lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen(v => !v)}
        >
          <span aria-hidden className="font-mono text-sm">{mobileOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {mobileOpen && (
        <div id="mobile-nav" className="border-t border-line-dark bg-navy-950 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col px-6 py-4">
            {primaryNav.map(item => (
              <div key={item.href} className="border-b border-line-dark py-2 last:border-0">
                <Link href={item.href} className="block py-2 text-sm font-medium text-white" onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
                {item.children && (
                  <div className="flex flex-col pl-3">
                    {item.children.map(child => (
                      <Link key={child.href} href={child.href} className="py-2 text-sm text-onDark-muted" onClick={() => setMobileOpen(false)}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4">
              <LinkButton href="/contact" variant="primary" className="w-full">Contact</LinkButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
