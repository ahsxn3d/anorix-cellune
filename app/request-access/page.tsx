import Shell from "@/components/Shell";
import { Head } from "@/components/UI";
import AccessForm from "@/components/AccessForm";
export const metadata = { title: "Request access — Anorix Science" };
export default function Page() { return (<Shell path="/request-access"><Head eyebrow="Ra · Request access" title={<>Tell us what<br /><span className="text-mint">you want to run.</span></>} lead="Three short steps. We read every request and reply with what the models can do for your problem today." />
  <section className="bg-paper py-[clamp(56px,7vw,100px)] text-ink"><div className="wrap"><AccessForm /></div></section></Shell>); }
