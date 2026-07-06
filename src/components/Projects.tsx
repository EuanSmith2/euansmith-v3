import { Suspense } from "react";
import { FileText, ArrowRight } from "lucide-react";
import { GitHubIcon } from "./icons";
import SplitHeading from "./SplitHeading";
import { Reveal, Item } from "./Section";
import NztTerminal from "./NztTerminal";
import RepoStats, { RepoStatsSkeleton } from "./RepoStats";

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

const btnCls =
  "inline-flex min-h-9 items-center gap-1.5 border border-line bg-card px-3 py-2 font-mono text-xs text-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent";

export default function Projects() {
  return (
    <Reveal id="projects" className="mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SplitHeading className="font-mono text-[length:var(--text-title)] font-semibold">
        {"projects/"}
      </SplitHeading>

      {/* flagship gets the weight — full-width feature, two smaller below */}
      <Item className="border-trace mt-12 grid gap-8 rounded-sm p-6 lg:grid-cols-[1.1fr_1fr] lg:p-8">
        <div className="flex flex-col gap-5">
          <div>
            <h3 className="font-mono text-2xl font-semibold text-fg">NZT-48</h3>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-accent/80">
              personal AI system · running daily
            </p>
          </div>
          <p className="max-w-md leading-relaxed text-fg/90">
            I kept losing the thread between client work, my notes, and cold
            outreach — so I built something that holds all of it and briefs me at
            07:30 before I&apos;m even up. It&apos;s been quietly running my day
            ever since.
          </p>
          <ul className="space-y-1 font-mono text-xs text-muted">
            <li>7 specialised agents — briefing, research, business, capture, TTS</li>
            <li>Obsidian vault as memory; every write goes through an approval gate</li>
            <li>Telegram bot → Claude Code headless, so I run it from my phone</li>
            <li>Private config overlay — secrets gitignored, the public repo stays clean</li>
          </ul>
          <Pills items={["Python", "Claude API", "Telegram", "SQLite", "MCP"]} />
          <div className="mt-auto flex gap-3">
            <a href="https://github.com/EuanSmith2/NZT-48" className={btnCls} target="_blank" rel="noopener noreferrer">
              <GitHubIcon className="size-3.5" /> GitHub
            </a>
            <a href="https://github.com/EuanSmith2/NZT-48#readme" className={btnCls} target="_blank" rel="noopener noreferrer">
              <FileText className="size-3.5" /> README
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <NztTerminal />
          <Suspense fallback={<RepoStatsSkeleton />}>
            <RepoStats repo="EuanSmith2/NZT-48" />
          </Suspense>
        </div>
      </Item>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <h3 className="font-mono text-xl font-semibold text-fg">
            EDMO — factcheck automation
          </h3>
          <p className="font-mono text-[11px] uppercase tracking-wider text-accent/80">
            European Digital Media Observatory · DCU · in production
          </p>
          <p className="leading-relaxed text-fg/90">
            My first system running inside a real EU organisation — it reads the
            latest factchecks, summarises each one, and posts them to their site
            on its own. Built end to end and handed to their team.
          </p>
          <div className="rounded-sm border border-line bg-bg p-4 font-mono text-xs leading-6 text-code/90">
            <p>source ▸ thejournal.ie/factcheck</p>
            <p>summarise ▸ claude</p>
            <p>publish ▸ edmohub.ie (wp-rest)</p>
            <p>schedule ▸ cron · 1st &amp; 15th</p>
          </div>
          <Pills items={["Python", "Claude API", "WordPress REST", "Cron"]} />
          <div className="mt-auto flex gap-3">
            <a href="https://edmohub.ie" className={btnCls} target="_blank" rel="noopener noreferrer">
              edmohub.ie <ArrowRight className="size-3.5" />
            </a>
          </div>
        </Card>

        <Card>
          <h3 className="font-mono text-xl font-semibold text-fg">
            client work
          </h3>
          <p className="leading-relaxed text-fg/90">
            My first paying client site — a personal brand site, hand-coded start
            to finish. She owns the code outright; no builder, no monthly fee.
          </p>
          <ul className="space-y-1 font-mono text-xs text-muted">
            <li>100/100 Lighthouse — performance, a11y, SEO, best practices</li>
            <li>Sub-100kb pages, semantic markup, JSON-LD structured data</li>
            <li>Deployed and handed over — the client owns everything</li>
          </ul>
          <div className="rounded-sm border border-line bg-bg p-4 font-mono text-xs leading-6 text-code/90">
            <p>lighthouse --all ▸ 100</p>
            <p>page weight ▸ &lt;100kb</p>
          </div>
          <Pills items={["HTML", "CSS", "JS", "Next.js", "JSON-LD"]} />
          <div className="mt-auto flex gap-3">
            <a href="https://ayeishalhaine.com" className={btnCls} target="_blank" rel="noopener noreferrer">
              ayeishalhaine.com <ArrowRight className="size-3.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-9 items-center gap-1.5 border border-accent/40 bg-accent/10 px-3 py-2 font-mono text-xs text-accent transition-colors duration-300 hover:bg-accent/20"
            >
              hire me <ArrowRight className="size-3.5" />
            </a>
          </div>
        </Card>
      </div>
    </Reveal>
  );
}
