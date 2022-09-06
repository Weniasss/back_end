/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:(theme)=> ({
        'img':"url('../src/img/xzc.png')",
        'new':"url('../src/img/imgStepSection.jpg')",
      }),
    },
  },
  plugins: [],
}
