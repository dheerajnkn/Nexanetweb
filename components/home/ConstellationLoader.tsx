'use client'

import dynamic from 'next/dynamic'

const ConstellationScene = dynamic(() => import('./ConstellationScene').then(mod => mod.ConstellationScene), {
  ssr: false,
  loading: () => <div className="h-[420px] w-full animate-pulse bg-canvas" aria-hidden />,
})

export function ConstellationLoader() {
  return <ConstellationScene />
}
