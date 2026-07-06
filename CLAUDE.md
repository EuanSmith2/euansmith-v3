@AGENTS.md

# euansmith.net — operating manual

Euan Smith's personal site. Two audiences at once: a big-tech recruiter and a Dublin SME owner. Every change serves one of them. Production: https://euansmith.net (Vercel, `main` auto-deploys via git integration).

## Stack (verify against `node_modules/next/dist/docs/` — this is Next 16, not 15)
- **Next.js 16 App Router**, TypeScript, React 19. Fully static (`○ (Static)` in build output) — keep it that way; no `middleware.ts` unless you accept losing static export.
- **Tailwind v4** — config lives in `@theme` inside `src/app/globals.css`, NOT a `tailwind.config.js`. Design tokens (`--color-bg #0a0a0a`, `--color-accent #00ff88`, `--color-fg`, `--color-muted #8a8a8a`, `--color-line #1a1a1a`, `--color-card #111`) are defined there.
- Framer Motion (scroll/entrance), GSAP (count-ups), Three.js/R3F (hero particle field), Lenis (smooth scroll), Shiki (code in `/notes`), Formspree (contact), `@vercel/analytics` + `speed-insights`.

## Architecture map
- `src/app/` — routes. `page.tsx` (home, all sections), `cv/` (print-optimised CV — its own chrome), `notes/` + `notes/[slug]/` (writeups), metadata files (`opengraph-image.tsx`, `icon.tsx`, `sitemap.ts`, `robots.ts`).
- `src/components/` — one component per section (Hero, About, Projects, Services, Contact, Footer) plus behaviour (Nav, Cursor, ScrollProgress, SmoothScroll, SocialDock) and primitives (Section, Code, SplitHeading, icons).
- `src/content/notes/` — each writeup is a `.tsx` module exporting `meta` + `Content`; register it in `index.ts` and it appears on `/notes` and in the sitemap automatically.
- Live data is fetched in **server components** with `next: { revalidate }` + a graceful fallback (see `RepoStats.tsx`, `Contributions.tsx`) — never block render, never show an error state.

## Conventions
- **Aesthetic = intentional restraint.** Dark terminal. Green accent used in ~3 places (CTA, active state, cursor). It already has enough motion — do not add effects. Every animation wraps `prefers-reduced-motion`.
- **No emoji as icons.** Lucide has NO brand icons — GitHub/LinkedIn/TikTok are inline SVGs in `icons.tsx`.
- **Copy is a fact, never a feeling.** "Hand-codes websites for local businesses" ships; "passionate about building" never does. Honest and specific over polished. This is a 19-year-old Dublin dev's voice, not marketing.
- **Prose in `/notes`** uses child-combinator utilities on the article wrapper (`[&_p]:mt-5` etc.) so post bodies stay plain HTML elements.
- Touch targets `min-h-11`, visible focus rings, skip-link — accessibility is not optional.

## Gotchas (these have bitten before)
- **Nav active-state observer only queries `#` anchors.** Adding a page path (`/notes`) to the `LINKS` array throws (`querySelector("/notes")` is an invalid selector). Page links are rendered separately with `next/link`.
- **Site chrome (Nav, Cursor, ScrollProgress, Lenis) is guarded to the home route** via `usePathname()` — the `/cv` page is white and print-oriented; the dark chrome must not bleed onto it.
- **CSP is set in `next.config.ts`** (`headers()`). If you add an external script/font/API, update `script-src`/`connect-src`/`font-src` or it silently breaks in production only (local dev doesn't enforce it the same way).
- **`params` is a Promise** in Next 16 dynamic routes — `const { slug } = await params`.
- Page `<title>` gets `— Euan Smith` appended by the layout template; set page titles bare (`"CV"`, not `"CV — Euan Smith"`) or it doubles.

## The discipline (non-negotiable)
1. `npm run build` must exit 0 before any commit.
2. **Verify in a real browser before claiming done.** Serve the production build (`npm run start -- -p <port>`) and drive it with the Playwright MCP at 1280px AND 375px: assert no horizontal overflow, screenshot the actual change, check the console for CSP violations. "It builds" ≠ "it works."
3. Commit per coherent unit with `feat:`/`fix:` messages describing behaviour. Deploy preview first (`vercel deploy`); production (`vercel deploy --prod`) only on Euan's explicit go.
4. **Preview gate:** anything written in Euan's voice for the public (notes, copy, social) — he reads it before it's shared widely. Building it is fine; declaring it his published word is his call.
