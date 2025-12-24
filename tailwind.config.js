/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layout/*.liquid",
    "./templates/*.liquid",
    "./sections/*.liquid",
    "./snippets/*.liquid",
    "./blocks/*.liquid",
  ],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      screens: {
        'md': '768px',
      }
    },
  },
  plugins: [],
}

