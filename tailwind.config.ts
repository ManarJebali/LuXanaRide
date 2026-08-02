import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "#0A0A0B",
          charcoal: "#151619",
          steel: "#26282D",
          line: "#33353B",
          mist: "#9A9CA3",
          fog: "#C7C8CD",
          paper: "#F4F4F1",
          white: "#FFFFFF",
          red: "#E23B2E",
          "red-dark": "#B4281D",
          "red-light": "#FBE3E0",
          ember: "#F2891E",
          "ember-dark": "#C96A0F",
        },
      },
      fontFamily: {
        sans: ["var(--font-latin)", "system-ui", "-apple-system", "sans-serif"],
        arabic: ["var(--font-arabic)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1360px",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
