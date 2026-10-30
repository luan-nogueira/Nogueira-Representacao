import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

/** Classic glass milk bottle silhouette (radius, height). */
const BOTTLE_PROFILE: [number, number][] = [
  [0.0, 0.0], [0.6, 0.0], [0.67, 0.03], [0.7, 0.12], [0.7, 1.5], [0.685, 1.68],
  [0.62, 1.86], [0.5, 2.08], [0.38, 2.32], [0.31, 2.52], [0.3, 2.7], [0.33, 2.74],
  [0.335, 2.82], [0.31, 2.86], [0.0, 2.86],
]

const MILK_PROFILE: [number, number][] = [
  [0.0, 0.07], [0.61, 0.07], [0.655, 0.12], [0.655, 1.5], [0.64, 1.67],
  [0.58, 1.85], [0.47, 2.06], [0.4, 2.2], [0.0, 2.2],
]

export function bottleGeometry(segments = 96) {
  const pts = BOTTLE_PROFILE.map(([x, y]) => new THREE.Vector2(x, y))
  const g = new THREE.LatheGeometry(pts, segments)
  g.computeVertexNormals()
  return g
}

export function milkGeometry(segments = 96) {
  const pts = MILK_PROFILE.map(([x, y]) => new THREE.Vector2(x, y))
  const g = new THREE.LatheGeometry(pts, segments)
  g.computeVertexNormals()
  return g
}

/**
 * A liquid "ribbon" of milk: a tube with a flattened, lumpy cross-section that
 * tapers to points at both ends. Indices are laid out along the length so
 * `drawRange` can be used to "pour" it in.
 */
export function ribbonGeometry(
  curve: THREE.Curve<THREE.Vector3>,
  {
    tubular = 260,
    radial = 18,
    radius = 0.12,
    flatten = 0.62,
    lumps = 16,
  }: { tubular?: number; radial?: number; radius?: number; flatten?: number; lumps?: number } = {}
) {
  const frames = curve.computeFrenetFrames(tubular, false)
  const positions: number[] = []
  const uvs: number[] = []
  const indices: number[] = []
  const p = new THREE.Vector3()
  const v = new THREE.Vector3()

  for (let i = 0; i <= tubular; i++) {
    const t = i / tubular
    curve.getPointAt(t, p)
    const N = frames.normals[i]
    const B = frames.binormals[i]
    const taper = Math.pow(Math.sin(Math.PI * t), 0.65)
    const lump = 1 + 0.22 * Math.sin(t * lumps * Math.PI + 1.3) + 0.1 * Math.sin(t * lumps * 2.7)
    const r = radius * taper * lump
    for (let j = 0; j <= radial; j++) {
      const a = (j / radial) * Math.PI * 2
      const cx = Math.cos(a) * r * 1.6
      const cy = Math.sin(a) * r * flatten * 1.6
      v.copy(p).addScaledVector(N, cx).addScaledVector(B, cy)
      positions.push(v.x, v.y, v.z)
      uvs.push(t, j / radial)
    }
  }
  for (let i = 0; i < tubular; i++) {
    for (let j = 0; j < radial; j++) {
      const a = i * (radial + 1) + j
      const b = (i + 1) * (radial + 1) + j
      indices.push(a, b, a + 1, b, b + 1, a + 1)
    }
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  g.setIndex(indices)
  g.computeVertexNormals()
  return g
}

/** Spiral path that wraps around the bottle and flicks outward at the top. */
export function swirlCurve(turns = 1.35, height = 2.7, base = 1.05, phase = 0) {
  const pts: THREE.Vector3[] = []
  const n = 40
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const a = phase + t * turns * Math.PI * 2
    const r = base + 0.35 * Math.sin(t * Math.PI) + (t > 0.8 ? (t - 0.8) * 2.2 : 0)
    const y = 0.25 + t * height + 0.18 * Math.sin(t * Math.PI * 3)
    pts.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r))
  }
  return new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.5)
}

/** Chocolate square piece: a slab with embossed, bevelled squares on top. */
export function chocolateGeometry(cols = 2, rows = 2) {
  const cell = 0.42
  const w = cols * cell
  const d = rows * cell
  const parts: THREE.BufferGeometry[] = []
  const slab = new RoundedBoxGeometry(w, 0.12, d, 3, 0.035)
  parts.push(slab)
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const sq = new RoundedBoxGeometry(cell * 0.82, 0.14, cell * 0.82, 3, 0.05)
      sq.translate(-w / 2 + cell * (c + 0.5), 0.1, -d / 2 + cell * (r + 0.5))
      parts.push(sq)
    }
  }
  const merged = mergeGeometries(parts, false)!
  merged.computeVertexNormals()
  merged.center()
  return merged
}

/** Radial alpha texture for soft glows and feathered image planes. */
export function radialTexture(inner = 0.0, outer = 0.5, ellipse = 1) {
  const s = 256
  const c = document.createElement('canvas')
  c.width = c.height = s
  const ctx = c.getContext('2d')!
  ctx.save()
  ctx.translate(s / 2, s / 2)
  ctx.scale(1, ellipse)
  const g = ctx.createRadialGradient(0, 0, s * inner, 0, 0, s * outer)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.55, 'rgba(255,255,255,0.85)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(-s, -s, s * 2, s * 2)
  ctx.restore()
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.NoColorSpace
  return t
}

/** Rectangular feather mask (soft edges on all four sides, softer at the bottom). */
export function featherTexture(edge = 0.14, bottom = 0.22) {
  const s = 256
  const c = document.createElement('canvas')
  c.width = c.height = s
  const ctx = c.getContext('2d')!
  const img = ctx.createImageData(s, s)
  const sm = (e0: number, e1: number, x: number) => {
    const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)))
    return t * t * (3 - 2 * t)
  }
  for (let y = 0; y < s; y++) {
    for (let x = 0; x < s; x++) {
      const u = x / (s - 1)
      const v = y / (s - 1) // 0 = top of canvas
      const a =
        sm(0, edge, u) * sm(0, edge, 1 - u) * sm(0, edge * 0.8, v) * sm(0, bottom, 1 - v)
      const i = (y * s + x) * 4
      img.data[i] = img.data[i + 1] = img.data[i + 2] = Math.round(a * 255)
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.NoColorSpace
  return t
}
