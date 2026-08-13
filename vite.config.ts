import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    headers: {
      // Required for Google Identity Services popup communication
      // Allows popups opened from this page to communicate back via postMessage
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
    // Ensure COOP headers are applied to all responses including HTML
    middlewareMode: false,
  },
})