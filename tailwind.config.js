/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  // Avoid clashing with Bootstrap utility classes
  prefix: "tw-",
  corePlugins: {
    // Keep Bootstrap / existing resets intact
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        noct: {
          dark: "#1a1a1a",
          muted: "#a0a0a0",
          brand: "#888",
        },
      },
    },
  },
  plugins: [],
};
