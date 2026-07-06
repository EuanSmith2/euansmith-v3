"use client";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GitHubIcon, TikTokIcon, LinkedInIcon } from "./icons";

const SOCIALS = [
  { href: "https://github.com/EuanSmith2", label: "GitHub", handle: "EuanSmith2", Icon: GitHubIcon },
  { href: "https://www.linkedin.com/in/euan-smith-4295123a6/", label: "LinkedIn", handle: "euan smith", Icon: LinkedInIcon },
  { href: "https://www.tiktok.com/@euan_smith", label: "TikTok", handle: "@euan_smith", Icon: TikTokIcon },
];

/** Proximity dock: each tile scales with how close the cursor is, macOS-style.
 *  Keyboard users get the same lift on focus. Falls back to a static row under
 *  reduced-motion (spring stiffness makes the resting state identical). */
function DockTile({
  mouseX,
  href,
  label,
  handle,
  Icon,
}: {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  href: string;
  label: string;
  handle: string;
  Icon: React.FC<{ className?: string }>;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  // distance from cursor to this tile's centre → size
  const dist = useTransform(mouseX, (x) => {
    const b = ref.current?.getBoundingClientRect();
    if (!b) return 9999;
    return x - (b.left + b.width / 2);
  });
  const sizeSync = useTransform(dist, [-140, 0, 140], [56, 76, 56]);
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 170, damping: 14 });

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} — ${handle}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={{ width: size, height: size }}
      className="group relative flex items-center justify-center rounded-md border border-line bg-card text-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent hover:shadow-[0_0_24px_-6px_rgba(0,255,136,0.35)] focus-visible:text-accent"
    >
      <Icon className="size-5" />
      {/* handle label surfaces above on hover/focus */}
      <motion.span
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
        transition={{ duration: 0.18 }}
        className="pointer-events-none absolute -top-9 whitespace-nowrap border border-line bg-bg px-2 py-1 font-mono text-[11px] text-fg"
      >
        {label} <span className="text-dim">{handle}</span>
      </motion.span>
    </motion.a>
  );
}

export default function SocialDock() {
  const mouseX = useMotionValue(Infinity);
  return (
    <div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex items-end gap-3"
      role="list"
      aria-label="social links"
    >
      {SOCIALS.map((s) => (
        <DockTile key={s.href} mouseX={mouseX} {...s} />
      ))}
    </div>
  );
}
