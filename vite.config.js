import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy para la base de datos mock (puerto 3001)
      '/api-db': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-db/, ''),
      },
      // Proxy para el modelo de IA (puerto 5000)
      '/api-model': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-model/, ''),
      }
    }
  }
})
