"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Arrow } from "./kit/ui";
const shots = [["/img/hero-mol.webp", "Caffeine molecule, ball-and-stick (PubChem CID 2519)", "md:translate-x-[20%] xl:translate-x-[13%]", "max-md:object-[32%_30%]"], ["/img/hero-dock.webp", "HIV-1 protease with a bound inhibitor (PDB 1HSG)", "md:translate-x-[8%]", "max-md:object-[56%_30%]"], ["/img/hero-crystal.webp", "Layered oxide crystal lattice", "", "max-md:object-[84%_30%]"]];
const ch = [
  ["01 · Molecules", "AI that does chemistry."],
  ["02 · Biophysics", "Physics in the loop."],
  ["03 · Materials", "Crystals by design."],
];
const body = ["Three AI models where math, biology and physics meet: one proposes molecules, one simulates how they bind and mutate, one designs crystals and battery materials.", "The Biophysics Simulator docks candidate molecules into protein targets and scores how mutations change binding, so ideas are tested in silico first.", "The 3D Crystal & Battery Material Designer builds periodic structures atom by atom and screens them for the properties a cell or battery needs."];
export default function Morph() {
  const root = useRef<HTMLElement>(null);
  const [c, setC] = useState(0);
  useEffect(() => {
    const st = ScrollTrigger.create({ trigger: root.current, start: "top top", end: "bottom bottom", onUpdate: (s) => { const v = s.progress < 0.3 ? 0 : s.progress < 0.66 ? 1 : 2; setC((p) => (p === v ? p : v)); } });
    return () => st.kill();
  }, []);
  return (
    <section ref={root} className="relative h-[280vh] bg-petrol text-paper">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#02272a]">
        {shots.map(([src, alt, sh], i) => (
          <div key={src} className={`absolute inset-0 transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] motion-reduce:transition-none ${c === i ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"}`}>
            <div className={`absolute inset-0 max-md:-inset-x-[30%] max-md:bottom-[46%] max-md:top-[10%] ${sh}`}><Image src={src} alt={alt} fill priority={i === 0} sizes="(max-width:767px) 160vw, 100vw" className="object-cover max-md:object-contain" /></div>
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#02272a]/90 via-transparent to-transparent md:bg-gradient-to-r md:from-[#02272a]/80 md:via-[#02272a]/10" />
        <div className="wrap relative flex h-full flex-col justify-end pb-[10vh] md:justify-center md:pb-0">
          <div className="relative min-h-[300px] md:min-h-[420px]">
            {ch.map(([e, h], i) => (
              <div key={h} className={`absolute inset-x-0 bottom-0 max-w-[640px] transition-[opacity,transform] duration-1000 ease-[cubic-bezier(.16,1,.3,1)] md:top-0 md:bottom-auto ${c === i ? "translate-y-0 opacity-100" : c > i ? "pointer-events-none -translate-y-8 opacity-0" : "pointer-events-none translate-y-8 opacity-0"}`}>
                <p className="eyebrow text-mint">{e}</p>
                {i === 0 ? <h1 className="display mt-5 text-[clamp(56px,7.6vw,128px)]"><span className="kit-mask"><span className="kit-line">{h}</span></span></h1> : <h2 className="display mt-5 text-[clamp(52px,7vw,120px)]">{h}</h2>}
                <p className={`mt-6 max-w-[44ch] text-[16px] leading-[1.7] text-paper/75 ${i === 0 ? "kit-soft" : ""}`}>{body[i]}</p>
                {i === 0 && <a href="#platform" className="btn pointer-events-auto mt-8 bg-lilac text-ink hover:bg-mint">See the models <Arrow /></a>}
              </div>
            ))}
          </div>
        </div>
        <div className="wrap absolute inset-x-0 bottom-6 flex items-center gap-4"><div className="h-px flex-1 bg-paper/15"><div className="h-px origin-left bg-mint transition-transform duration-700" style={{ transform: `scaleX(${(c + 1) / 3})` }} /></div><span className="eyebrow text-paper/60">0{c + 1}/03</span></div>
      </div>
    </section>
  );
}
