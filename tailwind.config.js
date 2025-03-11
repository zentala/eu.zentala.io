/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
import typography from "@tailwindcss/typography"

export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  // theme: {
  //   extend: {},
  // },
  daisyui: {
    themes: ["light", "dark"], // Enable light and dark themes
    darkTheme: "dark", // Use "dark" as the dark theme
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
  plugins: [typography, daisyui],
}

