"use client";
import { useEffect, useState } from "react";

// hardcoded feed — cycles every 8s so the window feels live, no API
const FEED: string[][] = [
  [
    "07:30 → brief sent ✓",
    "11:42 → vault write approved ✓",
    "14:15 → lead research: 3 prospects scored",
  ],
  [
    "08:02 → payment monitor: invoice day 6, watching",
    "10:20 → /prep generated for 10:30 call ✓",
    "16:44 → capture filed → 03-PEOPLE ✓",
  ],
  [
    "09:15 → research: 2 sources agree, answered",
    "13:07 → cold email drafted — awaiting approval",
    "20:30 → study nudge: ISC2 CC domain 2",
  ],
];

export default function NztTerminal() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setFrame((f) => (f + 1) % FEED.length), 8000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="rounded-sm border border-line bg-bg font-mono text-xs leading-6">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[#febc2e]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[#28c840]" aria-hidden />
        <span className="ml-2 text-dim">nzt-48 — live</span>
      </div>
      <div className="min-h-[6rem] px-3 py-2.5" aria-live="off">
        {FEED[frame].map((line) => (
          <p key={line} className="text-code/90">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
