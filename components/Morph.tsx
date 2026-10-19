"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lazy3D from "./kit/Lazy3D";
import { Arrow } from "./kit/ui";
const CellScene = dynamic(() => import("./CellScene"), { ssr: false });
const ch = [
  ["01 · Molecule", "Materials that grow."],
  ["02 · Cell", "Programmed in the cell."],
  ["03 · Fibre", "Spun into fibre."],
];
const body = ["Cellune designs proteins, grows them in engineered cells and turns them into materials that out-perform the plastics they replace.", "Our biofoundry tunes each strain to make one protein, cleanly, at scale — fermented like beer, not drilled like oil.", "The result: a fibre stronger than nylon by weight, fully compostable, already in trial garments with three partners."];
export default function Morph() {
  const root = useRef<HTMLElement>(null), progress = useRef(0);
  const [c, setC] = useState(0);
  useEffect(() => {
    const st = ScrollTrigger.create({ trigger: root.current, start: "top top", end: "bottom bottom", onUpdate: (s) => { progress.current = s.progress; const v = s.progress < 0.3 ? 0 : s.progress < 0.66 ? 1 : 2; setC((p) => (p === v ? p : v)); } });
    return () => st.kill();
  }, []);
  return (
    <section ref={root} className="relative h-[280vh] bg-petrol text-paper">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <Lazy3D poster="/img/molecule_0e2b2e_9fe6c8_c9b8ff.webp" posterSm="/img/molecule_0e2b2e_9fe6c8_c9b8ff-m.webp" priority eager alt="" render={({ onReady, running }) => <CellScene progress={progress} running={running} onReady={onReady} />} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-petrol/90 via-transparent to-transparent md:bg-gradient-to-r md:from-petrol/80 md:via-petrol/10" />
        <div className="wrap relative flex h-full flex-col justify-end pb-[10vh] md:justify-center md:pb-0">
          <div className="relative min-h-[300px] md:min-h-[420px]">
            {ch.map(([e, h], i) => (
              <div key={h} className={`absolute inset-x-0 bottom-0 max-w-[640px] transition-[opacity,transform] duration-1000 ease-[cubic-bezier(.16,1,.3,1)] md:top-0 md:bottom-auto ${c === i ? "translate-y-0 opacity-100" : c > i ? "pointer-events-none -translate-y-8 opacity-0" : "pointer-events-none translate-y-8 opacity-0"}`}>
                <p className="eyebrow text-mint">{e}</p>
                {i === 0 ? <h1 className="display mt-5 text-[clamp(56px,7.6vw,128px)]"><span className="kit-mask"><span className="kit-line">{h}</span></span></h1> : <h2 className="display mt-5 text-[clamp(52px,7vw,120px)]">{h}</h2>}
                <p className={`mt-6 max-w-[44ch] text-[16px] leading-[1.7] text-paper/75 ${i === 0 ? "kit-soft" : ""}`}>{body[i]}</p>
                {i === 0 && <a href="#platform" className="btn pointer-events-auto mt-8 bg-lilac text-ink hover:bg-mint">See the platform <Arrow /></a>}
              </div>
            ))}
          </div>
        </div>
        <div className="wrap absolute inset-x-0 bottom-6 flex items-center gap-4"><div className="h-px flex-1 bg-paper/15"><div className="h-px origin-left bg-mint transition-transform duration-700" style={{ transform: `scaleX(${(c + 1) / 3})` }} /></div><span className="eyebrow text-paper/60">0{c + 1}/03</span></div>
      </div>
    </section>
  );
}
