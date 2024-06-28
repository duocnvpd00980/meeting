import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/public': {
        target: 'http://localhost:5000', // Địa chỉ của XAMPP
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
