/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#eeeeff",
          100: "#d5d4f7",
          200: "#b0aeee",
          300: "#8b88e5",
          400: "#6662dc",
          500: "#3B35B0",  // primary indigo
          600: "#2f2a8e",
          700: "#23206b",
          800: "#181549",
          900: "#0e0c2e",
          950: "#070619",
        },
        cyan: {
          300: "#67eeff",
          400: "#22e5ff",
          500: "#00D4FF",  // accent cyan
          600: "#00aad4",
          700: "#007fa0",
        },
        navy: {
          900: "#04040f",
          800: "#080818",
          700: "#0d0d25",
          600: "#131338",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body:    ["Inter", "sans-serif"],
      },
      animation: {
        "glow-pulse":  "glowPulse 2.5s ease-in-out infinite",
        "float":       "float 4s ease-in-out infinite",
        "slide-up":    "slideUp 0.5s ease-out",
        "fade-in":     "fadeIn 0.4s ease-out",
        "scan":        "scan 5s linear infinite",
        "shimmer":     "shimmer 1.5s infinite",
      },
      keyframes: {
        glowPulse: {
          "0%,100%": { boxShadow: "0 0 15px rgba(0,212,255,0.25)" },
          "50%":     { boxShadow: "0 0 35px rgba(0,212,255,0.65)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-8px)" },
        },
        slideUp: {
          from: { opacity: 0, transform: "translateY(24px)" },
          to:   { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to:   { opacity: 1 },
        },
        scan: {
          "0%":   { transform: "translateY(-10%)", opacity: 0 },
          "10%":  { opacity: 1 },
          "90%":  { opacity: 1 },
          "100%": { transform: "translateY(110%)", opacity: 0 },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};