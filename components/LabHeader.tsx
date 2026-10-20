"use client";
import { useEffect, useState } from "react";
import { nav } from "@/lib/content";

export function AsTile({ big = false }: { big?: boolean }) {
  return (<span className={`relative grid shrink-0 place-items-center rounded-[6px] bg-lilac text-ink ring-1 ring-ink/10 ${big ? "h-[64px] w-[58px]" : "h-[52px] w-[48px]"}`}>
    <span className="absolute left-1.5 top-1 text-[9px] font-medium tabular-nums">06</span>
    <span className={`display leading-none ${big ? "text-[30px]" : "text-[25px]"}`}>As</span>
    <span className="absolute bottom-1 text-[7px] uppercase tracking-[.12em] opacity-70">anorix</span></span>);
}
function Tile({ el, name, href, no, active, accent = false }: { el: string; name: string; href: string; no: string; active: boolean; accent?: boolean }) {
  return (<a href={href} aria-current={active ? "page" : undefined} className={`group relative flex h-[52px] flex-col justify-between rounded-[6px] px-2 py-1 ring-1 transition-[background,color,transform] duration-300 hover:-translate-y-0.5 ${accent ? "w-[112px] bg-mint text-ink ring-mint hover:bg-paper" : active ? "w-[64px] bg-paper text-ink ring-paper" : "w-[64px] text-paper ring-paper/20 hover:bg-paper/10"}`}>
    <span className="text-[9px] tabular-nums opacity-60">{no}</span>
    <span className="display text-[19px] leading-none">{el}</span>
    <span className="truncate text-[8px] uppercase tracking-[.06em] opacity-70">{name}</span></a>);
}
export default function LabHeader({ path = "/" }: { path?: string }) {
  const [open, setOpen] = useState(false), [solid, setSolid] = useState(false);
  useEffect(() => { const f = () => setSolid(window.scrollY > 40); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const act = (h: string) => path === h || path.startsWith(h + "/");
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid || open ? "bg-deep/85 backdrop-blur-md" : ""}`}>
      <div className="wrap flex items-center justify-between gap-6 py-3">
        <a href="/" aria-label="Anorix Science home" className="flex items-center gap-3 text-paper">
          <AsTile /><span className="leading-[1.05]"><span className="display block text-[17px]">anorix</span><span className="display block text-[17px] text-mint">science</span><span className="block text-[10px] uppercase tracking-[.16em] text-paper/50">AI × chemistry</span></span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-1.5 lg:flex">
          {nav.map(([el, n, h, no]) => <Tile key={h} el={el} name={n} href={h} no={no} active={act(h)} />)}
          <span className="mx-1 h-8 w-px bg-paper/15" /><Tile el="Ra" name="Request access" href="/request-access" no="07" active={act("/request-access")} accent />
        </nav>
        <button aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)} className="flex h-[52px] w-[56px] flex-col justify-between rounded-[6px] bg-mint px-2 py-1 text-left text-ink lg:hidden">
          <span className="text-[9px]">00</span><span className="display text-[19px] leading-none">{open ? "×" : "Ix"}</span><span className="text-[8.5px] uppercase tracking-[.1em]">{open ? "close" : "index"}</span></button>
      </div>
      <div className="h-px bg-[repeating-linear-gradient(90deg,rgba(238,241,236,.25)_0_1px,transparent_1px_12px)]" />
      {open && <nav aria-label="Mobile" className="wrap grid grid-cols-3 gap-2 py-4 lg:hidden">
        {nav.map(([el, n, h, no]) => <a key={h} href={h} className={`flex h-[84px] flex-col justify-between rounded-[8px] p-2 ring-1 ${act(h) ? "bg-paper text-ink ring-paper" : "text-paper ring-paper/20"}`}><span className="text-[10px]">{no}</span><span className="display text-[30px] leading-none">{el}</span><span className="text-[10px] uppercase tracking-[.1em] opacity-70">{n}</span></a>)}
        <a href="/request-access" className="col-span-3 flex items-center justify-between rounded-[8px] bg-mint p-3 text-ink"><span className="display text-[26px]">Ra</span><span className="text-[13px] uppercase tracking-[.12em]">Request access →</span></a>
      </nav>}
    </header>
  );
}
