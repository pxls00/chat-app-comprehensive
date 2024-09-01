/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: 'myriadpro', 
        display: 'montserrat', // Adds a new `font-display` class
      }
    },
    screens: {
      xxs: '475px',
      xs: '576px',
      sm: '768px',
      md: '992px',
      lg: '1200px',
      xl: '1440px',
    },
    fontSize: {
      'xxs': '16px',
      'xs': '18px',
      'sm': '22px',
      'md': '26px',
      'lg': '34px',
      'extra-lg': '64px'
    },
    colors: {
      'transparent': 'transparent',
      'purple': {
        main: "#86014a",
        light: "#a10059",
      },
      'cyan': {
        '500': 'rgb(6 182 212)'
      },
      'darkblue': '#0a1553',
      'overlay': 'rgba(0, 0, 0, 0.2)',
      'black': "rgb(15 23 42)",
      'red': '#a11800',
      'green': '#03ad03',
      'white': "#ffffff",
      'dark': "#000731",
      'active-dark': "rgb(10 19 72)"
    }
  },
  plugins: [],
}