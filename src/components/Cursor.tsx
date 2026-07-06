"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const INTERACTIVE = "a, button, [role='button'], input, textarea, label, summary";

export default function Cursor() {
  const pathname = usePathname();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname !== "/") return; // custom cursor only on the home experience
    const fine = window.matchMedia("(pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || still) return;

    document.documentElement.classList.add("cursor-live");

    let x = -100, y = -100, rx = -100, ry = -100, scale = 1, raf = 0;

    // cache card centres — measuring layout on every pointermove forces a
    // synchronous reflow per pixel; instead we measure on scroll/resize only
    let cards: { el: HTMLElement; cx: number; cy: number }[] = [];
    const measure = () => {
      cards = [...document.querySelectorAll<HTMLElement>(".border-trace")].map(
        (el) => {
          const r = el.getBoundingClientRect();
          return { el, cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
        },
      );
    };
    let measuring = false;
    const remeasure = () => {
      if (measuring) return;
      measuring = true;
      requestAnimationFrame(() => {
        measure();
        measuring = false;
      });
    };
    measure();

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const hit = (e.target as Element | null)?.closest?.(INTERACTIVE);
      scale = hit ? 1.5 : 1;
      // read only cached centres — no getBoundingClientRect in the hot path
      for (const c of cards) {
        const angle = Math.atan2(y - c.cy, x - c.cx) * (180 / Math.PI) + 90;
        c.el.style.setProperty("--trace", `${angle}deg`);
      }
    };

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current)
        dot.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      if (ring.current)
        ring.current.style.transform = `translate3d(${rx - 14}px, ${ry - 14}px, 0) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", remeasure, { passive: true });
    window.addEventListener("resize", remeasure, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", remeasure);
      window.removeEventListener("resize", remeasure);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-live");
    };
  }, [pathname]);

  if (pathname !== "/") return null;

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
