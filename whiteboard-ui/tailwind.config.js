/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Sunset theme - playful and joyous with minimal colors
        sunset: {
          // Primary coral - warm and inviting
          primary: "#FF6B6B",
          // Secondary soft pink - playful accent
          secondary: "#FFB3BA",
          // Deep coral for hover states
          accent: "#FF8C42",
          // Cream background - soft and warm
          cream: "#FFF8F0",
          // Light peach for subtle backgrounds
          peach: "#FFE5D9",
        },
        // Text colors
        charcoal: {
          DEFAULT: "#2D3436",
          light: "#636E72",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          '"Fira Sans"',
          '"Droid Sans"',
          '"Helvetica Neue"',
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
