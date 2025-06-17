/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media", // or 'class' if you want manual control
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Adjusted for src directory
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
