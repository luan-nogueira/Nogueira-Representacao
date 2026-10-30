import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { ContactShadows, Sparkles } from '@react-three/drei'
import { ChocolateField, Droplets, MilkBottle, MilkRibbon, Studio, type ChunkSpec } from './Elements'
import { featherTexture, radialTexture } from './geometries'

const CHUNKS_DESKTOP: ChunkSpec[] = [
  { pos: [-1.9, 2.9, 0.6], rot: [0.6, 0.3, 0.2], scale: 0.85, speed: 0.9 },
  { pos: [1.7, 3.3, 0.4], rot: [-0.4, 0.8, 0.5], scale: 0.62, cols: 2, rows: 1, speed: 1.2 },
  { pos: [-1.5, 0.75, 1.4], rot: [1.1, 0.2, -0.3], scale: 0.55, speed: 1.1 },
  { pos: [3.3, 0.35, 1.2], rot: [0.2, -0.6, 0.9], scale: 0.7, speed: 0.8 },
  { pos: [-3.2, 1.9, -2.2], rot: [0.9, 1.2, 0.2], scale: 0.7, cols: 3, rows: 2, speed: 0.6 },
  { pos: [3.4, 2.6, -2.6], rot: [0.3, 0.4, 1.2], scale: 0.6, speed: 0.7 },
  { pos: [0.6, 4.0, -1.5], rot: [1.3, 0.2, 0.4], scale: 0.42, cols: 1, rows: 1, speed: 1.4 },
]
const CHUNKS_LITE = CHUNKS_DESKTOP.filter((_, i) => i < 5)

function JarsPlane({ lite }: { lite: boolean }) {
  const tex = useLoader(THREE.TextureLoader, '/assets/jars.webp')
  const alpha = useMemo(() => featherTexture(0.12, 0.2), [])
  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 4
  }, [tex])
  const ref = useRef<THREE.Group>(null)
  const start = useRef<number | null>(null)
  useFrame((s) => {
    const t = s.clock.elapsedTime
    if (start.current === null) start.current = t
    const p = Math.min(1, Math.max(0, (t - start.current - 0.9) / 1.8))
    const e = 1 - Math.pow(1 - p, 3)
    if (ref.current) {
      ref.current.position.z = -2.2 - (1 - e) * 2.2 + Math.sin(t * 0.5) * 0.05
      ;(ref.current.children[0] as THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>).material.opacity = e
    }
  })
  const w = lite ? 3.2 : 3.7
  return (
    <group ref={ref} position={[lite ? 0.9 : 2.05, w / 1.272 / 2 - 0.05, -1.9]}>
      <mesh>
        <planeGeometry args={[w, w / 1.272]} />
        <meshBasicMaterial map={tex} alphaMap={alpha} transparent toneMapped={false} depthWrite={false} fog={false} />
      </mesh>
    </group>
  )
}

function FloorGlow() {
  const tex = useMemo(() => radialTexture(0, 0.5), [])
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0.002, 0]}>
      <planeGeometry args={[7, 7]} />
      <meshBasicMaterial
        map={tex}
        color="#2A4F8F"
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  )
}

/** Mouse + scroll driven rig. Everything sits inside so it moves as one composition. */
function Rig({
  lite,
  children,
  spin,
}: {
  lite: boolean
  children: React.ReactNode
  spin: React.ReactNode
}) {
  const group = useRef<THREE.Group>(null)
  const spinner = useRef<THREE.Group>(null)
  const { camera, size } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const narrow = size.width < 768

  useEffect(() => {
    const on = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', on, { passive: true })
    return () => window.removeEventListener('pointermove', on)
  }, [])

  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    const scroll = Math.min(1.2, window.scrollY / Math.max(1, window.innerHeight))
    const k = 1 - Math.pow(0.001, dt)
    const mx = lite ? Math.sin(t * 0.3) * 0.4 : mouse.current.x
    const my = lite ? 0 : mouse.current.y
    const sp = spinner.current
    if (sp) {
      sp.rotation.y = THREE.MathUtils.lerp(sp.rotation.y, mx * 0.5 + t * 0.12 + scroll * 1.6, k)
      sp.rotation.x = THREE.MathUtils.lerp(sp.rotation.x, my * 0.05, k)
    }
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, mx * 0.08, k)
    const baseX = narrow ? 0 : Math.min(2.3, size.width / 640)
    g.position.x = THREE.MathUtils.lerp(g.position.x, baseX - scroll * 0.6, k)
    g.position.y = THREE.MathUtils.lerp(g.position.y, (narrow ? 0 : -0.1) + scroll * 1.1, k)
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mx * 0.35, k)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, (narrow ? -0.75 : 1.7) - my * 0.2, k)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, (narrow ? 20 : 11.4) - scroll * 1.8, k)
    camera.lookAt(narrow ? 0 : 0.2, narrow ? -0.9 : 1.75, 0)
    const fog = state.scene.fog as THREE.Fog | null
    if (fog) {
      fog.near = camera.position.z - 1.5
      fog.far = camera.position.z + 8
    }
  })

  return (
    <group ref={group}>
      <group ref={spinner} position={[narrow ? 0 : -0.7, 0, 0]}>
        {spin}
      </group>
      {children}
    </group>
  )
}

function Composition({ lite }: { lite: boolean }) {
  return (
    <Rig
      lite={lite}
      spin={
        <>
          <MilkBottle lite={lite} />
          <MilkRibbon lite={lite} phase={0.4} radius={0.15} turns={1.15} />
          <MilkRibbon lite={lite} phase={3.4} turns={0.9} base={1.2} radius={0.085} height={2.3} delay={0.5} />
          <Droplets count={lite ? 22 : 48} spread={2.1} size={0.05} />
        </>
      }
    >
      <Suspense fallback={null}>
        <JarsPlane lite={lite} />
      </Suspense>
      <ChocolateField chunks={lite ? CHUNKS_LITE : CHUNKS_DESKTOP} />
      <FloorGlow />
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.75}
        scale={8}
        blur={2.6}
        far={4}
        resolution={lite ? 256 : 512}
        frames={1}
        color="#000000"
      />
      <Sparkles count={lite ? 30 : 70} scale={[9, 5, 5]} position={[0, 2, -1]} size={2.2} speed={0.25} opacity={0.5} color="#C7A56A" />
    </Rig>
  )
}

export default function HeroScene({ lite, onReady }: { lite: boolean; onReady?: () => void }) {
  const wrap = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  // Stop rendering when the hero is off-screen.
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden="true">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={lite ? [1, 1.5] : [1, 2]}
        gl={{ antialias: !lite, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 1.7, 8.2], fov: 30, near: 0.1, far: 40 }}
        onCreated={({ gl, scene }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.05
          scene.fog = new THREE.Fog('#090909', 9, 18)
          onReady?.()
        }}
      >
        <Studio />
        <Composition lite={lite} />
      </Canvas>
    </div>
  )
}
