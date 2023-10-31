/** @type {import('tailwindcss').Config} */
module.exports ={
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500'],
  darkMode: 'media',
  theme: {
    screens: {
      'sm':'480px',
      'md': '960px',
      'lg': '1440px',
    },

    // screens:{
    //   sm:'480px',
    //   md:'768px',
    //   lg:'796px',
    //   xlg:'1440px',

    // },
    extend: {
      fontFamily: {
        sans: ['Noto Sans JP', 'Sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
