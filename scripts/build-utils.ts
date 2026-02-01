import { readdirSync, statSync } from "fs";
import { join, extname, basename } from "path";

/**
 * 递归读取目录下所有 TypeScript 文件
 */
export function readDirectoryRecursively(dir: string): string[] {
  const files: string[] = [];
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...readDirectoryRecursively(fullPath));
    } else if (extname(item) === ".ts" && !item.endsWith(".d.ts")) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * 读取目录下的直接子文件（非递归）
 */
export function readDirectory(dir: string): string[] {
  const files: string[] = [];
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isFile() && extname(item) === ".ts" && !item.endsWith(".d.ts")) {
      files.push(fullPath);
    }
  }

  return files;
}
