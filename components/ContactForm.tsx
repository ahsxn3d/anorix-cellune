"use client";
import { useState } from "react";
export default function ContactForm() { const [ok, setOk] = useState(false); const input = "w-full rounded-[12px] bg-transparent px-4 py-3.5 text-[16px] outline-none ring-1 ring-ink/20 focus:ring-2 focus:ring-violet";
  if (ok) return <div className="rounded-[24px] bg-deep p-10 text-paper"><p className="eyebrow text-mint">Sent</p><p className="display mt-4 text-[40px]">Thanks. We will write back.</p><p className="mt-3 text-[14px] text-paper/60">Demo form: nothing was sent.</p></div>;
  return (<form onSubmit={(e) => { e.preventDefault(); setOk(true); }} className="grid gap-4 sm:grid-cols-2">
    <label className="text-[13px]">Name<input required className={`${input} mt-2`} /></label><label className="text-[13px]">Email<input required type="email" className={`${input} mt-2`} /></label>
    <label className="text-[13px] sm:col-span-2">Topic<select className={`${input} mt-2`}>{["General", "Model access", "Research collaboration", "Press"].map((t) => <option key={t}>{t}</option>)}</select></label>
    <label className="text-[13px] sm:col-span-2">Message<textarea required rows={6} className={`${input} mt-2`} /></label>
    <button className="btn justify-center bg-ink text-paper hover:bg-violet sm:col-span-2">Send message</button></form>); }
