import { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2f0075",
        secondary: "#6200f6",
        accent: "#411fca",
        ghost: "#eee5fd",
        pink: "#fe2464",
        red: "#e80008",
        error: "#d53430",
        white: "#ffffff",
        info: "#3b82f6",
        success: "#22c55e",
        warning: "#facc15",
        "main-bg": "#18023A",
      },
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1028px",
        xl: "1280px",
        "2xl": "1536px",
      },
      boxShadow: {
        custom: "0px 24px 39px -30px #093143",
      },
      backgroundImage: {
        "primary-bg-gradient":
          "radial-gradient(circle, #3f5efb 0%, #2b006b 100%)",
        "primary-gradient": "linear-gradient(90deg, #2f0075 0%, #5d00ea 100%)",
        "secondary-gradient":
          "linear-gradient(90deg, #051b6e 0%, #0932c6 100%)",
        "turquoise-gradient":
          "linear-gradient(90deg, #036372 0%, #06b6d3 100%)",
        "magenta-gradient": "linear-gradient(90deg, #771746 0%, #d2297d 100%)",
        "orange-gradient": "linear-gradient(90deg, #e90507 0%, #ff6600 100%)",
        "light-purple-gradient":
          "linear-gradient(90deg, #aa45ff 0%, #7412e9 100%)",
        "light-blue-gradient":
          "linear-gradient(90deg, #00b0dc 0%, #0b4ee5 100%)",
        "light-orange-gradient":
          "linear-gradient(90deg, #ff6600 0%, #e80008 100%)",
      },
      gridTemplateRows: {
        12: "repeat(12, minmax(0, 1fr))",
        15: "repeat(15, minmax(0, 1fr))",
        20: "repeat(20, minmax(0, 1fr))",
      },
      gridTemplateColumns: {},
      gridColumn: {},
      gridRow: {
        "span-7": "span 7 / span 7",
        "span-8": "span 8 / span 8",
        "span-9": "span 9 / span 9",
        "span-11": "span 11 / span 11",
        "span-12": "span 12 / span 12",
        "span-13": "span 13 / span 13",
        "span-14": "span 14 / span 14",
        "span-18": "span 18 / span 18",
      },

      borderRadius: {},
    },
  },

  plugins: [],
};
export default config;
