import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base:'./',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',  // Listen on all network interfaces
    port: 5173,        // Ensure the port matches the one you're forwarding
  }
})
