const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      opacity: {
        75: ".75",
        50: ".50",
        25: ".25",
      },
      fontFamily: {
        poppins: ["var(--poppins)"],
        myanmar: ["var(--myanmar)"],
      },
    },
    colors: {
      primary: "#6610F2",
      secondary: "#7C40DE",
      background: "#f8f8f8",
      "black-100": "#334149",
      red: "#FF0000",
      ...colors,
    },
    fontSize: {
      base: ["18px", "25px"],
      h6: ["20px", "30px"],
      h5: ["23px", "37.5px"],
      h4: ["28.25px", "46.88px"],
      h3: ["34.06px", "58.59px"],
      h2: ["37.06px", { fontWeight: "bold", lineHeight: "58.59px" }],
      h1: ["58.04px", { fontWeight: "bold", lineHeight: "80.56px" }],
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#6610F2",
          secondary: "#7C40DE",
        },
      },
    ],
  },
};
