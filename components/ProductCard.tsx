"use client";

import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatLKR } from "@/lib/products";
import { useStore } from "@/context/StoreContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, isFavorite } = useStore();
  const fav = isFavorite(product.slug);

  return (
    <div className="group relative flex flex-col">
      <Link
        href={`/products/${product.slug}`}
        className="relative block overflow-hidden"
      >
        <div className="aspect-[4/5] overflow-hidden bg-[#f4efe4]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-[600ms] ease-apple group-hover:scale-[1.03]"
          />
        </div>
      </Link>

      <button
        aria-label="Toggle favorite"
        onClick={() => toggleFavorite(product.slug)}
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-hair bg-[rgba(254,251,244,0.8)] backdrop-blur transition-all duration-300 hover:scale-110"
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
        onClick={() => addToCart(product)}
        className="pill absolute bottom-[90px] left-1/2 -translate-x-1/2 translate-y-2 gap-2 bg-cream !py-2 !px-4 text-[11px] uppercase tracking-widest opacity-0 transition-all duration-500 ease-apple group-hover:translate-y-0 group-hover:opacity-100"
      >
        <Plus size={13} strokeWidth={1.5} /> Quick Add
      </button>

      <div className="flex flex-1 flex-col items-center gap-1 px-4 py-6 text-center">
        <Link
          href={`/products/${product.slug}`}
          className="label leading-relaxed transition-opacity hover:opacity-60"
        >
          {product.name}
        </Link>
        <span className="text-[11px] tracking-widest text-ink/50">
          {product.weight}
        </span>
        <span className="mt-1 text-sm">{formatLKR(product.price)}</span>
      </div>
    </div>
  );
}
