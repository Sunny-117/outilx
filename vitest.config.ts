import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
  },
  resolve: {
    alias: {
      outilx: path.resolve(__dirname, "dist/esm/index.js"),
    },
  },
});
