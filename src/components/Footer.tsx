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
      <div className="flex flex-col gap-1.5 sm:flex-row sm:justify-between">
        <p>
          euan smith · dublin{" "}
          <span className="tabular-nums">{now ? `· ${now} IST` : ""}</span> ·{" "}
          {new Date().getFullYear()}
        </p>
        <p>designed &amp; hand-coded by me · Next.js on Vercel</p>
      </div>
    </footer>
  );
}
