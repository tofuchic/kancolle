import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/kancolle/',
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  plugins: [svgr(), react()],
})
