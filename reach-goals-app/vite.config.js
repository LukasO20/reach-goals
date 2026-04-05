import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(path.dirname(import.meta.url).replace('file:///', ''), './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        loadPaths: [path.resolve(__dirname, 'src')],
        additionalData: `@use "styles/_main.scss" as *;`,
      },
    },
  },
  plugins: [
    react(),
  ],
  server: {
    port: 3000,
    watch: {
      ignored: ['**/api/**']
    }
  }
})