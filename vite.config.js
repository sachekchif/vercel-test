import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  define: {
    'process.env': {},
  },
  plugins: [react()],
  server: {
    historyApiFallback: true, // Ensures proper routing
  },
})
