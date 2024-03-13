import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      green: "#1db954",
      white: "#ffffff",
      black: "#191414",
      blue: "#0d72ea",
      grey: "#a7a7a7",
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
