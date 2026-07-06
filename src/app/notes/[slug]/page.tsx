import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { posts, getPost } from "@/content/notes";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.meta.title, description: post.meta.description };
}

function fmt(date: string) {
  return new Intl.DateTimeFormat("en-IE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { meta, Content } = post;

  return (
    <main id="main" className="mx-auto min-h-dvh max-w-2xl px-6 py-24 sm:py-32">
      <Link
        href="/notes"
        className="inline-flex min-h-11 items-center gap-2 font-mono text-sm text-muted transition-colors duration-300 hover:text-fg"
      >
        <ArrowLeft className="size-4" /> all notes
      </Link>

      <article className="mt-10">
        <div className="flex items-center gap-3 font-mono text-xs text-dim">
          <time dateTime={meta.date}>{fmt(meta.date)}</time>
          <span>·</span>
          <span>{meta.readingTime}</span>
        </div>
        <h1 className="mt-3 text-[clamp(1.8rem,1.3rem+2vw,2.6rem)] font-semibold leading-tight">
          {meta.title}
        </h1>

        {/* prose — child-combinator utilities style the plain elements the
            post body emits, so writeups stay simple to author */}
        <div
          className="mt-10 text-[1.02rem] leading-[1.75] text-fg/90
            [&_h2]:mt-12 [&_h2]:mb-1 [&_h2]:font-mono [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-fg
            [&_p]:mt-5
            [&_strong]:text-fg [&_strong]:font-semibold
            [&_em]:text-fg/95
            [&_code]:rounded-sm [&_code]:border [&_code]:border-line [&_code]:bg-card [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-code
            [&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_ol]:marker:text-dim
            [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:marker:text-dim"
        >
          <Content />
        </div>
      </article>

      <footer className="mt-20 border-t border-line pt-6 font-mono text-xs text-dim">
        <Link href="/" className="transition-colors duration-300 hover:text-accent">
          euansmith.net
        </Link>{" "}
        · written by hand
      </footer>
    </main>
  );
}
