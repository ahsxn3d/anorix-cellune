"use client";
import { useEffect, useRef, useState } from "react";
import { nav, models } from "@/lib/content";

// Sitemap as a molecule: each link is an atom, bonds carry travelling particles. Positions in % of the stage.
const nodes: [string, string, string, number, number, number][] = [
  ["As", "Home", "/", 50, 50, 1.25], ["Mo", "Models", "/models", 28, 30, 1], ["Re", "Research", "/research", 72, 28, .9], ["Pr", "Pricing", "/pricing", 80, 66, .9],
  ["Ab", "About", "/about", 22, 72, .85], ["Fq", "FAQ", "/faq", 50, 86, .75], ["Ct", "Contact", "/contact", 92, 44, .75], ["Ra", "Request access", "/request-access", 8, 44, .95],
];
const bonds = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [2, 6], [3, 6], [1, 7], [4, 7]];

function Stage() {
  const cv = useRef<HTMLCanvasElement>(null), hot = useRef(-1), [h, setH] = useState(-1);
  useEffect(() => {
    const c = cv.current!, g = c.getContext("2d")!; let w = 0, ht = 0, raf = 0, vis = true, t0 = performance.now();
    const R = () => Math.random();
    const shell = nodes.map((_, i) => Array.from({ length: 150 }, () => ({ a: R() * 6.283, b: R() * 6.283, s: .4 + R() * .9, r: .55 + R() * .5, i })));
    const flow = bonds.map(() => Array.from({ length: 26 }, () => ({ t: R(), v: .03 + R() * .05, o: (R() - .5) * 6 })));
    const glow = nodes.map(() => 0);
    const size = () => { const d = Math.min(2, devicePixelRatio); w = c.clientWidth; ht = c.clientHeight; c.width = w * d; c.height = ht * d; g.setTransform(d, 0, 0, d, 0, 0); };
    size(); const ro = new ResizeObserver(size); ro.observe(c);
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; if (vis) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); } }); io.observe(c);
    function draw(now: number) {
      if (!vis) return; const t = (now - t0) / 1000, base = Math.min(w, ht * 1.6) * .07;
      g.clearRect(0, 0, w, ht); g.globalCompositeOperation = "lighter";
      const P = nodes.map(([, , , x, y]) => [x / 100 * w, y / 100 * ht]);
      nodes.forEach((_, i) => { glow[i] += ((hot.current === i ? 1 : 0) - glow[i]) * .12; });
      bonds.forEach(([a, b], k) => { g.strokeStyle = "rgba(201,184,255,.14)"; g.lineWidth = 1; g.beginPath(); g.moveTo(P[a][0], P[a][1]); g.lineTo(P[b][0], P[b][1]); g.stroke();
        const lit = Math.max(glow[a], glow[b]), dx = P[b][0] - P[a][0], dy = P[b][1] - P[a][1], L = Math.hypot(dx, dy) || 1;
        for (const f of flow[k]) { f.t = (f.t + f.v * (1 + lit * 2) / 60) % 1; const x = P[a][0] + dx * f.t - dy / L * f.o, y = P[a][1] + dy * f.t + dx / L * f.o;
          g.fillStyle = `rgba(159,230,200,${.35 + lit * .5})`; g.fillRect(x - 1, y - 1, 2, 2); } });
      shell.forEach((pts, i) => { const [cx, cy] = P[i], rr = base * nodes[i][5] * (1 + glow[i] * .35);
        for (const p of pts) { p.a += .004 * p.s * (1 + glow[i] * 3); const x = cx + Math.cos(p.a) * Math.sin(p.b + t * .2) * rr * p.r, y = cy + Math.sin(p.a) * rr * p.r * .9;
          const z = Math.cos(p.b + t * .2); g.fillStyle = i === 0 || i === 7 ? `rgba(159,230,200,${.25 + z * .2 + glow[i] * .4})` : `rgba(201,184,255,${.22 + z * .2 + glow[i] * .45})`; const s = 1.2 + (z + 1) * .7; g.fillRect(x, y, s, s); } });
      g.globalCompositeOperation = "source-over"; raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);
  const on = (i: number) => { hot.current = i; setH(i); };
  return (<div className="relative h-[460px] md:h-[520px]">
    <canvas ref={cv} className="absolute inset-0 h-full w-full" aria-hidden="true" />
    <nav aria-label="Sitemap">
      {nodes.map(([el, n, href, x, y], i) => (
        <a key={href} href={href} onMouseEnter={() => on(i)} onMouseLeave={() => on(-1)} onFocus={() => on(i)} onBlur={() => on(-1)} style={{ left: `${x}%`, top: `${y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-center text-paper outline-none">
          <span className={`display block leading-none transition-[color,transform] duration-300 ${i === 0 ? "text-[34px] md:text-[44px]" : "text-[24px] md:text-[30px]"} ${h === i ? "scale-110 text-mint" : ""}`}>{el}</span>
          <span className={`mt-1 block whitespace-nowrap text-[10px] uppercase tracking-[.14em] transition-opacity md:text-[11px] ${h === i ? "opacity-100" : "opacity-55"}`}>{n}</span></a>))}
    </nav></div>);
}

export default function MoleculeFooter() {
  return (
    <footer className="relative overflow-hidden bg-deep text-paper">
      <div className="wrap grid gap-10 border-b border-paper/10 py-[clamp(64px,8vw,112px)] lg:grid-cols-12">
        <div className="lg:col-span-7"><p className="eyebrow text-mint">Next experiment</p><h2 className="display mt-4 text-[clamp(44px,6vw,104px)]">Bring us a hard problem.</h2></div>
        <div className="self-end lg:col-span-4 lg:col-start-9"><p className="text-[15px] leading-[1.7] text-paper/70">Tell us the target, the structure or the material. We will tell you which model fits and what it can do today.</p>
          <a href="/request-access" className="btn mt-6 bg-mint text-ink hover:bg-lilac">Request access →</a></div>
      </div>
      <div className="wrap grid gap-8 py-10 lg:grid-cols-12">
        <div className="lg:col-span-8"><p className="eyebrow text-paper/50">Fig. 1 — Sitemap, drawn as a molecule. Hover an atom.</p><Stage /></div>
        <aside className="lg:col-span-4 lg:border-l lg:border-paper/10 lg:pl-8">
          <p className="eyebrow text-paper/50">References</p>
          <ol className="mt-5 space-y-4 text-[13px] leading-[1.6] text-paper/70">
            {models.map((m, i) => <li key={m.slug}><span className="mr-2 tabular-nums text-mint">[{i + 1}]</span><a className="underline-offset-4 hover:text-paper hover:underline" href={`/models/${m.slug}`}>{m.name}</a>. Anorix Science, model card in preparation.</li>)}
            <li><span className="mr-2 tabular-nums text-mint">[4]</span>PubChem, NIH/NCBI. Public compound data used in our examples.</li>
            <li><span className="mr-2 tabular-nums text-mint">[5]</span>RCSB Protein Data Bank. Public protein structures used in our examples.</li>
          </ol>
          <p className="eyebrow mt-10 text-paper/50">Index</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-[13px] text-paper/70">{nav.map(([el, n, h]) => <li key={h}><a href={h} className="hover:text-mint"><span className="mr-2 text-paper/40">{el}</span>{n}</a></li>)}</ul>
        </aside>
      </div>
      <div className="wrap flex flex-col justify-between gap-3 border-t border-paper/10 py-7 text-[12px] text-paper/50 md:flex-row"><span>© 2026 Anorix Science. Concept site; models are in early access and figures are placeholders.</span><span>Lab notebook · vol. 06</span></div>
    </footer>
  );
}
