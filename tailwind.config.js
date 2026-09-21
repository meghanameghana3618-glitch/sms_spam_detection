/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1A2233',
        slate: { 925: '#131A28' },
        clay2: '#B8543F',
        teal4: '#2C7C7A',
        indigo4: '#4C63C4',
        paper: '#F6F7F9',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
