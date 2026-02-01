import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
  },
  resolve: {
    alias: {
      "@outilx/browser": path.resolve(__dirname, "dist/index.js"),
    },
  },
});
