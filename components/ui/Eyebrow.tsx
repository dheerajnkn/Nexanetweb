export function Eyebrow({ children, on = 'light' }: { children: React.ReactNode; on?: 'light' | 'dark' }) {
  const color = on === 'dark' ? 'text-accent-cyan' : 'text-accent-blue'
  return (
    <span className={`inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] ${color}`}>
      <span aria-hidden className={`h-[3px] w-[3px] rounded-full ${on === 'dark' ? 'bg-accent-cyan' : 'bg-accent-blue'}`} />
      {children}
    </span>
  )
}
