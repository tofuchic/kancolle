import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/kancolle/',
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  plugins: [react()],
})
