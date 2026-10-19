"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Arrow, Marquee } from "./kit/ui";

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="wrap flex items-center justify-between pt-5">
        <a href="#" aria-label="Anorix Science home" className="flex items-center gap-2.5 rounded-full bg-deep/70 py-2 pl-2 pr-4 text-paper ring-1 ring-paper/10 backdrop-blur-md">
          <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true"><circle cx="16" cy="16" r="14" fill="#c9b8ff" /><circle cx="16" cy="16" r="6" fill="#0e2b2e" /><circle cx="24" cy="9" r="2.4" fill="#0e2b2e" /></svg>
          <span className="display text-[19px] tracking-[-0.02em]">anorix science</span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-1 rounded-full bg-deep/70 p-1.5 text-[14px] text-paper ring-1 ring-paper/10 backdrop-blur-md md:flex">
          {[["Models", "#platform"], ["How it runs", "#process"], ["Science", "#science"], ["Contact", "#contact"]].map(([l, h]) => <a key={l} href={h} className="rounded-full px-4 py-2 transition-colors hover:bg-paper/10">{l}</a>)}
          <a href="#contact" className="ml-1 rounded-full bg-mint px-4 py-2 font-medium text-ink transition-colors hover:bg-lilac">Request a demo</a>
        </nav>
        <button aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-full bg-mint text-ink md:hidden"><span className={`block h-0.5 w-5 bg-current shadow-[0_6px_0_currentColor] transition-transform ${open ? "translate-y-[3px] rotate-45 shadow-none" : "-translate-y-[3px]"}`} /></button>
      </div>
      <div className={`wrap transition-[opacity,transform] duration-500 md:hidden ${open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"}`}>
        <nav aria-label="Mobile" className="mt-3 grid gap-1 rounded-3xl bg-deep/95 p-3 text-paper ring-1 ring-paper/10">
          {[["Models", "#platform"], ["How it runs", "#process"], ["Science", "#science"], ["Contact", "#contact"]].map(([l, h]) => <a key={l} href={h} onClick={() => setOpen(false)} className="display rounded-2xl px-4 py-3 text-[28px]">{l}</a>)}
        </nav>
      </div>
    </header>
  );
}

const products = [
  { k: "Model 01", n: "Bio-Molecular Discovery Engine", d: "Molecular discovery. In: a target and your constraints. Out: ranked candidate molecules with predicted properties, viewable in 3D.", img: "/img/sci-mol.webp", tag: "Chemistry", bg: "bg-deep text-paper" },
  { k: "Model 02", n: "Biophysics Simulator", d: "Molecular docking and mutation analysis. In: a protein structure and a ligand. Out: binding poses, scores and per-mutation effects.", img: "/img/sci-dock.webp", tag: "Biology · physics", bg: "bg-paper text-ink" },
  { k: "Model 03", n: "3D Crystal & Battery Material Designer", d: "Materials design. In: elements and target properties. Out: candidate crystal lattices you can rotate, inspect and export.", img: "/img/sci-crystal.webp", tag: "Materials", bg: "bg-lilac text-ink" },
];

export function Platform() {
  return (
    <section id="platform" className="relative z-10 -mt-10 rounded-t-[36px] bg-paper py-[clamp(96px,11vw,170px)] text-ink">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12">
          <p className="eyebrow text-violet lg:col-span-3">The models</p>
          <h2 className="display text-[clamp(44px,5.6vw,96px)] lg:col-span-9" data-reveal="lines">Three models. One loop from idea to structure.</h2>
        </div>
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {products.map((p, i) => (
            <article key={p.n} className={`hov-wrap group relative flex min-h-[520px] flex-col overflow-hidden rounded-[28px] ${p.bg}`} data-fade data-delay={i * 0.08}>
              <div className="relative h-[280px] overflow-hidden"><div className="hov absolute inset-0"><Image src={p.img} alt={`${p.n} visual`} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover object-[78%_50%]" /></div></div>
              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-center justify-between"><span className="eyebrow opacity-70">{p.k}</span><span className="rounded-full border border-current/20 px-3 py-1 text-[12px]">{p.tag}</span></div>
                <h3 className="display mt-4 text-[40px]">{p.n}</h3>
                <p className="mt-3 max-w-[36ch] text-[15px] leading-[1.6] opacity-75">{p.d}</p>
                <a href="#contact" className="mt-auto flex items-center gap-2 pt-6 text-[14px] font-medium">Request a demo <span className="grid h-8 w-8 place-items-center rounded-full bg-current/10 transition-transform duration-500 group-hover:rotate-45"><Arrow /></span></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  ["Describe", "Start from a target, a structure file or a plain-language question about the chemistry.", "M8 32c8-16 16-16 24 0s16 16 24 0"],
  ["Generate", "The models propose candidates: molecules, binding poses or crystal lattices.", "M14 14h36v36H14zM14 32h36M32 14v36"],
  ["Simulate", "Physics checks each idea: docking scores, mutation effects, structural stability.", "M20 10h24v8l6 36H14l6-36z"],
  ["Inspect", "Explore every result in 3D, compare candidates and export what is worth a lab test.", "M8 20c16 0 32 24 48 24M8 32c16 0 32 12 48 12M8 44c16 0 32 0 48 0"],
];
export function Process() {
  const root = useRef<HTMLElement>(null), track = useRef<HTMLDivElement>(null), bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const t = track.current!;
      const tw = gsap.to(t, { x: () => -(t.scrollWidth - window.innerWidth), ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${t.scrollWidth - window.innerWidth}`, pin: true, scrub: true, invalidateOnRefresh: true, anticipatePin: 1, onUpdate: (s) => { if (bar.current) bar.current.style.transform = `scaleX(${s.progress})`; } } });
      return () => tw.scrollTrigger?.kill();
    });
    return () => mm.revert();
  }, []);
  return (
    <section id="process" ref={root} className="overflow-hidden bg-petrol py-[clamp(96px,10vw,140px)] text-paper lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:py-0">
      <div className="wrap flex items-end justify-between gap-8">
        <h2 className="display max-w-[14ch] text-[clamp(44px,5.4vw,92px)]" data-reveal="lines">From question to 3D structure in four steps.</h2>
        <div className="hidden w-[260px] lg:block"><p className="eyebrow mb-3 text-paper/60">Scroll</p><div className="h-px bg-paper/15"><div ref={bar} className="h-px origin-left scale-x-0 bg-mint" /></div></div>
      </div>
      <div ref={track} className="mt-14 flex flex-col gap-5 px-[clamp(16px,3.4vw,48px)] will-change-transform lg:w-max lg:flex-row">
        {steps.map(([h, p, d], i) => (
          <div key={h} className="group relative flex min-h-[340px] flex-col justify-between rounded-[28px] bg-deep p-8 ring-1 ring-paper/10 transition-colors duration-500 hover:bg-[#0b2427] lg:h-[52vh] lg:w-[34vw]" data-fade>
            <div className="flex items-start justify-between"><span className="display text-[88px] leading-none text-paper/10">0{i + 1}</span>
              <svg viewBox="0 0 64 64" className="h-16 w-16 text-mint" aria-hidden="true"><path d={d} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="[stroke-dasharray:200] [stroke-dashoffset:0] transition-[stroke-dashoffset] duration-1000 group-hover:[stroke-dashoffset:200]" /></svg>
            </div>
            <div><h3 className="display text-[clamp(40px,3.6vw,60px)]">{h}</h3><p className="mt-3 max-w-[34ch] text-[15px] leading-[1.6] text-paper/70">{p}</p></div>
          </div>
        ))}
        <div className="flex min-h-[260px] flex-col justify-end rounded-[28px] bg-mint p-8 text-ink lg:h-[52vh] lg:w-[26vw]">
          <p className="eyebrow">The idea</p><p className="display mt-3 text-[clamp(56px,5.4vw,96px)]">AI × science</p><p className="mt-2 text-[15px] text-ink/70">Math, biology and physics in one workflow.</p>
        </div>
      </div>
    </section>
  );
}

export function Science() {
  return (
    <section id="science" className="bg-paper py-[clamp(96px,11vw,170px)] text-ink">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12">
        <div data-clip className="relative aspect-[4/3] overflow-hidden rounded-[28px] lg:col-span-6"><div data-clip-img className="absolute inset-0"><Image src="/img/sci-dock-lilac.webp" alt="HIV-1 protease backbone with a bound inhibitor (PDB 1HSG)" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover object-[80%_50%]" /></div></div>
        <div className="lg:col-span-5 lg:col-start-8">
          <p className="eyebrow text-violet">The science</p>
          <p className="display mt-6 text-[clamp(32px,3.2vw,52px)] leading-[1.08]" data-reveal="words">Chemistry is a search problem with physics as the referee. The models search; the simulator keeps them honest.</p>
          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-ink/15 pt-8">
            {[[3, "AI models in one loop", 0], [3, "sciences: math, bio, physics", 0], [1, "workflow from idea to 3D", 0]].map(([v, l, d]) => <div key={l as string}><p className="display text-[clamp(36px,4vw,64px)] text-violet"><span data-count={v as number} data-dec={d as number}>0</span></p><p className="mt-2 text-[13px] text-mute">{l as string}</p></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

const papers = [["Model 01", "Bio-Molecular Discovery Engine — model card", "Soon"], ["Model 02", "Biophysics Simulator — docking & mutation analysis notes", "Soon"], ["Model 03", "3D Crystal & Battery Material Designer — model card", "Soon"], ["Overview", "AI × chemistry: how the three models share one loop", "Soon"]];
export function Papers() {
  return (
    <section className="bg-deep py-[clamp(96px,10vw,150px)] text-paper">
      <div className="wrap">
        <div className="flex items-end justify-between"><h2 className="display text-[clamp(40px,4.6vw,76px)]" data-reveal="lines">Model cards.</h2><span className="eyebrow hidden text-paper/50 md:block">Specs to be published</span></div>
        <ul className="mt-12 border-t border-paper/10">
          {papers.map(([j, t, y]) => (
            <li key={t} className="group border-b border-paper/10">
              <a href="#contact" className="grid grid-cols-12 items-center gap-4 py-7 transition-colors duration-500 hover:text-mint">
                <span className="eyebrow col-span-12 text-paper/50 md:col-span-3">{j}</span>
                <span className="display col-span-10 text-[clamp(22px,2.2vw,34px)] leading-[1.15] md:col-span-7">{t}</span>
                <span className="col-span-2 flex items-center justify-end gap-4 text-[14px] tabular-nums text-paper/50">{y}<span className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"><Arrow /></span></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Footer() {
  const [ok, setOk] = useState(false);
  useEffect(() => { ScrollTrigger.refresh(); }, []);
  return (
    <footer id="contact" className="overflow-hidden bg-lilac text-ink">
      <div className="border-b border-ink/10 py-6"><Marquee items={["AI × chemistry", "Math · Bio · Physics", "Docking & mutations", "Crystals & batteries"]} className="display text-[clamp(26px,2.8vw,42px)]" sep="✳" /></div>
      <div className="wrap grid gap-12 py-[clamp(80px,9vw,140px)] lg:grid-cols-12">
        <div className="lg:col-span-6"><p className="eyebrow text-violet">Work with the models</p><h2 className="display mt-5 text-[clamp(52px,7vw,124px)]" data-reveal="lines">Let&apos;s discover what&apos;s next.</h2></div>
        <form className="self-end lg:col-span-5 lg:col-start-8" onSubmit={(e) => { e.preventDefault(); setOk(true); }}>
          <label htmlFor="em" className="eyebrow">Work email</label>
          <div className="mt-3 flex items-center gap-3 border-b border-ink/30 pb-3"><input id="em" type="email" required placeholder="you@company.com" className="w-full bg-transparent text-[20px] outline-none placeholder:text-ink/40" /><button className="btn shrink-0 bg-ink text-paper hover:bg-violet">{ok ? "Thanks, we'll write" : "Send"}</button></div>
          <div className="mt-6 flex flex-wrap gap-2">{["Drug discovery", "Protein engineering", "Battery materials", "Research collab"].map((t) => <label key={t} className="cursor-pointer"><input type="checkbox" className="peer sr-only" /><span className="block rounded-full border border-ink/25 px-4 py-2 text-[14px] transition-colors peer-checked:bg-ink peer-checked:text-paper">{t}</span></label>)}</div>
        </form>
      </div>
      <p className="display select-none px-[clamp(16px,3.4vw,48px)] text-[23vw] leading-[.78] text-ink/[0.1]" aria-hidden="true">anorix</p>
      <div className="wrap flex flex-col justify-between gap-3 border-t border-ink/10 py-8 text-[12px] text-ink/60 md:flex-row"><span>© 2026 Anorix. Science AI models by Ahsan Javed; specs are placeholders until model cards are published.</span><span>Designed &amp; built by Anorix</span></div>
    </footer>
  );
}
