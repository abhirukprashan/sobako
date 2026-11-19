import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import SplitText from "@/components/SplitText";

const IMG = "/hero-food";

// Dishes made with Sobako's own range: rice, porridge, flour and pasta.
const PACKS = [
  { src: `${IMG}/rice-kanda.webp`, alt: "Rice kanda porridge" },
  { src: `${IMG}/penne-veg-bowl.webp`, alt: "Vegetable penne made with Sobako pasta" },
  { src: `${IMG}/rice-garden-veg.webp`, alt: "Traditional rice with garden vegetables" },
  { src: `${IMG}/string-hoppers.webp`, alt: "String hoppers made with Sobako flour" },
  { src: `${IMG}/porridge-fruit-nut.webp`, alt: "Grain porridge with fruit and nuts" },
  { src: `${IMG}/spaghetti-sauce.webp`, alt: "Spaghetti with tomato sauce" },
  { src: `${IMG}/rice-bowl.webp`, alt: "Bowl of steamed heritage rice" },
  { src: `${IMG}/pasta-salad.webp`, alt: "Pasta salad" },
  { src: `${IMG}/porridge-berry.webp`, alt: "Creamy porridge with berries" },
  { src: `${IMG}/tagliatelle.webp`, alt: "Tagliatelle in tomato sauce" },
];

/**
 * Repeat the packs around the full circle so the wheel can turn forever
 * without a visible seam or gaps.
 */
const SLOTS = Array.from({ length: PACKS.length * 2 }, (_, i) => {
  const pack = PACKS[i % PACKS.length];
  const step = 360 / (PACKS.length * 2);
  return {
    ...pack,
    angle: -180 + step * i,
    delay: i * 18,
  };
});

export default function HeroFan() {
  return (
    <section className="hero-fan">
      <div className="hero-fan-copy">
        <SplitText
          as="h1"
          lines={["Naturally grown,", "beautifully made"]}
          delay={140}
          stagger={95}
          className="hero-fan-title"
        />

        <p className="hero-fan-sub">
          Traditional rice, herbal porridge and stone-milled flour — grown
          naturally in Sri Lanka, prepared the way it has always been.
        </p>

        <Link
          href="/shop"
          className="pill pill-green hero-fan-cta text-[11px] uppercase tracking-widest"
        >
          Shop All
          <ArrowRight
            size={13}
            strokeWidth={1.5}
            className="hero-fan-cta-arrow"
          />
        </Link>
      </div>

      <div className="hero-fan-stage">
        <div className="hero-fan-wheel">
          {SLOTS.map((p, i) => (
            <div
              key={`${p.src}-${i}`}
              className="hero-fan-slot"
              style={
                {
                  "--a": `${p.angle}deg`,
                  "--delay": `${p.delay}ms`,
                } as CSSProperties
              }
            >
              <div className="hero-fan-spin">
                <div className="hero-fan-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.src}
                    alt={p.alt}
                    className="hero-fan-img"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
