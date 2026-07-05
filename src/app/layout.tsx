import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

// next/font: self-hosted at build, preloaded, zero layout shift on swap
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://euansmith.net"),
  title: {
    default: "Euan Smith — Builder",
    template: "%s — Euan Smith",
  },
  description:
    "Hand-coded websites for Dublin businesses and the AI system that runs my day.",
  keywords: [
    "web developer Dublin",
    "hand-coded websites",
    "AI systems developer",
    "NZT-48",
    "Euan Smith",
  ],
  openGraph: {
    title: "Euan Smith — Builder",
    description:
      "Hand-coded websites for Dublin businesses and the AI system that runs my day.",
    url: "https://euansmith.net",
    siteName: "Euan Smith",
    locale: "en_IE",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1001] focus:bg-card focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-accent"
        >
          skip to content
        </a>
        <ScrollProgress />
        <Nav />
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
