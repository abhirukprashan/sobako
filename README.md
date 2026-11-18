# Sobako — Artisanal Pantry

A minimal luxury e-commerce storefront for **Sobako**, a small-batch pasta, heirloom rice, and pantry-staples brand. Built with Next.js (App Router), Tailwind CSS, and lucide-react, with Apple-style weighted motion.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Stack
- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** — brand tokens, Swiss `1px` hairline borders, `cubic-bezier(0.16,1,0.3,1)` easing
- **lucide-react** — hairline icons
- **next/font** — Playfair Display (serif wordmark) + Plus Jakarta Sans (UI)
- Motion via custom `IntersectionObserver` reveals + scroll parallax (no heavy animation deps)
- Images: curated warm-toned Unsplash URLs via plain `<img>` (`images.unoptimized`)

## Brand tokens
| Token | Value | Use |
|---|---|---|
| Cream | `#FEFBF4` | canvas |
| Botanical Green | `#166938` | logo, Add to Cart, progress, active filters |
| Ink | `#141414` | type + hairline borders |

## Structure
```
app/
  layout.tsx            # fonts, Header, Footer, CartDrawer, StoreProvider
  globals.css           # tokens, hairline helpers, reveal/marquee/parallax
  page.tsx              # Homepage (hero, marquee, grids, category split, delivery)
  shop/page.tsx         # Catalog with ALL / PASTA / RICE / PANTRY filters
  favorites/page.tsx    # Saved items
  products/[slug]/page.tsx  # PDP (server) -> ProductDetail (client)
  not-found.tsx
components/
  Header.tsx            # glassmorphic sticky nav, live counters
  Footer.tsx            # menu / info / newsletter grid
  CartDrawer.tsx        # slide-over, free-shipping bar, checkout confirmation
  ProductCard.tsx       # hover-scale card + Quick Add + favorite
  ProductDetail.tsx     # gallery, weight selector, qty, details, cross-sell
  Marquee.tsx           # infinite value ticker
  Reveal.tsx            # scroll-reveal wrapper
  ParallaxImage.tsx     # scroll scale parallax
context/
  StoreContext.tsx      # cart, favorites, category, drawer state
lib/
  products.ts           # product catalog + helpers
```

## Features
- Live cart & favorites counters in the header
- Slide-out cart drawer with `$50` free-shipping progress bar, quantity steppers, removal, live subtotal, and a checkout confirmation state
- Category filtering with working tabs (also deep-linkable via `/shop?cat=PASTA`)
- PDP weight selector that updates price, quantity stepper, favorite toggle, and a "You may also like" cross-sell grid
