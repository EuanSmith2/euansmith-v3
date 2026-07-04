"use client";
import { motion } from "framer-motion";
import { sectionReveal, childUp } from "@/lib/utils";

/** Scroll-choreographed section: children stagger in (60ms) on first
 *  viewport entry. Entrance only — nothing animates out. */
export function Reveal({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      className={className}
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.section>
  );
}

export function Item({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={childUp} className={className}>
      {children}
    </motion.div>
  );
}
