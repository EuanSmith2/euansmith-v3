import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Shared motion tokens — one rhythm for the whole site. */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const sectionReveal = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

export const childUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};
