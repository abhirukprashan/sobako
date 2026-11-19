"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Heart, Plus, Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatLKR } from "@/lib/products";
import { useStore } from "@/context/StoreContext";
import { flyToCart } from "@/lib/flyToCart";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, isFavorite, openCart } = useStore();
  const fav = isFavorite(product.slug);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (openTimer.current) clearTimeout(openTimer.current);
    };
  }, []);

  const trackPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = mediaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const handleQuickAdd = () => {
    addToCart(product, { openDrawer: false });
    flyToCart(imgRef.current);
    if (openTimer.current) clearTimeout(openTimer.current);
    openTimer.current = setTimeout(openCart, 800);
  };

  return (
    <div className="group relative flex flex-col">
      <div className="relative">
        <Link
          href={`/products/${product.slug}`}
          className="relative block overflow-hidden"
        >
          <div data-m-media>
          <div
            ref={mediaRef}
            onPointerMove={trackPointer}
            className="relative aspect-[4/5] overflow-hidden bg-[#f4efe4]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              className="card-img h-full w-full object-cover"
            />
            <div className="card-spotlight" aria-hidden="true" />
            <div className="card-sheen" aria-hidden="true" />
          </div>
          </div>
        </Link>

        <button
          aria-label="Toggle favorite"
          aria-pressed={fav}
          onClick={() => toggleFavorite(product.slug)}
          className={`heart-btn absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-hair bg-[rgba(254,251,244,0.8)] backdrop-blur ${
            fav ? "is-fav" : ""
          }`}
        >
          <Heart
            size={14}
            strokeWidth={1.5}
            fill={fav ? "var(--botanical)" : "none"}
            color={fav ? "var(--botanical)" : "var(--ink)"}
          />
        </button>

        {/* Quick add pill */}
        <button
          onClick={handleQuickAdd}
          className="pill !absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-2 gap-2 bg-cream !py-2 !px-4 text-[11px] uppercase tracking-widest opacity-0 transition-all duration-500 ease-apple group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Plus size={13} strokeWidth={1.5} /> Quick Add
        </button>
      </div>

      <div className="flex flex-1 flex-col items-start gap-1 px-5 py-6 text-left">
        <div className="flex w-full items-start justify-between gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="label leading-relaxed transition-opacity hover:opacity-60"
          >
            {product.name}
          </Link>

          <div
            className="mt-px flex shrink-0 items-center gap-[2px] pr-3"
            aria-label={`${product.rating} out of 5 stars, ${product.reviews} reviews`}
          >
            {Array.from({ length: 5 }).map((_, i) => {
              const filled = i < Math.round(product.rating);
              return (
                <Star
                  key={i}
                  size={11}
                  strokeWidth={1.5}
                  fill={filled ? "var(--botanical)" : "none"}
                  color={filled ? "var(--botanical)" : "rgba(20,20,20,0.3)"}
                />
              );
            })}
            <span className="ml-1 hidden text-[10px] tracking-widest text-ink/40 lg:inline">
              {product.reviews}
            </span>
          </div>
        </div>

        <span className="mt-0.5 text-[11px] tracking-widest text-ink/50">
          {product.weight}
        </span>
        <span className="mt-0.5 text-sm">{formatLKR(product.price)}</span>
      </div>
    </div>
  );
}
