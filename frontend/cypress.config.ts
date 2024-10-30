import { defineConfig } from "cypress";
import coverageTask from "@cypress/code-coverage/task";

const frontendHost = "localhost";
const frontendPort = "5173";

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    baseUrl: `http://${frontendHost}:${frontendPort}`,
    // NEO - Crosscall X4 - Résolution : 18:9
    // Iphone XR
    viewportWidth: 414,
    viewportHeight: 896,
    video: false,
    setupNodeEvents(on, config) {
      coverageTask(on, config);
      return config;
    },
  },
});
