// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://tuzladus.com.tr",
  output: "static",
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "always" },
  compressHTML: true,
  prefetch: { prefetchAll: false, defaultStrategy: "hover" },
  integrations: [react(), sitemap({ filter: (page) => !page.includes("/404") })],
  vite: { plugins: [tailwindcss()] },
});
