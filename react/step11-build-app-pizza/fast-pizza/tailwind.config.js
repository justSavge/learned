/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Roboto Mono,Monospace",
    },
    extend: {
      fontSize: {
        sobig: ["50rem ", { lineHeight: 1 }],
      },
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
