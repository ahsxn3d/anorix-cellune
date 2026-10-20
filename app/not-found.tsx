import Shell from "@/components/Shell";
import Viewer from "@/components/Viewer";
export default function NotFound() { return (<Shell path="/404"><section className="relative min-h-[100svh] overflow-hidden bg-[#02272a] text-paper"><div className="absolute inset-0 opacity-70"><Viewer shape={0} dense={.5} /></div>
  <div className="wrap relative flex min-h-[100svh] flex-col justify-center pt-28"><div className="relative grid h-[120px] w-[108px] place-items-center rounded-[8px] bg-lilac text-ink"><span className="absolute left-2 top-1.5 text-[11px]">404</span><span className="display text-[52px]">Nf</span><span className="absolute bottom-1.5 text-[9px] uppercase tracking-[.14em]">not found</span></div>
    <h1 className="display mt-8 text-[clamp(48px,7vw,120px)]">This element<br />doesn&apos;t exist.</h1><p className="mt-5 max-w-[44ch] text-[17px] text-paper/70">The page you were looking for is not on our table. Try the models or go back home.</p>
    <div className="mt-8 flex gap-3"><a href="/" className="btn bg-mint text-ink hover:bg-lilac">Home</a><a href="/models" className="btn ring-1 ring-paper/25 hover:bg-paper/10">Models</a></div></div></section></Shell>); }
