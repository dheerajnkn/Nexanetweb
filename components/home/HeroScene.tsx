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
      position: [-0.8 - rand() * 1.1, (rand() - 0.5) * 2.6, (rand() - 0.5) * 1.4],
    })
  }

  for (let i = 0; i < countPerCluster; i++) {
    nodes.push({
      cluster: 'role',
      position: [0.8 + rand() * 1.1, (rand() - 0.5) * 2.6, (rand() - 0.5) * 1.4],
    })
  }

  return nodes
}

function buildConnections(nodes: Node[], perTalentNode: number) {
  const talent = nodes.filter(n => n.cluster === 'talent')
  const roles = nodes.filter(n => n.cluster === 'role')
  const pairs: [THREE.Vector3, THREE.Vector3][] = []

  talent.forEach(t => {
    const sorted = [...roles].sort((a, b) => distance(t, a) - distance(t, b))
    sorted.slice(0, perTalentNode).forEach(r => {
      pairs.push([new THREE.Vector3(...t.position), new THREE.Vector3(...r.position)])
    })
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
  const nodes = useMemo(() => buildNodes(compact ? 5 : 10), [compact])
  const connections = useMemo(() => buildConnections(nodes, 1), [nodes])

  useFrame((state, delta) => {
    if (!group.current || !animate) return
    const targetX = state.pointer.y * 0.12
    const targetY = state.pointer.x * 0.18
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(delta * 2, 1)
    group.current.rotation.y += (targetY + 0.1 - group.current.rotation.y) * Math.min(delta * 2, 1)
  })

  return (
    <group ref={group} position={[2, 0, 0]} scale={0.9}>
      {connections.map((pair, i) => (
        <Line key={i} points={pair} color="#6BD9FF" transparent opacity={0.28} lineWidth={1} />
      ))}
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[node.cluster === 'talent' ? 0.055 : 0.05, 12, 12]} />
          <meshBasicMaterial color={node.cluster === 'talent' ? '#CDEBFF' : '#20BCE6'} />
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
        className="h-full w-full bg-[radial-gradient(circle_at_78%_34%,rgba(32,188,230,0.22),transparent_38%)]"
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
