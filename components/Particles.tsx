"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { buildShapes, VERT, FRAG } from "@/lib/shapes";

/** pos is a float index into path: shape path[floor(pos)] morphs to path[ceil(pos)]. */
function Cloud({ pos, path, n, x, size, colors, spin, z }: { z: number; pos: MutableRefObject<number>; path: number[]; n: number; x: number; size: number; colors: [string, string]; spin: number }) {
  const pts = useRef<THREE.Points>(null!), cur = useRef(pos.current);
  const { geo, mat } = useMemo(() => {
    const { P, S } = buildShapes(n), g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(P[0], 3)); for (let i = 1; i < P.length; i++) g.setAttribute("p" + i, new THREE.BufferAttribute(P[i], 3));
    g.setAttribute("aS", new THREE.BufferAttribute(S, 1)); g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 8);
    const m = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uA: { value: 0 }, uB: { value: 0 }, uK: { value: 0 }, uT: { value: 0 }, uO: { value: .5 }, uSize: { value: 50 }, uCa: { value: new THREE.Color(colors[0]) }, uCb: { value: new THREE.Color(colors[1]) } } });
    return { geo: g, mat: m };
  }, [n, colors]);
  useEffect(() => () => { geo.dispose(); mat.dispose(); }, [geo, mat]);
  useFrame((st, dt) => {
    cur.current += (pos.current - cur.current) * Math.min(1, dt * 4);
    const p = Math.max(0, Math.min(path.length - 1, cur.current)), i = Math.floor(p), u = mat.uniforms;
    u.uA.value = path[i]; u.uB.value = path[Math.min(path.length - 1, i + 1)]; u.uK.value = p - i; u.uT.value = st.clock.elapsedTime;
    u.uSize.value = size * st.size.height / 1000 * st.viewport.dpr;
    const o = pts.current, k = Math.min(1, dt * 2.5);
    o.rotation.y += ((-0.3 + st.clock.elapsedTime * spin + st.pointer.x * .3) - o.rotation.y) * k;
    o.rotation.x += ((0.18 - st.pointer.y * .15) - o.rotation.x) * k; o.position.x = x; st.camera.position.z = st.size.width < 768 ? z * 1.3 : z;
  });
  return <points ref={pts} geometry={geo} material={mat} />;
}

export default function Particles({ pos, path, dense = 1, x = 0, z = 12, size = 50, bg = "#02272a", colors = ["#9fe6c8", "#c9b8ff"], spin = .06, className = "absolute inset-0" }:
  { pos: MutableRefObject<number>; path: number[]; dense?: number; x?: number; z?: number; size?: number; bg?: string; colors?: [string, string]; spin?: number; className?: string }) {
  const el = useRef<HTMLDivElement>(null), [on, setOn] = useState(true), [mob, setMob] = useState(false);
  const cols = useMemo(() => colors, [colors[0], colors[1]]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { setMob(window.innerWidth < 768); const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting)); io.observe(el.current!); return () => io.disconnect(); }, []);
  return (<div ref={el} className={className} aria-hidden="true">
    <Canvas frameloop={on ? "always" : "never"} dpr={[1, 1.6]} gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }} camera={{ position: [0, 0, z], fov: 32 }}>
      <color attach="background" args={[bg]} />
      <Cloud pos={pos} path={path} n={Math.round((mob ? 12000 : 26000) * dense)} x={mob ? 0 : x} size={size} colors={cols} spin={spin} z={z} />
    </Canvas></div>);
}
