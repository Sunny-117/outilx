#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

interface PackageJson {
  name: string;
  exports?: Record<string, any>;
  [key: string]: any;
}

/**
 * 根据 package.json 的 name 和构建输出自动生成 exports 字段
 */
function generateExports(packagePath: string) {
  const packageJsonPath = join(packagePath, "package.json");
  const packageJson: PackageJson = JSON.parse(
    readFileSync(packageJsonPath, "utf-8")
  );

  // 基础导出配置
  const exports: Record<string, any> = {
    ".": {
      import: {
        types: "./dist/index.d.ts",
        default: "./dist/index.js",
      },
      require: {
        types: "./dist/index.d.cts",
        default: "./dist/index.cjs",
      },
    },
    "./package.json": "./package.json",
  };

  // 更新 package.json
  packageJson.exports = exports;
  packageJson.main = "./dist/index.cjs";
  packageJson.module = "./dist/index.js";
  packageJson.types = "./dist/index.d.ts";

  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");
  console.log(`✅ Generated exports for ${packageJson.name}`);
}

// 执行
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Usage: tsx generate-exports.ts <package-path>");
  process.exit(1);
}

generateExports(args[0]);
