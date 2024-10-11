const { defineConfig } = require("cypress");

const frontendHost = "localhost";
const frontendPort = "5173";

module.exports = defineConfig({
  e2e: {
    pageLoadTimeout: 12000,
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    baseUrl: `http://${frontendHost}:${frontendPort}`,
    // NEO - Crosscall X4 - Résolution : 18:9
    // Iphone XR
    viewportWidth: 414,
    viewportHeight: 896,
    video: false,
    supportFile: "cypress/support/e2e.js",
    // setupNodeEvents(on, config) {
    //   on('before:browser:launch', (browser = {}, launchOptions) => {
    //     if (config.spec && config.spec.name === "expert-contact-path.cy.js") {
    //       if (browser.family === 'firefox') {
    //         launchOptions.preferences['network.proxy.testing_localhost_is_secure_when_hijacked'] = false;
    //         launchOptions.preferences['network.cors_enabled'] = false;
    //       }
    //       return launchOptions;
    //     };
    //     })
    //     return config;
    // },
  },
});
