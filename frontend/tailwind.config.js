/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx,ts}", "./public/index.html"],
  variants: {
    extend: {
      height: ["responsive", "hover"], // Enable the hover variant for height utilities
      rounded: ["responsive", "hover"], // Enable the hover variant for height utilities
      width: ["hover", "focus"],
    },
  },
  theme: {
    extend: {
      transitionProperty: {
        "border-radius": "border-radius",
        width: "width",
      },

      boxShadow: {
        custom: "10px 10px 0px 0px rgba(0,0,0,0.75)",
        "stars-1": "var(--stars-1)",
        "stars-2": "var(--stars-2)",
        "stars-3": "var(--stars-3)",
        "stars-4": "var(--stars-4)",
        "stars-5": "var(--stars-5)",
        "stars-6": "var(--stars-6)",
        "custom-light":
          "0 0 30px 0px var(--blood-moon-light-1), 0 0 100px 0 var(--blood-moon-light-2)",
      },
      animationDelay: {
        "0.1s": "0.1s",
        "0.2s": "0.2s",
      },

      opacity: {
        75: "0.75",
      },
      zIndex: {
        "-1": "-1",
      },
      backgroundSize: {
        "200%": "200% 200%",
      },
      aspectRatio: {
        "1/1": "1 / 1",
      },
      gradients: {
        blood: ["var(--blood-moon-light-1)", "var(--blood-moon-light-2)"],
      },
      fontFamily: {
        monoton: ["Monoton", "cursive"],
      },
      fontSize: {
        "2.5xl": "2.5rem",
      },
      backgroundImage: {
        "midnights-moon":
          "url('https://i0.wp.com/lunasociety.org/wp-content/uploads/2015/11/cropped-Full-Moon-Flat.png')",
        "bloodmoon-gradient":
          "linear-gradient(300deg, var(--blood-moon-1) 10%, var(--blood-moon-2), var(--blood-moon-3), var(--blood-moon-4), transparent)",
      },
      keyframes: {
        "animating-multiple-properties": {
          "0%": {
            transform: "translateY(40vh)",
            filter: "brightness(75%)",
            opacity: "20%",
          },
          "100%": {
            transform: "translateY(10px)", // Corrected unit for consistency
            opacity: "100%",
          },
        },
        "glowing-stars": {
          "0%": { opacity: 0 },
          "25%": { opacity: 0.5 },
          "50%": { opacity: 1 },
          "75%": { opacity: 0.5 },
          "100%": { opacity: 0 },
        },
      },
      animation: {
        "animating-multiple-properties":
          "animating-multiple-properties 2s  ease-in-out forwards",
        "glowing-stars": "glowing-stars 1s linear infinite",
        "custom-animation": "Animation 5s ease",
      },
      colors: {
        // writers
        TaylorSwift: "rgb(28, 136, 199, 0.5)",
        Default: "rgb(240, 239, 235, 0.5)",
        LizRose: "rgb(187, 162, 81, 0.5)",
        JackAntonoff: "rgb(75, 143, 76, 0.5)",
        MaxMartin: "rgb(202, 15, 46, 0.5)",
        Shellback: "rgb(56, 163, 165, 0.5)",
        AaronDessner: "rgb(241, 101, 41, 0.5)",
        JoeAlwyn: "rgb(213, 198, 255, 0.5)",
        // themes
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
        midnights: "#09071a",
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
          background: "white",
          backgroundOther: "purple",
          text: "black",
          main: "#FFA500",
          secondary: "#FFA500",
          third: "#FFA500",
        },
        lover: {
          background: "#09071a",
          backgroundOther: "purple",
          text: "white",
          main: "#FFFFFF",
          secondary: "forestgreen",
          third: "yellow",
        },
        folklore: {
          background: "#09071a",
          backgroundOther: "purple",
          text: "black",
          main: "#FFFFFF",
          secondary: "forestgreen",
          backgroundOther: "purple",
          third: "yellow",
        },
        reputation: {
          background: "#000000",
          backgroundOther: "purple",
          text: "white",
          main: "lightblue",
          secondary: "#FFA500",
          third: "#FFA500",
        },
        midnights: {
          background: "#000000",
          backgroundOther: "purple",
          text: "black",
          main: "#FFA500",
          secondary: "#FFA500",
          third: "#FFA500",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
