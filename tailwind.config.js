module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: "Nanum Gothic",
    },
    extend: {
      colors: {
        deep: {
          100: "#cdd0d2",
          200: "#9ba1a4",
          300: "#6a7177",
          400: "#384249",
          500: "#06131c",
          600: "#050f16",
          700: "#040b11",
          800: "#02080b",
          900: "#010406",
        },
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
    extend: {},
  },
  plugins: [],
};
