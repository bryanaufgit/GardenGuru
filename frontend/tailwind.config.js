/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
       primary: {
          DEFAULT: '#2e572c',
          light: '#7bbf86',
          dark: '#1e3e1f',
        },
          surface: '#f1f5f1',
          sidebar: '#1e3e1f',
          danger: '#dc2626',
          info: '#2c6e49',
          warning: '#e9c46a',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '1rem',
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

