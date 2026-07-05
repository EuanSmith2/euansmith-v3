import { FileText, ArrowRight } from "lucide-react";
import { GitHubIcon } from "./icons";
import SplitHeading from "./SplitHeading";
import { Reveal, Item } from "./Section";
import NztTerminal from "./NztTerminal";

function Pills({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="stack">
      {items.map((s) => (
        <li
          key={s}
          className="border border-line bg-bg px-2 py-0.5 font-mono text-xs text-muted"
        >
          {s}
        </li>
      ))}
    </ul>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <Item className="border-trace flex flex-col gap-5 rounded-sm p-6">
      {children}
    </Item>
  );
}

const linkCls =
  "inline-flex min-h-11 items-center gap-1.5 font-mono text-sm text-muted transition-colors duration-300 hover:text-accent";

export default function Projects() {
  return (
    <Reveal id="projects" className="mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SplitHeading className="font-mono text-[length:var(--text-title)] font-semibold">
        {"> projects"}
      </SplitHeading>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <Card>
          <h3 className="font-mono text-xl font-semibold text-fg">NZT-48</h3>
          <ul className="space-y-1 font-mono text-xs text-muted">
            <li>7 specialised AI agents (briefing · research · business · TTS)</li>
            <li>Obsidian vault memory structure + daily knowledge capture</li>
            <li>Custom Telegram bot → Claude Code remote control</li>
            <li>Automated 07:30 brief via push notification</li>
            <li>Animated terminal feed displaying live agent activity</li>
            <li>Private config overlay — gitignored secrets, clean public repo</li>
          </ul>
          <NztTerminal />
          <Pills items={["Python", "Claude API", "Telegram", "SQLite", "MCP"]} />
          <div className="mt-auto flex gap-3">
            <a
              href="https://github.com/EuanSmith2/NZT-48"
              className="inline-flex min-h-9 items-center gap-1.5 border border-line bg-card px-3 py-2 font-mono text-xs text-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon className="size-3.5" /> GitHub
            </a>
            <a
              href="https://github.com/EuanSmith2/NZT-48#readme"
              className="inline-flex min-h-9 items-center gap-1.5 border border-line bg-card px-3 py-2 font-mono text-xs text-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText className="size-3.5" /> README
            </a>
          </div>
        </Card>

        <Card>
          <h3 className="font-mono text-xl font-semibold text-fg">
            Forged Websites
          </h3>
          <ul className="space-y-1 font-mono text-xs text-muted">
            <li>Hand-coded HTML · CSS · vanilla JS — zero frameworks, zero builders</li>
            <li>Semantic markup + structured data (JSON-LD) for SEO</li>
            <li>100/100 Lighthouse across performance · a11y · SEO · best practices</li>
            <li>Sub-100kb page weight, zero WordPress dependency</li>
            <li>Full project ownership transferred — no ongoing platform fees</li>
          </ul>
          <div className="rounded-sm border border-line bg-bg p-4 font-mono text-xs leading-6 text-code/90">
            <p>lighthouse --all ▸ 100</p>
            <p>page weight ▸ &lt;100kb</p>
            <p>wordpress ▸ not found</p>
          </div>
          <Pills items={["HTML", "CSS", "JS", "JSON-LD", "No builders"]} />
          <div className="mt-auto flex gap-3">
            <a
              href="#services"
              className="inline-flex min-h-9 items-center gap-1.5 border border-line bg-card px-3 py-2 font-mono text-xs text-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-9 items-center gap-1.5 border border-accent/40 bg-accent/10 px-3 py-2 font-mono text-xs text-accent transition-colors duration-300 hover:bg-accent/20"
            >
              Get a quote <ArrowRight className="size-3.5" />
            </a>
          </div>
        </Card>

        <Card>
          <h3 className="font-mono text-xl font-semibold text-dim">
            coming soon
          </h3>
          <p className="text-sm leading-relaxed text-dim">
            Slot reserved. Something is always in progress.
          </p>
          <div className="mt-auto border border-dashed border-dim/40 px-3 py-2 font-mono text-xs text-dim/60">
            — in build —
          </div>
        </Card>
      </div>
    </Reveal>
  );
}
