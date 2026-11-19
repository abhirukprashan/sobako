"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  lines: string[];
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: "mount" | "view";
};

/**
 * Splits a headline into lines and words, then lifts each word into place
 * with a staggered, masked reveal.
 */
export default function SplitText({
  lines,
  as: Tag = "span",
  className = "",
  delay = 0,
  stagger = 55,
  trigger = "mount",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(trigger === "mount");

  useEffect(() => {
    if (trigger === "mount") {
      const raf = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(raf);
    }

    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [trigger]);

  const Component = Tag as any;
  let order = 0;

  return (
    <Component
      ref={ref as any}
      aria-label={lines.join(" ")}
      className={`split-text ${inView ? "is-in" : ""} ${className}`}
    >
      {lines.map((line, li) => (
        <span className="split-line" key={li} aria-hidden="true">
          {line.split(" ").map((word, wi) => {
            const d = delay + order * stagger;
            order += 1;
            return (
              <span
                key={wi}
                className="split-word"
                style={{ animationDelay: `${d}ms` }}
              >
                {word}
              </span>
            );
          })}
        </span>
      ))}
    </Component>
  );
}
