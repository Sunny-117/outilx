import { defineConfig, type Options } from "tsdown";

export interface BuildOptions {
  entry: string[];
  platform?: "browser" | "node";
  formats?: Array<"esm" | "cjs" | "iife">;
}

export function createBuildConfig(options: BuildOptions) {
  const { entry, platform = "browser", formats = ["esm", "cjs"] } = options;

  const commonConfig: Options = {
    entry,
    clean: true,
    minify: false,
    sourcemap: true,
    dts: true,
    target: platform === "browser" ? "es2015" : "esnext",
    platform: platform === "node" ? "node" : "browser",
  };

  const configs: Options[] = [];

  if (formats.includes("esm")) {
    configs.push({
      ...commonConfig,
      format: "esm",
      outDir: "dist",
    });
  }

  if (formats.includes("cjs")) {
    configs.push({
      ...commonConfig,
      format: "cjs",
      outDir: "dist",
    });
  }

  if (formats.includes("iife") && platform === "browser") {
    configs.push({
      ...commonConfig,
      format: "iife",
      outDir: "dist/iife",
    });
  }

  return defineConfig(configs);
}
