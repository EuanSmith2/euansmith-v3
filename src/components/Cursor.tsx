"use client";
import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='button'], input, textarea, label, summary";

/** 6px dot + 28px trailing ring. Fine pointers only — the component renders
 *  nothing at all on touch devices. GPU-composited: transform only. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || still || !dot.current || !ring.current) return;
    document.documentElement.classList.add("cursor-live");

    let x = -100, y = -100, rx = -100, ry = -100, scale = 1, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const hit = (e.target as Element | null)?.closest?.(INTERACTIVE);
      scale = hit ? 1.5 : 1;
    };
    const loop = () => {
      // ~80ms perceived lag on the ring
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      dot.current!.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      ring.current!.style.transform = `translate3d(${rx - 14}px, ${ry - 14}px, 0) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-live");
    };
  }, []);

  return (
    <div aria-hidden className="hidden [@media(pointer:fine)]:block">
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[1000] size-1.5 rounded-full bg-accent"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[1000] size-7 rounded-full border border-accent/60 transition-[scale]"
      />
    </div>
  );
}
