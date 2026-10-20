"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Arrow } from "./kit/ui";
import { models } from "@/lib/content";
const Particles = dynamic(() => import("./Particles"), { ssr: false });
// Shape path: nebula → molecule → cell → lattice → DNA (intro), then scroll: molecule → protein → lattice
const PATH = [0, 1, 2, 3, 4, 1, 5, 3];
const stages = ["Nebula", "Molecule", "Cell", "Lattice", "DNA"];
export default function Morph() {
  const root = useRef<HTMLElement>(null), pos = useRef(0), intro = useRef(0), [c, setC] = useState(0), [st, setSt] = useState(0);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; let raf = 0; const t0 = performance.now(), D = 5600;
    const run = (now: number) => { const k = Math.min(1, (now - t0) / D); const e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; intro.current = e * 4;
      if (pos.current <= 4) pos.current = intro.current; setSt(Math.min(4, Math.round(intro.current))); if (k < 1) raf = requestAnimationFrame(run); };
    if (reduce) { intro.current = 4; pos.current = 4; setSt(4); } else raf = requestAnimationFrame(run);
    const s = ScrollTrigger.create({ trigger: root.current, start: "top top", end: "bottom bottom", onUpdate: (x) => { const v = x.progress < .2 ? 0 : x.progress < .46 ? 1 : x.progress < .72 ? 2 : 3; setC((p) => (p === v ? p : v)); pos.current = v === 0 ? intro.current : 4 + v; } });
    return () => { cancelAnimationFrame(raf); s.kill(); };
  }, []);
  return (
    <section ref={root} className="relative h-[400vh] bg-petrol text-paper">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#02272a]">
        <Particles pos={pos} path={PATH} x={2.4} z={14.5} size={58} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#02272a]/90 via-transparent to-transparent md:bg-gradient-to-r md:from-[#02272a]/85 md:via-[#02272a]/10" />
        <div className="wrap relative flex h-full flex-col justify-end pb-[12vh] md:justify-center md:pb-0">
          <div className="relative min-h-[330px] md:min-h-[440px]">
            <div className={`absolute inset-x-0 bottom-0 max-w-[660px] transition-[opacity,transform] duration-1000 ease-[cubic-bezier(.16,1,.3,1)] md:top-0 md:bottom-auto ${c === 0 ? "opacity-100" : "pointer-events-none -translate-y-8 opacity-0"}`}>
              <p className="eyebrow text-mint">Anorix Science · AI × chemistry</p>
              <h1 className="display mt-5 text-[clamp(56px,7.8vw,132px)]"><span className="kit-mask"><span className="kit-line">Science,</span></span><span className="kit-mask"><span className="kit-line text-mint">modelled.</span></span></h1>
              <p className="kit-soft mt-6 max-w-[44ch] text-[16px] leading-[1.7] text-paper/75">Three AI models where math, biology and physics meet. One proposes molecules, one simulates how they bind and mutate, one designs crystals for batteries.</p>
              <div className="kit-soft mt-8 flex flex-wrap gap-3"><a href="/models" className="btn pointer-events-auto bg-lilac text-ink hover:bg-mint">See the models <Arrow /></a><a href="/request-access" className="btn pointer-events-auto text-paper ring-1 ring-paper/25 hover:bg-paper/10">Request access</a></div>
            </div>
            {models.map((m, j) => { const i = j + 1; return (
              <div key={m.slug} className={`absolute inset-x-0 bottom-0 max-w-[640px] transition-[opacity,transform] duration-1000 ease-[cubic-bezier(.16,1,.3,1)] md:top-0 md:bottom-auto ${c === i ? "translate-y-0 opacity-100" : c > i ? "pointer-events-none -translate-y-8 opacity-0" : "pointer-events-none translate-y-8 opacity-0"}`}>
                <p className="eyebrow text-mint">Model {m.no} · {m.tag}</p>
                <h2 className="display mt-5 text-[clamp(46px,6.2vw,108px)]">{m.name}</h2>
                <p className="mt-6 max-w-[44ch] text-[16px] leading-[1.7] text-paper/75">{m.does}</p>
                <a href={`/models/${m.slug}`} className="btn pointer-events-auto mt-8 bg-paper text-ink hover:bg-mint">Open model {m.no} <Arrow /></a>
              </div>); })}
          </div>
        </div>
        <div className="wrap absolute inset-x-0 bottom-6 flex items-center gap-4">
          <span className="eyebrow hidden text-paper/60 md:block">{c === 0 ? stages.map((s, i) => <span key={s} className={i === st ? "text-mint" : i < st ? "text-paper/60" : "text-paper/25"}>{s}{i < 4 ? "  →  " : ""}</span>) : `Fig. ${c} · ${models[c - 1].name}`}</span>
          <div className="h-px flex-1 bg-paper/15"><div className="h-px origin-left bg-mint transition-transform duration-700" style={{ transform: `scaleX(${(c + 1) / 4})` }} /></div><span className="eyebrow text-paper/60">0{c + 1}/04</span></div>
      </div>
    </section>
  );
}
