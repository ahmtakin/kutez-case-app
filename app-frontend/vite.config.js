import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config();
const API_ENDPOINT=process.env.API_ENDPOINT;

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: API_ENDPOINT, // Backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },

});


