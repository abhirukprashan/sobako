/**
 * Launches a product image toward the first visible cart icon.
 * Uses the Web Animations API so it stays smooth without re-rendering React.
 */
export function flyToCart(source: HTMLElement | null) {
  if (typeof window === "undefined" || !source) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const targets = Array.from(
    document.querySelectorAll<HTMLElement>("[data-cart-target]")
  );
  const target = targets.find((el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  });
  if (!target) return;

  const s = source.getBoundingClientRect();
  const t = target.getBoundingClientRect();
  if (!s.width || !s.height) return;

  const clone = source.cloneNode(true) as HTMLElement;
  Object.assign(clone.style, {
    position: "fixed",
    left: `${s.left}px`,
    top: `${s.top}px`,
    width: `${s.width}px`,
    height: `${s.height}px`,
    margin: "0",
    zIndex: "80",
    pointerEvents: "none",
    objectFit: "cover",
    borderRadius: "2px",
    boxShadow: "0 12px 30px -12px rgba(20,20,20,0.45)",
    transformOrigin: "50% 50%",
    willChange: "transform, opacity",
  });
  document.body.appendChild(clone);

  const dx = t.left + t.width / 2 - (s.left + s.width / 2);
  const dy = t.top + t.height / 2 - (s.top + s.height / 2);

  const animation = clone.animate(
    [
      { transform: "translate3d(0, 0, 0) scale(1)", opacity: 1, filter: "blur(0px)" },
      {
        transform: `translate3d(${dx * 0.5}px, ${dy * 0.5 - 46}px, 0) scale(0.42)`,
        opacity: 0.9,
        filter: "blur(0px)",
        offset: 0.55,
      },
      {
        transform: `translate3d(${dx}px, ${dy}px, 0) scale(0.05)`,
        opacity: 0,
        filter: "blur(2px)",
      },
    ],
    {
      duration: 780,
      easing: "cubic-bezier(0.5, 0.02, 0.2, 1)",
      fill: "forwards",
    }
  );

  animation.onfinish = () => clone.remove();
  animation.oncancel = () => clone.remove();
}
