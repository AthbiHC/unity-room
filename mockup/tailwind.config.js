/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'truth': '#10b981',
        'speed': '#3b82f6',
        'depth': '#a855f7',
      },
    },
  },
  plugins: [],
}

