import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { ChocolateField, Droplets, Studio, type ChunkSpec } from './Elements'

const CHUNKS: ChunkSpec[] = [
  { pos: [-3.6, 2.2, 0.5], rot: [0.5, 0.4, 0.3], scale: 1.0, speed: 0.8 },
  { pos: [3.7, 2.9, 0.2], rot: [-0.3, 0.9, 0.6], scale: 0.75, cols: 2, rows: 1, speed: 1.1 },
  { pos: [-3.1, -0.2, 1.4], rot: [1.0, 0.1, -0.4], scale: 0.7, speed: 1 },
  { pos: [3.2, 0.1, 1.6], rot: [0.2, -0.5, 1.0], scale: 0.9, cols: 3, rows: 2, speed: 0.7 },
  { pos: [-1.8, 4.0, -1.2], rot: [1.3, 0.3, 0.4], scale: 0.45, cols: 1, rows: 1, speed: 1.3 },
  { pos: [2.0, -1.1, 0.8], rot: [0.6, 1.2, 0.2], scale: 0.5, cols: 1, rows: 1, speed: 1.2 },
]

function Rig({ lite }: { lite: boolean }) {
  const g = useRef<THREE.Group>(null)
  useFrame((s, dt) => {
    if (!g.current) return
    const k = 1 - Math.pow(0.002, dt)
    g.current.rotation.y = THREE.MathUtils.lerp(g.current.rotation.y, s.pointer.x * 0.15, k)
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, -s.pointer.y * 0.06, k)
  })
  return (
    <group ref={g}>
      <ChocolateField chunks={lite ? CHUNKS.slice(0, 4) : CHUNKS} />
      <Droplets count={lite ? 10 : 22} spread={0.9} center={[-4, 1.6, 0.5]} size={0.06} />
      <Droplets count={lite ? 10 : 22} spread={0.9} center={[4.1, 1.2, 0.5]} size={0.06} />
    </group>
  )
}

export default function WheyScene({ flavor, lite }: { flavor: 'all' | 'choc' | 'milk'; lite: boolean }) {
  const wrap = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    io.observe(wrap.current!)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={wrap} className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={lite ? [1, 1.5] : [1, 2]}
        gl={{ alpha: true, antialias: !lite }}
        camera={{ position: [0, 1.4, 11], fov: 34 }}
        eventSource={typeof document !== 'undefined' ? document.body : undefined}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
        }}
      >
        <Studio accent={flavor === 'choc' ? '#8a5a3c' : '#2A4F8F'} />
        <Rig lite={lite} />
      </Canvas>
    </div>
  )
}
