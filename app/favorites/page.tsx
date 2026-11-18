"use client";

import Link from "next/link";
import { products } from "@/lib/products";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

export default function FavoritesPage() {
  const { favorites } = useStore();
  const saved = products.filter((p) => favorites.includes(p.slug));

  return (
    <div>
      <div className="hair-b px-6 py-12 text-center md:px-10 md:py-16">
        <Reveal>
          <h1 className="font-serif text-4xl md:text-5xl">Favorites</h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-ink/60">
            The pieces of your pantry you&apos;ve saved for later.
          </p>
        </Reveal>
      </div>

      {saved.length === 0 ? (
        <div className="flex flex-col items-center gap-4 px-6 py-24 text-center">
          <p className="font-serif text-2xl">No favorites yet</p>
          <p className="max-w-sm text-sm text-ink/55">
            Tap the heart on any product to save it here.
          </p>
          <Link href="/shop" className="pill mt-2 text-[11px] uppercase tracking-widest">
            Browse The Pantry
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {saved.map((p, i) => (
            <div
              key={p.slug}
              className={`border-b ${i % 2 === 0 ? "border-r" : ""} lg:border-r ${
                i % 4 === 3 ? "lg:border-r-0" : ""
              }`}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
