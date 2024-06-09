/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
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
      fontFamily: {
        folklore: ['"IM Fell DW Pica"', "serif"],
        red: ["Anton", "sans-serif"],
        reputation: ["UnifrakturMaguntia", "cursive"],
        lover: ["Satisfy", "cursive"],
        midnights: ["Monoton", "cursive"],
        mommy: ["Monoton", "cursive"],
        monoton: ["Monoton", "cursive"],
        theme: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
        ttpd: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
        futura: ["Futura", "serif"],
      },
      transitionProperty: {
        "border-radius": "border-radius",
        width: "width",
        "max-height": "max-height",
      },

      boxShadow: {
        lover: "10px 7px 41px 7px #e838a7a6",
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
      gradientColorStops: {
        "bloodmoon-gradient": {
          300: "300deg, var(--blood-moon-1) 10%, var(--blood-moon-2), var(--blood-moon-3), var(--blood-moon-4), transparent",
        },
      },
      fontSize: {
        "2.5xl": "2.5rem",
      },
      backgroundImage: {
        "midnights-moon":
          "url('https://i0.wp.com/lunasociety.org/wp-content/uploads/2015/11/cropped-Full-Moon-Flat.png')",
        curtain:
          "url('https://img.freepik.com/free-vector/theater-cinema-curtains-with-focus-light-vector-illustration_1017-38346.jpg')",
        "bloodmoon-gradient":
          "linear-gradient(300deg, var(--blood-moon-1) 10%, var(--blood-moon-2), var(--blood-moon-3), var(--blood-moon-4), transparent)",
      },
      keyframes: {
        "animating-bloodmoon-properties": {
          "0%": {
            transform: "translateY(40vh)",
            filter: "brightness(75%)",
            opacity: "20%",
          },
          "100%": {
            transform: "translateY(10px)",
            opacity: "100%",
          },
        },
        bloodmoonAnimation: {
          "0%": { backgroundPosition: "10% 0%" },
          "50%": { backgroundPosition: "91% 100%" },
          "100%": { backgroundPosition: "10% 0%" },
        },
        "glowing-stars": {
          "0%": { opacity: 0 },
          "25%": { opacity: 0.5 },
          "50%": { opacity: 1 },
          "75%": { opacity: 0.5 },
          "100%": { opacity: 0 },
        },
        curtainsRight: {
          "0%": {
            transform: "translateX(0)",
          },
          "25%": {
            transform: "translateX(25%)",
          },
          "50%": {
            transform: "translateX(50%)",
          },
          "75%": {
            transform: "translateX(75%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
        curtainsLeft: {
          "0%": {
            transform: "translateX(0)",
          },
          "25%": {
            transform: "translateX(-25%)",
          },
          "50%": {
            transform: "translateX(-50%)",
          },
          "75%": {
            transform: "translateX(-75%)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
      },
      animation: {
        "animating-bloodmoon-properties":
          "animating-bloodmoon-properties 6s linear 0s alternate forwards",
        "bloodmoon-animation": "bloodmoonAnimation 5s ease 1",
        "glowing-stars": "glowing-stars 1s linear infinite",
        curtainsLeft: "curtainsLeft 2s ease forwards",
        curtainsRight: "curtainsRight 2s ease forwards",
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
        // albums
        album: {
          taylorswift: "#38a3a5",
          fearless: "#fcc700",
          speaknow: "#973aa8",
          red: "#ca0f2e",
          _1989: "#1c88c7",
          lover: "#d5c6ff",
          evermore: "#f16529",
          folklore: "#4b8f4c",
          reputation: "#222222",
          fearlesstv: "#bba251",
          midnights: "#1f185c",
          redtv: "#952e2b",
          _1989tv: "blue",
          ttpd: "var(--ttpdDark)",
          other: "#952e2b",
          single: "#952e2b",
          null: "#952e2b",
        },
        // themes
        "lover-pink": "#ff96f6",
        "lover-blue": "#5b95d5",

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
        mommyYellow: "#d39a1e",
        mommyPink: "#d28c76",
        mommyOrange: "#d5592b",
        mommyWhite: "#e0dbc0",
        mommyWhiteop: "#e0dbc08c",
        mommyAlbumBg: "#d5592b",
        mommyAlbumBorder: "#d39a1e",
        mommyHeaderText: "#e0dbc0",
        theme: {
          background: "var(--ttpdLight)",
          text: "#312a22",

          panel: "var(--ttpdDark)",
          panelText: "#f9f8f4",
          panelTextSecondary: "var(--ttpdDark)",

          button: "#8e877d",
          buttonText: "white",
          buttonTextHover: "",

          tableHeader: "#a48a6b",
          tableHeaderText: "white",
          tableBorder: "#494e47",
          evenRow: "white",
          oddRow: "#e7e1d9",
          rowText: "black",
          searchBackground: "",

          scoreBoard: "#e7e1d9",
          scoreBoardText: "#ae97e5",
          scoreBoardTextHeader: "white",
          scoreBoardTextNumber: "#494e47",
          scoreBoardBorder: "white",
          tabBorder: "white",
          tabActive: "#a48a6b",
          tabTextActive: "#ff38a7",
          tabInactive: "#ae97e5",
          tabTextInactive: "white",
          braceletItemText: "#0967b3",
          braceletItemTextSelected: "#ff38a7",
          minus: "#ae97e5",
          plus: "#ff38a7",
          bottomExpander: "#eae3ff",
          bottomExpanderTextHeader: "#0967b3",
        },
        lover: {
          background: "bg-gradient-to-r from-lover-pink to-lover-blue",
          text: "#ff38a7",

          panel: "#e2f8ff",
          panelText: "#0967b3",
          panelTextSecondary: "#ff38a7",

          button: "#ff38a7",
          buttonText: "white",
          buttonTextHover: "",

          tableHeader: "#e2f8ff",
          tableHeaderText: "#0967b3",
          tableBorder: "#ff38a7",
          evenRow: "white",
          oddRow: "#eae3ff",
          rowText: "#0967b3",
          searchBackground: "",

          scoreBoard: "#eae3ff",
          scoreBoardText: "#ae97e5",
          scoreBoardTextHeader: "#0967b3",
          scoreBoardTextNumber: "#ff38a7",
          scoreBoardBorder: "white",
          tabBorder: "white",
          tabActive: "#e2f8ff",
          tabTextActive: "#ff38a7",
          tabInactive: "#ae97e5",
          tabTextInactive: "white",
          braceletItemText: "#0967b3",
          braceletItemTextSelected: "#ff38a7",
          minus: "#ae97e5",
          plus: "#ff38a7",
          bottomExpander: "#eae3ff",
          bottomExpanderTextHeader: "#0967b3",
        },
        folklore: {
          text: "#494e47",

          panel: "#a48a6b",
          panelText: "white",
          panelTextSecondary: "white",

          button: "#494e47",
          buttonText: "white",
          buttonTextHover: "",

          tableHeader: "#a48a6b",
          tableHeaderText: "white",
          tableBorder: "#494e47",
          evenRow: "white",
          oddRow: "#e7e1d9",
          rowText: "black",
          searchBackground: "",

          scoreBoard: "#e7e1d9",
          scoreBoardText: "#ae97e5",
          scoreBoardTextHeader: "white",
          scoreBoardTextNumber: "#494e47",
          scoreBoardBorder: "white",
          tabBorder: "white",
          tabActive: "#a48a6b",
          tabTextActive: "#ff38a7",
          tabInactive: "#ae97e5",
          tabTextInactive: "white",
          braceletItemText: "#0967b3",
          braceletItemTextSelected: "#ff38a7",
          minus: "#ae97e5",
          plus: "#ff38a7",
          bottomExpander: "#eae3ff",
          bottomExpanderTextHeader: "#0967b3",
        },
        reputation: {
          //background: "#000000",
          backgroundContent: "purple",
          text: "black",
          main: "lightblue",
          secondary: "#FFA500",
          third: "#FFA500",
        },
        midnights: {
          background: "#09071a",
          backgroundContent: "purple",
          text: "#a99daf",
          button: "grey",
          main: "#FFA500",
          secondary: "#FFA500",
          third: "#FFA500",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".bg-folklore-background": {
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url("../public/assets/albums/folklore.png")',
          backgroundPosition: "70% 0",
          backgroundSize: "1000px",
        },
        ".bg-reputation-background": {
          backgroundImage:
            'linear-gradient(rgba(233, 233, 233, 0.8), rgba(233, 233, 233, 0.8)), url("../public/assets/albums/repbackground3.png")',
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% auto",
        },
        ".bloodmoon-gradient": {
          background:
            "linear-gradient(300deg, var(--blood-moon-1) 10%, var(--blood-moon-2), var(--blood-moon-3), var(--blood-moon-4), transparent)",
          opacity: "75%",
          borderRadius: "50%",
          height: "100px",
          aspectRatio: "1 / 1",
          backgroundSize: "200% 200%",
          boxShadow:
            "0 0 30px 0px var(--blood-moon-light-1), 0 0 100px 0 var(--blood-moon-light-2)",
        },
        ".fade-right::after": {
          content: "",
          position: "absolute",
          top: "0",
          right: "0",
          height: "100%",
          width: "1.5rem",
          backgroundImage:
            "linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))",
          pointerEvents: "none",
        },
        ".fade-right-none::after": {},
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};
