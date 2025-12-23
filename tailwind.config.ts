import { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  safelist: [
    "grid-cols-2",
    "grid-cols-3",
    "grid-cols-4",
    "grid-cols-5",
    "grid-cols-6",
    "grid-cols-7",
  ],
  theme: {
    extend: {
      keyframes: {
        "brand-shimmer": {
          "0%": { "background-position": "0% center" },
          "100%": { "background-position": "-200% center" },
        },
        "slide-in": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        "slide-in": "slide-in 0.5s ease-out forwards",
        "brand-shimmer": "brand-shimmer 4s linear infinite",
      },
      colors: {
        primary: "#2f0075",
        secondary: "#5D00EA",
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
        "light-blue": "#B9C6F3",
        "light-purple": "#EEE5FD",
        yellow: "#F8C000",
      },
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
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
        "category-card-bg-gradient":
          "linear-gradient(90deg,rgba(234, 36, 100, 1) 0%, rgba(62, 36, 241, 1) 100%)",
        "green-gradient":
          "linear-gradient(90deg,rgba(79, 232, 154, 1) 0%, rgba(4, 156, 60, 1) 100%)",
        "brand-gradient":
          "linear-gradient(to right, #FFFFFF 0%, #E91E63 25%, #9C27B0 50%, #E91E63 75%, #FFFFFF 100%)",
      },
      gridRow: {
        "span-7": "span 7 / span 7",
      },
    },
  },

  plugins: [],
};
export default config;
