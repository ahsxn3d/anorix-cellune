import Shell from "@/components/Shell";
import { Head } from "@/components/UI";
import Viewer from "@/components/Viewer";
import { notes } from "@/lib/content";
export const metadata = { title: "Research — Anorix Science" };
const principles = [["Hypotheses, not answers", "Every result is a ranked guess with a reason attached. The lab decides."], ["Physics as referee", "Generated ideas are checked by simulation before anyone spends bench time on them."], ["Public data first", "We start from open sources such as PubChem and the PDB, and say so."], ["Publish the failures", "Model cards will list where each model is weak, not just where it shines."]];
export default function Page() {
  return (<Shell path="/research"><Head eyebrow="Re · Research" title={<>Notes from<br /><span className="text-mint">the bench.</span></>} lead="What we are writing up, how we work, and what we will publish before the models open to everyone." />
    <section className="bg-paper py-[clamp(64px,8vw,120px)] text-ink"><div className="wrap grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5"><div className="relative aspect-square overflow-hidden rounded-[28px]"><Viewer shape={4} dense={.5} bg="#081d1f" z={12} /></div><p className="eyebrow mt-3 text-mute">Fig. 2 · Double helix, live particle render</p></div>
      <div className="lg:col-span-7"><p className="eyebrow text-violet">How we work</p><div className="mt-6 grid gap-4 sm:grid-cols-2">{principles.map(([h, p], i) => <div key={h} className="rounded-[20px] p-6 ring-1 ring-ink/15"><span className="text-[12px] tabular-nums text-mute">§{i + 1}</span><h2 className="display mt-3 text-[26px]">{h}</h2><p className="mt-2 text-[15px] leading-[1.6] text-ink/70">{p}</p></div>)}</div></div>
    </div></section>
    <section className="bg-deep py-[clamp(72px,9vw,130px)] text-paper"><div className="wrap"><div className="flex items-end justify-between"><h2 className="display text-[clamp(40px,4.6vw,76px)]">In preparation.</h2><span className="eyebrow hidden text-paper/50 md:block">Nothing published yet</span></div>
      <ul className="mt-10 border-t border-paper/10">{notes.map(([k, t, s]) => <li key={t} className="grid grid-cols-12 items-center gap-4 border-b border-paper/10 py-6"><span className="eyebrow col-span-12 text-paper/50 md:col-span-3">{k}</span><span className="display col-span-10 text-[clamp(20px,2vw,30px)] md:col-span-7">{t}</span><span className="col-span-2 text-right text-[14px] text-mint">{s}</span></li>)}</ul>
      <a href="/contact" className="btn mt-10 bg-mint text-ink hover:bg-lilac">Get notified when they land →</a></div></section>
  </Shell>);
}
