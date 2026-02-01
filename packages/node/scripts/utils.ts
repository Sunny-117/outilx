import * as fs from "fs";
import * as path from "path";

// 递归读取目录下所有文件和文件夹的相对路径，结果以./src开头
export function readDirectoryRecursively(dir: string): string[] {
  const entry: string[] = [];
  try {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      // 计算相对于根目录下 src 的相对路径
      const relativePath = path.join("./src", path.relative(dir, filePath));
      if (stat.isDirectory()) {
        entry.push(relativePath);
        // 递归调用，处理子目录
        const subEntries = readDirectoryRecursively(filePath);
        entry.push(...subEntries);
      } else {
        entry.push(relativePath);
      }
    });
  } catch (error) {
    console.error("读取目录时出错:", error);
  }
  return entry;
}
