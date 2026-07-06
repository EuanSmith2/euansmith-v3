import Image from "next/image";
import SplitHeading from "./SplitHeading";
import { Reveal, Item } from "./Section";
import { Shield } from "lucide-react";

const SKILLS = [
  { label: "Languages", value: "HTML · CSS · JS · TypeScript · Python" },
  { label: "Web", value: "Next.js · Tailwind · Framer Motion · GSAP · Three.js" },
  { label: "AI / Automation", value: "Claude API · MCP servers · Telegram Bot API · SQLite" },
  { label: "Security", value: "TryHackMe Pre-Security · ISC2 CC (in progress) · Linux CLI" },
  { label: "Tooling", value: "Git · Vercel · Cloudflare · Obsidian · Playwright" },
];

export default function About({
  contributions,
}: {
  contributions: React.ReactNode;
}) {
  return (
    <Reveal id="about" className="mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SplitHeading className="font-mono text-[length:var(--text-title)] font-semibold">
        {"> about"}
      </SplitHeading>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
        <Item>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
            <Image
              src="/euan.jpg"
              alt="Euan Smith"
              width={200}
              height={200}
              className="size-40 shrink-0 rounded-sm border border-line object-cover grayscale transition-[filter] duration-500 hover:grayscale-0 sm:size-52"
              priority={false}
            />
            <div className="space-y-5">
              <p className="text-[length:var(--text-lead)] leading-relaxed text-fg/90">
                19. Dublin. Self-taught — started with HTML at 14, now shipping AI systems and hand-coded sites for local businesses. BSc Cybersecurity &amp; Digital Forensics at TU Dublin from Sept 2026.
              </p>
              <dl className="space-y-2">
                {SKILLS.map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                    <dt className="w-28 shrink-0 font-mono text-xs text-muted">{label}</dt>
                    <dd className="font-mono text-xs text-fg/70">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Item>

        <Item className="flex flex-col gap-6 overflow-x-auto">
          {contributions}
          <a
            href="https://tryhackme.com/p/EuanSmith"
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-fit border border-line bg-card p-4 transition-colors duration-300 hover:border-accent/40"
          >
            <div className="mb-3 flex items-center gap-2">
              <Shield className="size-4 text-[#e8412a] transition-colors duration-300 group-hover:text-[#ff5f4a]" />
              <span className="font-mono text-xs text-muted">TryHackMe</span>
            </div>
            <div className="space-y-1 font-mono text-xs">
              <p className="text-fg">EuanSmith</p>
              <p className="text-muted">Pre-Security path</p>
              <p className="text-dim">active · 2026</p>
            </div>
          </a>
        </Item>
      </div>
    </Reveal>
  );
}
