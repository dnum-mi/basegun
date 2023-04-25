const { defineConfig } = require('cypress')


module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    baseUrl: "http://localhost:4173",
    // NEO - Crosscall X4 - Résolution : 18:9
    // Iphone XR
    viewportWidth: 414, 
    viewportHeight: 896, 
  }
})