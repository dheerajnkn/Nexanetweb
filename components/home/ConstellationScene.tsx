'use client'

import { useMemo, useRef } from 'react'
import Link from 'next/link'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Line } from '@react-three/drei'
import * as THREE from 'three'
import { expertiseAreas } from '@/content/expertise'
import { usePrefersReducedMotion } from '@/lib/motion'
import { useWebglSupported } from '@/lib/webgl'

const RADIUS = 2.6

function nodePosition(index: number, total: number): [number, number, number] {
  const angle = (index / total) * Math.PI * 2
  return [Math.cos(angle) * RADIUS, Math.sin(angle) * RADIUS * 0.55, Math.sin(angle * 2) * 0.6]
}

function ConstellationGroup({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null)
  const positions = useMemo(
    () => expertiseAreas.map((area, i) => ({ area, position: nodePosition(i, expertiseAreas.length) })),
    [],
  )

  useFrame((_, delta) => {
    if (!group.current || !animate) return
    group.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={group}>
      {positions.map((node, i) => {
        const next = positions[(i + 1) % positions.length]
        return (
          <Line
            key={`line-${node.area.slug}`}
            points={[new THREE.Vector3(...node.position), new THREE.Vector3(...next.position)]}
            color="#0A3BFF"
            transparent
            opacity={0.18}
            lineWidth={1}
          />
        )
      })}
      {positions.map(node => (
        <group key={node.area.slug} position={node.position}>
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#0A3BFF" />
          </mesh>
          <Html center distanceFactor={8} occlude={false}>
            <Link
              href={`/expertise/${node.area.slug}`}
              className="whitespace-nowrap border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink shadow-sm transition-colors hover:border-signal hover:text-signal"
            >
              {node.area.shortName}
            </Link>
          </Html>
        </group>
      ))}
    </group>
  )
}

export function ConstellationScene() {
  const reducedMotion = usePrefersReducedMotion()
  const webglSupported = useWebglSupported()

  if (!webglSupported) {
    return (
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {expertiseAreas.map(area => (
          <li key={area.slug}>
            <Link
              href={`/expertise/${area.slug}`}
              className="block border border-line px-3 py-2 text-center text-sm font-medium text-ink hover:border-signal hover:text-signal"
            >
              {area.shortName}
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="h-[420px] w-full">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ConstellationGroup animate={!reducedMotion} />
      </Canvas>
    </div>
  )
}
