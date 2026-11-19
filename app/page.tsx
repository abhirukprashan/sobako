import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { bestsellers } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Marquee from "@/components/Marquee";
import HeroFan from "@/components/HeroFan";
import HomeMotion from "@/components/HomeMotion";
import FeaturedCarousel from "@/components/FeaturedCarousel";

const cellBorder = (i: number) =>
  `border-b ${i % 2 === 0 ? "border-r" : ""} lg:border-r ${
    i === 3 ? "lg:border-r-0" : ""
  } overflow-hidden`;

export default function HomePage() {
  const best = bestsellers();

  return (
    <div>
      {/* ---------- HERO ---------- */}
      <div className="hero-pin">
        <HeroFan />
      </div>

      <HomeMotion>
        {/* ---------- MARQUEE ---------- */}
        <Marquee />

        {/* ---------- FEATURED CAROUSEL ---------- */}
        <div className="hair-b">
          <FeaturedCarousel />
        </div>

        {/* ---------- SPLIT CATEGORY FEATURE ---------- */}
        <section
          id="story"
          data-m="section"
          className="grid grid-cols-1 bg-cream lg:grid-cols-2"
        >
          <MotionImage
            mode="curtain"
            src="/self.jpg"
            alt="Sobako rice, pasta and porridge packs lined up on a supermarket shelf"
            className="min-h-[360px] border-b lg:border-r lg:border-b-0 lg:min-h-[560px]"
          />
          <div className="flex flex-col overflow-hidden">
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
        <section data-m="section" className="bg-cream">
          <div
            data-m="lines"
            className="hair-b overflow-hidden px-6 py-12 text-center md:px-10 md:py-16"
          >
            <p data-line className="eyebrow">
              Loved in Sri Lankan kitchens
            </p>
            <h2 data-line className="section-title mt-3">
              Pantry Best-Sellers
            </h2>
          </div>
          <div data-m="cards" className="grid grid-cols-2 lg:grid-cols-4">
            {best.map((p, i) => (
              <div key={p.slug} className={cellBorder(i)}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>

        {/* ---------- DELIVERY BANNER ---------- */}
        <section
          data-m="section"
          className="grid grid-cols-1 bg-cream md:grid-cols-2"
        >
          <div className="relative flex flex-col justify-between border-b px-6 py-8 md:border-r md:border-b-0 md:px-10 md:py-10">
            <div data-m="lines">
              <div className="overflow-hidden">
                <p data-line className="max-w-sm text-sm leading-relaxed text-ink/70">
                  Order today and we&apos;ll pack your goodness fresh and send it
                  island-wide — wholesome staples delivered right to your door.
                </p>
              </div>
              <div className="overflow-hidden pt-8">
                <Link
                  data-line
                  href="/shop"
                  className="pill text-[11px] uppercase tracking-widest"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            <h2
              data-m="lines"
              className="section-title mt-10 md:mt-12"
            >
              <span className="block overflow-hidden">
                <span data-line className="block">
                  Order today,
                </span>
              </span>
              <span className="block overflow-hidden">
                <span data-line className="block">
                  delivered island-wide
                </span>
              </span>
            </h2>
          </div>
          <MotionImage
            mode="circle"
            src="/delevary.jpg"
            alt="Sobako order packed for island-wide delivery"
            className="min-h-[240px] md:min-h-[340px]"
          />
        </section>
      </HomeMotion>
    </div>
  );
}

function MotionImage({
  src,
  alt,
  mode,
  className = "",
}: {
  src: string;
  alt: string;
  mode: "curtain" | "circle";
  className?: string;
}) {
  return (
    <div data-m={mode} className={`relative overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
      />
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
    <div
      data-m="slide"
      className={`flex flex-1 flex-col justify-between px-6 py-10 md:px-10 md:py-14 ${
        border ? "hair-b" : ""
      }`}
    >
      <div>
        <h3 className="card-title">
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
    </div>
  );
}
