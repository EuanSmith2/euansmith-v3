"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { EASE } from "@/lib/utils";

const HeroField = dynamic(() => import("./HeroField"), { ssr: false });

// the terminal script: [text, isCommand]
const SCRIPT: Array<[string, boolean]> = [
  ["whoami", true],
  ["euan smith — builder of things that shouldn't exist", false],
  ["./projects --list", true],
  ["NZT-48  |  Forged Websites  |  more below", false],
];

/** Types with human timing variance (30–95ms per char, longer pauses on
 *  spaces/punctuation) — not robotic equal spacing. */
export default function Hero() {
  const [lines, setLines] = useState<Array<[string, boolean]>>([]);
  const [done, setDone] = useState(false);
  const [showField, setShowField] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLines(SCRIPT);
      setDone(true);
      return;
    }
    // particle field mounts after first paint — hero text owns the LCP
    const idle = (cb: () => void) =>
      "requestIdleCallback" in window
        ? requestIdleCallback(cb, { timeout: 2500 })
        : setTimeout(cb, 1200);
    idle(() => setShowField(true));

    let cancelled = false;
    (async () => {
      const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
      for (const [text, isCmd] of SCRIPT) {
        if (cancelled) return;
        if (isCmd) {
          // commands type char by char
          let acc = "";
          setLines((l) => [...l, ["", true]]);
          for (const ch of text) {
            if (cancelled) return;
            acc += ch;
            setLines((l) => [...l.slice(0, -1), [acc, true]]);
            await wait(30 + Math.random() * 65 + (ch === " " ? 40 : 0));
          }
          await wait(220);
        } else {
          // output prints instantly, like a real shell
          await wait(90);
          setLines((l) => [...l, [text, false]]);
          await wait(300);
        }
      }
      setDone(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="scanlines relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6">
      {showField && (
        <div className="absolute inset-0" aria-hidden>
          <HeroField />
        </div>
      )}

      <div className="relative z-10 w-full max-w-3xl font-mono">
        {/* fixed height reserves space — zero layout shift while typing */}
        <div
          className="min-h-[10.5rem] text-[clamp(0.95rem,0.8rem+0.7vw,1.35rem)] leading-relaxed sm:min-h-[9rem]"
          aria-label="terminal introduction: euan smith — builder of things that shouldn't exist. projects: NZT-48, Forged Websites"
        >
          {lines.map(([text, isCmd], i) => (
            <p key={i} className={isCmd ? "text-fg" : "text-code"}>
              <span className="select-none text-accent">▎ </span>
              {isCmd && <span className="text-muted">$ </span>}
              {text}
              {i === lines.length - 1 && !done && (
                <span className="blink text-accent">█</span>
              )}
            </p>
          ))}
          {done && (
            <p aria-hidden>
              <span className="select-none text-accent">▎ </span>
              <span className="text-muted">$ </span>
              <span className="blink text-accent">█</span>
            </p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={done ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            className="group inline-flex min-h-11 items-center gap-2 border border-line bg-card px-5 py-3 text-sm transition-colors duration-300 hover:border-accent/60 hover:text-accent"
          >
            [ see my work <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" /> ]
          </a>
          <a
            href="#contact"
            className="group inline-flex min-h-11 items-center gap-2 border border-accent/40 bg-accent/10 px-5 py-3 text-sm text-accent transition-colors duration-300 hover:bg-accent/20"
          >
            [ hire me <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" /> ]
          </a>
        </motion.div>
      </div>

      <p className="absolute bottom-8 z-10 font-mono text-xs text-dim" aria-hidden>
        scroll ↓
      </p>
    </section>
  );
}
