/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: {
          backgroundColor: '#000000',
          main: '#FFA500',
          secondary: '#FFA500',
          third: '#FFA500',
        },
        folklore: {
          backgroundColor: '#000000',
          main: '#FFFFFF',
          secondary: 'forestgreen',
          third: 'yellow',
        },
        reputation: {
          backgroundColor: '#000000',
          main: 'lightblue',
          secondary: '#FFA500',
          third: '#FFA500',
        },
        midnights: {
          backgroundColor: '#000000',
          main: '#FFA500',
          secondary: '#FFA500',
          third: '#FFA500',
        },
      },
    },
  },
  plugins: [],
}