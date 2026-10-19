// Point clouds for the Cellune morph: molecule -> cell -> helix. Same count, same order.
function rng(seed) { return () => ((seed = (seed * 16807) % 2147483647) / 2147483647); }
function onSphere(r, R, cx, cy, cz, shell) {
  const u = r() * 2 - 1, t = r() * Math.PI * 2, k = Math.sqrt(1 - u * u), rad = shell ? R : R * Math.cbrt(r());
  return [cx + k * Math.cos(t) * rad, cy + u * rad, cz + k * Math.sin(t) * rad];
}
export function buildShapes(n) {
  const r = rng(7);
  const A = new Float32Array(n * 3), B = new Float32Array(n * 3), C = new Float32Array(n * 3), S = new Float32Array(n);
  const atoms = [[0, 0, 0, .9], [1.7, .7, .2, .65], [-1.6, .9, -.3, .7], [.3, -1.8, .4, .6], [-.9, -1.1, 1.2, .5], [1.2, -.9, -1.2, .55], [2.9, 1.6, .2, .45], [-2.8, 1.9, -.6, .45]];
  const bonds = [[0, 1], [0, 2], [0, 3], [3, 4], [3, 5], [1, 6], [2, 7]];
  for (let i = 0; i < n; i++) {
    S[i] = r();
    // A: molecule (atoms as shells, bonds as rods)
    let p;
    if (r() < 0.78) { const a = atoms[(r() * atoms.length) | 0]; p = onSphere(r, a[3], a[0], a[1], a[2], r() < 0.85); }
    else { const b = bonds[(r() * bonds.length) | 0], a0 = atoms[b[0]], a1 = atoms[b[1]], t = r(); p = [a0[0] + (a1[0] - a0[0]) * t + (r() - .5) * .12, a0[1] + (a1[1] - a0[1]) * t + (r() - .5) * .12, a0[2] + (a1[2] - a0[2]) * t + (r() - .5) * .12]; }
    A.set(p, i * 3);
    // B: cell (membrane, nucleus, organelles)
    const q = r(); let c;
    if (q < 0.55) { c = onSphere(r, 2.6, 0, 0, 0, true); c[1] *= 0.86; }
    else if (q < 0.8) c = onSphere(r, 0.95, 0.35, 0.1, 0, r() < 0.7);
    else { const o = [[-1.3, .6, .4], [1.2, -.9, .3], [-.6, -1.3, -.6], [1.4, .9, -.5]][(r() * 4) | 0]; c = onSphere(r, .32, o[0], o[1], o[2], false); }
    B.set(c, i * 3);
    // C: double helix fibre
    const strand = r() < 0.86 ? (r() < .5 ? 0 : Math.PI) : -1, y = (r() - .5) * 5.4, ang = y * 1.25;
    if (strand >= 0) C.set([Math.cos(ang + strand) * 1.15 + (r() - .5) * .1, y, Math.sin(ang + strand) * 1.15 + (r() - .5) * .1], i * 3);
    else { const yy = Math.round(y * 2.4) / 2.4, a2 = yy * 1.25, t = r() * 2 - 1; C.set([Math.cos(a2) * 1.15 * t, yy, Math.sin(a2) * 1.15 * t], i * 3); }
  }
  return { A, B, C, S };
}
export const VERT = `
attribute vec3 aB; attribute vec3 aC; attribute float aS;
uniform float uM; uniform float uT; uniform float uSize; varying float vA; varying float vS;
void main(){
  float m1 = clamp(uM, 0., 1.), m2 = clamp(uM - 1., 0., 1.);
  float d = aS * .35; float e1 = smoothstep(d, d + .65, m1), e2 = smoothstep(d, d + .65, m2);
  vec3 p = mix(mix(position, aB, e1), aC, e2);
  p += .045 * vec3(sin(uT * .9 + aS * 40.), cos(uT * .8 + aS * 33.), sin(uT * .7 + aS * 27.));
  vec4 mv = modelViewMatrix * vec4(p, 1.);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (.7 + aS * 1.1) / -mv.z;
  vA = smoothstep(20., 8., -mv.z); vS = aS;
}`;
export const FRAG = `
uniform vec3 uA; uniform vec3 uB; uniform float uO; varying float vA; varying float vS;
void main(){ vec2 c = gl_PointCoord - .5; float d = length(c); if (d > .5) discard;
  float a = smoothstep(.5, .1, d); vec3 col = mix(uA, uB, smoothstep(.35, .65, vS));
  gl_FragColor = vec4(col, uO * a * (.75 + .25 * vA)); }`;
