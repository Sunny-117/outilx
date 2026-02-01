import { createServer } from 'http';

// 创建 HTTP 服务器
const server = createServer((req, res) => {
  console.log(`${req.method} ${req.url} from ${req.headers.origin || 'unknown'}`);
  
  // 设置 CORS 头 - 必须在所有响应之前
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Cache-Control');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Type, Cache-Control');

  // 处理 OPTIONS 预检请求
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // 处理 SSE 请求
  if (req.url === '/sse') {
    console.log('✓ 新的 SSE 连接');

    // 设置 SSE 响应头
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // 禁用 nginx 缓冲
      'Access-Control-Allow-Origin': '*',
    });

    // 立即发送初始消息（注释行帮助建立连接）
    res.write(': connected\n\n');
    res.write('data: SSE 连接已建立\n\n');
    
    console.log('✓ SSE 初始消息已发送');

    // 每 2 秒发送一条消息
    const interval = setInterval(() => {
      const data = {
        message: `这是一条 SSE 消息 #${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date().toISOString(),
      };
      const success = res.write(`data: ${JSON.stringify(data)}\n\n`);
      if (success) {
        console.log('✓ 发送消息:', data.message);
      } else {
        console.log('✗ 发送消息失败');
      }
    }, 2000);

    // 当客户端关闭连接时
    req.on('close', () => {
      clearInterval(interval);
      console.log('✗ 客户端断开连接');
    });
    
    // 错误处理
    req.on('error', (err) => {
      console.error('✗ 请求错误:', err);
      clearInterval(interval);
    });
    
    res.on('error', (err) => {
      console.error('✗ 响应错误:', err);
      clearInterval(interval);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// 启动服务器
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`SSE 服务器运行在 http://localhost:${PORT}`);
  console.log(`SSE 端点: http://localhost:${PORT}/sse`);
  console.log(`按 Ctrl+C 停止服务器`);
  console.log(`========================================\n`);
});
