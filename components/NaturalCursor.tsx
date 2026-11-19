"use client";

import { useEffect, useRef, useState } from "react";

const SIZE = 64;
// Where the stem meets the pointer, in the 64×64 box.
const HOTSPOT_X = 5;
const HOTSPOT_Y = 56;

export default function NaturalCursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [down, setDown] = useState(false);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    // Only replace the pointer on devices with a precise mouse/trackpad.
    if (!window.matchMedia("(any-pointer: fine)").matches) {
      return;
    }

    setEnabled(true);
    document.documentElement.classList.add("natural-cursor-on");

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let started = false;
    let shown = false;
    let raf = 0;

    const show = () => {
      if (!shown) {
        shown = true;
        setVisible(true);
      }
    };
    const hide = () => {
      if (shown) {
        shown = false;
        setVisible(false);
      }
    };

    const render = () => {
      x += (targetX - x) * 0.26;
      y += (targetY - y) * 0.26;
      // The element mounts one render after `enabled` flips true, so read the
      // ref each frame instead of once when the effect starts.
      if (ref.current) {
        ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!started) {
        x = targetX;
        y = targetY;
        started = true;
      }
      show();
    };

    const onDown = () => {
      setDown(true);
      setPulse((p) => p + 1);
      show();
    };
    const onUp = () => setDown(false);
    const onLeave = () => hide();
    const onEnter = () => {
      if (started) show();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("natural-cursor-on");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`natural-cursor ${visible ? "is-visible" : ""} ${
        down ? "is-down" : ""
      }`}
      style={{
        width: SIZE,
        height: SIZE,
        marginLeft: -HOTSPOT_X,
        marginTop: -HOTSPOT_Y,
      }}
    >
      <div className="natural-cursor-badge">
        <svg
          className="natural-cursor-leaf"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="natural-cursor-leaf-fill"
              x1="7"
              y1="4"
              x2="20"
              y2="19"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#49b06d" />
              <stop offset="1" stopColor="#166938" />
            </linearGradient>
          </defs>

          {/* Leaf blade */}
          <path
            d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
            fill="url(#natural-cursor-leaf-fill)"
            stroke="#0d4a25"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />

          {/* Stem */}
          <path
            d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"
            fill="none"
            stroke="#0d4a25"
            strokeWidth="1.4"
            strokeLinecap="round"
          />

          {/* Central vein */}
          <path
            d="M10.8 15.8c1.8-2.6 3.4-5.2 4.9-8"
            fill="none"
            stroke="#b7e6c6"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.5"
          />

          {/* Highlight along the leaf edge */}
          <path
            d="M11.4 17.8c2.4-1.2 4.6-3.4 5.8-6.1"
            fill="none"
            stroke="#b7e6c6"
            strokeWidth="0.75"
            strokeLinecap="round"
            opacity="0.55"
          />

        </svg>
      </div>
      {pulse > 0 && <span key={pulse} className="natural-cursor-pulse" />}
    </div>
  );
}
