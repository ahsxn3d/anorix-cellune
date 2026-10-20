import Shell from "@/components/Shell";
import { Head } from "@/components/UI";
import Viewer from "@/components/Viewer";
export const metadata = { title: "About — Anorix Science" };
const blocks = [["Why", "Most good ideas in chemistry die in a spreadsheet before anyone tests them. We want the first pass, from idea to a structure worth making, to take an afternoon instead of a quarter."], ["What", "Three models that share one loop: the Discovery Engine proposes molecules, the Biophysics Simulator tests how they bind and mutate, and the Material Designer builds crystals for batteries."], ["How", "Generative models propose; physics-based simulation checks. Everything you get back can be opened in 3D and exported in the formats your lab already uses."], ["Where we are", "Early access. Model cards and benchmarks are being written. We would rather publish late and honestly than early and loud."]];
export default function Page() {
  return (<Shell path="/about"><Head eyebrow="Ab · About" title={<>Math, biology<br /><span className="text-mint">and physics.</span></>} lead="Anorix Science builds AI models for the parts of chemistry that are really search problems, with physics as the referee." />
    <section className="bg-paper py-[clamp(64px,8vw,120px)] text-ink"><div className="wrap grid gap-12 lg:grid-cols-12">
      <div className="space-y-px overflow-hidden rounded-[24px] ring-1 ring-ink/15 lg:col-span-7">{blocks.map(([h, p], i) => <div key={h} className="grid gap-4 border-b border-ink/10 p-7 last:border-0 sm:grid-cols-[120px_1fr]"><span className="eyebrow text-violet">0{i + 1} · {h}</span><p className="text-[17px] leading-[1.7]">{p}</p></div>)}</div>
      <div className="lg:col-span-5"><div className="relative aspect-[4/5] overflow-hidden rounded-[28px]"><Viewer shape={2} dense={.5} bg="#0e2b2e" z={12} /></div><p className="eyebrow mt-3 text-mute">Fig. 3 · Cell, live particle render</p></div>
    </div></section>
    <section className="bg-mint py-[clamp(56px,7vw,100px)] text-ink"><div className="wrap flex flex-col justify-between gap-6 md:flex-row md:items-end"><h2 className="display max-w-[16ch] text-[clamp(36px,4.4vw,72px)]">Built by Anorix, one model at a time.</h2><a href="/contact" className="btn bg-ink text-paper hover:bg-violet">Say hello →</a></div></section>
  </Shell>);
}
