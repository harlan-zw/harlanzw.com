<script setup lang="ts">
import { useDevicePixelRatio, useElementSize, usePreferredReducedMotion, useRafFn } from '@vueuse/core'

definePageMeta({ layout: 'experimental' })
useSeoMeta({
  title: 'Medial Sphere Experiment',
  description: 'An interactive 3D curve that untangles into the Nuxt mountain.',
})
useHead({ meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

interface Vec3 { x: number, y: number, z: number }

let randomState = 0x2F6E2B1
function random() {
  randomState = (Math.imul(1664525, randomState) + 1013904223) >>> 0
  return randomState / 0x100000000
}

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')
const wrap = useTemplateRef<HTMLDivElement>('wrap')
const { width, height } = useElementSize(wrap)
const { pixelRatio } = useDevicePixelRatio()
const preferredMotion = usePreferredReducedMotion()

const N = 220
const points = ref<Vec3[]>([])
const targets = ref<Vec3[]>([])
const restLen = ref(0)
const running = ref(true)
const showSpheres = ref(false)
const morph = ref(0) // 0..1 attractor weight ramp
const morphing = ref(false) // user-controlled: only ramp when true
const tangleStyle = ref<'nightmare' | 'trefoil' | 'figure8' | 'spaghetti'>('nightmare')
const iter = ref(0)
let medial: number[] = []
let yaw = 0
let pitch = -0.15
let yawVel = 0.006 // auto-rotate when not dragging
// mouse interaction state
const mouse = { x: 0, y: 0, inside: false, dragging: false, lastX: 0, lastY: 0, startX: 0, startY: 0 }
let zoom = 1
// per-vertex velocity for bouncy momentum
let vel: { x: number, y: number, z: number }[] = []
// thread-grab state
let grabbedIdx = -1
let grabZ2 = 0 // camera-frame depth captured at grab time
// particles flow along arc-length parameter u in [0,1)
const particles: { u: number, speed: number, life: number }[] = []
for (let i = 0; i < 40; i++) {
  particles.push({ u: random(), speed: 0.0008 + random() * 0.0014, life: random() })
}
// background starfield — random points on a sphere, rotated with the camera
interface Star { x: number, y: number, z: number, b: number }
const stars: Star[] = []
for (let i = 0; i < 110; i++) {
  // uniform on sphere
  const u = random() * 2 - 1
  const theta = random() * Math.PI * 2
  const r = 1500
  const sR = Math.sqrt(1 - u * u) * r
  stars.push({ x: Math.cos(theta) * sR, y: u * r, z: Math.sin(theta) * sR, b: 0.2 + random() * 0.8 })
}
// confetti shrapnel for morph-completion burst
interface Spark { x: number, y: number, z: number, vx: number, vy: number, vz: number, life: number, hue: number }
const sparks: Spark[] = []
let lastMorph = 0
function emitBurst(targets: Vec3[]) {
  for (let i = 0; i < 120; i++) {
    const t = targets[Math.floor(random() * targets.length)]!
    const a = random() * Math.PI * 2
    const b = random() * Math.PI - Math.PI / 2
    const sp = 4 + random() * 8
    sparks.push({
      x: t.x,
      y: t.y,
      z: t.z,
      vx: Math.cos(a) * Math.cos(b) * sp,
      vy: Math.sin(b) * sp,
      vz: Math.sin(a) * Math.cos(b) * sp,
      life: 1,
      hue: 130 + random() * 60,
    })
  }
}

// --- Nuxt mountain mark, normalized roughly to [-1,1] ---
// outer triangle with inner notch silhouette as a closed polyline
// Nuxt mountain: two-peak silhouette as a single closed curve
const NUXT_OUTLINE: { x: number, y: number }[] = [
  { x: -1.00, y: -0.55 },
  { x: -0.10, y: 0.75 },
  { x: 0.22, y: 0.18 },
  { x: 0.55, y: 0.55 },
  { x: 1.00, y: -0.55 },
]

function buildTargets(scale: number): Vec3[] {
  // resample Nuxt outline to N points by arc length
  const segs: number[] = []
  let total = 0
  for (let i = 0; i < NUXT_OUTLINE.length; i++) {
    const a = NUXT_OUTLINE[i]!
    const b = NUXT_OUTLINE[(i + 1) % NUXT_OUTLINE.length]!
    const d = Math.hypot(b.x - a.x, b.y - a.y)
    segs.push(d)
    total += d
  }
  const out: Vec3[] = []
  let segi = 0
  let segAcc = 0
  for (let i = 0; i < N; i++) {
    const t = (i / N) * total
    while (segi < segs.length - 1 && segAcc + segs[segi]! < t) {
      segAcc += segs[segi]!
      segi++
    }
    const u = (t - segAcc) / (segs[segi] || 1)
    const a = NUXT_OUTLINE[segi]!
    const b = NUXT_OUTLINE[(segi + 1) % NUXT_OUTLINE.length]!
    out.push({
      x: scale * (a.x + (b.x - a.x) * u),
      y: scale * (a.y + (b.y - a.y) * u),
      z: 0,
    })
  }
  return out
}

function trefoil(scale: number): Vec3[] {
  const r = scale * 0.9
  const pts: Vec3[] = []
  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2
    pts.push({
      x: r * (Math.sin(t) + 2 * Math.sin(2 * t)),
      y: r * (Math.cos(t) - 2 * Math.cos(2 * t)),
      z: r * -Math.sin(3 * t),
    })
  }
  // shrink to fit
  return pts.map(p => ({ x: p.x * 0.45, y: p.y * 0.45, z: p.z * 0.45 }))
}

function figure8(scale: number): Vec3[] {
  const r = scale
  const pts: Vec3[] = []
  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2
    pts.push({
      x: r * (2 + Math.cos(2 * t)) * Math.cos(3 * t) * 0.4,
      y: r * (2 + Math.cos(2 * t)) * Math.sin(3 * t) * 0.4,
      z: r * Math.sin(4 * t) * 0.5,
    })
  }
  return pts
}

function spaghetti(base: Vec3[], scale: number): Vec3[] {
  // random walk that loosely tracks the outline — looks like a thrown noodle
  const pts: Vec3[] = []
  const r = scale
  const seed = random() * 1000
  let dx = 0
  let dy = 0
  let dz = 0
  let px = base[0]!.x
  let py = base[0]!.y
  let pz = 0
  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2
    dx = dx * 0.9 + (random() - 0.5) * 0.5 * r * 0.15
    dy = dy * 0.9 + (random() - 0.5) * 0.5 * r * 0.15
    dz = dz * 0.9 + Math.cos(t * 3 + seed) * 0.1 * r + (random() - 0.5) * 0.1 * r
    px += dx
    py += dy
    pz += dz
    // gentle pull back toward outline so it doesn't wander away
    const b = base[i]!
    px += (b.x - px) * 0.04
    py += (b.y - py) * 0.04
    pz += (0 - pz) * 0.04
    pts.push({ x: px, y: py, z: pz })
  }
  return pts
}

function tangleByStyle(base: Vec3[], scale: number): Vec3[] {
  switch (tangleStyle.value) {
    case 'trefoil': return trefoil(scale)
    case 'figure8': return figure8(scale)
    case 'spaghetti': return spaghetti(base, scale)
    default: return nightmareTangle(base, scale)
  }
}

function nightmareTangle(base: Vec3[], scale: number): Vec3[] {
  // chaotic 3D walk seeded around the Nuxt outline. Layered harmonics with
  // very high frequencies stacked on top of each other create a dense rats-nest
  // of self-crossings.
  const pts: Vec3[] = []
  const seed = random() * 1000
  const r = scale
  for (let i = 0; i < N; i++) {
    const b = base[i]!
    const t = (i / N) * Math.PI * 2
    // many stacked harmonics with mild 1/k^0.7 falloff → very high crossing
    // density while staying bounded enough to fit on screen
    const tw = 0.85 * r
    const tz = 1.1 * r
    const HX = [11, 19, 29, 47, 67, 89, 113, 151]
    const HY = [9, 17, 27, 41, 59, 79, 101, 137]
    const HZ = [7, 13, 23, 37, 53, 73, 97, 127]
    let x = b.x
    let y = b.y
    let z = 0
    for (let k = 0; k < HX.length; k++) {
      const a = 1 / (k + 1) ** 0.7
      x += tw * a * Math.sin(t * HX[k]! + seed * (k + 1))
      y += tw * a * Math.cos(t * HY[k]! + seed * (k + 0.5))
      z += tz * a * Math.sin(t * HZ[k]! + seed * (k + 1.3))
    }
    x += (random() - 0.5) * 0.22 * r
    y += (random() - 0.5) * 0.22 * r
    z += (random() - 0.5) * 0.25 * r
    pts.push({ x, y, z })
  }
  return pts
}

function tangle() {
  const scale = 220
  if (!targets.value.length)
    targets.value = buildTargets(scale * 1.4)
  points.value = tangleByStyle(targets.value, scale)
  for (let i = 0; i < points.value.length; i++) {
    if (vel[i]) {
      vel[i]!.x = (random() - 0.5) * 8
      vel[i]!.y = (random() - 0.5) * 8
      vel[i]!.z = (random() - 0.5) * 8
    }
  }
  morph.value = 0
  lastMorph = 0
  morphing.value = false
}

function reset() {
  const scale = 220
  targets.value = buildTargets(scale * 1.4)
  points.value = tangleByStyle(targets.value, scale)
  let L = 0
  for (let i = 0; i < N; i++) {
    const a = points.value[i]!
    const b = points.value[(i + 1) % N]!
    L += Math.hypot(b.x - a.x, b.y - a.y, ...[b.z - a.z])
  }
  restLen.value = L / N * 0.4
  medial = new Array(N).fill(restLen.value * 4)
  vel = Array.from({ length: N }, () => ({ x: 0, y: 0, z: 0 }))
  iter.value = 0
  morph.value = 0
  lastMorph = 0
  grabbedIdx = -1
}

// inverse-project a screen point back to world coords, holding the camera-frame
// depth z2 fixed (so the dragged vertex follows the mouse on its current depth slice)
function unproject(sx: number, sy: number, w: number, h: number, z2: number) {
  const cy = Math.cos(yaw)
  const sy_ = Math.sin(yaw)
  const cp = Math.cos(pitch)
  const sp = Math.sin(pitch)
  const persp = (700 * zoom) / Math.max(60, 700 + z2)
  const x1 = (sx - w / 2) / persp
  const y2 = (h / 2 - sy) / persp
  const z1 = z2 * cp - sp * y2
  const Y = y2 * cp + z2 * sp
  const X = x1 * cy - z1 * sy_
  const Z = x1 * sy_ + z1 * cy
  return { X, Y, Z }
}

function addForce(buffer: Float64Array, index: number, value: number) {
  buffer[index] = (buffer[index] ?? 0) + value
}

function step() {
  const pts = points.value
  const tgt = targets.value
  const n = pts.length
  const L = restLen.value
  const fx = new Float64Array(n)
  const fy = new Float64Array(n)
  const fz = new Float64Array(n)

  // medial radius (3D)
  const skip = 8
  for (let i = 0; i < n; i++) {
    let minD = Infinity
    const a = pts[i]!
    for (let j = 0; j < n; j++) {
      const d = Math.min((j - i + n) % n, (i - j + n) % n)
      if (d <= skip)
        continue
      const b = pts[j]!
      const dx = b.x - a.x
      const dy = b.y - a.y
      const dz = b.z - a.z
      const r = Math.hypot(dx, dy, dz)
      if (r < minD)
        minD = r
    }
    medial[i] = minD
  }

  // springs
  const ks = 0.7
  for (let i = 0; i < n; i++) {
    const a = pts[i]!
    const b = pts[(i + 1) % n]!
    const dx = b.x - a.x
    const dy = b.y - a.y
    const dz = b.z - a.z
    const r = Math.hypot(dx, dy, dz) || 1e-6
    const f = ks * (r - L) / r
    addForce(fx, i, f * dx)
    addForce(fy, i, f * dy)
    addForce(fz, i, f * dz)
    addForce(fx, (i + 1) % n, -f * dx)
    addForce(fy, (i + 1) % n, -f * dy)
    addForce(fz, (i + 1) % n, -f * dz)
  }

  // bending
  const kb = 0.22
  for (let i = 0; i < n; i++) {
    const a = pts[(i - 1 + n) % n]!
    const b = pts[i]!
    const c = pts[(i + 1) % n]!
    addForce(fx, i, kb * ((a.x + c.x) * 0.5 - b.x))
    addForce(fy, i, kb * ((a.y + c.y) * 0.5 - b.y))
    addForce(fz, i, kb * ((a.z + c.z) * 0.5 - b.z))
  }

  // repulsion (medial-bounded)
  const kr = 140
  for (let i = 0; i < n; i++) {
    const a = pts[i]!
    for (let j = i + skip + 1; j < n; j++) {
      if ((n - j + i) <= skip)
        continue
      const b = pts[j]!
      const dx = a.x - b.x
      const dy = a.y - b.y
      const dz = a.z - b.z
      const r2 = dx * dx + dy * dy + dz * dz
      const r = Math.sqrt(r2) || 1e-6
      if (r > L * 10)
        continue
      const f = kr / (r2 + 1)
      addForce(fx, i, f * dx / r)
      addForce(fy, i, f * dy / r)
      addForce(fz, i, f * dz / r)
      addForce(fx, j, -f * dx / r)
      addForce(fy, j, -f * dy / r)
      addForce(fz, j, -f * dz / r)
    }
  }

  // target attractor (Nuxt outline) — only ramps when user toggles "Untangle".
  // Freeze morph while pulling the thread so dragging is free.
  if (morphing.value && grabbedIdx < 0) {
    morph.value = Math.min(1, morph.value + 0.004)
  }
  if (lastMorph < 1 && morph.value >= 1)
    emitBurst(tgt)
  lastMorph = morph.value
  const ka = grabbedIdx >= 0 ? 0 : 0.12 * morph.value
  for (let i = 0; i < n; i++) {
    const t = tgt[i]!
    const p = pts[i]!
    addForce(fx, i, ka * (t.x - p.x))
    addForce(fy, i, ka * (t.y - p.y))
    addForce(fz, i, ka * (t.z - p.z) - 0.02 * morph.value * p.z) // flatten as it morphs
  }

  // velocity integration with damping: forces add momentum, springs cause bounce
  const damping = 0.86
  for (let i = 0; i < n; i++) {
    const m = Math.min(medial[i]!, L * 6) / (L * 6)
    const s = 0.05 + 0.55 * m
    const v = vel[i]!
    v.x = (v.x + s * fx[i]!) * damping
    v.y = (v.y + s * fy[i]!) * damping
    v.z = (v.z + s * fz[i]!) * damping
    pts[i]!.x += v.x
    pts[i]!.y += v.y
    pts[i]!.z += v.z
  }

  // pin the grabbed vertex to the cursor (overrides physics for that node)
  if (grabbedIdx >= 0 && mouse.inside) {
    const c = canvas.value
    if (c) {
      const w = parseFloat(c.style.width || '0') || c.width
      const h = parseFloat(c.style.height || '0') || c.height
      const u = unproject(mouse.x, mouse.y, w, h, grabZ2)
      const p = pts[grabbedIdx]!
      const v = vel[grabbedIdx]!
      // imprint velocity from the displacement so the chain whips on release
      v.x = (u.X - p.x) * 0.6
      v.y = (u.Y - p.y) * 0.6
      v.z = (u.Z - p.z) * 0.6
      p.x = u.X
      p.y = u.Y
      p.z = u.Z
    }
  }

  iter.value++
}

function project(p: Vec3, w: number, h: number, cy: number, sy: number, cp: number, sp: number) {
  // rotate around Y, then around X (pitch)
  const x1 = p.x * cy + p.z * sy
  const z1 = -p.x * sy + p.z * cy
  const y1 = p.y
  const y2 = y1 * cp - z1 * sp
  const z2 = y1 * sp + z1 * cp
  // clamp to keep behind-camera points from inverting the perspective
  const persp = (700 * zoom) / Math.max(60, 700 + z2)
  return {
    sx: w / 2 + x1 * persp,
    sy: h / 2 - y2 * persp,
    depth: z2,
    persp,
  }
}

function draw() {
  const c = canvas.value
  if (!c)
    return
  const ctx = c.getContext('2d')
  if (!ctx)
    return
  const w = parseFloat(c.style.width || '0') || c.width
  const h = parseFloat(c.style.height || '0') || c.height

  // motion-blur bg: paint a low-alpha vignette over the previous frame
  const bg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.7)
  bg.addColorStop(0, 'rgba(13, 20, 26, 0.35)')
  bg.addColorStop(1, 'rgba(4, 6, 10, 0.55)')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)

  yaw += yawVel
  const cy = Math.cos(yaw)
  const sy = Math.sin(yaw)
  const cp = Math.cos(pitch)
  const sp = Math.sin(pitch)

  const pts = points.value
  const n = pts.length
  const proj = pts.map(p => project(p, w, h, cy, sy, cp, sp))

  // background starfield (parallax with camera)
  for (const s of stars) {
    const p = project(s, w, h, cy, sy, cp, sp)
    if (p.depth > 1400)
      continue
    const alpha = s.b * Math.max(0, Math.min(1, (1500 - p.depth) / 2500))
    const r = (0.4 + s.b * 1.2) * p.persp
    ctx.fillStyle = `rgba(180, 220, 255, ${alpha * 0.6})`
    ctx.beginPath()
    ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2)
    ctx.fill()
  }

  // confetti sparks (3D physics, gravity, fade)
  ctx.globalCompositeOperation = 'lighter'
  for (let i = sparks.length - 1; i >= 0; i--) {
    const s = sparks[i]!
    s.x += s.vx
    s.y += s.vy
    s.z += s.vz
    s.vy -= 0.18 // gravity (visual)
    s.vx *= 0.985
    s.vz *= 0.985
    s.life -= 0.012
    if (s.life <= 0) {
      sparks.splice(i, 1)
      continue
    }
    const p = project({ x: s.x, y: s.y, z: s.z }, w, h, cy, sy, cp, sp)
    const r = 2.5 * p.persp
    const g = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, r * 4)
    g.addColorStop(0, `hsla(${s.hue}, 100%, 80%, ${s.life})`)
    g.addColorStop(1, `hsla(${s.hue}, 100%, 70%, 0)`)
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(p.sx, p.sy, r * 4, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalCompositeOperation = 'source-over'

  // depth sort segment indices for proper occlusion
  const segs = Array.from({ length: n }, (_, i) => i)
  segs.sort((a, b) => {
    const za = (proj[a]!.depth + proj[(a + 1) % n]!.depth) * 0.5
    const zb = (proj[b]!.depth + proj[(b + 1) % n]!.depth) * 0.5
    return zb - za
  })

  // medial spheres (depth-sorted, behind curve)
  if (showSpheres.value) {
    const sphereIdx: number[] = []
    for (let i = 0; i < n; i += 5) sphereIdx.push(i)
    sphereIdx.sort((a, b) => proj[b]!.depth - proj[a]!.depth)
    for (const i of sphereIdx) {
      const r = (medial[i] || 0) / 2
      if (r < 2)
        continue
      const pp = proj[i]!
      const sr = r * pp.persp
      const fade = Math.max(0, Math.min(1, (200 - pp.depth) / 400))
      ctx.fillStyle = `rgba(0, 220, 130, ${0.04 * fade})`
      ctx.strokeStyle = `rgba(0, 220, 130, ${0.10 * fade})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(pp.sx, pp.sy, sr, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    }
  }

  // ---- TUBE RENDER: interpolated spheres between vertices for seamless tube ----
  const SUB = 2 // sub-samples between each pair of vertices
  interface T { sx: number, sy: number, depth: number, persp: number, idx: number }
  const tube: T[] = []
  for (let i = 0; i < n; i++) {
    const a = proj[i]!
    const b = proj[(i + 1) % n]!
    for (let s = 0; s < SUB; s++) {
      const t = s / SUB
      tube.push({
        sx: a.sx + (b.sx - a.sx) * t,
        sy: a.sy + (b.sy - a.sy) * t,
        depth: a.depth + (b.depth - a.depth) * t,
        persp: a.persp + (b.persp - a.persp) * t,
        idx: i,
      })
    }
  }
  const vertOrder = Array.from({ length: tube.length }, (_, i) => i)
  vertOrder.sort((a, b) => tube[b]!.depth - tube[a]!.depth)

  // breathing pulse + thicker tube as morph crystallizes
  const pulse = 1 + 0.08 * Math.sin(iter.value * 0.08)
  const baseR = (4 + 7 * morph.value) * pulse
  const chaosHue = (i: number) => (i / n) * 360
  const targetHue = 152

  // Tube body — single pass, solid-fill spheres with depth-tinted lightness.
  // Motion-blur trail + small highlight dot give the glow/specular look without
  // per-vertex radial gradients (which were the main perf cost).
  for (const k of vertOrder) {
    const p = tube[k]!
    const fog = Math.max(0, Math.min(1, (200 - p.depth) / 500))
    const r = baseR * p.persp
    if (r < 0.5)
      continue
    const hue = chaosHue(p.idx) + (targetHue - chaosHue(p.idx)) * morph.value
    const sat = 70 + 25 * morph.value
    const light = 30 + 35 * fog
    ctx.fillStyle = `hsl(${hue}, ${sat}%, ${light}%)`
    ctx.beginPath()
    ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2)
    ctx.fill()
    // cheap highlight: smaller white-ish dot offset up-left
    if (p.depth < 50) {
      ctx.fillStyle = `hsla(${hue}, 90%, ${78 * fog + 10}%, 0.9)`
      ctx.beginPath()
      ctx.arc(p.sx - r * 0.4, p.sy - r * 0.4, r * 0.45, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Pass 4: particles streaming along the curve
  for (const part of particles) {
    part.u = (part.u + part.speed * 4) % 1
    part.life = (part.life + 0.01) % 1
    const f = part.u * n
    const i0 = Math.floor(f) % n
    const i1 = (i0 + 1) % n
    const t = f - Math.floor(f)
    const a = proj[i0]!
    const b = proj[i1]!
    const px = a.sx + (b.sx - a.sx) * t
    const py = a.sy + (b.sy - a.sy) * t
    const pz = a.depth + (b.depth - a.depth) * t
    const persp = a.persp + (b.persp - a.persp) * t
    const fog = Math.max(0.1, Math.min(1, (200 - pz) / 500))
    const hue = chaosHue(i0) + (targetHue - chaosHue(i0)) * morph.value
    const r = (1.2 + 1.6 * Math.sin(part.life * Math.PI)) * persp
    const grad = ctx.createRadialGradient(px, py, 0, px, py, r * 4)
    grad.addColorStop(0, `hsla(${hue}, 100%, 85%, ${0.9 * fog})`)
    grad.addColorStop(0.3, `hsla(${hue}, 100%, 70%, ${0.4 * fog})`)
    grad.addColorStop(1, `hsla(${hue}, 100%, 70%, 0)`)
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(px, py, r * 4, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalCompositeOperation = 'source-over'

  // unused but kept for potential future use
  void segs
}

function resize() {
  const c = canvas.value
  if (!c)
    return
  const dpr = pixelRatio.value
  c.width = width.value * dpr
  c.height = height.value * dpr
  c.style.width = `${width.value}px`
  c.style.height = `${height.value}px`
  const ctx = c.getContext('2d')
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
}

watch([width, height, pixelRatio], resize)

function onPointerMove(e: PointerEvent) {
  const rect = canvas.value!.getBoundingClientRect()
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
  mouse.inside = true
  if (mouse.dragging) {
    yaw += (e.clientX - mouse.lastX) * 0.008
    pitch += (e.clientY - mouse.lastY) * 0.006
    pitch = Math.max(-1.2, Math.min(1.2, pitch))
    mouse.lastX = e.clientX
    mouse.lastY = e.clientY
  }
}
function findNearestVertex(): number {
  const c = canvas.value
  if (!c)
    return -1
  const w = parseFloat(c.style.width || '0') || c.width
  const h = parseFloat(c.style.height || '0') || c.height
  const cy = Math.cos(yaw)
  const sy = Math.sin(yaw)
  const cp = Math.cos(pitch)
  const sp = Math.sin(pitch)
  let best = -1
  let bestD2 = 60 * 60 // require within 60px
  for (let i = 0; i < points.value.length; i++) {
    const p = project(points.value[i]!, w, h, cy, sy, cp, sp)
    const dx = p.sx - mouse.x
    const dy = p.sy - mouse.y
    const d2 = dx * dx + dy * dy
    if (d2 < bestD2) {
      bestD2 = d2
      best = i
      grabZ2 = p.depth
    }
  }
  return best
}
function onPointerDown(e: PointerEvent) {
  const rect = canvas.value!.getBoundingClientRect()
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
  mouse.lastX = e.clientX
  mouse.lastY = e.clientY
  mouse.startX = mouse.x
  mouse.startY = mouse.y
  if (e.shiftKey || e.button === 2) {
    mouse.dragging = true
    yawVel = 0
  }
  else {
    const idx = findNearestVertex()
    if (idx >= 0) {
      grabbedIdx = idx
      yawVel = 0
    }
    else {
      // empty click: orbit instead
      mouse.dragging = true
      yawVel = 0
    }
  }
  canvas.value?.setPointerCapture(e.pointerId)
}
function onPointerUp() {
  if (grabbedIdx >= 0) {
    // measure pull distance: a hard yank re-tangles the whole thread
    const dx = mouse.x - mouse.startX
    const dy = mouse.y - mouse.startY
    const dist = Math.hypot(dx, dy)
    if (dist > 280)
      tangle()
  }
  grabbedIdx = -1
  mouse.dragging = false
  yawVel = 0.006
}
function onPointerLeave() {
  mouse.inside = false
  mouse.dragging = false
  grabbedIdx = -1
  yawVel = 0.006
}
function onWheel(e: WheelEvent) {
  zoom *= e.deltaY > 0 ? 0.92 : 1.08
  zoom = Math.max(0.4, Math.min(2.5, zoom))
}
function onClick(e: MouseEvent) {
  // double-click triggers a burst from current curve
  if (e.detail >= 2)
    emitBurst(points.value)
}

const frame = useRafFn(() => {
  if (running.value) {
    for (let k = 0; k < 2; k++) step()
  }
  draw()
})

function toggleRunning() {
  running.value = !running.value
  if (running.value)
    frame.resume()
  else
    frame.pause()
}

onMounted(() => {
  reset()
  resize()
  if (preferredMotion.value === 'reduce') {
    running.value = false
    frame.pause()
    draw()
  }
})
</script>

<template>
  <main class="page">
    <header>
      <div>
        <NuxtLink to="/" class="back-link">
          ← Harlan Wilton
        </NuxtLink>
        <h1>Medial Sphere Preconditioning &rarr; Nuxt</h1>
        <p>3D canvas port of <a href="https://github.com/yutanoma/medial-sphere-preconditioning" target="_blank" rel="noopener">yutanoma/medial-sphere-preconditioning</a>. A nightmare-tangled closed curve untangles via medial-radius preconditioned flow and morphs into the Nuxt mountain.</p>
      </div>
      <div class="controls">
        <button class="primary" @click="morphing = !morphing">
          {{ morph >= 1 ? 'Untangled' : morphing ? 'Untangling…' : 'Untangle → Nuxt' }}
        </button>
        <label class="sr-only" for="tangle-style">Tangle style</label>
        <select id="tangle-style" v-model="tangleStyle" @change="tangle">
          <option value="nightmare">
            Nightmare
          </option>
          <option value="trefoil">
            Trefoil knot
          </option>
          <option value="figure8">
            Figure-8
          </option>
          <option value="spaghetti">
            Spaghetti
          </option>
        </select>
        <button @click="tangle">
          Re-tangle
        </button>
        <button @click="toggleRunning">
          {{ running ? 'Pause' : 'Play' }}
        </button>
        <span class="iter">morph {{ (morph * 100).toFixed(0) }}%</span>
      </div>
    </header>
    <div ref="wrap" class="wrap">
      <canvas
        ref="canvas"
        role="img"
        aria-label="Interactive three dimensional tangled curve. Drag to orbit or pull the curve, and use the controls above to untangle it."
        @pointermove="onPointerMove"
        @pointerdown="onPointerDown"
        @pointerup="onPointerUp"
        @pointerleave="onPointerLeave"
        @wheel.prevent="onWheel"
        @click="onClick"
        @contextmenu.prevent
      />
      <div class="hint">
        grab &amp; pull the thread &middot; shift-drag to orbit &middot; scroll to zoom &middot; yank hard to re-tangle
      </div>
    </div>
  </main>
</template>

<style scoped>
.page { min-height: 100dvh; display: flex; flex-direction: column; background: #04060a; color: #e6e6ee; font-family: ui-sans-serif, system-ui, sans-serif; }
header { padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: flex-start; gap: 1.5rem; flex-wrap: wrap; border-bottom: 1px solid #0f1a14; }
h1 { margin: 0 0 0.25rem; font-size: 1.1rem; font-weight: 600; letter-spacing: -0.01em; }
p { margin: 0; font-size: 0.85rem; color: #7a8a82; max-width: 64ch; }
a { color: #00dc82; text-decoration: underline; text-underline-offset: 0.18em; }
p a { display: inline-flex; min-height: 44px; align-items: center; }
.back-link { display: inline-flex; min-height: 44px; margin-bottom: 0.25rem; align-items: center; color: #7a8a82; font-size: 0.75rem; }
.controls { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; font-size: 0.85rem; }
button { min-height: 44px; background: #0f1a14; color: #e6e6ee; border: 1px solid #1c2c22; padding: 0.4rem 0.8rem; border-radius: 6px; cursor: pointer; font-size: 0.85rem; }
button:hover { background: #16241c; border-color: #00dc82; }
button.primary { background: #00dc82; color: #04060a; border-color: #00dc82; font-weight: 600; }
button.primary:hover { background: #2af09c; border-color: #2af09c; }
select { min-height: 44px; background: #0f1a14; color: #e6e6ee; border: 1px solid #1c2c22; padding: 0.4rem 0.6rem; border-radius: 6px; cursor: pointer; font-size: 0.85rem; }
select:hover { border-color: #00dc82; }
button:focus-visible, select:focus-visible, a:focus-visible { outline: 2px solid #00dc82; outline-offset: 3px; }
label { display: flex; gap: 0.4rem; align-items: center; color: #7a8a82; cursor: pointer; }
.iter { color: #7a8a82; font-variant-numeric: tabular-nums; }
.wrap { flex: 1; position: relative; }
canvas { display: block; cursor: grab; touch-action: none; }
canvas:active { cursor: grabbing; }
.hint { position: absolute; bottom: 1rem; left: 50%; transform: translateX(-50%); color: #7a8a82; font-size: 0.75rem; letter-spacing: 0.04em; pointer-events: none; user-select: none; }
@media (max-width: 640px) {
  header { padding: 1rem; }
  .hint { width: calc(100% - 2rem); text-align: center; }
}
@media (prefers-reduced-motion: reduce) {
  * { scroll-behavior: auto; }
}
</style>
