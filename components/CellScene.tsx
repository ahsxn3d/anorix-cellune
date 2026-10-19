"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { buildShapes, VERT, FRAG } from "@/lib/shapes";
import FirstFrame from "./kit/FirstFrame";

function Cloud({ progress, n, mobile }: { progress: MutableRefObject<number>; n: number; mobile: boolean }) {
  const pts = useRef<THREE.Points>(null);
  const { geo, mat } = useMemo(() => {
    const sh = buildShapes(n); const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(sh.A, 3)); g.setAttribute("aB", new THREE.BufferAttribute(sh.B, 3)); g.setAttribute("aC", new THREE.BufferAttribute(sh.C, 3)); g.setAttribute("aS", new THREE.BufferAttribute(sh.S, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 6);
    const m = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uM: { value: 0 }, uT: { value: 0 }, uO: { value: 0.42 }, uSize: { value: 52 }, uA: { value: new THREE.Color(0x9fe6c8) }, uB: { value: new THREE.Color(0xc9b8ff) } } });
    return { geo: g, mat: m };
  }, [n]);
  const m = useRef(0);
  useFrame((st, dt) => {
    const p = progress.current; m.current += (p * 2.2 - m.current) * Math.min(1, dt * 3);
    mat.uniforms.uM.value = m.current; mat.uniforms.uT.value = st.clock.elapsedTime;
    mat.uniforms.uSize.value = 52 * st.size.height / 1080 * st.viewport.dpr;
    const o = pts.current!; const k = Math.min(1, dt * 2.5);
    o.rotation.y += ((-0.4 + st.clock.elapsedTime * 0.06 + st.pointer.x * 0.25) - o.rotation.y) * k;
    o.rotation.x += ((0.2 + st.pointer.y * -0.15) - o.rotation.x) * k;
    o.rotation.z += ((Math.max(0, m.current - 1.2) * 0.5) - o.rotation.z) * k;
    o.position.x = mobile ? 0 : 0;
  });
  return <points ref={pts} geometry={geo} material={mat} />;
}

export default function CellScene({ progress, running, onReady }: { progress: MutableRefObject<number>; running: boolean; onReady: () => void }) {
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <Canvas frameloop={running ? "always" : "demand"} dpr={[1, 1.5]} gl={{ antialias: false, alpha: false }}
      camera={{ position: mobile ? [0, 0, 15] : [-2.6, 0, 11], fov: 32 }} onCreated={({ scene, camera, gl }) => { scene.background = new THREE.Color(0x0e2b2e); gl.toneMapping = THREE.NoToneMapping; camera.lookAt(mobile ? 0 : -2.6, 0, 0); }}>
      <Cloud progress={progress} n={mobile ? 7000 : 14000} mobile={mobile} />
      <FirstFrame onReady={onReady} />
    </Canvas>
  );
}
