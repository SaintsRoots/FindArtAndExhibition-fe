/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#331391",
        secondary: "#FEFEFF",
        textColor: "#010101",
        textColor1: "#edcf5d",
      },
      backgroundImage: {
        'welcome': "url('./assets/bg-2.jpg')"
      }
    },
  },
  plugins: [],
}