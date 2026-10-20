"use client";
import { useEffect, useState } from "react";
import { plans } from "@/lib/content";
export default function Done() { const [n, setN] = useState(""); useEffect(() => { const p = plans.find((x) => x.id === new URLSearchParams(location.search).get("plan")); setN(p ? p.name : ""); }, []);
  return <p className="mt-6 max-w-[50ch] text-[17px] leading-[1.7] text-paper/70">Request received{n ? ` for the ${n} plan` : ""}. Reference AS-{new Date().getFullYear()}-DEMO. On the real service we would reply within two working days. This is a demo, so nothing was sent.</p>; }
