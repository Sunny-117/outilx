import fs from "fs";
import fsp from "node:fs/promises";
import path from "path";
import { glob } from "glob";
import consola from "consola";

interface DeleteFileOptions {
  // 目标路径
  targetDir: string;
  // 文件名或后缀匹配规则
  pattern: string;
  // 是否递归删除子目录中的文件，默认为 false
  recursive?: boolean;
}
/**
 * 根据指定的匹配模式删除目标路径下的文件
 * @param {DeleteFileOptions} options - 删除文件的选项
 * @returns {Promise<string[]>} - 返回删除的文件列表
 */
export async function deleteFilesByPattern(
  options: DeleteFileOptions
): Promise<string[]> {
  const { targetDir, pattern, recursive = false } = options;

  // 通过 glob 查找匹配的文件
  const globPattern = recursive
    ? path.join(targetDir, "**", pattern)
    : path.join(targetDir, pattern);
  const files = glob.sync(globPattern);
  console.log(globPattern);

  const deletedFiles: string[] = [];

  // 删除匹配到的文件
  for (const file of files) {
    try {
      fs.unlinkSync(file); // 删除文件
      deletedFiles.push(file);
    } catch (err) {
      console.error(`无法删除文件: ${file}`, err);
    }
  }
  consola.success(`成功删除了 ${deletedFiles.length} 个文件:`, deletedFiles);
  return deletedFiles;
}
/**
 * 删除指定目录下的所有空文件夹
 * @param {string} targetDir - 要删除空文件夹的目标目录
 * @param {boolean} recursive - 是否递归删除子目录中的空文件夹
 * @returns {Promise<string[]>} - 返回删除的空文件夹路径列表
 */
export async function deleteEmptyDirs(
  targetDir: string,
  recursive: boolean = false
): Promise<string[]> {
  const deletedDirs: string[] = [];

  // 遍历目标目录，查找空目录
  function walkDir(dir: string): void {
    const files = fs.readdirSync(dir);

    // 如果目录为空，删除它
    if (files.length === 0) {
      try {
        fs.rmdirSync(dir);
        deletedDirs.push(dir);
        consola.success(`删除空文件夹: ${dir}`);
      } catch (err) {
        console.error(`无法删除空文件夹: ${dir}`, err);
      }
    } else if (recursive) {
      // 递归处理子目录
      files.forEach((file) => {
        const fullPath = path.join(dir, file);
        const stat = fs.lstatSync(fullPath);

        if (stat.isDirectory()) {
          walkDir(fullPath); // 递归删除子目录
        }
      });

      // 再次检查当前目录是否为空，如果是，删除它
      const remainingFiles = fs.readdirSync(dir);
      if (remainingFiles.length === 0) {
        try {
          fs.rmdirSync(dir);
          deletedDirs.push(dir);
          consola.success(`删除空文件夹: ${dir}`);
        } catch (err) {
          console.error(`无法删除空文件夹: ${dir}`, err);
        }
      }
    }
  }

  walkDir(targetDir);

  consola.success(`成功删除了 ${deletedDirs.length} 个空文件夹:`, deletedDirs);
  return deletedDirs;
}

// fork from vite
// vitejs/vite#610 when hot-reloading Vue files, we read immediately on file
// change event and sometimes this can be too early and get an empty buffer.
// Poll until the file's modified time has changed before reading again.
// 有些操作系统编辑器中，保存的时候 会触发文件的change事件，但并不意味着编辑器已经把文件内容已经写完了
// 这样确保调用read的时候可以读到已经更新过的内容
// 处理文件修改后的读取问题,特别是为了解决一些文件系统的竞态条件。让我解释一下它的工作原理:
// ● 首先尝试读取文件内容:const content = await fsp.readFile(file, "utf-8");
// ● 如果读取到内容,直接返回内容。但如果读不到内容(content 为空),则进入特殊处理流程:

// ● 在某些文件系统中,当文件正在被写入时,可能会出现短暂的"空文件"状态
// ● 通过检查文件修改时间的变化,可以等待文件写入完成
// ● 最多等待10次(每次10ms),总共不超过100ms,避免无限等待
// ● 如果在这期间检测到文件修改时间发生变化,说明文件写入可能已完成,就立即尝试重新读取
// 这种机制主要用于处理热更新(HMR)场景,确保能正确读取到最新修改的文件内容,避免读取到不完整或错误的文件内容。
// 这是一个"重试机制",用于处理文件系统的异步性和竞态条件,提高文件读取的可靠性。
export async function readModifiedFile(file: string): Promise<string> {
  const content = await fsp.readFile(file, "utf-8");
  if (!content) {
    const mtime = (await fsp.stat(file)).mtimeMs;

    for (let n = 0; n < 10; n++) {
      await new Promise((r) => setTimeout(r, 10));
      const newMtime = (await fsp.stat(file)).mtimeMs;
      if (newMtime !== mtime) {
        break;
      }
    }

    return await fsp.readFile(file, "utf-8");
  } else {
    return content;
  }
}
