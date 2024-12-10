import { defineConfig } from "cypress";
import codeCoverageTask from "@cypress/code-coverage/task.js";

const frontendHost = "localhost";
const frontendPort = "5173";

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    baseUrl: `http://${frontendHost}:${frontendPort}`,
    viewportWidth: 414,
    viewportHeight: 896,
    video: false,
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
  },
});
