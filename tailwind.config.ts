import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      green: "#1db954",
      white: "#ffffff",
      black: "#121212",
      blue: "#0d72ea",
      shark: "#242424",
      silver: {
        "50": "#f7f7f7",
        "100": "#ededed",
        "200": "#dedede",
        "300": "#c7c7c7",
        "400": "#a6a6a6",
        "500": "#999999",
        "600": "#878787",
        "700": "#7a7a7a",
        "800": "#666666",
        "900": "#545454",
        "950": "#363636",
      },
    },
    extend: {},
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("search-cancel", "&::-webkit-search-cancel-button");
    }),
  ],
} satisfies Config;
