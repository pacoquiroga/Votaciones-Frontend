/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Layout
        'layout': '25% 1fr',
      },
      gridTemplateRows: {
        // Layout
        'layout': '7.5% 1fr 5%',
      }
    },
  },
  plugins: [],
};
