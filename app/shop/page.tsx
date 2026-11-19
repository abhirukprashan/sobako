"use client";

import { useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products, CATEGORY_LABELS } from "@/lib/products";
import type { Category } from "@/lib/products";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";

const TABS = ["ALL", "RICE", "PORRIDGE", "HERBAL", "PASTA", "FLOUR"];

const tabLabel = (t: string) =>
  t === "ALL" ? "ALL" : CATEGORY_LABELS[t as Category];

function ShopInner() {
  const { category, setCategory } = useStore();
  const params = useSearchParams();

  useEffect(() => {
    const cat = params.get("cat");
    if (cat && TABS.includes(cat)) setCategory(cat);
    else setCategory("ALL");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const filtered = useMemo(
    () =>
      category === "ALL"
        ? products
        : products.filter((p) => p.category === category),
    [category]
  );

  return (
    <div>
      <div className="hair-b px-6 py-12 text-center md:px-10 md:py-16">
        <Reveal variant="fade">
          <SplitText
            as="h1"
            lines={["Shop Sobako"]}
            delay={100}
            stagger={75}
            className="font-serif text-4xl md:text-5xl"
          />
          <p className="mx-auto mt-3 max-w-md text-sm text-ink/60">
            Traditional rice, herbal porridge, stone-milled flour and wholesome
            pasta — natural goodness for every Sri Lankan table.
          </p>
        </Reveal>
      </div>

      {/* Filter tabs */}
      <div className="sticky top-[69px] z-30 flex flex-wrap items-center justify-center gap-2 border-b border-hair bg-cream px-6 py-5 md:top-[73px]">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setCategory(t)}
            className="shop-tab label px-5 py-2"
            style={{
              background: category === t ? "var(--botanical)" : "transparent",
              color: category === t ? "var(--cream)" : "var(--ink)",
              border: category === t ? "1px solid var(--botanical)" : "1px solid var(--hair)",
            }}
          >
            {tabLabel(t)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4">
        {filtered.map((p, i) => (
          <Reveal
            key={p.slug}
            delay={(i % 4) * 70}
            className={`border-b ${i % 2 === 0 ? "border-r" : ""} lg:border-r ${
              i % 4 === 3 ? "lg:border-r-0" : ""
            }`}
          >
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="px-10 py-20 label">Loading pantry…</div>}>
      <ShopInner />
    </Suspense>
  );
}
