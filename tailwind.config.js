/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'brand-gray-1': '#dadce0',
        'brand-blue-1': '#1967d2',
        'brand-blue-2': '#4285f4',
        'brand-green-1': '#137333',
        'brand-yellow-1': '#f9ab00',
        'brand-red-1': '#d93025',
      },
      boxShadow: {
        blue: '0 0 3px 3px #4285f4',
      },
    },
  },
  plugins: [],
};
