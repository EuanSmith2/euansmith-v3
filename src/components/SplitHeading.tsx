"use client";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

/** Section heading with character-level reveal (Splitting.js sets
 *  --char-index; globals.css animates). Falls back to plain text. */
export default function SplitHeading({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const el = useRef<HTMLHeadingElement>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  useEffect(() => {
    if (!el.current) return;
    import("splitting").then(({ default: Splitting }) => {
      Splitting({ target: el.current!, by: "chars" });
      el.current!.classList.add("split-ready");
    });
  }, []);

  return (
    <h2
      ref={(node) => {
        el.current = node;
        ref(node);
      }}
      className={`${className} ${inView ? "split-in" : ""}`}
      aria-label={children}
    >
      {children}
    </h2>
  );
}
