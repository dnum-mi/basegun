const { defineConfig } = require('cypress')


module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    baseUrl: "http://localhost:4173"
    // viewportWidth: 480
  }
})