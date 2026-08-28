'use client'

import { useEffect, useState } from 'react'

export function useWebglSupported(): boolean {
  const [supported, setSupported] = useState(false)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setSupported(Boolean(gl))
    } catch {
      setSupported(false)
    }
  }, [])

  return supported
}

export function useIsCompactViewport(breakpointPx = 768): boolean {
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${breakpointPx}px)`)
    setCompact(query.matches)
    const listener = (event: MediaQueryListEvent) => setCompact(event.matches)
    query.addEventListener('change', listener)
    return () => query.removeEventListener('change', listener)
  }, [breakpointPx])

  return compact
}
