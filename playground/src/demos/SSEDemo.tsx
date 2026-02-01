import { useState } from 'react';
import { useSSE } from '@outilx/ai';

function SSEDemo() {
  const [url, setUrl] = useState('/sse');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `[${timestamp}] ${message}`]);
  };

  const { state, messages, connect, disconnect, clearMessages } = useSSE({
    url,
    onOpen: () => addLog('✓ SSE 连接已建立'),
    onMessage: (data) => addLog(`📨 收到消息: ${data}`),
    onError: () => addLog('✗ SSE 连接错误'),
  });

  return (
    <div>
      <h2>SSE (Server-Sent Events) Demo</h2>
      <p>实时接收服务器推送的数据</p>

      <div style={{ marginBottom: '20px', padding: '15px', background: '#fff3cd', borderRadius: '4px' }}>
        <strong>⚠️ 注意：</strong> 需要先启动 SSE 服务器
        <pre style={{ margin: '10px 0 0 0', padding: '10px', background: '#fff', borderRadius: '4px', fontSize: '13px' }}>
          {`# 在新终端窗口运行：
cd packages/ai/sse
node server.js

# 服务器将运行在 http://localhost:3001
# SSE 端点: http://localhost:3001/sse`}
        </pre>
        {state === 'error' && (
          <div style={{ marginTop: '10px', padding: '10px', background: '#f8d7da', color: '#721c24', borderRadius: '4px' }}>
            <strong>连接失败！</strong> 请确保：
            <ul style={{ margin: '5px 0 0 0', paddingLeft: '20px' }}>
              <li>SSE 服务器已启动</li>
              <li>URL 地址正确</li>
              <li>没有被防火墙阻止</li>
            </ul>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>配置：</h3>
        <div style={{ marginBottom: '10px' }}>
          <label>
            SSE URL: 
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
              disabled={state === 'connected'}
            />
          </label>
        </div>
        <div>
          <strong>状态：</strong>{' '}
          <span
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              background:
                state === 'connected'
                  ? '#d4edda'
                  : state === 'error'
                  ? '#f8d7da'
                  : state === 'connecting'
                  ? '#fff3cd'
                  : '#e2e3e5',
              color:
                state === 'connected'
                  ? '#155724'
                  : state === 'error'
                  ? '#721c24'
                  : state === 'connecting'
                  ? '#856404'
                  : '#383d41',
            }}
          >
            {state === 'connected' && '🟢 已连接'}
            {state === 'connecting' && '🟡 连接中...'}
            {state === 'error' && '🔴 错误'}
            {state === 'disconnected' && '⚪ 未连接'}
          </span>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={connect}
          disabled={state === 'connected' || state === 'connecting'}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            cursor: state === 'connected' || state === 'connecting' ? 'not-allowed' : 'pointer',
            background: state === 'connected' || state === 'connecting' ? '#ccc' : '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          连接
        </button>
        <button
          onClick={disconnect}
          disabled={state === 'disconnected'}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            cursor: state === 'disconnected' ? 'not-allowed' : 'pointer',
            background: state === 'disconnected' ? '#ccc' : '#f44336',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          断开连接
        </button>
        <button
          onClick={() => {
            clearMessages();
            setLogs([]);
          }}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            background: '#ff9800',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          清空消息
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <h3>接收到的消息 ({messages.length})：</h3>
          <div
            style={{
              padding: '10px',
              background: '#f5f5f5',
              border: '1px solid #ddd',
              borderRadius: '4px',
              minHeight: '300px',
              maxHeight: '400px',
              overflow: 'auto',
            }}
          >
            {messages.length === 0 ? (
              <div style={{ color: '#999' }}>暂无消息</div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    padding: '8px',
                    marginBottom: '5px',
                    background: '#fff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                  }}
                >
                  {msg}
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <h3>日志：</h3>
          <div
            style={{
              padding: '10px',
              background: '#f5f5f5',
              border: '1px solid #ddd',
              borderRadius: '4px',
              minHeight: '300px',
              maxHeight: '400px',
              overflow: 'auto',
              fontFamily: 'monospace',
              fontSize: '12px',
            }}
          >
            {logs.length === 0 ? (
              <div style={{ color: '#999' }}>暂无日志</div>
            ) : (
              logs.map((log, index) => (
                <div key={index} style={{ marginBottom: '3px' }}>
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SSEDemo;
