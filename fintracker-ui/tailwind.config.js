const plugin = require("tailwindcss/plugin")

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
        error: "var(--error)",
        surface: {
          0: "var(--surface-0)",
          50: "var(--surface-50)",
          100: "var(--surface-100)",
          200: "var(--surface-200)",
          300: "var(--surface-300)",
          400: "var(--surface-400)",
          500: "var(--surface-500)",
          600: "var(--surface-600)",
          700: "var(--surface-700)",
          800: "var(--surface-800)",
          900: "var(--surface-900)",
          primary: "var(--primary-color)",
          ground: "var(--surface-ground)",
          section: "var(--surface-section)",
          card: "var(--surface-card)",
          overlay: "var(--surface-overlay)",
          border: "var(--surface-border)",
          hover: "var(--surface-hover)"
        },
        primary: {
          DEFAULT: "var(--primary-color)",
          0: "var(--primary-0)",
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)"
        }
      },
    },
  },
  plugins: [
    plugin(({addVariant}) => {
      addVariant("first-child", "&>*:first-child")
      addVariant("last-child", "&>*:last-child")
    })
  ],
  corePlugins: {
    preflight: false,
  },
  important: true,
  darkMode: "selector"
}

