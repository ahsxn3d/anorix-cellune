"use client";
import dynamic from "next/dynamic";
import { useRef } from "react";
const Particles = dynamic(() => import("./Particles"), { ssr: false });
export default function Viewer({ shape, dense = .6, bg = "#02272a", colors, z = 11, size = 50, spin = .1, x = 0 }: { x?: number; shape: number; dense?: number; bg?: string; colors?: [string, string]; z?: number; size?: number; spin?: number }) {
  const pos = useRef(0); return <Particles pos={pos} path={[shape]} dense={dense} bg={bg} colors={colors} z={z} size={size} spin={spin} x={x} />;
}
