/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
        pirate: ["'Pirata One'", "cursive"],
        carolloPlayscript: ["CarolloPlayscript", "cursive"],
      },
      colors: {
        redPrincipal: "#770101",
        blackPrincipal: "#000000",
        beigePrincipal: "#e7d7c0",
        greyButon: "#343434",
        beigeAnswer: "#97866e",
        redButon: "#943a30"
      },
      animation: {
      'fade-slide': 'fadeSlide 0.5s ease-out',
      'blink': 'blink 1s steps(2, start) infinite',
    },
    keyframes: {
      fadeSlide: {
        '0%': { opacity: 0, transform: 'translateY(20px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
      blink: {
        '0%': { opacity: 0 },
        '50%': { opacity: 0.5 },
        '100%': { opacity: 1 },
      },
    },
    boxShadow: {
      inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.5)',
    },
    },
  },
  plugins: [],
}