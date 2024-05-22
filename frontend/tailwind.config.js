/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx,ts}", './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        bloodmoon: {
          1: "black",
          2: "transparent",
          3: "#6E0A05",
          4: "#9C1304",
          light: {
            1: "#f5814e",
            2: "#fff",
          },
        },
        
        lightpurple: "#a99daf",
        moonstone: "#3AA8c1",
        midnightsBackground: "#09071a",
        midnightsButton: "grey",
        midnightsBlbum: "#a99daf", // Using direct color value
        mommyYellow: "#d39a1e",
        mommyPink: "#d28c76",
        mommyOrange: "#d5592b",
        mommyWhite: "#e0dbc0",
        mommyWhiteop: "#e0dbc08c",
        mommyAlbumBg: "#d5592b", // Using direct color value
        mommyAlbumBorder: "#d39a1e", // Using direct color value
        mommyHeaderText: "#e0dbc0", // Using direct color value
        theme: {
          backgroundColor: "#000000",
          main: "#FFA500",
          secondary: "#FFA500",
          third: "#FFA500",
        },
        folklore: {
          backgroundColor: "#000000",
          main: "#FFFFFF",
          secondary: "forestgreen",
          third: "yellow",
        },
        reputation: {
          backgroundColor: "#000000",
          main: "lightblue",
          secondary: "#FFA500",
          third: "#FFA500",
        },
        midnights: {
          backgroundColor: "#000000",
          main: "#FFA500",
          secondary: "#FFA500",
          third: "#FFA500",
        },
      },
    },
  },
  plugins: [],
};
