import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "serve-green": "#1C3A2A",
        "serve-forest": "#2A4A35",
        "serve-sage": "#7A9E7E",
        "serve-cream": "#F5F0E8",
        "serve-warm": "#E8DDD0",
        "serve-dark": "#141414",
        "serve-charcoal": "#2A2A2A",
        "serve-muted": "#6B7B6B",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
        script: ["var(--font-great-vibes)", "cursive"],
      },
      letterSpacing: {
        "widest-2": "0.25em",
        "widest-3": "0.35em",
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 8vw, 8rem)", { lineHeight: "0.95" }],
        "display-lg": ["clamp(2.5rem, 5vw, 5.5rem)", { lineHeight: "1.0" }],
        "display-md": ["clamp(2rem, 4vw, 4rem)", { lineHeight: "1.05" }],
        "display-sm": ["clamp(1.5rem, 3vw, 2.8rem)", { lineHeight: "1.1" }],
      },
      spacing: {
        "section": "clamp(5rem, 10vw, 10rem)",
        "section-sm": "clamp(3rem, 6vw, 6rem)",
      },
      transitionTimingFunction: {
        "luxury": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "elegant": "cubic-bezier(0.43, 0.195, 0.02, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
