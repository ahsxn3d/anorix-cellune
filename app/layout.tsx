import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Motion from "@/components/kit/Motion";

const display = localFont({ src: "../public/fonts/space-grotesk-latin-wght-normal.woff2", variable: "--f-display", weight: "100 900", display: "swap" });
const sans = localFont({ src: "../public/fonts/inter-latin-wght-normal.woff2", variable: "--f-sans", weight: "100 900", display: "swap" });

export const metadata: Metadata = { title: "Anorix Science — AI models for chemistry, biophysics and materials", description: "Bio-Molecular Discovery Engine, Biophysics Simulator and 3D Crystal & Battery Material Designer: AI × chemistry with math, bio and physics. By Anorix.", openGraph: { title: "Anorix Science — AI models for chemistry, biophysics and materials", description: "Bio-Molecular Discovery Engine, Biophysics Simulator and 3D Crystal & Battery Material Designer: AI × chemistry with math, bio and physics. By Anorix.", type: "website" } };
export const viewport: Viewport = { themeColor: "#0e2b2e", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} /></head>
      <body><Motion />{children}</body>
    </html>
  );
}
