import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 90000,
  expect: { timeout: 30000 },
  workers: 1,
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
    ...(process.env.PLAYWRIGHT_CHROMIUM_PATH
      ? {
          launchOptions: {
            executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH,
            args: ["--no-sandbox", "--disable-dev-shm-usage"],
          },
        }
      : {}),
  },
  webServer: {
    command:
      process.env.E2E_SERVER_COMMAND || "npm run dev -- --hostname 127.0.0.1",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
