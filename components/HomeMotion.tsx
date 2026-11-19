"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Premium scroll choreography for the homepage sections below the hero.
 *
 * Hooks (data attributes on children):
 *  data-m="section"   section fades and lifts in as it enters
 *  data-m="cards"     container whose direct children cascade in (mask wipe + image zoom-out)
 *  data-m="curtain"   image revealed by a vertical curtain wipe with scrubbed zoom
 *  data-m="circle"    image revealed by an expanding circle
 *  data-m="lines"     text block whose [data-line] children rise out of a mask
 *  data-m="slide"     element that glides in from the right
 */
export default function HomeMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ease = "expo.out";

    const ctx = gsap.context(() => {
      // ---- Hero -> content curtain ---------------------------------------
      // The hero is pinned (CSS sticky); as this layer slides over it, the hero
      // recedes: scales back and dims. Transform/opacity only, so it stays smooth.
      const hero = document.querySelector<HTMLElement>(".hero-fan");
      if (hero) {
        gsap.fromTo(
          hero,
          { scale: 1, opacity: 1, yPercent: 0 },
          {
            scale: 0.9,
            opacity: 0.2,
            yPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "top top",
              scrub: 0.5,
            },
          }
        );
      }

      // ---- Featured carousel entrance -----------------------------------
      const fc = el.querySelector<HTMLElement>(".fc");
      if (fc) {
        const packs = Array.from(
          fc.querySelectorAll<HTMLElement>(".fc-rise")
        )
          .map((p) => ({ p, o: Number(p.dataset.offset) }))
          .filter(({ o }) => Math.abs(o) <= 2)
          .sort((x, y) => Math.abs(x.o) - Math.abs(y.o));

        const tl = gsap.timeline({
          scrollTrigger: { trigger: fc, start: "top 75%", once: true },
        });
        tl.from(fc.querySelector("h2"), {
          yPercent: 60,
          opacity: 0,
          letterSpacing: "0.3em",
          duration: 1.4,
          ease,
        })
          .from(
            fc.querySelector(".eyebrow"),
            { y: 16, opacity: 0, duration: 1, ease },
            0.15
          )
          .from(
            packs.map(({ p }) => p),
            {
              yPercent: 70,
              opacity: 0,
              rotate: (i: number) => (packs[i].o === 0 ? 0 : packs[i].o * 5),
              duration: 1.5,
              ease,
              stagger: 0.12,
              clearProps: "transform,opacity",
            },
            0.2
          )
          .from(
            fc.querySelectorAll(".fc-arrow"),
            { opacity: 0, duration: 0.8, ease, stagger: 0.08 },
            0.7
          )
          .from(
            fc.querySelector("[role=tablist]"),
            { y: 24, opacity: 0, duration: 1, ease },
            0.6
          );
      }

      // ---- Section entrances (cheap: transform + opacity, run once) -----
      gsap.utils.toArray<HTMLElement>('[data-m="section"]').forEach((s) => {
        gsap.from(s, {
          y: 50,
          opacity: 0,
          duration: 1.1,
          ease,
          scrollTrigger: { trigger: s, start: "top 90%", once: true },
        });
      });

      // ---- Product card cascades ---------------------------------------
      gsap.utils.toArray<HTMLElement>('[data-m="cards"]').forEach((grid) => {
        const cards = Array.from(grid.children) as HTMLElement[];
        const imgs = cards
          .map((c) => c.querySelector("[data-m-media]"))
          .filter(Boolean) as HTMLElement[];

        const tl = gsap.timeline({
          scrollTrigger: { trigger: grid, start: "top 80%", once: true },
        });
        tl.fromTo(
          cards,
          { clipPath: "inset(100% 0% 0% 0%)", y: 70, rotate: 1.5 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            rotate: 0,
            duration: 1.3,
            ease,
            stagger: 0.12,
          }
        ).fromTo(
          imgs,
          { scale: 1.35 },
          { scale: 1, duration: 1.8, ease, stagger: 0.12 },
          0
        );
      });

      // ---- Curtain image reveal + scrubbed drift ------------------------
      gsap.utils.toArray<HTMLElement>('[data-m="curtain"]').forEach((frame) => {
        const img = frame.querySelector("img");
        gsap.fromTo(
          frame,
          { clipPath: "inset(0% 100% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.6,
            ease: "expo.inOut",
            scrollTrigger: { trigger: frame, start: "top 75%", once: true },
          }
        );
        if (img)
          gsap.fromTo(
            img,
            { scale: 1.4 },
            {
              scale: 1.1,
              ease: "none",
              scrollTrigger: {
                trigger: frame,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
      });

      // ---- Circle reveal -------------------------------------------------
      gsap.utils.toArray<HTMLElement>('[data-m="circle"]').forEach((frame) => {
        gsap.fromTo(
          frame,
          { clipPath: "circle(0% at 50% 50%)" },
          {
            clipPath: "circle(75% at 50% 50%)",
            duration: 1.8,
            ease: "expo.inOut",
            scrollTrigger: { trigger: frame, start: "top 75%", once: true },
          }
        );
      });

      // ---- Masked line rises --------------------------------------------
      gsap.utils.toArray<HTMLElement>('[data-m="lines"]').forEach((block) => {
        const lines = block.querySelectorAll("[data-line]");
        gsap.fromTo(
          lines,
          { yPercent: 115, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            ease,
            stagger: 0.09,
            scrollTrigger: { trigger: block, start: "top 85%", once: true },
          }
        );
      });

      // ---- Slide in from right ------------------------------------------
      gsap.utils.toArray<HTMLElement>('[data-m="slide"]').forEach((item, i) => {
        gsap.fromTo(
          item,
          { x: 120, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.4,
            ease,
            delay: (i % 2) * 0.15,
            scrollTrigger: { trigger: item, start: "top 85%", once: true },
          }
        );
      });
    }, el);

    // Images and fonts change layout after mount; re-measure once settled.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 600);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className="home-stack">
      {children}
    </div>
  );
}
