"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, FileText } from "lucide-react";
import { EASE } from "@/lib/utils";

const HeroField = dynamic(() => import("./HeroField"), { ssr: false });

const SCRIPT: Array<[string, boolean]> = [
  ["whoami", true],
  ["euan smith — I hand-code websites and build the AI that runs my day", false],
  ["./skills --list", true],
  ["web dev · AI systems · cybersecurity · Dublin", false],
  ["./projects --recent", true],
  ["NZT-48  |  client websites  |  this site", false],
  ["./status", true],
  ["19 · self-taught since 14 · TU Dublin cybersecurity, Sept", false],
];

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
          let acc = "";
          setLines((l) => [...l, ["", true]]);
          for (const ch of text) {
            if (cancelled) return;
            acc += ch;
            setLines((l) => [...l.slice(0, -1), [acc, true]]);
            await wait(28 + Math.random() * 60 + (ch === " " ? 35 : 0));
          }
          await wait(200);
        } else {
          await wait(80);
          setLines((l) => [...l, [text, false]]);
          await wait(260);
        }
      }
      setDone(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="scanlines relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 pt-16">
      {showField && (
        <div className="absolute inset-0" aria-hidden>
          <HeroField />
        </div>
      )}

      {/* ambient glow behind terminal */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <div className="h-[40vh] w-[60vw] rounded-full bg-accent/[0.04] blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-3xl font-mono">
        {/* live availability badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="mb-6 flex items-center gap-2 text-xs text-muted"
          aria-label="currently available for projects"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          available for projects · dublin, ireland · 2026
        </motion.div>

        <div
          role="img"
          className="min-h-[16rem] text-[clamp(0.9rem,0.75rem+0.65vw,1.25rem)] leading-relaxed sm:min-h-[14rem]"
          aria-label="Euan Smith — I hand-code websites and build AI systems. Web dev, AI systems, cybersecurity, Dublin. 19, self-taught, incoming TU Dublin cybersecurity."
        >
          {lines.map(([text, isCmd], i) => (
            <p key={i} aria-hidden className={isCmd ? "text-fg" : "text-code"}>
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
          <a
            href="/cv"
            className="group inline-flex min-h-11 items-center gap-2 border border-line px-5 py-3 text-sm text-muted transition-colors duration-300 hover:text-fg"
          >
            [ cv <FileText className="size-4" /> ]
          </a>
        </motion.div>
      </div>

      <p className="absolute bottom-8 z-10 font-mono text-xs text-dim" aria-hidden>
        scroll ↓
      </p>
    </section>
  );
}
