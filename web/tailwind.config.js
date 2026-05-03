/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e50914", // Màu đỏ giống Netflix/Rophim
        background: "#141414", // Màu nền tối
        surface: "#181818", // Màu nền cho các khối
        textPrimary: "#ffffff",
        textSecondary: "#b3b3b3",
      }
    },
  },
  plugins: [],
}
