/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "red-bg": "#FC4747",
        "dark-bg": "#10141E",
        "light-blue": "#5A698F",
        "box-bg": "#161D2F",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      fontSize: {
        "heading-l": ["32px", { lineHeight: "1" }],
        "heading-m": ["24px", { lineHeight: "1" }],
        "heading-s": ["24px", { lineHeight: "1" }],
        "heading-xs": ["18px", { lineHeight: "1" }],
        "body-m": ["15px", { lineHeight: "1.5" }],
        "body-s": ["13px", { lineHeight: "1.5" }],
      },
      fontWeight: {
        light: 300,
        medium: 500,
      },
    },
  },
  plugins: [],
};
