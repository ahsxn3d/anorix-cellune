import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import Viewer from "@/components/Viewer";
import { models, getModel } from "@/lib/content";
export function generateStaticParams() { return models.map((m) => ({ slug: m.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const m = getModel((await params).slug); return { title: m ? `${m.name} — Anorix Science` : "Model — Anorix Science" }; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const m = getModel((await params).slug); if (!m) notFound(); const i = models.indexOf(m), next = models[(i + 1) % models.length];
  return (<Shell path="/models">
    <section className="relative min-h-[100svh] overflow-hidden bg-[#02272a] text-paper">
      <div className="absolute inset-0"><Viewer shape={m.shape} dense={.9} x={2.6} z={13} /></div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#02272a] via-transparent to-transparent md:bg-gradient-to-r md:from-[#02272a]/90 md:via-transparent" />
      <div className="wrap relative flex min-h-[100svh] flex-col justify-end pb-16 pt-40 md:justify-center">
        <p className="eyebrow text-mint">Model {m.no} · {m.tag}</p><h1 className="display mt-5 max-w-[12ch] text-[clamp(48px,6.6vw,112px)]">{m.name}</h1>
        <p className="mt-6 max-w-[46ch] text-[17px] leading-[1.7] text-paper/75">{m.does}</p>
        <div className="mt-8 flex flex-wrap gap-3"><a href={`/request-access?model=${m.slug}`} className="btn bg-mint text-ink hover:bg-lilac">Request access</a><a href="/pricing" className="btn ring-1 ring-paper/25 hover:bg-paper/10">See plans</a></div>
        <p className="eyebrow mt-10 text-paper/45">Live particle render · illustrative, not model output</p></div></section>
    <section className="bg-paper py-[clamp(72px,9vw,140px)] text-ink"><div className="wrap grid gap-6 md:grid-cols-2">
      {([["In", "Inputs", m.inputs], ["Out", "Outputs", m.outputs]] as const).map(([el, k, list]) => (<div key={k} className="rounded-[24px] p-8 ring-1 ring-ink/15"><div className="flex items-center gap-4"><span className="display grid h-14 w-14 place-items-center rounded-[6px] bg-lilac text-[22px]">{el}</span><h2 className="display text-[36px]">{k}</h2></div>
        <ul className="mt-6 divide-y divide-ink/10">{list.map((x) => <li key={x} className="py-4 text-[16px] leading-[1.6]">{x}</li>)}</ul></div>))}
    </div></section>
    <section className="bg-petrol py-[clamp(72px,9vw,140px)] text-paper"><div className="wrap"><p className="eyebrow text-mint">Example workflow</p><h2 className="display mt-4 text-[clamp(40px,5vw,84px)]">How a run goes.</h2>
      <ol className="mt-12 grid gap-5 md:grid-cols-4">{m.workflow.map(([h, p], k) => <li key={h} className="rounded-[24px] bg-deep p-7 ring-1 ring-paper/10"><span className="display text-[64px] leading-none text-paper/15">0{k + 1}</span><h3 className="display mt-6 text-[30px]">{h}</h3><p className="mt-3 text-[15px] leading-[1.6] text-paper/70">{p}</p></li>)}</ol></div></section>
    <section className="bg-lilac py-[clamp(64px,8vw,110px)] text-ink"><div className="wrap grid gap-8 md:grid-cols-12"><div className="md:col-span-7"><p className="eyebrow">Model card</p><h2 className="display mt-4 text-[clamp(36px,4.4vw,72px)]">Coming soon.</h2><p className="mt-4 max-w-[50ch] text-[16px] leading-[1.7] text-ink/70">We will publish what the model was trained on, how we measure it and where it fails before it opens to everyone. Until then, access is by request.</p></div>
      <a href={`/models/${next.slug}`} className="group self-end rounded-[24px] bg-ink p-7 text-paper md:col-span-5"><span className="eyebrow text-mint">Next · Model {next.no}</span><span className="display mt-3 block text-[30px]">{next.name} →</span></a></div></section>
  </Shell>);
}
