"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { MoveLeft, MoveRight, Check } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatLKR, cutoutImage } from "@/lib/products";
import { useStore } from "@/context/StoreContext";

/** Compact "You Might Also Like" row: small bordered cards that scroll sideways. */
export default function RelatedSlider({ products }: { products: Product[] }) {
  const { addToCart } = useStore();
  const track = useRef<HTMLDivElement | null>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const [added, setAdded] = useState<string | null>(null);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const scrollBy = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const add = (p: Product) => {
    addToCart(p);
    setAdded(p.slug);
    window.setTimeout(() => setAdded((s) => (s === p.slug ? null : s)), 1500);
  };

  return (
    <section className="hair-t px-6 py-12 md:px-10 md:py-16">
      <div className="mb-6 flex items-end justify-between gap-4 md:mb-8">
        <h2 className="section-title" style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)" }}>
          You Might Also Like
        </h2>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={edge.start}
            aria-label="Previous products"
            className="rs-arrow"
          >
            <MoveLeft size={22} strokeWidth={1} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={edge.end}
            aria-label="Next products"
            className="rs-arrow"
          >
            <MoveRight size={22} strokeWidth={1} />
          </button>
        </div>
      </div>

      <div ref={track} onScroll={update} className="rs-track">
        {products.map((p) => (
          <article key={p.slug} data-card className="rs-card">
            <Link
              href={`/products/${p.slug}`}
              className="flex flex-1 flex-col items-center text-center"
            >
              <div className="rs-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cutoutImage(p)} alt={p.name} loading="lazy" />
              </div>
              <h3 className="mt-4 min-h-[2.6em] px-1 text-xs font-medium uppercase leading-snug tracking-wide">
                {p.name}
                <span className="text-ink/50"> ({p.weight})</span>
              </h3>
              <p className="mt-3 text-sm font-semibold text-botanical">{formatLKR(p.price)}</p>
            </Link>
            <button
              type="button"
              onClick={() => add(p)}
              className="rs-add"
            >
              {added === p.slug ? (
                <>
                  <Check size={13} strokeWidth={2} /> Added
                </>
              ) : (
                "Add to cart"
              )}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
