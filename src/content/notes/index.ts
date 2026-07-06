import * as promptInjection from "./prompt-injection";

// registry of writeups — add a module here and it appears on /notes
const modules = [promptInjection];

export const posts = modules
  .map((m) => m.meta)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPost(slug: string) {
  return modules.find((m) => m.meta.slug === slug) ?? null;
}
