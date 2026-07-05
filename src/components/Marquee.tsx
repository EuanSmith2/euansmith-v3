import { cn } from "@/lib/utils";

const STACK = [
  "Next.js",
  "TypeScript",
  "Python",
  "Tailwind CSS",
  "Claude API",
  "Three.js",
  "GSAP",
  "Framer Motion",
  "SQLite",
  "Telegram Bot API",
  "PostgreSQL",
  "Vercel",
  "Cloudflare",
  "Obsidian",
];

function Track() {
  return (
    <ul className="flex shrink-0 items-center gap-10" aria-hidden>
      {STACK.map((item) => (
        <li key={item} className="flex items-center gap-3 whitespace-nowrap">
          <span className="size-1 rounded-full bg-accent/40" />
          <span className="font-mono text-xs text-dim">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Marquee({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex overflow-hidden border-y border-line py-3.5",
        className,
      )}
      aria-label="technology stack"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-bg" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-bg" />
      <div className="marquee-track flex gap-10">
        <Track />
        <Track />
      </div>
    </div>
  );
}
