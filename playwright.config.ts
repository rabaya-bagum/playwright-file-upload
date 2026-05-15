import { defineConfig, devices } from '@playwright/test';

// Base origin for the application under test
const BASE_URL = 'https://the-internet.herokuapp.com';

export default defineConfig({
  testDir: './tests',

  // Exclude utility/seed files from the test run
  testIgnore: ['**/seed.spec.ts', '**/example.spec.ts'],

  // Run spec files in parallel; tests within a file run sequentially
  fullyParallel: true,

  // Prevent accidental test.only commits reaching CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests twice on CI, none locally
  retries: process.env.CI ? 2 : 0,

  // Single worker on CI to avoid exhausting remote resources; auto locally
  workers: process.env.CI ? 1 : undefined,

  // Rich HTML report + concise list output in the terminal
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],

  use: {
    // Shared base URL — specs can use relative paths like page.goto('/upload')
    baseURL: BASE_URL,

    // Capture a trace on the first retry for easier debugging
    trace: 'on-first-retry',

    // Screenshot only on failure to keep artefacts small
    screenshot: 'only-on-failure',

    // Video only on retry
    video: 'on-first-retry',

    // Generous navigation timeout for the upload round-trip
    navigationTimeout: 30_000,
    actionTimeout: 10_000,
  },

  // Per-test timeout — large-file upload can be slow on CI
  timeout: 60_000,

  // Assertion timeout
  expect: {
    timeout: 10_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
