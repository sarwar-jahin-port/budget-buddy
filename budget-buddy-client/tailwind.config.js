/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        lineDrawToRight: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideInLeft: {
          '0%': {
            opacity: 0,
            transform: 'translateX(-100%)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      animation: {
        lineDrawToRight: 'lineDrawToRight 2s',
        fadeIn: 'fadeIn 2s ease-in-out',
        slideInLeft: 'slideInLeft 2s ease-in-out',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}