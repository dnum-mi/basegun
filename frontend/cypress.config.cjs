const { defineConfig } = require('cypress')

const frontendHost = process.env.FRONTEND_HOST || 'localhost'
const frontendPort = process.env.FRONTEND_PORT || '3000'

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,ts}',
    baseUrl: `http://${frontendHost}:${frontendPort}`,
    // NEO - Crosscall X4 - Résolution : 18:9
    // Iphone XR
    viewportWidth: 414,
    viewportHeight: 896,
    video: false,
  },
})
