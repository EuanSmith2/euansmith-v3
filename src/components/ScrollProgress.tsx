"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** 2px read-progress bar above the nav. Raw rAF, no library; scaleX keeps
 *  it compositor-only. Home route only — the CV page prints clean. */
export default function ScrollProgress() {
  const pathname = usePathname();
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname !== "/") return;
    let raf = 0;
    const loop = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${ratio})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <div
      ref={bar}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent/60"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
