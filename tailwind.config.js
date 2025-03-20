/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        // => @media (min-width: 321px) { ... }

        sm: "575px",
        // => @media (min-width: 576px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        // xl: "1200px",
        // => @media (min-width: 1200px) { ... }

        // "2xl": "1400px",
        // => @media (min-width: 1400px) { ... }
      },
      width: {
        'custom-scrollbar': '4px', // Set the custom width for the scrollbar
      },
      keyframes: {
        zoomIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        zoomIn: 'zoomIn 0.3s ease-out forwards',
      },
      fontFamily: {
        // Archivo: ['DM Sans', 'sans-serif'],
        DMSerifDisplay: ['DM Serif Display', 'serif'],
        // Add more fonts as needed
        Archivo: ['Archivo', 'sans-serif'],
        // OpenSans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}