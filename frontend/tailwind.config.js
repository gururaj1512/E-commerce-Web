/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    screens: {
      'sm': [
        { 'min': '200px', 'max': '600px' }
      ],
      'md': [
        { 'min': '600px', 'max': '900px' }
      ],
      'lg': [
        { 'min': '900px', 'max': '1200px' }
      ],
      'xl': [
        { 'min': '1200px', 'max': '1500px' }
      ],
    },
    extend: {
      colors: {
        'main-red': '#DB4444'
      },
      fontSize: {
        'xxs': '0.5rem',
        'xs': '0.6rem',
        'sm': '0.8rem',
        'base': '1rem',
        'xl': '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      height: {
        'h-76': '19rem'
      },
      scale: {
        '1005': '1.005',
        '101': '1.01',
        '105': '1.05',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

