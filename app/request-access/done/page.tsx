import Shell from "@/components/Shell";
import Viewer from "@/components/Viewer";
import Done from "@/components/Done";
export const metadata = { title: "Request received — Anorix Science" };
export default function Page() { return (<Shell path="/request-access"><section className="relative min-h-[100svh] overflow-hidden bg-[#02272a] text-paper"><div className="absolute inset-0 opacity-80"><Viewer shape={4} dense={.6} /></div>
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#02272a] via-[#02272a]/60 to-transparent" />
  <div className="wrap relative flex min-h-[100svh] flex-col justify-center pt-28"><p className="eyebrow text-mint">Ra · Submitted</p><h1 className="display mt-5 text-[clamp(52px,7vw,120px)]">Sample logged.</h1><Done />
    <div className="mt-8 flex gap-3"><a href="/models" className="btn bg-mint text-ink hover:bg-lilac">Back to the models</a><a href="/" className="btn ring-1 ring-paper/25 hover:bg-paper/10">Home</a></div></div></section></Shell>); }
