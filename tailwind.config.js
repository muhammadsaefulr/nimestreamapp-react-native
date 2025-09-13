/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,tsx,ts,jsx}','./components/**/*.{js,tsx,ts,jsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#030314',
        secondary: '#151312',
        light: {
          100: '#D6C6FF',
          200: '#A8B5DB',
          300: '#9CA4AB',
        },
        dark: {
          100: '#221F3D',
          200: '#0F0D23',
          300: '#0B0A08',
          400: '#060703',
          500: '#010400',
        },
        accent: '#AB8BFF',
      },
    },
  },
  plugins: [],
};
