"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";

const LEFT_LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },
  { label: "SHOP", href: "/shop" },
];

const B2B_CATEGORIES = [
  { label: "Rice", href: "/b2b#rice" },
  { label: "Spices", href: "/b2b#spices" },
  { label: "Brine", href: "/b2b#brine" },
  { label: "Kithul & Coconut", href: "/b2b#kithul" },
  { label: "Ready to Eat", href: "/b2b#ready-to-eat" },
  { label: "Curry Mixes", href: "/b2b#curry-mixes" },
  { label: "Dehydrated Fruit & Veg", href: "/b2b#dehydrated" },
  { label: "Sobako Products", href: "/b2b#sobako" },
];

const RIGHT_LINKS = [
  { label: "BLOG", href: "/blog" },
  { label: "RECIPES", href: "/recipes" },
  { label: "CONTACT", href: "/contact" },
];

const ALL_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Shop", href: "/shop" },
  { label: "B2B", href: "/b2b" },
  { label: "Blog", href: "/blog" },
  { label: "Recipes", href: "/recipes" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const { cartCount, favCount, openCart } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (href: string) =>
    `label transition-colors duration-300 hover:text-botanical ${
      isActive(href) ? "text-botanical" : ""
    }`;

  return (
    <header
      className="sticky top-0 z-40 hair-b transition-[background,backdrop-filter] duration-500 ease-apple"
      style={{
        background: scrolled ? "rgba(254,251,244,0.85)" : "rgba(254,251,244,1)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link
          href="/"
          className="flex-shrink-0 transition-opacity hover:opacity-70"
          aria-label="Sobako home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cropped-website-logo-sobako.png"
            alt="Sobako"
            className="h-9 w-auto object-contain md:h-10"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden flex-1 items-center justify-center gap-5 lg:flex xl:gap-7">
          {LEFT_LINKS.map((l) => (
            <Link key={l.label} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}

          {/* B2B dropdown */}
          <div className="group relative flex items-center">
            <Link href="/b2b" className={linkClass("/b2b")}>
              B2B
            </Link>
            <div
              className="pointer-events-none absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-4 opacity-0 transition-all duration-300 ease-apple group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100"
            >
              <div
                className="border border-hair bg-cream p-2 shadow-[0_18px_40px_-24px_rgba(20,20,20,0.35)]"
              >
                {B2B_CATEGORIES.map((c) => (
                  <Link
                    key={c.label}
                    href={c.href}
                    className="block px-3 py-2 text-[12px] text-ink/70 transition-colors duration-200 hover:bg-ink/[0.04] hover:text-ink"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {RIGHT_LINKS.map((l) => (
            <Link key={l.label} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-shrink-0 items-center gap-4 md:gap-5">
          <Link
            href="/favorites"
            className="label flex items-center gap-1.5 transition-opacity hover:opacity-60"
          >
            <Heart size={15} strokeWidth={1.5} />
            <span className="hidden sm:inline">FAVORITES ({favCount})</span>
          </Link>
          <button
            onClick={openCart}
            className="label flex items-center gap-1.5 transition-opacity hover:opacity-60"
          >
            <ShoppingBag size={15} strokeWidth={1.5} />
            <span className="hidden sm:inline">CART ({cartCount})</span>
            <span className="sm:hidden">({cartCount})</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="flex h-8 w-8 items-center justify-center lg:hidden"
          >
            {menuOpen ? (
              <X size={18} strokeWidth={1.5} />
            ) : (
              <Menu size={18} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        className={`overflow-hidden border-t border-hair bg-cream transition-[max-height] duration-500 ease-apple lg:hidden ${
          menuOpen ? "max-h-[480px]" : "max-h-0 border-t-0"
        }`}
      >
        <div className="px-6 py-4">
          {ALL_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={`block py-3 text-sm transition-colors hover:text-botanical ${
                isActive(l.href) ? "text-botanical" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
