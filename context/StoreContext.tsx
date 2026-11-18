"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import type { Product } from "@/lib/products";

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  weight: string;
  image: string;
  qty: number;
}

export const FREE_SHIPPING_THRESHOLD = 5000;

interface StoreState {
  cart: CartItem[];
  favorites: string[];
  cartOpen: boolean;
  category: string;
  setCategory: (c: string) => void;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (
    p: Product,
    opts?: {
      qty?: number;
      weight?: string;
      price?: number;
      openDrawer?: boolean;
    }
  ) => void;
  removeFromCart: (slug: string, weight: string) => void;
  updateQty: (slug: string, weight: string, qty: number) => void;
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
  cartCount: number;
  subtotal: number;
  favCount: number;
}

const StoreContext = createContext<StoreState | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [category, setCategory] = useState("ALL");

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const addToCart = useCallback<StoreState["addToCart"]>((p, opts) => {
    const qty = opts?.qty ?? 1;
    const weight = opts?.weight ?? p.weight;
    const price = opts?.price ?? p.price;
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.slug === p.slug && i.weight === weight
      );
      if (existing) {
        return prev.map((i) =>
          i.slug === p.slug && i.weight === weight
            ? { ...i, qty: i.qty + qty }
            : i
        );
      }
      return [
        ...prev,
        { slug: p.slug, name: p.name, price, weight, image: p.images[0], qty },
      ];
    });
    if (opts?.openDrawer !== false) setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((slug: string, weight: string) => {
    setCart((prev) =>
      prev.filter((i) => !(i.slug === slug && i.weight === weight))
    );
  }, []);

  const updateQty = useCallback(
    (slug: string, weight: string, qty: number) => {
      setCart((prev) =>
        prev
          .map((i) =>
            i.slug === slug && i.weight === weight
              ? { ...i, qty: Math.max(0, qty) }
              : i
          )
          .filter((i) => i.qty > 0)
      );
    },
    []
  );

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  const isFavorite = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites]
  );

  const cartCount = useMemo(
    () => cart.reduce((n, i) => n + i.qty, 0),
    [cart]
  );
  const subtotal = useMemo(
    () => cart.reduce((n, i) => n + i.qty * i.price, 0),
    [cart]
  );

  const value: StoreState = {
    cart,
    favorites,
    cartOpen,
    category,
    setCategory,
    openCart,
    closeCart,
    addToCart,
    removeFromCart,
    updateQty,
    toggleFavorite,
    isFavorite,
    cartCount,
    subtotal,
    favCount: favorites.length,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
