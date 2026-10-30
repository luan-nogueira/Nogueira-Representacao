// Dev-only: renders original, brand-free 3D posters used as category art.
import ReactDOM from 'react-dom/client'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import { ChocolateField, Droplets, MilkBottle, MilkRibbon, Studio } from '../src/three/Elements'

const s = new URLSearchParams(location.search).get('s') || 'leites'

function Scene() {
  switch (s) {
    case 'leites':
      return (
        <group rotation-y={0.5}>
          <MilkBottle />
          <MilkRibbon phase={0.2} radius={0.13} turns={1.1} duration={0.01} />
          <Droplets count={30} spread={1.6} size={0.05} />
          <ContactShadows opacity={0.7} scale={6} blur={2.4} far={3} frames={1} />
        </group>
      )
    case 'bebidas':
      return (
        <group position={[0, -0.4, 0]}>
          <MilkRibbon phase={0} radius={0.2} turns={1.3} base={0.7} height={3.2} duration={0.01} />
          <MilkRibbon phase={3.1} radius={0.1} turns={1} base={1.1} height={2.8} duration={0.01} tint="#d9b38c" />
          <Droplets count={36} spread={1.4} size={0.06} center={[0, 1.8, 0]} />
          <Droplets count={14} spread={1.4} size={0.06} center={[0, 1.8, 0]} tint="#c99a6b" />
        </group>
      )
    case 'proteicos':
      return (
        <group position={[0, -0.2, 0]}>
          <ChocolateField
            intro={false}
            chunks={[
              { pos: [0, 1.6, 0], rot: [0.7, 0.4, 0.2], scale: 1.4, cols: 3, rows: 2, speed: 0 },
              { pos: [-1.3, 2.6, -0.5], rot: [-0.5, 0.9, 0.6], scale: 0.7, speed: 0 },
              { pos: [1.3, 0.7, 0.4], rot: [1.1, -0.3, 0.3], scale: 0.6, cols: 2, rows: 1, speed: 0 },
              { pos: [1.2, 2.8, -0.8], rot: [0.3, 0.3, 1.1], scale: 0.45, cols: 1, rows: 1, speed: 0 },
            ]}
          />
          <MilkRibbon phase={1.2} radius={0.1} turns={0.9} base={1.2} height={2.6} duration={0.01} />
          <Droplets count={24} spread={1.5} size={0.05} />
        </group>
      )
    default: // derivados
      return (
        <group position={[0, -0.3, 0]}>
          <Droplets count={70} spread={1.2} size={0.08} center={[0, 1.7, 0]} />
          <MilkRibbon phase={0.6} radius={0.17} turns={0.8} base={0.6} height={2.4} duration={0.01} />
          <MilkRibbon phase={2.6} radius={0.12} turns={0.7} base={0.9} height={2.6} duration={0.01} />
          <MilkRibbon phase={4.6} radius={0.09} turns={0.6} base={1.1} height={2.8} duration={0.01} />
        </group>
      )
  }
}

ReactDOM.createRoot(document.getElementById('r')!).render(
  <Canvas
    gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
    dpr={2}
    camera={{ position: [0, 1.8, 8], fov: 32 }}
    onCreated={({ gl, camera }) => {
      gl.toneMapping = THREE.ACESFilmicToneMapping
      camera.lookAt(0, 1.5, 0)
    }}
  >
    <Studio />
    <Scene />
  </Canvas>
)
