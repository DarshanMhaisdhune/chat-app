/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#FFFFFF',
          primary: '#28A745',
          secondary: '#D4EDDA',
          text: '#212529',
          border: '#A3C293',
          softGray: '#d7d7e6'
        },
        dark: {
          background: '#0A192F',
          primary: '#3F8EFC',
          secondary: '#FCA311',
          text: '#FFA500',
          border: '#112240',
          charcoal: '#494975'
        },
      }
    },
  },
  plugins: [],
  darkMode: "class"
}

