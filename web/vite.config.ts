/// <reference types="vitest" />

import { fileURLToPath, URL } from 'node:url'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    Components({
      resolvers: [PrimeVueResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  html: {
    cspNonce: '{{cspNonce}}',
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./tests/unit/setup.ts'],
  },
})
