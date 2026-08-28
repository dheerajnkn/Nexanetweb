import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'outline-dark' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 ease-precise focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary: 'bg-gradient-cta text-white shadow-[0_8px_24px_rgba(47,111,237,0.35)] hover:brightness-110 hover:-translate-y-0.5',
  outline: 'border border-line-strong bg-transparent text-ink hover:border-accent-blue hover:text-accent-blue',
  'outline-dark': 'border border-white/25 bg-transparent text-white hover:border-white/60',
  ghost: 'bg-transparent text-onDark-muted hover:text-white',
}

export function LinkButton({ href, children, variant = 'primary', className = '' }: { href: string; children: ReactNode; variant?: Variant; className?: string }) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  )
}

export function Button({ children, variant = 'primary', className = '', ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}
