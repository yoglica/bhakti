/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0070f3',
        'primary-hover': '#0051a8',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // This is required for prose classes
  ],
  darkMode: false, // Explicitly disable dark mode
}