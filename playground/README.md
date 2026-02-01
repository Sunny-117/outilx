# Outilx Playground

测试和演示所有 Outilx 包的功能。

## 启动

```bash
# 在项目根目录
pnpm install

# 启动 playground
cd playground
pnpm dev
```

访问 http://localhost:3100

## 功能演示

### @outilx/ai

- **Code Detection**: 检测和解析 Markdown 代码块
- **Streaming Simulator**: 模拟流式数据传输
- **SSE**: Server-Sent Events 实时连接

### @outilx/browser

- **toArray**: 值转数组
- **TipCache**: LRU 缓存
- **parseJsonWithFallback**: 安全 JSON 解析
- **getUrlParams**: URL 参数解析

### @outilx/react-hooks

- **useBoolean**: 布尔值状态管理
- **useCounter**: 计数器
- **useArray**: 数组状态管理
- **useToggle**: 双值切换
- **useMap**: Map 状态管理
- **useTaskPending**: 异步任务状态

## SSE 服务器

如果要测试 SSE 功能，需要先启动 SSE 服务器：

```bash
cd packages/ai/sse
node server.js
```

服务器将运行在 http://localhost:3001
