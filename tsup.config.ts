import { defineConfig } from "tsup";
export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  clean: true,
  format: ["esm", "cjs", "iife"],
  minify: true,
  sourcemap: true,
  // dts: true,
  // target: 'esnext',
  // platform: 'node',
  // esbuild: true,
  // shims: true,
  // keepNames: true,
  // keepNames: true,
  // keepNames: true,
  // keepNames: true,
});
