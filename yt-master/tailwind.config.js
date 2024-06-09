/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          base: '#ff0000',
          light: '#fd2f2f',
          dark: '#d90202',
          dark2: '#bc0202',
        },
        tautara: {
          base: '#373636',
          dark: '#2d2c2c',
          light: '#474545',
          light2: '#5c5b5b',

        }
      }
    },
  },
  plugins: [],
}