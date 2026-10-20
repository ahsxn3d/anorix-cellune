"use client";
import { useEffect, useState } from "react";
import { plans, models } from "@/lib/content";
export default function AccessForm() {
  const [plan, setPlan] = useState("lab"), [sel, setSel] = useState<string[]>([]), [busy, setBusy] = useState(false);
  useEffect(() => { const q = new URLSearchParams(location.search); const p = q.get("plan"), m = q.get("model"); if (p && plans.some((x) => x.id === p)) setPlan(p); if (m && models.some((x) => x.slug === m)) setSel([m]); }, []);
  const P = plans.find((p) => p.id === plan)!;
  const input = "w-full rounded-[12px] bg-transparent px-4 py-3.5 text-[16px] outline-none ring-1 ring-ink/20 focus:ring-2 focus:ring-violet";
  return (<form className="grid gap-10 lg:grid-cols-12" onSubmit={(e) => { e.preventDefault(); setBusy(true); setTimeout(() => { location.href = `/request-access/done?plan=${plan}`; }, 700); }}>
    <div className="space-y-8 lg:col-span-7">
      <fieldset><legend className="eyebrow text-violet">1 · Plan</legend><div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">{plans.map((p) => <label key={p.id} className="cursor-pointer"><input type="radio" name="plan" className="peer sr-only" checked={plan === p.id} onChange={() => setPlan(p.id)} /><span className="flex h-[92px] flex-col justify-between rounded-[10px] p-3 ring-1 ring-ink/20 transition-colors peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:ring-2 peer-focus-visible:ring-violet"><span className="display text-[24px] leading-none">{p.el}</span><span className="text-[13px]">{p.name}</span></span></label>)}</div></fieldset>
      <fieldset><legend className="eyebrow text-violet">2 · Models</legend><div className="mt-4 flex flex-wrap gap-2">{models.map((m) => <label key={m.slug} className="cursor-pointer"><input type="checkbox" className="peer sr-only" checked={sel.includes(m.slug)} onChange={() => setSel((s) => s.includes(m.slug) ? s.filter((x) => x !== m.slug) : [...s, m.slug])} /><span className="block rounded-full px-4 py-2.5 text-[14px] ring-1 ring-ink/25 transition-colors peer-checked:bg-violet peer-checked:text-paper">{m.name}</span></label>)}</div></fieldset>
      <fieldset className="grid gap-4 sm:grid-cols-2"><legend className="eyebrow mb-4 text-violet">3 · You</legend>
        <label className="text-[13px]">Name<input required className={`${input} mt-2`} autoComplete="name" /></label>
        <label className="text-[13px]">Work email<input required type="email" className={`${input} mt-2`} autoComplete="email" /></label>
        <label className="text-[13px] sm:col-span-2">Organisation<input required className={`${input} mt-2`} autoComplete="organization" /></label>
        <label className="text-[13px] sm:col-span-2">What do you want to try?<textarea rows={4} className={`${input} mt-2`} placeholder="A target, a structure, a material…" /></label></fieldset>
    </div>
    <aside className="lg:col-span-4 lg:col-start-9"><div className="sticky top-28 rounded-[24px] bg-deep p-7 text-paper">
      <p className="eyebrow text-mint">Summary</p><p className="display mt-4 text-[34px]">{P.name}</p><p className="text-[14px] text-paper/60">{P.for}</p>
      <div className="mt-6 flex items-end justify-between border-y border-paper/10 py-5"><span className="text-[14px] text-paper/60">Indicative</span><span className="text-right"><span className="display block text-[36px] leading-none">{P.price}</span><span className="text-[11px] uppercase tracking-[.12em] text-paper/50">{P.note}</span></span></div>
      <p className="mt-5 text-[14px] text-paper/70">{sel.length ? `${sel.length} model${sel.length > 1 ? "s" : ""} selected` : "No model picked yet — we will suggest one."}</p>
      <button disabled={busy} className="btn mt-6 w-full justify-center bg-mint text-ink hover:bg-lilac disabled:opacity-60">{busy ? "Sending…" : "Send request"}</button>
      <p className="mt-4 text-[12px] text-paper/50">Demo form: nothing is sent or charged.</p></div></aside>
  </form>);
}
