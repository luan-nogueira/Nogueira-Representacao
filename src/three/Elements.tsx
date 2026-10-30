import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useLoader } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import {
  bottleGeometry,
  chocolateGeometry,
  milkGeometry,
  ribbonGeometry,
  swirlCurve,
} from './geometries'

/* ---------------------------------------------------------------- materials */

export function useMilkMaterial(tint = '#f8f5ee') {
  return useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: tint,
        roughness: 0.28,
        metalness: 0,
        clearcoat: 0.8,
        clearcoatRoughness: 0.18,
        sheen: 1,
        sheenColor: new THREE.Color('#ffffff'),
        sheenRoughness: 0.5,
        emissive: new THREE.Color('#2a2622'),
        emissiveIntensity: 0.35,
      }),
    [tint]
  )
}

export function useChocolateMaterial() {
  return useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#3d2015',
        roughness: 0.36,
        metalness: 0.02,
        clearcoat: 0.55,
        clearcoatRoughness: 0.22,
        sheen: 0.4,
        sheenColor: new THREE.Color('#8a5232'),
      }),
    []
  )
}

/** Adds a slow liquid wobble to any physical material via onBeforeCompile. */
function withWobble(mat: THREE.MeshPhysicalMaterial, amp = 0.018) {
  const uniforms = { uTime: { value: 0 }, uAmp: { value: amp } }
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = uniforms.uTime
    shader.uniforms.uAmp = uniforms.uAmp
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nuniform float uTime;\nuniform float uAmp;')
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
         float w = sin(position.y * 5.0 + uTime * 1.6) * cos(position.x * 4.0 - uTime * 1.1);
         transformed += normal * w * uAmp;`
      )
  }
  mat.customProgramCacheKey = () => 'wobble'
  return uniforms
}

/* ------------------------------------------------------------------- studio */

export function Studio({ accent = '#2A4F8F' }: { accent?: string }) {
  return (
    <>
      <ambientLight intensity={0.25} />
      <spotLight
        position={[-4, 7, 5]}
        angle={0.45}
        penumbra={0.9}
        intensity={90}
        color="#fff6ea"
        decay={2}
      />
      <directionalLight position={[5, 3, -4]} intensity={2.4} color={accent} />
      <directionalLight position={[-6, 2, -3]} intensity={1.2} color="#C7A56A" />
      <pointLight position={[0, 1.2, 3.5]} intensity={6} color="#ffffff" distance={9} />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3.2} position={[-3, 3, 4]} scale={[3, 5, 1]} />
        <Lightformer form="rect" intensity={2} position={[4, 2, 2]} rotation-y={-Math.PI / 3} scale={[2, 6, 1]} />
        <Lightformer form="rect" intensity={1.6} color={accent} position={[0, 4, -5]} scale={[10, 2, 1]} />
        <Lightformer form="ring" intensity={1.4} position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={3} />
      </Environment>
    </>
  )
}

/* ------------------------------------------------------------------- bottle */

export function MilkBottle({ lite = false }: { lite?: boolean }) {
  const glass = useMemo(() => bottleGeometry(lite ? 48 : 96), [lite])
  const milk = useMemo(() => milkGeometry(lite ? 48 : 96), [lite])
  const milkMat = useMilkMaterial()
  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        roughness: 0.04,
        metalness: 0,
        transmission: lite ? 0 : 1,
        thickness: 0.35,
        ior: 1.5,
        transparent: true,
        opacity: lite ? 0.22 : 1,
        clearcoat: 1,
        clearcoatRoughness: 0.02,
        envMapIntensity: 1.8,
        specularIntensity: 1,
        depthWrite: false,
      }),
    [lite]
  )

  return (
    <group>
      <mesh geometry={milk} material={milkMat} castShadow />
      <mesh geometry={glass} material={glassMat} renderOrder={2} />
      {/* foil cap */}
      <mesh position={[0, 2.88, 0]}>
        <cylinderGeometry args={[0.345, 0.345, 0.2, lite ? 32 : 64]} />
        <meshPhysicalMaterial color="#102B59" metalness={0.75} roughness={0.28} clearcoat={1} />
      </mesh>
      <mesh position={[0, 2.79, 0]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[0.348, 0.012, 12, lite ? 48 : 96]} />
        <meshStandardMaterial color="#C7A56A" metalness={1} roughness={0.25} />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------------- ribbon */

export function MilkRibbon({
  phase = 0,
  turns = 1.35,
  base = 1.05,
  radius = 0.12,
  height = 2.7,
  delay = 0,
  duration = 2.4,
  lite = false,
  tint,
}: {
  phase?: number
  turns?: number
  base?: number
  radius?: number
  height?: number
  delay?: number
  duration?: number
  lite?: boolean
  tint?: string
}) {
  const geo = useMemo(
    () =>
      ribbonGeometry(swirlCurve(turns, height, base, phase), {
        radius,
        tubular: lite ? 140 : 260,
        radial: lite ? 12 : 18,
      }),
    [turns, height, base, phase, radius, lite]
  )
  const mat = useMilkMaterial(tint)
  const uniforms = useMemo(() => withWobble(mat), [mat])
  const start = useRef<number | null>(null)
  const total = geo.index!.count

  useEffect(() => {
    geo.setDrawRange(0, 0)
  }, [geo])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (start.current === null) start.current = t
    uniforms.uTime.value = t
    const p = Math.min(1, Math.max(0, (t - start.current - delay) / duration))
    const eased = 1 - Math.pow(1 - p, 3)
    const count = Math.floor((eased * total) / 6) * 6
    if (geo.drawRange.count !== count) geo.setDrawRange(0, count)
  })

  return <mesh geometry={geo} material={mat} castShadow />
}

/* ---------------------------------------------------------------- chocolate */

export type ChunkSpec = {
  pos: [number, number, number]
  rot: [number, number, number]
  scale: number
  cols?: number
  rows?: number
  speed?: number
}

export function ChocolateField({ chunks, intro = true }: { chunks: ChunkSpec[]; intro?: boolean }) {
  const mat = useChocolateMaterial()
  const geos = useMemo(() => {
    const cache = new Map<string, THREE.BufferGeometry>()
    return chunks.map((c) => {
      const k = `${c.cols ?? 2}x${c.rows ?? 2}`
      if (!cache.has(k)) cache.set(k, chocolateGeometry(c.cols ?? 2, c.rows ?? 2))
      return cache.get(k)!
    })
  }, [chunks])
  const refs = useRef<(THREE.Mesh | null)[]>([])
  const start = useRef<number | null>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (start.current === null) start.current = t
    const local = t - start.current
    chunks.forEach((c, i) => {
      const m = refs.current[i]
      if (!m) return
      const s = c.speed ?? 1
      const p = intro ? Math.min(1, Math.max(0, (local - 0.3 - i * 0.08) / 1.6)) : 1
      const e = 1 - Math.pow(1 - p, 4)
      const fly = (1 - e) * 4
      m.position.set(
        c.pos[0] + Math.sign(c.pos[0] || 1) * fly,
        c.pos[1] + Math.sin(t * 0.6 * s + i) * 0.12 + fly * 0.3,
        c.pos[2]
      )
      m.rotation.set(
        c.rot[0] + t * 0.12 * s,
        c.rot[1] + t * 0.18 * s + (1 - e) * 3,
        c.rot[2] + Math.sin(t * 0.4 + i) * 0.15
      )
      m.scale.setScalar(c.scale * (0.4 + 0.6 * e))
    })
  })

  return (
    <group>
      {chunks.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (refs.current[i] = el)}
          geometry={geos[i]}
          material={mat}
          castShadow
        />
      ))}
    </group>
  )
}

/* ----------------------------------------------------------------- droplets */

export function Droplets({
  count = 50,
  spread = 3,
  center = [0, 1.6, 0] as [number, number, number],
  tint,
  size = 0.05,
}: {
  count?: number
  spread?: number
  center?: [number, number, number]
  tint?: string
  size?: number
}) {
  const mat = useMilkMaterial(tint)
  const ref = useRef<THREE.InstancedMesh>(null)
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const a = Math.random() * Math.PI * 2
        const r = 0.9 + Math.random() * spread
        return {
          a,
          r,
          y: (Math.random() - 0.35) * spread * 0.9,
          s: size * (0.35 + Math.pow(Math.random(), 2) * 1.6),
          sp: 0.05 + Math.random() * 0.12,
          ph: i * 1.7,
        }
      }),
    [count, spread, size]
  )
  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const m = ref.current
    if (!m) return
    seeds.forEach((d, i) => {
      const a = d.a + t * d.sp
      dummy.position.set(
        center[0] + Math.cos(a) * d.r,
        center[1] + d.y + Math.sin(t * 0.8 + d.ph) * 0.12,
        center[2] + Math.sin(a) * d.r * 0.6
      )
      dummy.scale.set(d.s, d.s * 1.18, d.s)
      dummy.rotation.set(0, 0, Math.sin(t + d.ph) * 0.4)
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)
    })
    m.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]} material={mat}>
      <sphereGeometry args={[1, 18, 14]} />
    </instancedMesh>
  )
}

/* ------------------------------------------------------------------- carton */

/**
 * Leite Piracanjuba 1L. The printed faces come straight from the official
 * product photo (perspective-corrected); only the box form is modelled.
 */
export function MilkCarton({ lite = false }: { lite?: boolean }) {
  const [front, side] = useLoader(THREE.TextureLoader, ['/assets/carton-front.webp', '/assets/carton-side.webp'])
  const mats = useMemo(() => {
    for (const t of [front, side]) {
      t.colorSpace = THREE.SRGBColorSpace
      t.anisotropy = 8
    }
    const print = (map?: THREE.Texture, color = '#ffffff') =>
      new THREE.MeshPhysicalMaterial({
        map: map ?? null,
        color,
        roughness: 0.42,
        clearcoat: lite ? 0 : 0.45,
        clearcoatRoughness: 0.3,
      })
    const plain = print(undefined, '#f3f1ee')
    const red = print(undefined, '#d81f26')
    // BoxGeometry face order: +x, -x, +y, -y, +z, -z
    return [plain, print(side), red, plain, print(front), plain]
  }, [front, side, lite])

  const W = 1.12
  const D = 0.74
  const H = 2.62
  return (
    <group>
      <mesh material={mats} position={[0, H / 2, 0]} castShadow>
        <boxGeometry args={[W, H, D]} />
      </mesh>
      {/* sealed top flap */}
      <mesh position={[0, H + 0.03, -D / 2 + 0.02]}>
        <boxGeometry args={[W * 0.98, 0.06, 0.04]} />
        <meshPhysicalMaterial color="#d81f26" roughness={0.45} clearcoat={0.4} />
      </mesh>
      {/* screw cap */}
      <group position={[W * 0.18, H, D * 0.12]}>
        <mesh position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.05, lite ? 24 : 48]} />
          <meshPhysicalMaterial color="#d81f26" roughness={0.4} clearcoat={0.5} />
        </mesh>
        <mesh position={[0, 0.13, 0]}>
          <cylinderGeometry args={[0.16, 0.165, 0.17, lite ? 24 : 48]} />
          <meshPhysicalMaterial color="#fbfbfb" roughness={0.35} clearcoat={0.6} />
        </mesh>
      </group>
    </group>
  )
}
