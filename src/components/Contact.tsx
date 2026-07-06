"use client";
import { useForm, ValidationError } from "@formspree/react";
import { Loader2 } from "lucide-react";
import SplitHeading from "./SplitHeading";
import { Reveal, Item } from "./Section";
import SocialDock from "./SocialDock";

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
      <p className="mt-4 max-w-xl text-muted">
        Got a business that needs a site, or just want to talk shop? Tell me
        what you&apos;re after — I read every message myself and usually reply
        the same day.
      </p>

      <Item className="mt-10 max-w-xl">
        {state.succeeded ? (
          <p
            role="status"
            className="border border-accent/40 bg-accent/10 px-5 py-4 font-mono text-sm text-accent"
          >
            [ received ] — cheers, I&apos;ll get back to you within a day.
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

      <Item className="mt-14">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-dim">
          or find me here
        </p>
        <SocialDock />
      </Item>
    </Reveal>
  );
}
