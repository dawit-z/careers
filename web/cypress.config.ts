import { defineConfig } from 'cypress'
import vitePreprocessor from 'cypress-vite'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    chromeWebSecurity: false,
    specPattern: 'tests/e2e/**/*.cy.*',
    supportFile: false,
    setupNodeEvents(on) {
      on('file:preprocessor', vitePreprocessor())
    },
    experimentalRunAllSpecs: true,
  },
})
