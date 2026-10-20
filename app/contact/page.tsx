import Shell from "@/components/Shell";
import { Head } from "@/components/UI";
import ContactForm from "@/components/ContactForm";
export const metadata = { title: "Contact — Anorix Science" };
export default function Page() { return (<Shell path="/contact"><Head eyebrow="Ct · Contact" title={<>Write to<br /><span className="text-mint">the lab.</span></>} lead="Questions about the models, a collaboration idea, or just curious. We read everything." />
  <section className="bg-paper py-[clamp(56px,7vw,110px)] text-ink"><div className="wrap grid gap-12 lg:grid-cols-12"><div className="lg:col-span-7"><ContactForm /></div>
    <aside className="space-y-6 lg:col-span-4 lg:col-start-9">{[["Model access", "Use the request form so we get the details we need.", "/request-access", "Request access →"], ["Pricing", "Indicative plans for academic groups, labs and companies.", "/pricing", "See plans →"], ["Common questions", "Formats, ownership, accuracy and more.", "/faq", "Read the FAQ →"]].map(([h, p, href, l]) => <a key={h} href={href} className="block rounded-[20px] p-6 ring-1 ring-ink/15 hover:bg-ink/[.03]"><p className="display text-[24px]">{h}</p><p className="mt-2 text-[14px] text-ink/70">{p}</p><p className="mt-4 text-[14px] font-medium text-violet">{l}</p></a>)}</aside></div></section></Shell>); }
