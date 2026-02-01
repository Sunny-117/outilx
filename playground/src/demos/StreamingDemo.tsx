import { useState } from 'react';
import { useStreamingSimulator } from '@outilx/ai';

const sampleResponse = `这是一个模拟的 AI 回复。

让我给你展示一个代码示例：

\`\`\`javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55
\`\`\`

这个函数使用递归计算斐波那契数列。

希望这个例子对你有帮助！`;

function StreamingDemo() {
  const [interval, setInterval] = useState(30);
  const [chunkType, setChunkType] = useState<'char' | 'word'>('char');

  const chunks = chunkType === 'char' 
    ? sampleResponse.split('')
    : sampleResponse.split(' ').map(word => word + ' ');

  const { content, isStreaming, startStreaming, stopStreaming } = useStreamingSimulator({
    chunks,
    interval,
    initialContent: '',
  });

  return (
    <div>
      <h2>Streaming Simulator Demo</h2>
      <p>模拟流式数据传输（如 AI 回复）</p>

      <div style={{ marginBottom: '20px' }}>
        <h3>配置：</h3>
        <div style={{ marginBottom: '10px' }}>
          <label>
            间隔时间 (ms): 
            <input
              type="number"
              value={interval}
              onChange={(e) => setInterval(Number(e.target.value))}
              min="10"
              max="1000"
              step="10"
              style={{ marginLeft: '10px', padding: '5px' }}
              disabled={isStreaming}
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            分块方式: 
            <select
              value={chunkType}
              onChange={(e) => setChunkType(e.target.value as 'char' | 'word')}
              style={{ marginLeft: '10px', padding: '5px' }}
              disabled={isStreaming}
            >
              <option value="char">按字符</option>
              <option value="word">按单词</option>
            </select>
          </label>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={startStreaming}
          disabled={isStreaming}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            cursor: isStreaming ? 'not-allowed' : 'pointer',
            background: isStreaming ? '#ccc' : '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          {isStreaming ? '流式传输中...' : '开始流式传输'}
        </button>
        <button
          onClick={stopStreaming}
          disabled={!isStreaming}
          style={{
            padding: '10px 20px',
            cursor: !isStreaming ? 'not-allowed' : 'pointer',
            background: !isStreaming ? '#ccc' : '#f44336',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          停止
        </button>
      </div>

      <div>
        <h3>输出：</h3>
        <div
          style={{
            padding: '15px',
            background: '#f5f5f5',
            border: '1px solid #ddd',
            borderRadius: '4px',
            minHeight: '200px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontFamily: 'monospace',
            position: 'relative',
          }}
        >
          {content}
          {isStreaming && (
            <span
              style={{
                display: 'inline-block',
                width: '2px',
                height: '1em',
                background: '#333',
                marginLeft: '2px',
                animation: 'blink 1s infinite',
              }}
            />
          )}
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default StreamingDemo;
