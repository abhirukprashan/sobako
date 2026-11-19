import type { CSSProperties } from "react";

type LeafConfig = {
  left: string;
  size: string;
  dur: string;
  delay: string;
  drift: string;
  sway: string;
  color: string;
  opacity: string;
};

const COLORS = ["#166938", "#49b06d", "#2f8f52", "#8cc9a0"];

// Deterministic pseudo-random so the server and client render the same leaves.
const rand = (i: number, seed: number) => {
  const x = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const LEAVES: LeafConfig[] = Array.from({ length: 28 }, (_, i) => ({
  left: `${(rand(i, 1) * 100).toFixed(2)}%`,
  size: `${10 + Math.round(rand(i, 2) * 13)}px`,
  dur: `${(12 + rand(i, 3) * 11).toFixed(1)}s`,
  delay: `${(-rand(i, 4) * 23).toFixed(1)}s`,
  drift: `${Math.round(24 + rand(i, 5) * 64)}px`,
  sway: `${(2.8 + rand(i, 6) * 2.4).toFixed(2)}s`,
  color: COLORS[i % COLORS.length],
  opacity: (0.35 + rand(i, 7) * 0.35).toFixed(2),
}));

export default function FallingLeaves() {
  return (
    <div className="falling-leaves" aria-hidden="true">
      {LEAVES.map((leaf, i) => (
        <span
          key={i}
          className={`falling-leaf ${i >= 14 ? "falling-leaf--extra" : ""}`}
          style={
            {
              "--left": leaf.left,
              "--size": leaf.size,
              "--dur": leaf.dur,
              "--delay": leaf.delay,
              "--drift": leaf.drift,
              "--sway": leaf.sway,
              "--leaf-color": leaf.color,
              "--leaf-opacity": leaf.opacity,
            } as CSSProperties
          }
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
              fill="var(--leaf-color)"
            />
            <path
              d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"
              stroke="var(--leaf-color)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}
