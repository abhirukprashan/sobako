"use client";

import { useEffect, useState } from "react";
import { X, Minus, Plus, Check } from "lucide-react";
import { useStore, FREE_SHIPPING_THRESHOLD } from "@/context/StoreContext";
import { formatLKR } from "@/lib/products";

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    closeCart,
    updateQty,
    removeFromCart,
    subtotal,
    cartCount,
  } = useStore();
  const [checkedOut, setCheckedOut] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", cartOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [cartOpen]);

  useEffect(() => {
    if (!cartOpen) setTimeout(() => setCheckedOut(false), 400);
  }, [cartOpen]);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px] transition-opacity duration-500 ease-apple ${
          cartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`cart-drawer fixed right-0 top-0 z-50 flex h-full w-full max-w-[440px] flex-col bg-white transition-transform duration-500 ease-apple ${
          cartOpen ? "is-open translate-x-0" : "translate-x-full"
        }`}
        style={{ borderLeft: "1px solid var(--hair)" }}
      >
        <div className="flex items-center justify-between hair-b px-6 py-5">
          <span className="label">Your Basket ({cartCount})</span>
          <button onClick={closeCart} aria-label="Close cart">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {checkedOut ? (
          <div className="success-pop flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: "var(--botanical)" }}
            >
              <Check size={28} color="#FEFBF4" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-2xl">Order Confirmed</h3>
            <p className="max-w-xs text-sm text-ink/60">
              Thank you. Your artisanal pantry is being packed and will ship
              within one business day.
            </p>
            <button onClick={closeCart} className="pill mt-2 text-[11px] uppercase tracking-widest">
              Continue Shopping
            </button>
          </div>
        ) : cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <p className="font-serif text-2xl">Your basket is empty</p>
            <p className="text-sm text-ink/55">
              Discover small-batch pasta and heirloom rice.
            </p>
            <button onClick={closeCart} className="pill mt-2 text-[11px] uppercase tracking-widest">
              Explore Pantry
            </button>
          </div>
        ) : (
          <>
            {/* Free shipping progress */}
            <div className="hair-b px-6 py-4">
              <p className="mb-2 text-[11px] tracking-widest text-ink/60">
                {remaining > 0 ? (
                  <>
                    YOU&apos;RE{" "}
                    <span style={{ color: "var(--botanical)" }}>
                      {formatLKR(remaining)}
                    </span>{" "}
                    AWAY FROM FREE SHIPPING
                  </>
                ) : (
                  <span style={{ color: "var(--botanical)" }}>
                    ✓ YOU&apos;VE UNLOCKED FREE SHIPPING
                  </span>
                )}
              </p>
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-ink/10">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-apple ${
                    progress >= 100 ? "free-ship-pulse" : ""
                  }`}
                  style={{ width: `${progress}%`, background: "var(--botanical)" }}
                />
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {cart.map((item, i) => (
                <div
                  key={`${item.slug}-${item.weight}`}
                  className="cart-item flex gap-4 hair-b px-6 py-5"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-16 flex-shrink-0 object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <span className="label leading-snug">{item.name}</span>
                      <button
                        onClick={() => removeFromCart(item.slug, item.weight)}
                        className="text-ink/40 transition-colors hover:text-botanical"
                        aria-label="Remove item"
                      >
                        <X size={15} strokeWidth={1.5} />
                      </button>
                    </div>
                    <span className="mt-0.5 text-[11px] tracking-widest text-ink/45">
                      {item.weight}
                    </span>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center gap-3 border border-hair px-2 py-1">
                        <button
                          onClick={() =>
                            updateQty(item.slug, item.weight, item.qty - 1)
                          }
                          aria-label="Decrease"
                          className="transition-colors hover:text-botanical"
                        >
                          <Minus size={13} strokeWidth={1.5} />
                        </button>
                        <span className="w-4 text-center text-sm">
                          {item.qty}
                        </span>
                        <button
                          onClick={() =>
                            updateQty(item.slug, item.weight, item.qty + 1)
                          }
                          aria-label="Increase"
                          className="transition-colors hover:text-botanical"
                        >
                          <Plus size={13} strokeWidth={1.5} />
                        </button>
                      </div>
                      <span className="text-sm">
                        {formatLKR(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="hair-t px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="label">Subtotal</span>
                <span className="text-lg">{formatLKR(subtotal)}</span>
              </div>
              <button
                onClick={() => setCheckedOut(true)}
                className="w-full py-4 text-[11px] uppercase tracking-widest transition-opacity duration-300 hover:opacity-90"
                style={{ background: "var(--botanical)", color: "var(--cream)" }}
              >
                Checkout · {formatLKR(subtotal)}
              </button>
              <p className="mt-3 text-center text-[10px] tracking-widest text-ink/40">
                TAXES &amp; SHIPPING CALCULATED AT CHECKOUT
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
