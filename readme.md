# outilx

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)[![](https://img.shields.io/github/followers/sunny-117.svg?style=social&label=Follow%20Me)](https://github.com/Sunny-117) [![npm](https://img.shields.io/npm/v/outilx.svg)](https://www.npmjs.com/package/outilx)

前端业务代码工具库

> 目的：高效率完成前端业务代码

业务开发过程中，会经常用到`日期格式化`、`url参数转对象`、`浏览器类型判断`、`节流函数`等常用函数，为避免不同项目多次复制粘贴的麻烦，这里统一封装，并发布到 npm，以提高开发效率。如果你也有常用的代码，欢迎为本项目提交 pr。

## :building_construction: Install

```bash
$ npm install --save-dev outilx
```

```javascript
import { debounce, throttle } from "outilx";
```

## :package: API 文档

### Array

#### &emsp;&emsp;[createIncrementingArray][createIncrementingArray]&emsp;&emsp;判断两个数组是否相等

### Url

#### &emsp;&emsp;[getUrlParams][getUrlParams]&emsp;&emsp;url 参数转对象

[createIncrementingArray](https://github.com/Sunny-117/utils/blob/main/src/core/array.ts)
[getUrlParams]: https://github.com/Sunny-117/utils/blob/main/src/core/url.ts
