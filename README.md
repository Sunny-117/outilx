# outilx

[![NPM Version](https://img.shields.io/npm/v/outilx.svg)](https://www.npmjs.com/package/outilx)
[![Build Status](https://img.shields.io/github/workflow/status/sunny-117/outilx/CI)](https://github.com/sunny-117/outilx/actions)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![](https://img.shields.io/github/followers/sunny-117.svg?style=social&label=Follow%20Me)](https://github.com/Sunny-117)

前端业务代码工具库，提供模块化、高性能的 JavaScript 实用工具函数。

[English](./README.en.md) | 简体中文

## ✨ 特性

- 🚀 现代轻量
- 📦 支持 Tree-shaking
- 💪 使用 TypeScript 编写
- 🧪 单元测试覆盖
- 📝 详细的文档

## 📦 安装

```bash
# 使用 npm
npm install outilx

# 使用 yarn
yarn add outilx

# 使用 pnpm
pnpm add outilx
```

## 🔨 使用示例

```javascript
import { toArray, createIncrementingArray } from "outilx";

// 转换为数组
toArray('foo') // => ['foo']
toArray(['foo']) // => ['foo']
toArray(null) // => []

// 创建递增数组
createIncrementingArray(3) // => [1, 2, 3]
```

## 📚 模块文档

### Array 数组工具

- `toArray(val, defaultValue?)` - 将任意值转换为数组
- `createIncrementingArray(length)` - 创建指定长度的递增数组
- `pipeFromArray(fns)` - 将函数数组组合成单个函数
- `shuffleArray(array)` - 随机打乱数组

### Cache 缓存工具

- `TipCache` - 支持 TTL 的 LRU 缓存实现
- `memoize(fn)` - 创建具有结果缓存的函数

### Config 配置工具

- `getConfigFromDataSource(dataSource)` - 将配置数据映射为查找对象

### JSON 工具

- `isJsonString(str)` - 检查字符串是否为有效的 JSON
- `stringifyJsonWithFallback(json, fallback)` - 安全的 JSON 字符串化（带后备值）
- `parseJsonWithFallback(jsonValue, fallback)` - 安全的 JSON 解析（带后备值）

### URL 工具

- `getUrlParams(query)` - 将 URL 查询字符串转换为对象

更多详细文档请访问：https://sunny-117.github.io/outilx/

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/my-new-feature`
3. 提交改动：`git commit -am '添加某个特性'`
4. 推送到分支：`git push origin feature/my-new-feature`
5. 提交 Pull Request

## 📄 开源协议

[MIT](LICENSE) © Sunny-117
