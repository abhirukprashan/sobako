import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProducts, bestsellers } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import ParallaxImage from "@/components/ParallaxImage";
import HeroFan from "@/components/HeroFan";

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

export default function HomePage() {
  const featured = featuredProducts();
  const best = bestsellers();

  return (
    <div>
      {/* ---------- HERO ---------- */}
      <HeroFan />

      {/* ---------- MARQUEE ---------- */}
      <Marquee />

      {/* ---------- FEATURED GRID ---------- */}
      <section className="grid grid-cols-2 lg:grid-cols-4">
        {featured.map((p, i) => (
          <Reveal
            key={p.slug}
            delay={i * 80}
            className={`border-b ${i % 2 === 0 ? "border-r" : ""} lg:border-r ${
              i === 3 ? "lg:border-r-0" : ""
            }`}
          >
            <ProductCard product={p} />
          </Reveal>
        ))}
      </section>

      {/* ---------- SPLIT CATEGORY FEATURE ---------- */}
      <section id="story" className="grid grid-cols-1 lg:grid-cols-2">
        <ParallaxImage
          src={u("photo-1512621776951-a57141f2eefd")}
          alt="Fresh herbs and grains for traditional porridge"
          className="min-h-[360px] border-b lg:border-r lg:border-b-0 lg:min-h-[560px]"
        />
        <div className="flex flex-col">
          <CategoryBox
            title="Traditional Rice"
            copy="Heritage varieties like Kalu Heenati and Suwandel, grown naturally and left unpolished to keep their goodness."
            href="/shop?cat=RICE"
            border
          />
          <CategoryBox
            title="Herbal Porridge"
            copy="Kola kanda blends of curry leaves, yaki naran and heenbovitiya — wellness rituals passed down for generations."
            href="/shop?cat=HERBAL"
          />
        </div>
      </section>

      {/* ---------- BEST SELLERS ---------- */}
      <section>
        <Reveal className="hair-b px-6 py-6 md:px-10">
          <h2 className="label">Pantry Best-Sellers</h2>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {best.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={i * 80}
              className={`border-b ${i % 2 === 0 ? "border-r" : ""} lg:border-r ${
                i === 3 ? "lg:border-r-0" : ""
              }`}
            >
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- DELIVERY BANNER ---------- */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative flex flex-col justify-between border-b lg:border-r lg:border-b-0 px-6 py-10 md:px-10 md:py-14">
          <Reveal>
            <p className="max-w-sm text-sm leading-relaxed text-ink/70">
              Order today and we&apos;ll pack your goodness fresh and send it
              island-wide — wholesome staples delivered right to your door.
            </p>
            <Link
              href="/shop"
              className="pill mt-8 text-[11px] uppercase tracking-widest"
            >
              Shop Now
            </Link>
          </Reveal>
          <SplitText
            as="h2"
            trigger="view"
            lines={["Order today,", "delivered island-wide"]}
            stagger={80}
            className="mt-16 font-sans text-3xl font-semibold uppercase leading-[1.05] tracking-tight md:text-5xl"
          />
        </div>
        <ParallaxImage
          src={u("photo-1542838132-92c53300491e")}
          alt="Fresh natural grocery delivery"
          className="min-h-[340px] lg:min-h-[520px]"
        />
      </section>
    </div>
  );
}

function CategoryBox({
  title,
  copy,
  href,
  border,
}: {
  title: string;
  copy: string;
  href: string;
  border?: boolean;
}) {
  return (
    <Reveal
      className={`flex flex-1 flex-col justify-between px-6 py-10 md:px-10 md:py-14 ${
        border ? "hair-b" : ""
      }`}
    >
      <div>
        <h3 className="font-sans text-2xl font-semibold uppercase tracking-tight md:text-3xl">
          {title}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/70">
          {copy}
        </p>
      </div>
      <Link
        href={href}
        className="pill mt-8 self-start gap-2 text-[11px] uppercase tracking-widest"
      >
        View Collection <ArrowRight size={13} strokeWidth={1.5} />
      </Link>
    </Reveal>
  );
}
