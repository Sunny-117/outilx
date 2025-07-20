import { defineConfig, Options } from "tsdown";
import { readDirectory } from "./scripts/utils";
import path from "path";

const entry = readDirectory(path.resolve(__dirname, "src/core"));
console.log(entry)

const commonConfig: Options = {
  entry: ["./src/index.ts"],
  clean: true,
  minify: false,
  sourcemap: true,
  dts: true,
  target: "es2015",
};

const createConfig = (format: Options["format"], outDir: string) => ({
  ...commonConfig,
  format,
  outDir,
});

// 导出配置
export default defineConfig([
  createConfig("esm", "dist/esm"),
  createConfig("cjs", "dist/cjs"),
  createConfig("iife", "dist/iife"),
]);
