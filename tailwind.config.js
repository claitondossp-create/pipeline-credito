/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#000000",
          dark: "#004D40",
          deep: "#002D26",
          bright: "#26A69A",
          red: "#E53935",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        serif: ["Cinzel", "serif"],
      },
    },
  },
  plugins: [],
}
