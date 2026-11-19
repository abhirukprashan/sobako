import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FEFBF4",
        ink: "#141414",
        botanical: "#166938",
      },
      fontFamily: {
        // Two fonts only: Inter Tight (grotesk) + IBM Plex Mono (labels).
        sans: ["var(--font-sans)", "Helvetica Neue", "Arial", "sans-serif"],
        serif: ["var(--font-sans)", "Helvetica Neue", "Arial", "sans-serif"],
        mona: ["var(--font-sans)", "Helvetica Neue", "Arial", "sans-serif"],
        subheading: ["var(--font-sans)", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        widest: "0.18em",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      borderColor: {
        hair: "rgba(20, 20, 20, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
