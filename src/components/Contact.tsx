"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import SplitHeading from "./SplitHeading";
import { Reveal, Item } from "./Section";
import { GitHubIcon, TikTokIcon, LinkedInIcon } from "./icons";

// Formspree endpoint lives in env — never an email address in source.
const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

const inputCls =
  "w-full min-h-11 rounded-sm border border-line bg-card px-4 py-3 text-sm text-fg placeholder:text-dim focus:border-accent/60";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ENDPOINT) return;
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Reveal id="contact" className="mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SplitHeading className="font-mono text-[length:var(--text-title)] font-semibold">
        {"> contact"}
      </SplitHeading>

      <Item className="mt-12 max-w-xl">
        {status === "sent" ? (
          <p
            role="status"
            className="border border-accent/40 bg-accent/10 px-5 py-4 font-mono text-sm text-accent"
          >
            ✓ received — I reply within a day.
          </p>
        ) : ENDPOINT ? (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block font-mono text-xs text-muted">
                name
              </label>
              <input id="name" name="name" required autoComplete="name" className={inputCls} />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block font-mono text-xs text-muted">
                email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block font-mono text-xs text-muted">
                what you need
              </label>
              <textarea id="message" name="message" required rows={4} className={inputCls} />
            </div>
            {status === "error" && (
              <p role="alert" className="font-mono text-sm text-[#ff5f57]">
                didn&apos;t send — try again, or reach me on GitHub below.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex min-h-11 items-center gap-2 border border-accent/40 bg-accent/10 px-6 py-3 font-mono text-sm text-accent transition-colors duration-300 hover:bg-accent/20 disabled:opacity-50"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> sending
                </>
              ) : (
                "[ send → ]"
              )}
            </button>
          </form>
        ) : (
          <p className="border border-line bg-card px-5 py-4 font-mono text-sm text-muted">
            form is warming up — reach me on GitHub or TikTok below.
          </p>
        )}
      </Item>

      <Item className="mt-12 grid grid-cols-3 gap-4 sm:max-w-xl">
        {[
          {
            href: "https://github.com/EuanSmith2",
            label: "GitHub",
            handle: "EuanSmith2",
            icon: <GitHubIcon className="size-5" />,
          },
          {
            href: "https://www.linkedin.com/in/euan-smith",
            label: "LinkedIn",
            handle: "euan-smith",
            icon: <LinkedInIcon className="size-5" />,
          },
          {
            href: "https://www.tiktok.com/@euan_smith",
            label: "TikTok",
            handle: "@euan_smith",
            icon: <TikTokIcon className="size-5" />,
          },
        ].map(({ href, label, handle, icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} — ${handle}`}
            className="group flex flex-col gap-2.5 border border-line bg-card p-4 transition-colors duration-300 hover:border-accent/40 hover:bg-accent/[0.03]"
          >
            <span className="text-muted transition-colors duration-300 group-hover:text-accent">
              {icon}
            </span>
            <span className="font-mono text-xs text-muted">{label}</span>
            <span className="font-mono text-[11px] text-dim">{handle}</span>
          </a>
        ))}
      </Item>

      <footer className="mt-20 border-t border-line pt-6 font-mono text-xs text-dim">
        <p>euan smith · dublin · {new Date().getFullYear()} · hand-coded, obviously</p>
      </footer>
    </Reveal>
  );
}
