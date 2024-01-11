/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    base: true, // applies background color and foreground color for the root element by default
    themes: [
      // {
      //   light: {
      //     ...require("daisyui/src/theming/themes")["[data-theme=light]"],
      //     "base-200": "#e5e6e6",
      //   },
      // },
        "light",
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          // "base-200": "#2a323c",
          "base-300": "#2a323c",
        },
      }
    ], // Choose the desired theme (you can also customize the theme)
  },
  darkMode: 'class',
}