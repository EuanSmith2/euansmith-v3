import { cn } from "@/lib/utils";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const LEVEL: Record<number, string> = {
  0: "bg-[#161616]",
  1: "bg-[#0d3321]",
  2: "bg-[#0f5c33]",
  3: "bg-[#00b35f]",
  4: "bg-[#00ff88]",
};

/** Live GitHub contribution graph — server component, fetched at build and
 *  revalidated daily. Renders a quiet placeholder grid if the API is down,
 *  so the layout never shifts and never shows an error. */
export default async function Contributions() {
  let days: Day[] = [];
  let total = 0;
  try {
    const res = await fetch(
      "https://github-contributions-api.jogruber.de/v4/EuanSmith2?y=last",
      { next: { revalidate: 86400 } },
    );
    if (res.ok) {
      const data = await res.json();
      days = (data.contributions as Day[]).slice(-182); // ~26 weeks fits the column
      // total must describe what's actually shown, not the full year (the grid
      // renders 6 months) — picture and number agree
      total = days.reduce((a, d) => a + d.count, 0);
    }
  } catch {
    /* fall through to placeholder */
  }
  if (days.length === 0) {
    days = Array.from({ length: 182 }, (_, i) => ({
      date: String(i),
      count: 0,
      level: 0 as const,
    }));
  }

  const weeks: Day[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  return (
    <figure>
      <div
        className="flex gap-[3px]"
        role="img"
        aria-label={
          total
            ? `GitHub contribution graph: ${total} contributions in the last 6 months`
            : "GitHub contribution graph"
        }
      >
        {weeks.map((week, w) => (
          <div key={w} className="flex flex-col gap-[3px]">
            {week.map((d) => (
              <span
                key={d.date}
                className={cn("size-[9px] rounded-[2px]", LEVEL[d.level])}
              />
            ))}
          </div>
        ))}
      </div>
      <figcaption className="mt-3 font-mono text-xs text-muted">
        {total > 0
          ? `${total.toLocaleString("en-IE")} contributions, last 6 months`
          : "github.com/EuanSmith2"}
      </figcaption>
    </figure>
  );
}
