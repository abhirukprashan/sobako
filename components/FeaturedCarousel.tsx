"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProduct, formatLKR } from "@/lib/products";

const IMG = "/featured";

type Item = {
  img: string;
  name: string;
  variant: string;
  copy: string;
  slug?: string;
  href?: string;
};

// Background-removed Sobako packs, matched to the catalog where a product page exists.
const ITEMS: Item[] = [
  {
    img: `${IMG}/3.webp`,
    name: "Kalu Heenati",
    variant: "Traditional Rice",
    copy: "A deep red heritage rice, nutty and hearty, rich in fibre and antioxidants — the wholesome heart of a traditional table.",
    slug: "kalu-heenati-rice",
  },
  {
    img: `${IMG}/57.webp`,
    name: "Corn",
    variant: "Rice Porridge",
    copy: "Golden corn blended with traditional rice for a light, naturally sweet kanda that's ready in minutes.",
    href: "/shop?cat=PORRIDGE",
  },
  {
    img: `${IMG}/29.webp`,
    name: "Corn",
    variant: "Pasta",
    copy: "A light, naturally gluten-friendly pasta made from golden corn — mellow, wholesome and easy to love.",
    slug: "corn-pasta",
  },
  {
    img: `${IMG}/1.webp`,
    name: "Suwandel",
    variant: "Traditional Rice",
    copy: "The fragrant 'sweet-smelling' heritage rice, soft and delicately aromatic — once reserved for festive tables.",
    slug: "suwandel-rice",
  },
  {
    img: `${IMG}/51.webp`,
    name: "9 Mixed Rice",
    variant: "Rice Porridge",
    copy: "Nine traditional rice varieties in one comforting bowl — a nourishing Sri Lankan breakfast in every spoonful.",
    href: "/shop?cat=PORRIDGE",
  },
  {
    img: `${IMG}/35.webp`,
    name: "Moringa",
    variant: "Pasta",
    copy: "Everyday pasta enriched with moringa leaf, the island's favourite green superfood.",
    href: "/shop?cat=PASTA",
  },
  {
    img: `${IMG}/8.webp`,
    name: "Batapolel",
    variant: "Traditional Rice",
    copy: "A wholesome everyday heritage rice with a satisfying bite and gentle earthiness.",
    slug: "batapola-rice",
  },
  {
    img: `${IMG}/46.webp`,
    name: "Kurakkan",
    variant: "Pasta",
    copy: "Finger-millet pasta with a rich, earthy flavour — a traditional grain made for modern plates.",
    href: "/shop?cat=PASTA",
  },
  {
    img: `${IMG}/2.webp`,
    name: "Mavee",
    variant: "Traditional Rice",
    copy: "A rare heritage variety with a soft, comforting texture — grown naturally, left unpolished.",
    href: "/shop?cat=RICE",
  },
  {
    img: `${IMG}/44.webp`,
    name: "Suwandel",
    variant: "Pasta",
    copy: "Fragrant Suwandel rice, reimagined as a tender everyday pasta.",
    href: "/shop?cat=PASTA",
  },
  {
    img: `${IMG}/5.webp`,
    name: "Lanka Basmati",
    variant: "Rice · 4kg",
    copy: "Long, fluffy, aromatic grains for biriyani, fried rice and every celebration in between.",
    href: "/shop?cat=RICE",
  },
];

const N = ITEMS.length;
const AUTOPLAY_MS = 4800;

// Shortest signed distance from the active slide, so the ring wraps both ways.
const offsetOf = (i: number, active: number) => {
  let d = i - active;
  if (d > N / 2) d -= N;
  if (d < -N / 2) d += N;
  return d;
};

export default function FeaturedCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragX = useRef<number | null>(null);

  const go = useCallback(
    (dir: number) => setActive((a) => (a + dir + N) % N),
    []
  );

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [active, paused, go]);

  const item = ITEMS[active];
  const product = item.slug ? getProduct(item.slug) : undefined;
  const href = item.slug ? `/products/${item.slug}` : item.href ?? "/shop";

  return (
    <section
      className="fc relative overflow-hidden bg-cream py-14 md:py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      aria-roledescription="carousel"
      aria-label="Featured this season"
    >
      <p className="eyebrow text-center">Have you been introduced?</p>
      <h2 className="section-title mt-3 px-6 text-center">
        Featured This Season
      </h2>

      {/* Stage */}
      <div
        className="fc-stage relative mx-auto mt-8 md:mt-12"
        onPointerDown={(e) => (dragX.current = e.clientX)}
        onPointerUp={(e) => {
          if (dragX.current === null) return;
          const dx = e.clientX - dragX.current;
          dragX.current = null;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}
        onPointerCancel={() => (dragX.current = null)}
      >
        {ITEMS.map((it, i) => {
          const o = offsetOf(i, active);
          const abs = Math.abs(o);
          const hidden = abs > 2;
          return (
            <button
              key={it.img}
              type="button"
              tabIndex={o === 0 ? -1 : 0}
              aria-label={`${it.name} ${it.variant}`}
              aria-hidden={hidden}
              onClick={() => o !== 0 && go(o)}
              className={`fc-item ${o === 0 ? "is-active" : ""}`}
              style={{
                transform: `translate3d(calc(-50% + var(--gap) * ${o}), 0, 0) scale(${
                  o === 0 ? 1 : abs === 1 ? 0.78 : 0.62
                })`,
                opacity: hidden ? 0 : abs === 2 ? 0.55 : 1,
                zIndex: 10 - abs,
                pointerEvents: hidden ? "none" : "auto",
              }}
            >
              <span className="fc-rise" data-offset={o}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={it.img}
                  alt=""
                  draggable={false}
                  className="fc-img"
                />
                <span className="fc-shadow" aria-hidden="true" />
              </span>
            </button>
          );
        })}

        {/* Arrows hug the active pack */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous product"
          className="fc-arrow left-[calc(50%-var(--arrow))]"
        >
          <ArrowLeft size={20} strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next product"
          className="fc-arrow left-[calc(50%+var(--arrow))]"
        >
          <ArrowRight size={20} strokeWidth={2} />
        </button>
      </div>

      {/* Active product copy */}
      <div
        key={active}
        className="fc-copy mx-auto mt-6 max-w-md px-6 text-center"
        aria-live="polite"
      >
        <h3 className="text-xl font-semibold uppercase tracking-tight">
          {item.name}{" "}
          <span className="font-medium text-ink/50">· {item.variant}</span>
        </h3>
        {product && (
          <p className="mt-1 text-sm text-botanical">
            {formatLKR(product.price)}
          </p>
        )}
        <p className="mt-3 text-sm leading-relaxed text-ink/70">{item.copy}</p>
        <Link
          href={href}
          className="pill mt-6 gap-2 text-[11px] uppercase tracking-widest"
        >
          Shop Now <ArrowRight size={13} strokeWidth={1.5} />
        </Link>
      </div>

      {/* Progress dots */}
      <div className="mt-8 flex justify-center gap-2" role="tablist">
        {ITEMS.map((it, i) => (
          <button
            key={it.img}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Show ${it.name} ${it.variant}`}
            onClick={() => setActive(i)}
            className="h-1.5 rounded-full transition-all duration-500 ease-apple"
            style={{
              width: i === active ? 22 : 6,
              background:
                i === active ? "var(--botanical)" : "rgba(20,20,20,0.18)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
