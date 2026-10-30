/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#090909',
        navy: { DEFAULT: '#102B59', 700: '#0B1F42', 400: '#2A4F8F' },
        gold: '#C7A56A',
        mist: '#A6A6A6',
        milk: '#F6F1E7',
        cocoa: '#3A1F14',
      },
      fontFamily: {
        sans: ['"Inter Tight Variable"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      letterSpacing: { mega: '0.32em' },
    },
  },
  plugins: [],
}
