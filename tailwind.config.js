/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        vintage: {
          cream: '#F5E6CC',
          brown: '#3E2723',
          tan: '#8B6914',
          gold: '#C5A55A',
          crimson: '#8B2252',
          border: '#D4C5A9',
          muted: '#7A6B5D',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Noto Sans SC', 'serif'],
        sans: ['Noto Sans SC', 'sans-serif'],
      },
      animation: {
        fadeInUp: 'fadeInUp 0.4s ease-out both',
        fadeIn: 'fadeIn 0.3s ease-out both',
        slideDown: 'slideDown 0.3s ease-out both',
        heartBeat: 'heartBeat 0.4s ease-in-out',
      },
    },
  },
  plugins: [],
};
