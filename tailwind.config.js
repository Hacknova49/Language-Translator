/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        righteous: ['Righteous', 'sans-serif'],
        russoOne: ['Russo One', 'sans-serif'],
        notoSansJp: ['Noto Sans JP', 'sans-serif'],
        shojumaru: ['shojumaru', 'system-ui'],
      },
      translate: ['active'],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          '::-webkit-scrollbar': { display: 'none' },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}
