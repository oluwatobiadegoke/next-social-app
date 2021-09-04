module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: "Nanum Gothic",
    },
    extend: {
      height: {
        h: "1px",
      },
      width: {
        w: "1px",
      },
      animation: {
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
      },
      colors: {
        light: {
          100: "#d3fefe",
          200: "#a8fdfd",
          300: "#7cfdfb",
          400: "#51fcfa",
          500: "#25fbf9",
          600: "#1ec9c7",
          700: "#169795",
          800: "#0f6464",
          900: "#073232",
        },
        indigo: {
          100: "#d1dfe9",
          200: "#a4bed3",
          300: "#769ebd",
          400: "#497da7",
          500: "#1b5d91",
          600: "#164a74",
          700: "#103857",
          800: "#0b253a",
          900: "#05131d",
        },
        black: {
          100: "#ced1d4",
          200: "#9da3a8",
          300: "#6b757d",
          400: "#3a4751",
          500: "#091926",
          600: "#07141e",
          700: "#050f17",
          800: "#040a0f",
          900: "#020508",
        },
      },
      backgroundImage: (theme) => ({
        xpress: "url('/expresspic.png')",
      }),
      backgroundSize: {
        "50%": "50%",
        "75%": "75%",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["disabled"],
    },
  },
  plugins: [],
};
