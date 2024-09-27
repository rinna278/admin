/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        '#2F3746':'#2F3746',
        '#9DA4AE':'#9DA4AE',
        '#4D5761':'#4D5761',
        '#6366F1':'#6366F1',
      }
    },
  },
  plugins: [],
}

