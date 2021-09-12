module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#50E3C2",
        lightPink: "#F4ACB7",
        champagnePink: "#FFE5D9",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
