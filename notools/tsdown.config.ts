import path from "node:path";
import { defineConfig } from "tsdown";
import { readDirectoryRecursively } from "./scripts/utils";

const srcDir = path.join(__dirname, "src");
const entry = readDirectoryRecursively(srcDir);

export default defineConfig({
  entry,
  format: ["cjs", "esm"],
  // splitting: true,
  // cjsInterop: true,
  clean: true,
  dts: true,
  platform: "node",
});
