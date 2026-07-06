"use client";
import { useEffect, useState } from "react";

const dublinTime = new Intl.DateTimeFormat("en-IE", {
  timeZone: "Europe/Dublin",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export default function Footer() {
  // time renders only after mount — server and client can't disagree
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(dublinTime.format(new Date()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <footer className="mx-auto max-w-6xl border-t border-line px-6 py-8 font-mono text-xs text-dim">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          euan smith · dublin{" "}
          <span className="tabular-nums">{now ? `· ${now} IST` : ""}</span> ·{" "}
          {new Date().getFullYear()}
        </p>
        <nav className="flex gap-5" aria-label="footer">
          <a href="/notes" className="transition-colors duration-300 hover:text-accent">notes</a>
          <a href="/cv" className="transition-colors duration-300 hover:text-accent">cv</a>
          <span className="text-line">·</span>
          <span>hand-coded · Next.js on Vercel</span>
        </nav>
      </div>
    </footer>
  );
}
