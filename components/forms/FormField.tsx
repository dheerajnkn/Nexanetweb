import type { ReactNode } from 'react'

export function FormField({
  label,
  htmlFor,
  error,
  children,
  required,
}: {
  label: string
  htmlFor: string
  error?: string
  children: ReactNode
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
        {required && <span aria-hidden className="text-accent-blue"> *</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export const inputClass =
  'w-full border border-line bg-white px-4 py-3 text-sm text-ink outline-none focus-visible:border-accent-blue'
