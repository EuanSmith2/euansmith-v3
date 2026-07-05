"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#projects", label: "work" },
  { href: "#services", label: "services" },
  { href: "#contact", label: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 64);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

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
        href="#"
        className="text-fg/70 transition-colors duration-300 hover:text-fg"
      >
        euan smith
      </a>
      <nav aria-label="site navigation">
        <ul className="flex gap-6">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-muted transition-colors duration-300 hover:text-fg"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
