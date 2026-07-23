/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        spotify: {
          green: '#1DB954',
          lightgreen: '#1ed760',
          darkbg: '#0B0B0F',
          surface: '#121216',
          surfacemuted: '#18181F',
          card: '#1D1F27',
          cardhover: '#282A36',
          textmuted: '#A1A1AA',
          border: '#2A2B33'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
