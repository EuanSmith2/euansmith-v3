"use client";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";
import SplitHeading from "./SplitHeading";
import { Reveal, Item } from "./Section";

type Tier = {
  name: string;
  price: number; // the "from" anchor — the count-up target
  rows: string[];
  featured?: boolean;
};

// Anchored to the cold-call pricing: Basic €400–600 · Booking/Menu €650–900 ·
// E-commerce €900–1,400. "From €X" invites the inquiry — the real number moves
// with the job, which is the point.
const TIERS: Tier[] = [
  {
    name: "Basic",
    price: 150,
    rows: [
      "3–5 hand-coded pages",
      "Contact form + click-to-call",
      "Mobile-first, 100 Lighthouse",
      "Google-ready — SEO + sitemap",
      "You own the code outright",
    ],
  },
  {
    name: "Booking / Menu",
    price: 300,
    featured: true,
    rows: [
      "Everything in Basic",
      "Online booking or live menu",
      "Gallery · opening hours · maps",
      "Rich Google results (structured data)",
      "Edit it yourself — optional CMS",
    ],
  },
  {
    name: "Online Store",
    price: 500,
    rows: [
      "Everything in Booking",
      "Product catalogue + cart",
      "Card payments built in (Stripe)",
      "Orders + stock management",
      "Customer accounts / login",
    ],
  },
];

/** Price counts up once on first viewport entry (IntersectionObserver via
 *  useInView triggerOnce — never re-fires). */
function Price({ value }: { value: number }) {
  const num = useRef<HTMLSpanElement>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.6 });

  useEffect(() => {
    if (!inView || !num.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      num.current.textContent = String(value);
      return;
    }
    const counter = { v: 0 };
    gsap.to(counter, {
      v: value,
      duration: 1.1,
      ease: "power3.out",
      onUpdate: () => {
        num.current!.textContent = String(Math.round(counter.v));
      },
    });
  }, [inView, value]);

  return (
    <p className="font-mono text-3xl font-bold text-fg">
      <span className="text-lg text-muted">from </span>€
      {/* tabular figures reserve width — no shift while counting */}
      <span ref={ref}>
        <span ref={num} className="tabular-nums">
          0
        </span>
      </span>
    </p>
  );
}

export default function Services() {
  useGSAP(() => {}); // registers the plugin context once

  return (
    <Reveal id="services" className="mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SplitHeading className="font-sans text-[length:var(--text-title)] font-semibold tracking-tight">
        services
      </SplitHeading>
      <p className="mt-4 max-w-xl text-muted">
        Hand-coded. Fast. Yours outright — no platform fees, no lock-in. One-off,
        not a subscription.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {TIERS.map((tier) => (
          <Item
            key={tier.name}
            className={`relative flex flex-col gap-5 rounded-sm border p-6 transition-shadow duration-300 ${
              tier.featured
                ? "border-accent/40 bg-accent/[0.04] shadow-[0_0_40px_-12px_rgba(0,255,136,0.15)] hover:shadow-[0_0_60px_-8px_rgba(0,255,136,0.22)]"
                : "border-line bg-card"
            }`}
          >
            {tier.featured && (
              <span className="absolute right-4 top-4 border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10px] text-accent">
                most popular
              </span>
            )}
            <h3 className="font-mono text-sm uppercase tracking-widest text-muted">
              {tier.name}
            </h3>
            <Price value={tier.price} />
            <ul className="space-y-2.5 text-sm text-fg/85">
              {tier.rows.map((r) => (
                <li key={r} className="flex gap-2.5">
                  <span aria-hidden className="select-none text-accent">
                    ▸
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </Item>
        ))}
      </div>

      <p className="mt-8 max-w-2xl font-mono text-xs leading-relaxed text-muted">
        + €30–50/mo optional — hosting, updates &amp; priority support. Every job
        is different, so the real number depends on what you need; the quote is
        free and there&apos;s no obligation.
      </p>

      <Item className="mt-8">
        <a
          href="#contact"
          className="group inline-flex min-h-11 items-center gap-2 border border-accent/40 bg-accent/10 px-6 py-3 font-mono text-sm text-accent transition-colors duration-300 hover:bg-accent/20"
        >
          [ get a free quote{" "}
          <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />{" "}
          ]
        </a>
      </Item>
    </Reveal>
  );
}
