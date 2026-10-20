import Shell from "@/components/Shell";
import { Head } from "@/components/UI";
import Faq from "@/components/Faq";
export const metadata = { title: "FAQ — Anorix Science" };
export default function Page() { return (<Shell path="/faq"><Head eyebrow="Fq · FAQ" title={<>Questions,<br /><span className="text-mint">answered.</span></>} lead="If yours is not here, ask us directly." />
  <section className="bg-paper py-[clamp(56px,7vw,110px)] text-ink"><div className="wrap max-w-[1100px]"><Faq /><a href="/contact" className="btn mt-10 bg-ink text-paper hover:bg-violet">Ask something else →</a></div></section></Shell>); }
