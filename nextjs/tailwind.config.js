/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#8F3F1A",
        "secondary": "#4F321E",
        "accent": "#A3371D",
        "cream": "#E4DDD3",
        "light-cream": "#f9e4c6",
        "brown": "#8F3F1A",
        "light-brown": "#C7BAA8",
        "dark-brown": "#4F321E",
        "text-dark": "#2F232F",
        "background-light": "#E4DDD3",
        "background-dark": "#201612",
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"],
        "rye": ["Rye", "cursive"],
        "lato": ["Lato", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "full": "9999px"
      },
      keyframes: {
        'soft-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.15)', opacity: '0.8' },
        },
      },
      animation: {
        'soft-pulse': 'soft-pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}