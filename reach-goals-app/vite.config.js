import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  resolve: {
    alias: {
      '~': `${process.cwd()}/src`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/_main.scss" as *;`,
      },
    },
  },
  plugins: [react()],
  server: {
    port: 3000,
    watch: {
      ignored: ['**/api/**']
    }
  },
  optimizeDeps: {
    exclude: ['prisma', '@prisma/client'],
  },
})
