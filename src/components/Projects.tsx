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
          <p className="text-sm leading-relaxed text-muted">
            Personal AI orchestration system. 7 specialised agents, Telegram
            interface, Claude Code headless backend, Obsidian vault, proactive
            7:30am brief.
          </p>
          <NztTerminal />
          <Pills items={["Python", "Claude", "Telegram", "SQLite"]} />
          <div className="mt-auto flex gap-5">
            <a
              href="https://github.com/EuanSmith2/NZT-48"
              className={linkCls}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon className="size-4" /> GitHub
            </a>
            <a
              href="https://github.com/EuanSmith2/NZT-48#readme"
              className={linkCls}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText className="size-4" /> README
            </a>
          </div>
        </Card>

        <Card>
          <h3 className="font-mono text-xl font-semibold text-fg">
            Forged Websites
          </h3>
          <p className="text-sm leading-relaxed text-muted">
            Hand-coded sites for Dublin SMEs. No templates. Fast, clean, owned
            outright.
          </p>
          <div className="rounded-sm border border-line bg-bg p-4 font-mono text-xs leading-6 text-code/90">
            <p>lighthouse --all ▸ 100</p>
            <p>page weight ▸ &lt;100kb</p>
            <p>wordpress ▸ not found</p>
          </div>
          <Pills items={["HTML", "CSS", "JS", "No builders"]} />
          <div className="mt-auto flex gap-5">
            <a href="#services" className={linkCls}>
              Portfolio
            </a>
            <a href="#contact" className={`${linkCls} text-accent`}>
              Get a quote <ArrowRight className="size-4" />
            </a>
          </div>
        </Card>

        <Card>
          <h3 className="font-mono text-xl font-semibold text-dim">
            coming soon<span className="blink text-accent">█</span>
          </h3>
          <p className="text-sm leading-relaxed text-dim">
            Slot reserved. Something is always being built.
          </p>
        </Card>
      </div>
    </Reveal>
  );
}
