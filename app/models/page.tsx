import Shell from "@/components/Shell";
import { Head } from "@/components/UI";
import Viewer from "@/components/Viewer";
import { models } from "@/lib/content";
export const metadata = { title: "Models — Anorix Science" };
export default function Page() {
  return (<Shell path="/models"><Head eyebrow="Mo · Models" title={<>Three models,<br /><span className="text-mint">one loop.</span></>} lead="Each model does one job well and hands its results to the next. Use one on its own or run all three, from idea to a structure you can test." />
    <section className="bg-paper py-[clamp(64px,8vw,120px)] text-ink"><div className="wrap space-y-6">
      {models.map((m, i) => (<a key={m.slug} href={`/models/${m.slug}`} className="group grid overflow-hidden rounded-[28px] bg-deep text-paper md:grid-cols-12">
        <div className={`relative h-[320px] md:col-span-6 md:h-[420px] ${i % 2 ? "md:order-2" : ""}`}><Viewer shape={m.shape} dense={.45} bg="#081d1f" /></div>
        <div className="flex flex-col p-8 md:col-span-6 md:p-12"><div className="flex items-center justify-between"><span className="eyebrow text-mint">Model {m.no}</span><span className="rounded-full px-3 py-1 text-[12px] ring-1 ring-paper/20">{m.tag}</span></div>
          <h2 className="display mt-6 text-[clamp(36px,3.6vw,60px)]">{m.name}</h2><p className="mt-4 max-w-[44ch] text-[16px] leading-[1.7] text-paper/70">{m.short}</p>
          <p className="mt-6 flex flex-wrap gap-2">{m.uses.map((u) => <span key={u} className="rounded-full bg-paper/10 px-3 py-1 text-[13px]">{u}</span>)}</p>
          <span className="mt-auto pt-8 text-[14px] font-medium text-mint transition-transform group-hover:translate-x-1">Open model {m.no} →</span></div></a>))}
    </div></section></Shell>);
}
