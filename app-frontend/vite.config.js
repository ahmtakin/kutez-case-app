import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // resolve: {
  //   alias: {
  //     swiper: 'swiper/swiper-bundle.esm.js', // Explicitly resolve to ES module version of Swiper
  //   },
  // },
});


