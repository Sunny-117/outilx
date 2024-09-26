import { defineConfig } from "tsup";

import {readDirectory} from './scripts/utils'
import path from "path";

const entry = readDirectory(path.resolve(__dirname, 'src/core'));

export default defineConfig({
  // entry: ["src/index.ts"],
  entry,
  outDir: "dist",
  clean: true,
  format: ["esm", "cjs", "iife"],
  minify: false,
  sourcemap: true,
  dts: true,
  target: 'es2015',
  // platform: 'node',
  // esbuild: true,
  // shims: true,
  // keepNames: true,
  // keepNames: true,
  // keepNames: true,
  // keepNames: true,
});
