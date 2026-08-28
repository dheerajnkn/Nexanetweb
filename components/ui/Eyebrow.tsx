export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">
      <span aria-hidden className="h-[3px] w-[3px] rounded-full bg-signal" />
      {children}
    </span>
  )
}
