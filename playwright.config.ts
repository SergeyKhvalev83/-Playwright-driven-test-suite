import { defineConfig, devices } from "@playwright/test";


export default defineConfig({
  timeout: 45000,

  testDir: "./src/tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    
    baseURL: "https://animated-gingersnap-8cf7f2.netlify.app/",
    headless: false,
    trace: "on-first-retry",
    screenshot: "on",
    video: "on"
  },

  projects: [
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    // /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],

});
