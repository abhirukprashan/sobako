"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Star,
  Check,
} from "lucide-react";
import type { Product } from "@/lib/products";
import { formatLKR, CATEGORY_LABELS } from "@/lib/products";
import { useStore } from "@/context/StoreContext";
import RelatedSlider from "@/components/RelatedSlider";
import Accordion from "@/components/Accordion";
import Reveal from "@/components/Reveal";

export default function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { addToCart } = useStore();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToBag = () => {
    addToCart(product, { qty, openDrawer: false });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleBuy = () => {
    addToCart(product, { qty });
  };

  // Split description: bold lead sentence + remainder
  const parts = product.description.split(/(?<=\.)\s+/);
  const lead = parts[0];
  const rest = parts.slice(1).join(" ");

  return (
    <div>
      {/* Breadcrumb */}
      <div className="hair-b px-6 py-4 md:px-10">
        <Link
          href="/shop"
          className="label inline-flex items-center gap-2 transition-opacity hover:opacity-60"
        >
          <ArrowLeft size={14} strokeWidth={1.5} /> Back to Shop
        </Link>
      </div>

      {/* ---------- TOP: GALLERY + INFO ---------- */}
      <section className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 py-10 md:px-10 md:py-16 lg:grid-cols-2 lg:items-start lg:gap-16">
        {/* Gallery */}
        <Reveal variant="mask" className="lg:self-start">
          <div className="detail-media relative h-[420px] overflow-hidden bg-[#eee9df] shadow-[-10px_10px_28px_-14px_rgba(20,20,20,0.45)] sm:h-[560px] lg:h-[640px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.images[0]}
              alt={product.name}
              className="detail-img h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* Info */}
        <Reveal className="flex flex-col">
          <h1 className="font-sans text-2xl font-semibold uppercase tracking-tight md:text-[1.75rem]">
            {CATEGORY_LABELS[product.category]} · {product.name}
          </h1>

          <div className="mt-3 text-sm" style={{ color: "var(--botanical)" }}>
            {formatLKR(product.price)}
          </div>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  strokeWidth={1.5}
                  fill={i < product.rating ? "var(--botanical)" : "none"}
                  color="var(--botanical)"
                />
              ))}
            </div>
            <span className="text-[11px] tracking-widest text-ink/50">
              {product.reviews} REVIEWS
            </span>
          </div>

          <p className="mt-6 text-sm font-semibold">{lead}</p>
          {rest && (
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/70">
              {rest}
            </p>
          )}

          <p className="mt-6 text-sm text-ink/60">{product.weight}</p>

          {/* Quantity */}
          <div className="mt-8">
            <label className="mb-2 block text-sm">Quantity:</label>
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) =>
                setQty(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-20 border border-ink bg-transparent px-4 py-3 text-sm outline-none"
            />
          </div>

          {/* Buy + Add to bag */}
          <div className="mt-5 flex flex-row gap-3">
            <button
              onClick={handleBuy}
              className="flex flex-1 items-center justify-center gap-2 border py-4 text-[11px] uppercase tracking-widest transition-opacity duration-300 hover:opacity-90"
              style={{
                background: "var(--botanical)",
                borderColor: "var(--botanical)",
                color: "var(--cream)",
              }}
            >
              Buy Now
            </button>

            <button
              onClick={handleAddToBag}
              className="flex flex-1 items-center justify-center gap-2 border border-ink py-4 text-[11px] uppercase tracking-widest transition-colors duration-300 hover:border-botanical hover:bg-botanical hover:text-cream"
            >
              {added ? (
                <>
                  <Check size={15} strokeWidth={1.5} /> Added to Bag
                </>
              ) : (
                "Add to Bag"
              )}
            </button>
          </div>

          {/* Accordions */}
          <div className="mt-10">
            <Accordion title="How to Use">
              <ol className="space-y-2">
                {product.cooking.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span style={{ color: "var(--botanical)" }}>0{i + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 italic text-ink/60">{product.pairing}</p>
            </Accordion>

            <Accordion title="Ingredients">
              <p>{product.ingredients}</p>
              <p className="mt-3 text-ink/60">{product.origin}</p>
            </Accordion>

            <Accordion title="Shipping &amp; Returns">
              <p>
                Free island-wide delivery on orders over Rs 5,000. Standard
                delivery arrives within 2–4 business days.
              </p>
              <p className="mt-3 text-ink/60">
                Unopened pantry items can be returned within 14 days. Reach out
                to our team and we&apos;ll make it right.
              </p>
            </Accordion>
            <div className="border-t border-hair" />
          </div>
        </Reveal>
      </section>

      {/* ---------- YOU MIGHT ALSO LIKE ---------- */}
      <RelatedSlider products={related} />

    </div>
  );
}
