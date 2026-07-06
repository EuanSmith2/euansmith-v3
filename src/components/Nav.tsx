"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#projects", label: "work" },
  { href: "#services", label: "services" },
  { href: "#contact", label: "contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 64);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // active section: the last section heading that crossed the upper third
  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      Boolean,
    ) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        }
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // the single-page nav only belongs on the home route; /cv has its own
  if (pathname !== "/") return null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 font-mono text-sm transition-all duration-500",
        scrolled
          ? "border-b border-line bg-bg/90 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <a
        href="#main"
        className="text-fg/70 transition-colors duration-300 hover:text-fg"
      >
        euan smith
      </a>

      {/* desktop */}
      <nav aria-label="site navigation" className="hidden md:block">
        <ul className="flex gap-6">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={cn(
                  "transition-colors duration-300 hover:text-fg",
                  active === href ? "text-fg" : "text-muted",
                )}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <Link href="/notes" className="text-muted transition-colors duration-300 hover:text-fg">
              notes
            </Link>
          </li>
        </ul>
      </nav>

      {/* mobile */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "close menu" : "open menu"}
        className="flex min-h-11 min-w-11 items-center justify-center text-xl text-fg/80 md:hidden"
      >
        {open ? "×" : "≡"}
      </button>

      <div
        className={cn(
          "fixed inset-0 top-[57px] z-40 flex flex-col bg-bg/95 backdrop-blur-sm transition-all duration-300 md:hidden",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0",
        )}
        aria-hidden={!open}
      >
        <nav aria-label="site navigation, mobile" className="px-6 pt-10">
          <ul className="space-y-6">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block text-2xl transition-colors duration-300",
                    active === href ? "text-fg" : "text-muted",
                  )}
                  tabIndex={open ? 0 : -1}
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/notes"
                onClick={() => setOpen(false)}
                className="block text-2xl text-muted transition-colors duration-300"
                tabIndex={open ? 0 : -1}
              >
                notes
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
