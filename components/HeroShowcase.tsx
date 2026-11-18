"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatLKR, CATEGORY_LABELS } from "@/lib/products";

export default function HeroShowcase({ products }: { products: Product[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const product = products[active];

  const prev = () =>
    setActive((i) => (i - 1 + products.length) % products.length);
  const next = () => setActive((i) => (i + 1) % products.length);

  // Auto-advance the showcase
  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % products.length),
      4500
    );
    return () => clearInterval(id);
  }, [paused, products.length]);

  return (
    <div
      className="relative min-h-[420px] overflow-hidden bg-[#eee9df] lg:min-h-[640px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Product images */}
      {products.map((p, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={p.slug}
          src={p.images[0]}
          alt={p.name}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-apple ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Black gradient for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />

      {/* Navigation arrows */}
      <div className="absolute right-4 top-4 flex items-center gap-2">
        <button
          onClick={prev}
          aria-label="Previous product"
          className="flex h-10 w-10 items-center justify-center border border-white/50 text-cream backdrop-blur-sm transition-colors duration-300 hover:bg-cream hover:text-ink"
        >
          <ChevronLeft size={18} strokeWidth={1.5} />
        </button>
        <button
          onClick={next}
          aria-label="Next product"
          className="flex h-10 w-10 items-center justify-center border border-white/50 text-cream backdrop-blur-sm transition-colors duration-300 hover:bg-cream hover:text-ink"
        >
          <ChevronRight size={18} strokeWidth={1.5} />
        </button>
      </div>

      {/* Product info */}
      <div className="absolute inset-x-4 bottom-4 md:inset-x-8 md:bottom-8">
        <div className="max-w-md">
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
            className="label mt-5 inline-flex items-center gap-2 border border-cream/70 px-5 py-3 text-cream transition-colors duration-300 hover:bg-cream hover:text-ink"
          >
            Shop <ArrowRight size={12} strokeWidth={1.5} />
          </Link>
        </div>

        {/* Dots */}
        <div className="mt-6 flex max-w-md items-center gap-2">
          {products.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => setActive(i)}
              aria-label={`Show ${p.name}`}
              className="h-[3px] flex-1 transition-colors duration-500"
              style={{
                background:
                  i === active ? "var(--cream)" : "rgba(254,251,244,0.35)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
