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
  const frameRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    const img = imgRef.current;
    if (!frame || !img) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(frame);

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = frame.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 -> 1 as the frame travels through the viewport
        const progress = Math.min(
          1,
          Math.max(0, 1 - (rect.top + rect.height / 2) / (vh + rect.height))
        );
        const shift = (0.5 - progress) * 52;
        img.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0) scale(1.16)`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={frameRef}
      className={`parallax-frame overflow-hidden ${visible ? "is-visible" : ""} ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        className="parallax-img h-full w-full object-cover"
        style={{ transform: "translate3d(0, 0, 0) scale(1.16)" }}
      />
    </div>
  );
}
