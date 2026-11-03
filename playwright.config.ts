import { defineConfig, devices } from "@playwright/test";

// Makinede kurulu Chrome kullanılır (Playwright tarayıcı indirmesi gerekmez).
// Firefox/WebKit uyumluluk testleri Sprint 6'da eklenecek.
const PORT = 4322;

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  // Paylaşılan geliştirme makinesinde yük altında zaman aşımlarını önlemek için sınırlı eşzamanlılık
  workers: 3,
  expect: { timeout: 10_000 },
  reporter: [["list"]],
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    channel: "chrome",
    trace: "off",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], channel: "chrome", viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"], channel: "chrome" } },
  ],
  webServer: {
    command: `npx astro preview --port ${PORT} --host 127.0.0.1`,
    url: `http://127.0.0.1:${PORT}/`,
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
