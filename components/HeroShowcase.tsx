"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatLKR, CATEGORY_LABELS } from "@/lib/products";

export default function HeroShowcase({ products }: { products: Product[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);
  const product = products[active];

  const go = (next: number) => {
    setActive((next + products.length) % products.length);
    setTick((t) => t + 1);
  };
  const prev = () => go(active - 1);
  const next = () => go(active + 1);

  // Auto-advance the showcase; restart the timer after manual navigation.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % products.length),
      4500
    );
    return () => clearInterval(id);
  }, [paused, products.length, tick]);

  return (
    <div
      className="relative min-h-[420px] overflow-hidden bg-[#eee9df] lg:min-h-[640px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      {/* Product images */}
      {products.map((p, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={p.slug}
          src={p.images[0]}
          alt={p.name}
          className={`hero-img absolute inset-0 h-full w-full object-cover ${
            i === active ? "is-active" : ""
          }`}
        />
      ))}

      {/* Black gradient for legibility */}
      <div className="hero-vignette pointer-events-none absolute inset-0" />

      {/* Index counter */}
      <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-3 md:left-8 md:top-8">
        <span className="label text-cream/80">
          {String(active + 1).padStart(2, "0")}
        </span>
        <span className="h-px w-8 bg-cream/40" />
        <span className="label text-cream/40">
          {String(products.length).padStart(2, "0")}
        </span>
      </div>

      {/* Navigation arrows */}
      <div className="absolute right-4 top-4 flex items-center gap-2 md:right-8 md:top-8">
        <button
          onClick={prev}
          aria-label="Previous product"
          className="hero-arrow flex h-10 w-10 items-center justify-center border border-white/50 text-cream backdrop-blur-sm transition-colors duration-300 hover:border-botanical hover:bg-botanical hover:text-cream"
        >
          <ChevronLeft size={18} strokeWidth={1.5} />
        </button>
        <button
          onClick={next}
          aria-label="Next product"
          className="hero-arrow flex h-10 w-10 items-center justify-center border border-white/50 text-cream backdrop-blur-sm transition-colors duration-300 hover:border-botanical hover:bg-botanical hover:text-cream"
        >
          <ChevronRight size={18} strokeWidth={1.5} />
        </button>
      </div>

      {/* Product info */}
      <div className="absolute inset-x-4 bottom-4 md:inset-x-8 md:bottom-8">
        <div
          key={product.slug}
          className="hero-copy max-w-md"
          aria-live="polite"
        >
          <span className="label text-cream/70">
            {CATEGORY_LABELS[product.category]}
          </span>
          <h2 className="mt-2 font-sans text-2xl font-semibold uppercase leading-tight tracking-tight text-cream md:text-3xl">
            {product.name}
          </h2>
          <span className="mt-2 block text-sm text-cream/80">
            {formatLKR(product.price)}
          </span>
          <Link
            href={`/products/${product.slug}`}
            className="label group/cta mt-5 inline-flex items-center gap-2 border border-cream/70 px-5 py-3 text-cream transition-colors duration-300 hover:border-botanical hover:bg-botanical hover:text-cream"
          >
            Shop
            <ArrowRight
              size={12}
              strokeWidth={1.5}
              className="transition-transform duration-500 ease-apple group-hover/cta:translate-x-1"
            />
          </Link>
        </div>

        {/* Progress dots */}
        <div className="mt-6 flex max-w-md items-center gap-2">
          {products.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => go(i)}
              aria-label={`Show ${p.name}`}
              className={`hero-progress flex-1 ${
                i === active ? "is-active" : ""
              } ${paused && i === active ? "is-paused" : ""}`}
            >
              <span key={`${tick}-${i}-${active}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
