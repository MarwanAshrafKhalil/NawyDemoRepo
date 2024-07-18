import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1f4163",

          secondary: "#c65800",

          accent: "#ff3800",

          neutral: "#222f29",

          "base-100": "#ffffff",

          info: "#0060d4",

          success: "#009652",

          warning: "#f16700",

          error: "#ff4d76",
        },
      },
    ],
  },
};
export default config;
