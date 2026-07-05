"use client";
import { useForm, ValidationError } from "@formspree/react";
import { Loader2 } from "lucide-react";
import SplitHeading from "./SplitHeading";
import { Reveal, Item } from "./Section";
import { GitHubIcon, TikTokIcon, LinkedInIcon } from "./icons";

const FORM_ID = "mwvdykwe";

const inputCls =
  "w-full min-h-11 rounded-sm border border-line bg-card px-4 py-3 text-sm text-fg placeholder:text-dim focus:border-accent/60 focus:outline-none";

const errCls = "mt-1 font-mono text-xs text-[#ff5f57]";

export default function Contact() {
  const [state, handleSubmit] = useForm(FORM_ID);

  return (
    <Reveal id="contact" className="mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SplitHeading className="font-sans text-[length:var(--text-title)] font-semibold tracking-tight">
        get in touch
      </SplitHeading>

      <Item className="mt-12 max-w-xl">
        {state.succeeded ? (
          <p
            role="status"
            className="border border-accent/40 bg-accent/10 px-5 py-4 font-mono text-sm text-accent"
          >
            ✓ received — I reply within a day.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="_subject" value="New message from euansmith.net" />

            <div>
              <label htmlFor="name" className="mb-1.5 block font-mono text-xs text-muted">
                name
              </label>
              <input id="name" name="name" required autoComplete="name" className={inputCls} />
              <ValidationError field="name" prefix="Name" errors={state.errors} className={errCls} />
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
              <ValidationError field="email" prefix="Email" errors={state.errors} className={errCls} />
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block font-mono text-xs text-muted">
                what you need
              </label>
              <textarea id="message" name="message" required rows={4} className={inputCls} />
              <ValidationError field="message" prefix="Message" errors={state.errors} className={errCls} />
            </div>

            <ValidationError errors={state.errors} className={errCls} />

            <button
              type="submit"
              disabled={state.submitting}
              className="group inline-flex min-h-11 items-center gap-2 border border-accent/40 bg-accent/10 px-6 py-3 font-mono text-sm text-accent transition-colors duration-300 hover:bg-accent/20 disabled:opacity-50"
            >
              {state.submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> sending
                </>
              ) : (
                "[ send → ]"
              )}
            </button>
          </form>
        )}
      </Item>

      <Item className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:max-w-xl">
        {[
          {
            href: "https://github.com/EuanSmith2",
            label: "GitHub",
            handle: "EuanSmith2",
            icon: <GitHubIcon className="size-5" />,
          },
          {
            href: "https://www.linkedin.com/in/euan-smith-4295123a6/",
            label: "LinkedIn",
            handle: "euan smith",
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

    </Reveal>
  );
}
