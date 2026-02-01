# SSE Server

简单的 SSE (Server-Sent Events) 测试服务器。

## 启动服务器

```bash
cd packages/ai/sse
node server.js
```

服务器将运行在 `http://localhost:3001`

## 端点

- **GET /sse** - SSE 连接端点
  - 每 2 秒发送一条消息
  - 自动处理 CORS
  - 支持客户端断开重连

## 测试

### 使用 Playground

1. 启动 SSE 服务器（本目录）
2. 启动 Playground：
   ```bash
   cd playground
   pnpm dev
   ```
3. 访问 http://localhost:3100
4. 选择 "SSE" 标签
5. 点击"连接"按钮

### 使用 curl

```bash
curl -N http://localhost:3001/sse
```

### 使用浏览器

在浏览器控制台运行：

```javascript
const eventSource = new EventSource('http://localhost:3001/sse');

eventSource.onmessage = (event) => {
  console.log('Received:', event.data);
};

eventSource.onerror = (error) => {
  console.error('Error:', error);
};
```

## 消息格式

服务器发送的消息格式：

```json
{
  "message": "这是一条 SSE 消息 #123",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## 自定义

修改 `server.js` 可以：
- 更改端口号（默认 3001）
- 调整消息发送间隔（默认 2000ms）
- 自定义消息内容
- 添加更多端点
