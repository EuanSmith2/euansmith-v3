import Image from "next/image";
import SplitHeading from "./SplitHeading";
import { Reveal, Item } from "./Section";

const FACTS = [
  "19, Dublin.",
  "Hand-codes sites for local businesses — no templates, no page builders.",
  "Built NZT-48: a personal AI that wakes me up with a brief at 7am.",
  "Incoming BSc Cybersecurity & Digital Forensics, TU Dublin.",
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

      <div className="mt-12 grid gap-12 md:grid-cols-[auto_1fr_auto] md:gap-16">
        <Item>
          <Image
            src="/euan.jpg"
            alt="Euan Smith"
            width={180}
            height={180}
            className="size-36 rounded-sm border border-line object-cover grayscale transition-[filter] duration-500 hover:grayscale-0 sm:size-44"
            priority={false}
          />
        </Item>

        <Item>
          <ul className="max-w-md space-y-4 text-[length:var(--text-lead)] leading-relaxed text-fg/90">
            {FACTS.map((f) => (
              <li key={f} className="flex gap-3">
                <span aria-hidden className="select-none font-mono text-accent">
                  ▸
                </span>
                {f}
              </li>
            ))}
          </ul>
        </Item>

        <Item className="overflow-x-auto">{contributions}</Item>
      </div>
    </Reveal>
  );
}
