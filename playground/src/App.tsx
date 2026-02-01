import { useState } from 'react';
import CodeDetectionDemo from './demos/CodeDetectionDemo';
import StreamingDemo from './demos/StreamingDemo';
import SSEDemo from './demos/SSEDemo';
import BrowserDemo from './demos/BrowserDemo';
import ReactHooksDemo from './demos/ReactHooksDemo';

type DemoType = 'code-detection' | 'streaming' | 'sse' | 'browser' | 'react-hooks';

function App() {
  const [activeDemo, setActiveDemo] = useState<DemoType>('code-detection');

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Outilx Playground</h1>
      <p>测试和演示所有 Outilx 包的功能</p>

      <nav style={{ marginBottom: '30px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        <button
          onClick={() => setActiveDemo('code-detection')}
          style={{
            padding: '8px 16px',
            marginRight: '10px',
            border: 'none',
            background: activeDemo === 'code-detection' ? '#333' : '#eee',
            color: activeDemo === 'code-detection' ? '#fff' : '#333',
            cursor: 'pointer',
          }}
        >
          Code Detection
        </button>
        <button
          onClick={() => setActiveDemo('streaming')}
          style={{
            padding: '8px 16px',
            marginRight: '10px',
            border: 'none',
            background: activeDemo === 'streaming' ? '#333' : '#eee',
            color: activeDemo === 'streaming' ? '#fff' : '#333',
            cursor: 'pointer',
          }}
        >
          Streaming Simulator
        </button>
        <button
          onClick={() => setActiveDemo('sse')}
          style={{
            padding: '8px 16px',
            marginRight: '10px',
            border: 'none',
            background: activeDemo === 'sse' ? '#333' : '#eee',
            color: activeDemo === 'sse' ? '#fff' : '#333',
            cursor: 'pointer',
          }}
        >
          SSE
        </button>
        <button
          onClick={() => setActiveDemo('browser')}
          style={{
            padding: '8px 16px',
            marginRight: '10px',
            border: 'none',
            background: activeDemo === 'browser' ? '#333' : '#eee',
            color: activeDemo === 'browser' ? '#fff' : '#333',
            cursor: 'pointer',
          }}
        >
          Browser Utils
        </button>
        <button
          onClick={() => setActiveDemo('react-hooks')}
          style={{
            padding: '8px 16px',
            border: 'none',
            background: activeDemo === 'react-hooks' ? '#333' : '#eee',
            color: activeDemo === 'react-hooks' ? '#fff' : '#333',
            cursor: 'pointer',
          }}
        >
          React Hooks
        </button>
      </nav>

      <div>
        {activeDemo === 'code-detection' && <CodeDetectionDemo />}
        {activeDemo === 'streaming' && <StreamingDemo />}
        {activeDemo === 'sse' && <SSEDemo />}
        {activeDemo === 'browser' && <BrowserDemo />}
        {activeDemo === 'react-hooks' && <ReactHooksDemo />}
      </div>
    </div>
  );
}

export default App;
