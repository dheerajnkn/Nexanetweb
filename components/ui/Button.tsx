import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 rounded-none border px-5 py-3 text-sm font-medium transition-colors duration-200 ease-precise focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary: 'border-ink bg-ink text-white hover:bg-signal hover:border-signal',
  secondary: 'border-line-strong bg-transparent text-ink hover:border-ink',
  ghost: 'border-transparent bg-transparent text-ink-muted hover:text-ink',
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
