import fs from 'fs';
import path from 'path';

// 递归读取目录的函数
export function readDirectory(dir) {
    const files = fs.readdirSync(dir); // 读取目录中的所有文件和目录
    let filePaths: string[] = [];

    files.forEach(file => {
        const filePath = path.join(dir, file); // 拼接成完整路径
        const stat = fs.statSync(filePath); // 获取文件状态信息

        if (stat.isDirectory()) {
            // 如果是目录，递归调用
            filePaths = filePaths.concat(readDirectory(filePath));
        } else {
            // 如果是文件，添加到路径数组
            filePaths.push(filePath);
        }
    });

    return filePaths;
}
