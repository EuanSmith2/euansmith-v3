import { codeToHtml } from "shiki";

/** Server-side syntax highlighting via Shiki (what VS Code uses) — runs at
 *  build, emits static HTML with inline styles (allowed by the site CSP's
 *  style-src 'unsafe-inline'). No client JS. */
export default async function Code({
  code,
  lang = "python",
}: {
  code: string;
  lang?: string;
}) {
  const html = await codeToHtml(code.trim(), {
    lang,
    theme: "github-dark-dimmed",
  });
  return (
    <div
      className="my-6 overflow-x-auto rounded-sm border border-line text-[13px] leading-relaxed [&_pre]:!bg-card [&_pre]:p-4"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
