"use client";

import Link from "next/link";
import { useState } from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

const MENU = [
  { label: "Shop", href: "/shop" },
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
      <div className="mx-auto max-w-[1400px] px-6 pb-8 pt-14 md:px-10 md:pt-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-12 md:gap-8">
          {/* Menu */}
          <div className="md:col-span-2">
            <h4 className="label mb-5">Menu</h4>
            <ul className="space-y-2.5 text-[11px] uppercase tracking-widest text-ink/60">
              {MENU.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="transition-colors duration-300 hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div className="md:col-span-2 md:col-start-4">
            <h4 className="label mb-5">Info</h4>
            <ul className="space-y-2.5 text-[11px] uppercase tracking-widest text-ink/60">
              {INFO.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="transition-colors duration-300 hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 md:col-span-4 md:col-start-9">
            <h4 className="label mb-5">Get Promotion From Us</h4>
            {sent ? (
              <p className="text-sm" style={{ color: "var(--botanical)" }}>
                Thank you — welcome to the table.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSent(true);
                }}
                className="flex items-center gap-4"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full border-b border-ink/40 bg-transparent pb-2 text-sm outline-none transition-colors focus:border-ink placeholder:text-ink/40"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 border border-ink px-5 py-2.5 text-[10px] uppercase tracking-widest transition-colors duration-300 hover:bg-ink hover:text-cream"
                >
                  Sign Up
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-5 text-ink/70">
            <a
              href="#"
              aria-label="Facebook"
              className="transition-colors hover:text-ink"
            >
              <Facebook size={15} strokeWidth={1.5} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="transition-colors hover:text-ink"
            >
              <Instagram size={15} strokeWidth={1.5} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="transition-colors hover:text-ink"
            >
              <Twitter size={15} strokeWidth={1.5} />
            </a>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-ink/50">
            © 2026 Sobako
          </span>
        </div>
      </div>
    </footer>
  );
}
