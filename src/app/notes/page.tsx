import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { posts } from "@/content/notes";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Writeups on security, AI systems, and building things by hand — by Euan Smith.",
};

function fmt(date: string) {
  return new Intl.DateTimeFormat("en-IE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function NotesIndex() {
  return (
    <main id="main" className="mx-auto min-h-dvh max-w-2xl px-6 py-24 sm:py-32">
      <Link
        href="/"
        className="inline-flex min-h-11 items-center gap-2 font-mono text-sm text-muted transition-colors duration-300 hover:text-fg"
      >
        <ArrowLeft className="size-4" /> back
      </Link>

      <h1 className="mt-10 font-mono text-[length:var(--text-title)] font-semibold">
        notes/
      </h1>
      <p className="mt-3 text-muted">
        Things I&apos;ve found or figured out — security, AI systems, hand-coding.
      </p>

      <ul className="mt-12 space-y-4">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/notes/${p.slug}`}
              className="group block rounded-sm border border-line bg-card p-5 transition-colors duration-300 hover:border-accent/40"
            >
              <div className="flex items-center gap-3 font-mono text-xs text-dim">
                <time dateTime={p.date}>{fmt(p.date)}</time>
                <span>·</span>
                <span>{p.readingTime}</span>
                {p.tag && (
                  <span className="ml-auto border border-line px-1.5 py-0.5 text-accent/80">
                    {p.tag}
                  </span>
                )}
              </div>
              <h2 className="mt-2 text-lg font-semibold text-fg">{p.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {p.description}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-muted transition-colors duration-300 group-hover:text-accent">
                read <ArrowRight className="size-3.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
