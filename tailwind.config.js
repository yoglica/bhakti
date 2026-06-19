// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdf8f0',
          100: '#fbe8d0',
          200: '#f7d1a0',
          300: '#f3ba70',
          400: '#efa340',
          500: '#d98e04',
          600: '#b87400',
          700: '#975f00',
          800: '#764a00',
          900: '#553500',
        },
        spiritual: {
          cream: '#f8f6f2',
          beige: '#f0ebe4',
          border: '#e8e0d6',
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}