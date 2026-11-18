"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Facebook, Instagram, Twitter } from "lucide-react";

const MENU = [
  { label: "Shop All", href: "/shop" },
  { label: "Traditional Rice", href: "/shop?cat=RICE" },
  { label: "Porridge", href: "/shop?cat=PORRIDGE" },
  { label: "Herbal Porridge", href: "/shop?cat=HERBAL" },
  { label: "Flour & Pasta", href: "/shop?cat=FLOUR" },
];

const INFO = [
  { label: "About Us", href: "/about" },
  { label: "Our Blog", href: "/blog" },
  { label: "B2B & Export", href: "/b2b" },
  { label: "Contact", href: "/contact" },
  { label: "Recipes", href: "/recipes" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="hair-t">
      <div className="mx-auto max-w-[1400px] px-6 py-14 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-4">
            <Link
              href="/"
              className="font-serif text-3xl transition-opacity hover:opacity-70"
              style={{ color: "var(--botanical)" }}
            >
              Sobako
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/60">
              Small-batch heritage rice, wholesome porridge and stone-milled
              flour — grown with care in Sri Lanka.
            </p>
            <div className="mt-8 flex items-center gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-hair transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-cream"
                >
                  <Icon size={14} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="label mb-5 text-ink/40">Menu</h4>
            <ul className="space-y-3 text-sm">
              {MENU.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="transition-opacity hover:opacity-60"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div className="md:col-span-2">
            <h4 className="label mb-5 text-ink/40">Info</h4>
            <ul className="space-y-3 text-sm">
              {INFO.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="transition-opacity hover:opacity-60"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 md:col-span-4">
            <h4 className="label mb-5 text-ink/40">Join The Table</h4>
            <p className="max-w-xs text-sm leading-relaxed text-ink/60">
              Seasonal recipes, new harvest drops, and a little pantry wisdom.
            </p>
            {sent ? (
              <p
                className="mt-5 text-sm"
                style={{ color: "var(--botanical)" }}
              >
                Thank you — welcome to the table.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSent(true);
                }}
                className="mt-6 max-w-sm"
              >
                <div className="flex items-center gap-3 border-b border-ink/40 pb-2 transition-colors focus-within:border-ink">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="transition-opacity hover:opacity-60"
                  >
                    <ArrowRight size={16} strokeWidth={1.5} />
                  </button>
                </div>
                <button
                  type="submit"
                  className="pill mt-5 text-[11px] uppercase tracking-widest"
                >
                  Sign Me Up
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="hair-t">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-6 py-6 text-[11px] tracking-widest text-ink/50 md:flex-row md:px-10">
          <span>© 2026 SOBAKO</span>
          <span className="uppercase">Grown in Sri Lanka</span>
        </div>
      </div>
    </footer>
  );
}
