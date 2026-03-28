import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // PawFound brand colours
        amber: {
          light: "#FAC775",
          DEFAULT: "#EF9F27",
          dark: "#D4861A",
        },
        pawblue: {
          DEFAULT: "#378ADD",
          dark: "#2A6DB5",
        },
        lost: {
          bg: "#FCEBEB",
          text: "#A32D2D",
          btn: "#E24B4A",
        },
        found: {
          bg: "#EAF3DE",
          text: "#3B6D11",
          btn: "#1D9E75",
        },
        page: "#F5F5F5",
      },
      borderRadius: {
        card: "12px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
