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
  price: number;
  prefix: string;
  suffix?: string;
  rows: string[];
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Starter",
    price: 400,
    prefix: "From €",
    rows: ["Landing page", "Contact form", "Mobile-first"],
  },
  {
    name: "Business",
    price: 650,
    prefix: "From €",
    rows: ["Booking / menu", "SEO-ready", "Mobile-first"],
    featured: true,
  },
  {
    name: "Maintenance",
    price: 30,
    prefix: "€",
    suffix: "–50/mo",
    rows: ["Updates + uptime", "Priority support"],
  },
];

/** Price counts up once on first viewport entry (IntersectionObserver via
 *  useInView triggerOnce — never re-fires). */
function Price({ tier }: { tier: Tier }) {
  const num = useRef<HTMLSpanElement>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.6 });

  useEffect(() => {
    if (!inView || !num.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      num.current.textContent = String(tier.price);
      return;
    }
    const counter = { v: 0 };
    gsap.to(counter, {
      v: tier.price,
      duration: 1.1,
      ease: "power3.out",
      onUpdate: () => {
        num.current!.textContent = String(Math.round(counter.v));
      },
    });
  }, [inView, tier.price]);

  return (
    <p ref={ref} className="font-mono text-3xl font-bold text-fg">
      {tier.prefix}
      {/* tabular figures reserve width — no shift while counting */}
      <span ref={num} className="tabular-nums">
        0
      </span>
      {tier.suffix}
    </p>
  );
}

export default function Services() {
  useGSAP(() => {}); // registers the plugin context once

  return (
    <Reveal id="services" className="mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SplitHeading className="font-mono text-[length:var(--text-title)] font-semibold">
        {"> services"}
      </SplitHeading>
      <p className="mt-4 max-w-xl text-muted">
        Hand-coded. Fast. Yours outright — no platform fees, no lock-in.
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
            <Price tier={tier} />
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

      <Item className="mt-10">
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
