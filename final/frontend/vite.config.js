import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://5a24bee9-460b-41f6-948a-ab78a2b8cead-00-3a3qn4n7m9ueq.sisko.replit.dev/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
