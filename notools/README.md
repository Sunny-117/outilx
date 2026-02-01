# notools

## 配置

在项目根目录创建`.env`文件，添加以下内容：

```bash
# Git 访问令牌
# GitHub: https://github.com/settings/tokens
# Gitee: https://gitee.com/profile/personal_access_tokens
GIT_TOKEN=your_token_here
```

## Install

```bash
npm i notools
```

## API 文档

### `autoPullRepository(config: RepoConfig): Promise<void>`

该函数用于自动拉取或更新指定用户的Git仓库。

#### 参数
- **`config`**: `RepoConfig`
  - **`username: string`**: Git用户名
  - **`token?: string`**: 可选，Git访问令牌。如果不提供，会从`.env`文件的`GIT_TOKEN`变量读取
  - **`platform: "github" | "gitee"`**: 代码平台
  - **`cloneDir?: string`**: 可选，克隆目录路径，默认为`./cloned_repos`
  - **`concurrency?: number`**: 可选，并发数，默认为5

#### 示例
```typescript
import { autoPullRepository } from "notools";

await autoPullRepository({
  username: "your_username",
  platform: "github",
  cloneDir: "/path/to/clone",
  concurrency: 10
});
```

---

### `deleteFilesByPattern(options: DeleteFileOptions): Promise<string[]>`

该函数用于删除目标路径下符合指定匹配规则的文件，并返回已删除文件的路径列表。

#### 参数

- **`options`**: `DeleteFileOptions` (必填)
  - **`targetDir: string`** (必填): 要删除文件的目标目录路径。
  - **`pattern: string`** (必填): 匹配文件的模式，支持文件名、通配符或文件后缀。例如：`*.txt`, `test1.ts`。
  - **`recursive: boolean`** (可选): 是否递归删除子目录中的文件。默认为 `false`，即只删除当前目录下的文件。

#### 返回值

- 返回一个 `Promise`，解析为已删除文件路径的字符串数组。

#### 示例

```ts
const deletedFiles = await deleteFilesByPattern({
  targetDir: '/path/to/your/directory',
  pattern: '*.txt',
  recursive: true,
});

console.log('已删除的文件:', deletedFiles);
```

---

### `deleteEmptyDirs(targetDir: string, recursive?: boolean): Promise<string[]>`

该函数用于删除指定目录下所有的空文件夹，并返回已删除的空文件夹路径列表。可以选择是否递归删除子目录中的空文件夹。

#### 参数

- **`targetDir: string`** (必填): 要删除空文件夹的目标目录路径。
- **`recursive: boolean`** (可选): 是否递归删除子目录中的空文件夹。默认为 `false`，即只删除目标目录下的空文件夹，不删除子目录中的空文件夹。如果设置为 `true`，会递归删除子目录中的空文件夹。

#### 返回值

- 返回一个 `Promise`，解析为已删除空文件夹路径的字符串数组。

#### 示例

```ts
const deletedDirs = await deleteEmptyDirs('/path/to/your/directory', true);
console.log('已删除的空文件夹:', deletedDirs);
```
