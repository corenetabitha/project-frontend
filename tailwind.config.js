// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // You can define custom line-clamp values here if needed
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'), // <--- Make sure this line is present
  ],
};