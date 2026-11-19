import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import SplitText from "@/components/SplitText";

const IMG = "/hero-aniamtion-circle-images";

const PACKS = [
  { src: `${IMG}/46-removebg-preview.png`, alt: "Sobako heritage rice pack" },
  { src: `${IMG}/29-removebg-preview.png`, alt: "Sobako herbal porridge pack" },
  { src: `${IMG}/7-removebg-preview.png`, alt: "Sobako stone-milled flour pack" },
  { src: `${IMG}/35-removebg-preview.png`, alt: "Sobako traditional rice pack" },
  { src: `${IMG}/1-removebg-preview.png`, alt: "Sobako natural goodness pack" },
  { src: `${IMG}/44-removebg-preview.png`, alt: "Sobako kola kanda pack" },
  { src: `${IMG}/8-removebg-preview.png`, alt: "Sobako pasta pack" },
  { src: `${IMG}/51-removebg-preview.png`, alt: "Sobako curry mix pack" },
  { src: `${IMG}/57-removebg-preview.png`, alt: "Sobako pantry staple pack" },
];

/**
 * Repeat the packs around the full circle so the wheel can turn forever
 * without a visible seam or gaps.
 */
const SLOTS = Array.from({ length: PACKS.length * 3 }, (_, i) => {
  const pack = PACKS[i % PACKS.length];
  const step = 360 / (PACKS.length * 3);
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
