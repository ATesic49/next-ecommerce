import daisyui from "daisyui";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      "cmyk",
      // {
      //   mytheme: {
      //     primary: "#00ccba",

      //     secondary: "#009d7d",

      //     accent: "#0000ff",

      //     neutral: "#0c0e09",

      //     "base-100": "#fff9fe",

      //     info: "#f5c022",

      //     success: "#00c47d",

      //     warning: "#f27600",

      //     error: "#ff6a88",
      //   },
      // },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
