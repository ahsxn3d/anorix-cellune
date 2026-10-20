// Particle shapes for Anorix Science. Every shape has the same count + order so any two can morph.
// 0 nebula · 1 molecule · 2 cell · 3 crystal lattice · 4 DNA double helix · 5 protein with docked ligand
export const SHAPES = 6;
function rng(seed: number) { return () => ((seed = (seed * 16807) % 2147483647) / 2147483647); }
type R = () => number;
function sph(r: R, R0: number, cx: number, cy: number, cz: number, shell: boolean): number[] {
  const u = r() * 2 - 1, t = r() * Math.PI * 2, k = Math.sqrt(1 - u * u), rad = shell ? R0 : R0 * Math.cbrt(r());
  return [cx + k * Math.cos(t) * rad, cy + u * rad, cz + k * Math.sin(t) * rad];
}
const atoms = [[0, 0, 0, .9], [1.7, .7, .2, .65], [-1.6, .9, -.3, .7], [.3, -1.8, .4, .6], [-.9, -1.1, 1.2, .5], [1.2, -.9, -1.2, .55], [2.9, 1.6, .2, .45], [-2.8, 1.9, -.6, .45]];
const bonds = [[0, 1], [0, 2], [0, 3], [3, 4], [3, 5], [1, 6], [2, 7]];
const back = (t: number) => [Math.sin(t * 1.9) * 1.6 + Math.sin(t * 4.3) * .5, Math.cos(t * 1.3) * 1.4 + Math.sin(t * 3.1) * .45, Math.sin(t * 2.7 + 1) * 1.2];
export function buildShapes(n: number) {
  const r = rng(7), out = Array.from({ length: SHAPES }, () => new Float32Array(n * 3)), S = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    S[i] = r(); const o = i * 3;
    // 0 nebula
    { const p = sph(r, 3.4, 0, 0, 0, false); p[1] *= .7; out[0].set(p, o); }
    // 1 molecule
    { let p; if (r() < .78) { const a = atoms[(r() * atoms.length) | 0]; p = sph(r, a[3], a[0], a[1], a[2], r() < .85); }
      else { const b = bonds[(r() * bonds.length) | 0], a0 = atoms[b[0]], a1 = atoms[b[1]], t = r(); p = [0, 1, 2].map((k) => a0[k] + (a1[k] - a0[k]) * t + (r() - .5) * .12); }
      out[1].set(p, o); }
    // 2 cell
    { const q = r(); let c; if (q < .55) { c = sph(r, 2.6, 0, 0, 0, true); c[1] *= .86; } else if (q < .8) c = sph(r, .95, .35, .1, 0, r() < .7);
      else { const g = [[-1.3, .6, .4], [1.2, -.9, .3], [-.6, -1.3, -.6], [1.4, .9, -.5]][(r() * 4) | 0]; c = sph(r, .32, g[0], g[1], g[2], false); } out[2].set(c, o); }
    // 3 crystal: 4x4x4 layered lattice, atoms + edges
    { const N = 4, s = 1.15, h = (N - 1) / 2; const ix = (r() * N) | 0, iy = (r() * N) | 0, iz = (r() * N) | 0; let p;
      if (r() < .7) p = sph(r, (iy % 2 ? .16 : .26), (ix - h) * s, (iy - h) * s, (iz - h) * s, r() < .8);
      else { const ax = (r() * 3) | 0, t = r(); const a = [(ix - h) * s, (iy - h) * s, (iz - h) * s]; if (a[ax] / s + h < N - 1) a[ax] += t * s; p = a.map((v) => v + (r() - .5) * .04); }
      out[3].set(p, o); }
    // 4 DNA
    { const strand = r() < .84 ? (r() < .5 ? 0 : Math.PI) : -1, y = (r() - .5) * 6.4, ang = y * 1.15;
      if (strand >= 0) out[4].set([Math.cos(ang + strand) * 1.2 + (r() - .5) * .12, y, Math.sin(ang + strand) * 1.2 + (r() - .5) * .12], o);
      else { const yy = Math.round(y * 2.2) / 2.2, a2 = yy * 1.15, t = r() * 2 - 1; out[4].set([Math.cos(a2) * 1.2 * t, yy, Math.sin(a2) * 1.2 * t], o); } }
    // 5 protein backbone tube + ligand in pocket
    { let p; if (r() < .84) { const t = r() * Math.PI * 2, c = back(t), a = r() * Math.PI * 2, rr = .28 + r() * .06; p = [c[0] + Math.cos(a) * rr, c[1] + Math.sin(a) * rr, c[2] + Math.cos(a + 1.3) * rr]; }
      else { const k = (r() * 5) | 0; p = sph(r, .2, .3 + Math.cos(k * 1.3) * .45, .1 + Math.sin(k * 1.3) * .35, 2.1, r() < .7); }
      out[5].set(p, o); }
  }
  return { P: out, S };
}
export const VERT = /* glsl */ `
attribute vec3 p1; attribute vec3 p2; attribute vec3 p3; attribute vec3 p4; attribute vec3 p5; attribute float aS;
uniform float uA; uniform float uB; uniform float uK; uniform float uT; uniform float uSize; varying float vA; varying float vS; varying float vF;
vec3 pick(float i){ return i < .5 ? position : i < 1.5 ? p1 : i < 2.5 ? p2 : i < 3.5 ? p3 : i < 4.5 ? p4 : p5; }
void main(){
  float d = aS * .35; float e = smoothstep(d, d + .65, uK);
  vec3 a = pick(uA), b = pick(uB); vec3 p = mix(a, b, e);
  float fly = sin(e * 3.14159); p += normalize(p + .001) * fly * .5 * (aS - .3);
  p += .04 * vec3(sin(uT * .9 + aS * 40.), cos(uT * .8 + aS * 33.), sin(uT * .7 + aS * 27.));
  vec4 mv = modelViewMatrix * vec4(p, 1.); gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (.7 + aS * 1.1) / -mv.z; vA = smoothstep(22., 8., -mv.z); vS = aS; vF = fly;
}`;
export const FRAG = /* glsl */ `
uniform vec3 uCa; uniform vec3 uCb; uniform float uO; varying float vA; varying float vS; varying float vF;
void main(){ vec2 c = gl_PointCoord - .5; float d = length(c); if (d > .5) discard;
  float a = smoothstep(.5, .05, d); vec3 col = mix(uCa, uCb, smoothstep(.35, .65, vS)) + vF * .25;
  gl_FragColor = vec4(col, uO * a * (.7 + .3 * vA)); }`;
