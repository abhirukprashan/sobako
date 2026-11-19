"use client";

import { useEffect, useState } from "react";

const MIN_VISIBLE = 1250;
const MAX_VISIBLE = 3200;
const EXIT_MS = 1000;

export default function LoadingScreen() {
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startedAt = performance.now();
    const minVisible = reduce ? 300 : MIN_VISIBLE;
    const maxVisible = reduce ? 600 : MAX_VISIBLE;

    let begun = false;
    let removeTimer: number | undefined;

    const beginExit = () => {
      if (begun) return;
      begun = true;
      setExiting(true);
      removeTimer = window.setTimeout(
        () => setDone(true),
        reduce ? 250 : EXIT_MS
      );
    };

    // Wait for the initial paint, then let the page finish loading —
    // but never hold the screen longer than `maxVisible`.
    const minTimer = window.setTimeout(() => {
      if (document.readyState === "complete") {
        beginExit();
      } else {
        window.addEventListener("load", beginExit, { once: true });
      }
    }, minVisible);

    const maxTimer = window.setTimeout(beginExit, maxVisible);

    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(maxTimer);
      if (removeTimer) window.clearTimeout(removeTimer);
      window.removeEventListener("load", beginExit);
    };
  }, []);

  if (done) return null;

  return (
    <div
      className={`loading-screen ${exiting ? "is-exiting" : ""}`}
      role="status"
      aria-label="Loading Sobako"
    >
      <div className="loading-panel loading-panel-top" aria-hidden="true" />
      <div className="loading-panel loading-panel-bottom" aria-hidden="true" />

      <div className="loading-content">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/cropped-website-logo-sobako.png"
          alt="Sobako"
          className="loading-logo"
        />
      </div>
    </div>
  );
}
