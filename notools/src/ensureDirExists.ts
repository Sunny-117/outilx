import { existsSync, mkdirSync } from "fs";
import { dirname } from "path";

/**
 * 确保文件所在的目录存在，如果不存在则创建
 * @param filePath 文件的完整路径
 */
export function ensureDirExists(filePath: string): void {
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}
