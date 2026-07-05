import { GitFork, Star, Clock } from "lucide-react";

/** Live repo stats — server component, revalidated hourly (one GitHub API
 *  hit per hour, well inside the unauthenticated limit). */
export default async function RepoStats({ repo }: { repo: string }) {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    const pushed = new Intl.DateTimeFormat("en-IE", {
      day: "numeric",
      month: "short",
    }).format(new Date(data.pushed_at));

    return (
      <ul className="flex gap-5 font-mono text-xs text-muted" aria-label="repository stats">
        <li className="flex items-center gap-1.5">
          <Star className="size-3.5" aria-hidden /> {data.stargazers_count}
        </li>
        <li className="flex items-center gap-1.5">
          <GitFork className="size-3.5" aria-hidden /> {data.forks_count}
        </li>
        <li className="flex items-center gap-1.5">
          <Clock className="size-3.5" aria-hidden /> pushed {pushed}
        </li>
      </ul>
    );
  } catch {
    return (
      <p className="font-mono text-xs text-dim">github.com/{repo}</p>
    );
  }
}

export function RepoStatsSkeleton() {
  return (
    <div className="flex gap-5" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span key={i} className="h-4 w-14 animate-pulse rounded-sm bg-line" />
      ))}
    </div>
  );
}
