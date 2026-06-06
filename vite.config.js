import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Split vendor bundle from app code — better long-term caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    // Warn if any chunk exceeds 400KB
    chunkSizeWarningLimit: 400,
    // Disable source maps in production
    sourcemap: false,
  },
})
