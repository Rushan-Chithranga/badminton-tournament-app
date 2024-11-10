module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 2s ease-in-out", 
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      colors: {
        primary: "#000000",
        secondary: "#FFFF00", 
      },
    },
  },
  plugins: [],
};
