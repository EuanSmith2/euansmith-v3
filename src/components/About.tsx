import Image from "next/image";
import SplitHeading from "./SplitHeading";
import { Reveal, Item } from "./Section";

const FACTS = [
  "19, Dublin. Building things that ship.",
  "Hand-codes websites for local businesses — no templates, no builders, no WordPress.",
  "Built NZT-48: 7 specialised agents, Telegram interface, proactive 07:30 brief every morning.",
  "BSc Cybersecurity & Digital Forensics, TU Dublin — Sept 2026.",
  "Active on TryHackMe, chasing ISC2 CC cert.",
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

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
        <Item>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
            <Image
              src="/euan.jpg"
              alt="Euan Smith"
              width={200}
              height={200}
              className="size-40 shrink-0 rounded-sm border border-line object-cover grayscale transition-[filter] duration-500 hover:grayscale-0 sm:size-52"
              priority={false}
            />
            <ul className="space-y-4 text-[length:var(--text-lead)] leading-relaxed text-fg/90">
              {FACTS.map((f) => (
                <li key={f} className="flex gap-3">
                  <span aria-hidden className="mt-1 select-none font-mono text-accent">
                    ▸
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Item>

        <Item className="overflow-x-auto">{contributions}</Item>
      </div>
    </Reveal>
  );
}
