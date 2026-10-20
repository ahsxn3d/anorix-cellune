import Shell from "@/components/Shell";
import { Head } from "@/components/UI";
import { plans } from "@/lib/content";
export const metadata = { title: "Pricing — Anorix Science" };
export default function Page() {
  return (<Shell path="/pricing"><Head eyebrow="Pr · Pricing" title={<>Pick a plan.<br /><span className="text-mint">Run the models.</span></>} lead="Indicative prices while we are in early access. Pick the plan that fits and we will confirm the details with you." />
    <section className="bg-paper py-[clamp(64px,8vw,120px)] text-ink"><div className="wrap grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {plans.map((p, i) => (<div key={p.id} className={`flex flex-col rounded-[24px] p-7 ring-1 ${i === 1 ? "bg-deep text-paper ring-deep" : "ring-ink/15"}`}>
        <div className="flex items-start justify-between"><span className={`relative grid h-[64px] w-[58px] place-items-center rounded-[6px] ${i === 1 ? "bg-mint text-ink" : "bg-lilac text-ink"}`}><span className="absolute left-1.5 top-1 text-[9px]">0{i + 1}</span><span className="display text-[26px]">{p.el}</span></span>{i === 1 && <span className="rounded-full bg-mint px-3 py-1 text-[12px] text-ink">Most teams</span>}</div>
        <h2 className="display mt-6 text-[32px]">{p.name}</h2><p className="mt-1 text-[14px] opacity-70">{p.for}</p>
        <p className="display mt-6 text-[48px] leading-none">{p.price}</p><p className="mt-1 text-[12px] uppercase tracking-[.12em] opacity-60">{p.note}</p>
        <ul className="mt-6 space-y-3 border-t border-current/15 pt-6 text-[15px]">{p.gets.map((g) => <li key={g} className="flex gap-3"><span className="text-violet">+</span>{g}</li>)}</ul>
        <a href={`/request-access?plan=${p.id}`} className={`btn mt-auto justify-center pt-4 ${i === 1 ? "mt-8 bg-mint text-ink hover:bg-lilac" : "mt-8 bg-ink text-paper hover:bg-violet"}`}>Choose {p.name}</a></div>))}
    </div><p className="wrap mt-8 text-[13px] text-mute">Prices exclude tax. Demo site: nothing is charged.</p></section>
  </Shell>);
}
