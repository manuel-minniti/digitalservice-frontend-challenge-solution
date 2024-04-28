/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@digitalservice4germany/angie")],
  presets: [
    require("@digitalservice4germany/style-dictionary/tailwind")
  ]
}

