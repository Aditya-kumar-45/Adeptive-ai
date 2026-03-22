// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // This is CRITICAL for dark mode to work
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Optional: Add custom colors for dark mode
      colors: {
        // You can add custom colors here if needed
      },
      // Optional: Add custom animations
      animation: {
        'theme-transition': 'themeTransition 0.3s ease-in-out',
      },
      keyframes: {
        themeTransition: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}