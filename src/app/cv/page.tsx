import type { Metadata } from "next";
import PrintButton from "./PrintButton";

export const metadata: Metadata = {
  title: "CV — Euan Smith",
  description: "Euan Smith — Web Developer & Cybersecurity Student, Dublin",
  robots: { index: false, follow: false },
};

const CONTACT = {
  email: "business.euan@hotmail.com",
  location: "Dublin, Ireland",
  github: "github.com/EuanSmith2",
  linkedin: "linkedin.com/in/euan-smith",
  web: "euansmith.net",
};

export default function CV() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* print controls — hidden on print */}
      <div className="flex justify-center border-b border-gray-200 bg-gray-50 px-6 py-4 print:hidden">
        <div className="flex w-full max-w-3xl items-center justify-between">
          <a href="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← back to site
          </a>
          <PrintButton />
        </div>
      </div>

      {/* CV document */}
      <main
        className="mx-auto max-w-3xl px-8 py-10 print:max-w-none print:px-0 print:py-0"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        {/* Header */}
        <header className="mb-5 border-b-2 border-black pb-4">
          <h1
            className="text-3xl font-bold uppercase tracking-widest text-black"
            style={{ fontFamily: "Arial, Helvetica, sans-serif", letterSpacing: "0.15em" }}
          >
            Euan Smith
          </h1>
          <div
            className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            <span>{CONTACT.location}</span>
            <span>·</span>
            <a href={`mailto:${CONTACT.email}`} className="underline">{CONTACT.email}</a>
            <span>·</span>
            <a href={`https://${CONTACT.github}`} className="underline">{CONTACT.github}</a>
            <span>·</span>
            <a href={`https://${CONTACT.linkedin}`} className="underline">{CONTACT.linkedin}</a>
            <span>·</span>
            <a href={`https://${CONTACT.web}`} className="underline">{CONTACT.web}</a>
          </div>
        </header>

        <div
          className="space-y-5 text-sm leading-relaxed text-black"
          style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
        >
          {/* Profile */}
          <Section title="Profile">
            <p>
              Self-taught web developer and AI systems builder, 19, based in Dublin. Two years
              building and shipping hand-coded websites for local businesses under Forged Websites,
              achieving consistent 100/100 Lighthouse scores with sub-100kb pages. Independently
              architected NZT-48, a multi-agent AI orchestration system in Python, running in
              production daily. Incoming BSc Cybersecurity &amp; Digital Forensics at TU Dublin
              (Sept 2026); actively pursuing ISC2 CC and TryHackMe Pre-Security path.
            </p>
          </Section>

          {/* Projects */}
          <Section title="Projects">
            <div className="space-y-4">
              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold">NZT-48 — AI Orchestration System</h3>
                  <span className="text-xs text-gray-500">
                    Python · Claude API · Telegram · SQLite · MCP | 2025–present
                  </span>
                </div>
                <ul className="mt-1 list-none space-y-0.5 pl-4">
                  <Li>Designed and built 7 specialised AI agents: briefing, research, business, learning, TTS, browser automation, and generalist routing</Li>
                  <Li>Implemented Obsidian-vault memory structure — structured knowledge capture, daily context injection, protected/public config overlay</Li>
                  <Li>Built custom Telegram bot interface enabling natural-language remote control of Claude Code headless backend</Li>
                  <Li>Automated 07:30 push-notification brief via macOS LaunchAgent; agent logs routed to animated terminal UI</Li>
                  <Li>Architected gitignored private/ overlay — secrets and personal config never touch the public repo</Li>
                </ul>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold">Forged Websites — Freelance Web Development</h3>
                  <span className="text-xs text-gray-500">
                    HTML · CSS · JS · Next.js · JSON-LD | 2023–present
                  </span>
                </div>
                <ul className="mt-1 list-none space-y-0.5 pl-4">
                  <Li>Delivered hand-coded websites for Dublin SMEs — zero page builders, zero WordPress, zero templates</Li>
                  <Li>Consistently achieved 100/100 Lighthouse scores across performance, accessibility, SEO, and best practices</Li>
                  <Li>Implemented JSON-LD structured data, semantic HTML, and sitemap generation for all client sites</Li>
                  <Li>Managed full delivery: client brief → wireframe → code → Vercel/Cloudflare deployment → DNS handoff</Li>
                </ul>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold">euansmith.net — Personal Portfolio</h3>
                  <span className="text-xs text-gray-500">
                    Next.js 15 · TypeScript · Tailwind v4 · Three.js · GSAP | 2026
                  </span>
                </div>
                <ul className="mt-1 list-none space-y-0.5 pl-4">
                  <Li>Built from scratch: custom cursor, GPU-composited border animations, deferred Three.js particle field, human-variance typing effect</Li>
                  <Li>Server component GitHub contributions graph with daily revalidation; CSS-only scanlines and noise texture</Li>
                </ul>
              </div>
            </div>
          </Section>

          {/* Experience */}
          <Section title="Experience">
            <div>
              <div className="flex items-baseline justify-between">
                <h3 className="font-bold">EDMO — Automation Intern</h3>
                <span className="text-xs text-gray-500">Dublin | 2025–present</span>
              </div>
              <ul className="mt-1 list-none space-y-0.5 pl-4">
                <Li>Developed automation scripts to streamline internal processes</Li>
                <Li>Worked with Python tooling and data handling in a professional environment</Li>
              </ul>
            </div>
          </Section>

          {/* Education */}
          <Section title="Education">
            <div className="flex items-baseline justify-between">
              <div>
                <h3 className="font-bold">BSc Cybersecurity &amp; Digital Forensics</h3>
                <p className="text-gray-600">Technological University Dublin (TU Dublin)</p>
              </div>
              <span className="text-xs text-gray-500">Sept 2026</span>
            </div>
          </Section>

          {/* Certifications */}
          <Section title="Certifications &amp; Training">
            <ul className="list-none space-y-0.5">
              <Li>ISC2 Certified in Cybersecurity (CC) — in progress, 2026</Li>
              <Li>TryHackMe — Pre-Security learning path, active 2026 (profile: tryhackme.com/p/EuanSmith)</Li>
            </ul>
          </Section>

          {/* Skills */}
          <Section title="Skills">
            <dl className="space-y-1">
              {[
                ["Languages", "HTML, CSS, JavaScript, TypeScript, Python"],
                ["Frameworks", "Next.js, Tailwind CSS, Framer Motion, GSAP, Three.js / React Three Fiber"],
                ["AI / Automation", "Claude API, Anthropic MCP, Telegram Bot API, Playwright, Skyvern"],
                ["Databases", "SQLite, PostgreSQL"],
                ["Tools & Platforms", "Git, GitHub, Vercel, Cloudflare, Obsidian, Linux CLI, macOS"],
                ["Security", "TryHackMe, Wireshark (learning), Burp Suite (learning), OWASP Top 10"],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3">
                  <dt className="w-36 shrink-0 font-semibold">{k}</dt>
                  <dd className="text-gray-700">{v}</dd>
                </div>
              ))}
            </dl>
          </Section>
        </div>
      </main>

      <style>{`
        @media print {
          @page { size: A4; margin: 1.5cm 2cm; }
          body { background: white !important; color: black !important; }
          main { padding: 0 !important; }
          a { color: black !important; }
        }
      `}</style>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2
        className="mb-2 border-b border-gray-300 pb-0.5 text-xs font-bold uppercase tracking-widest text-gray-500"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 text-gray-700">
      <span className="mt-1 shrink-0 text-gray-400">–</span>
      <span>{children}</span>
    </li>
  );
}
