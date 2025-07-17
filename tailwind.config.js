/** @type {import('tailwindcss').Config} */
export default {
  // Ensure the 'content' array correctly points to your React files
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This line is very important!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}