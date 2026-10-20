"use client";
import { useState } from "react";
import { faq } from "@/lib/content";
export default function Faq() { const [o, setO] = useState(0);
  return <ul className="border-t border-ink/15">{faq.map(([q, a], i) => <li key={q} className="border-b border-ink/15"><button aria-expanded={o === i} onClick={() => setO(o === i ? -1 : i)} className="flex w-full items-center gap-6 py-6 text-left"><span className="w-10 shrink-0 text-[12px] tabular-nums text-mute">Q{String(i + 1).padStart(2, "0")}</span><span className="display flex-1 text-[clamp(20px,2vw,30px)]">{q}</span><span className={`display text-[28px] text-violet transition-transform ${o === i ? "rotate-45" : ""}`}>+</span></button>
    <div className={`grid transition-[grid-template-rows] duration-500 ${o === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}><p className="overflow-hidden pl-16 pr-10 text-[16px] leading-[1.7] text-ink/70"><span className="block pb-7">{a}</span></p></div></li>)}</ul>; }
