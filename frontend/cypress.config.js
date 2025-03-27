import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    supportFile: false,
    baseUrl: "http://localhost:5173", // Update with your Vite dev server URL
    setupNodeEvents(on, config) {
      // Add event listeners if needed
    },
  },
});
