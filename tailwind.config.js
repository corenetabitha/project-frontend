// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <--- IMPORTANT: Ensure this covers all your React components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}