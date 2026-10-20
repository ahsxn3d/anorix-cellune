export function Head({ eyebrow, title, lead, dark = true }: { eyebrow: string; title: React.ReactNode; lead?: string; dark?: boolean }) {
  return (<section className={`${dark ? "bg-petrol text-paper" : "bg-paper text-ink"} pb-[clamp(56px,7vw,100px)] pt-[clamp(140px,14vw,200px)]`}>
    <div className="wrap grid gap-8 lg:grid-cols-12"><p className={`eyebrow lg:col-span-3 ${dark ? "text-mint" : "text-violet"}`}>{eyebrow}</p>
      <div className="lg:col-span-9"><h1 className="display text-[clamp(48px,7vw,120px)]">{title}</h1>{lead && <p className={`mt-6 max-w-[56ch] text-[17px] leading-[1.7] ${dark ? "text-paper/70" : "text-ink/70"}`}>{lead}</p>}</div></div></section>);
}
export function Cell({ k, children, className = "" }: { k: string; children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[18px] p-6 ring-1 ring-current/15 ${className}`}><p className="eyebrow opacity-60">{k}</p><div className="mt-4">{children}</div></div>;
}
