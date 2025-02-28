import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/", // Ensures correct asset paths
  server: {
    historyApiFallback: true, // Ensures SPA fallback
  }
});
