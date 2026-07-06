import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17202a",
        paper: "#f8f7f3",
        moss: "#5f7f68",
        rust: "#b4573f",
        brass: "#c5974b"
      },
      fontFamily: {
        sans: ["Inter", "Arial", "Helvetica", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(23, 32, 42, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
