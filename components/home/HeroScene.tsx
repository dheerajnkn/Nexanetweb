'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { mulberry32 } from '@/lib/random'
import { usePrefersReducedMotion } from '@/lib/motion'
import { useIsCompactViewport, useWebglSupported } from '@/lib/webgl'

type Cluster = 'talent' | 'role'
type Node = { position: [number, number, number]; cluster: Cluster }

function buildNodes(countPerCluster: number): Node[] {
  const rand = mulberry32(42)
  const nodes: Node[] = []
  for (let i = 0; i < countPerCluster; i++) {
    nodes.push({
      cluster: 'talent',
      position: [-2.4 - rand() * 1.6, (rand() - 0.5) * 3.2, (rand() - 0.5) * 1.6],
    })
  }
  for (let i = 0; i < countPerCluster; i++) {
    nodes.push({
      cluster: 'role',
      position: [2.4 + rand() * 1.6, (rand() - 0.5) * 3.2, (rand() - 0.5) * 1.6],
    })
  }
  return nodes
}

function buildConnections(nodes: Node[], perTalentNode: number) {
  const talent = nodes.filter(n => n.cluster === 'talent')
  const roles = nodes.filter(n => n.cluster === 'role')
  const pairs: [THREE.Vector3, THREE.Vector3][] = []

  talent.forEach((t, i) => {
    const sorted = [...roles].sort((a, b) => distance(t, a) - distance(t, b))
    sorted.slice(0, perTalentNode).forEach(r => {
      pairs.push([new THREE.Vector3(...t.position), new THREE.Vector3(...r.position)])
    })
    void i
  })
  return pairs
}

function distance(a: Node, b: Node) {
  const [ax, ay, az] = a.position
  const [bx, by, bz] = b.position
  return Math.hypot(ax - bx, ay - by, az - bz)
}

function NetworkGroup({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null)
  const compact = useIsCompactViewport()
  const nodes = useMemo(() => buildNodes(compact ? 8 : 14), [compact])
  const connections = useMemo(() => buildConnections(nodes, compact ? 1 : 2), [nodes, compact])

  useFrame((state, delta) => {
    if (!group.current || !animate) return
    const targetX = state.pointer.y * 0.15
    const targetY = state.pointer.x * 0.25
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(delta * 2, 1)
    group.current.rotation.y += (targetY + 0.15 - group.current.rotation.y) * Math.min(delta * 2, 1)
  })

  return (
    <group ref={group}>
      {connections.map((pair, i) => (
        <Line key={i} points={pair} color="#0A3BFF" transparent opacity={0.12} lineWidth={1} />
      ))}
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[node.cluster === 'talent' ? 0.05 : 0.045, 12, 12]} />
          <meshBasicMaterial color={node.cluster === 'talent' ? '#101113' : '#0A3BFF'} />
        </mesh>
      ))}
    </group>
  )
}

export function HeroScene() {
  const reducedMotion = usePrefersReducedMotion()
  const webglSupported = useWebglSupported()

  if (!webglSupported) {
    return (
      <div
        aria-hidden
        className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,rgba(10,59,255,0.08),transparent_60%)]"
      />
    )
  }

  return (
    <div aria-hidden className="h-full w-full">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 42 }} gl={{ antialias: true, alpha: true }}>
        <NetworkGroup animate={!reducedMotion} />
      </Canvas>
    </div>
  )
}
