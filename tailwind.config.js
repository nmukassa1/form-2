/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        earthy: {
          beige: '#ECDFCC',
          // beige: '#F5F5DC',
          clay: '#D1B799',
          forest: '#697565',
          // forest: '#2E5941',
          sand: '#C2B280',
          stone: '#A09F9C',
        },
        black: {
          DEFAULT: '#181C14',
        }
      },
    },
  },
  plugins: [],
};
