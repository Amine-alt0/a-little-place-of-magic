/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        magicBg: '#171b35',
        parchment: '#f1e6d0',
        parchmentLight: '#fff9ef',
        parchmentBorder: '#c5a66a',
        goldAccent: '#c5a66a',
        deepPlum: '#642f43',
        plumDark: '#3b3036',
        inkBrown: '#715b49',
        borderMuted: '#d1be98',
        cardDeep: '#25263f',
        borderDark: '#393a50',
        textMuted: '#b7b5c7'
      },
      fontFamily: {
        caveat: ['Caveat', 'cursive'],
        garamond: ['"Cormorant Garamond"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
