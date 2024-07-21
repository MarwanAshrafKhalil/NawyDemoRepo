/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/(tabs)/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
  },
  plugins: [],
};
