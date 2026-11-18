"use client";

import { useEffect, useRef, useState } from "react";

export default function ParallaxImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1.06);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // progress 0 -> 1 as element travels through viewport
        const progress = Math.min(
          1,
          Math.max(0, 1 - (rect.top + rect.height / 2) / (vh + rect.height))
        );
        setScale(1.06 - progress * 0.06);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="parallax-img h-full w-full object-cover"
        style={{ transform: `scale(${scale})` }}
      />
    </div>
  );
}
