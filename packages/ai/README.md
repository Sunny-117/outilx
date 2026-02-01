# @outilx/ai

AI utilities for code detection, streaming simulation, and more.

## Installation

```bash
npm install @outilx/ai
# or
pnpm add @outilx/ai
# or
yarn add @outilx/ai
```

## Features

### Code Detection

Automatically detect and parse code blocks from markdown-formatted text with language identification.

```typescript
import { detectCodeBlocks } from '@outilx/ai';

const text = `
Here is some JavaScript:
\`\`\`javascript
const greeting = 'Hello World';
console.log(greeting);
\`\`\`

And some Python:
\`\`\`python
def greet():
    print("Hello World")
\`\`\`
`;

const blocks = detectCodeBlocks(text);
// [
//   { type: 'text', content: '\nHere is some JavaScript:\n' },
//   { type: 'code', language: 'javascript', content: 'const greeting = ...' },
//   { type: 'text', content: '\n\nAnd some Python:\n' },
//   { type: 'code', language: 'python', content: 'def greet():...' }
// ]
```

### Streaming Simulation

Simulate streaming data (like AI responses) for testing and demos.

```tsx
import { useStreamingSimulator } from '@outilx/ai';

function StreamingDemo() {
  const { content, isStreaming, startStreaming } = useStreamingSimulator({
    chunks: ['Hello', ' ', 'World', '!', '\n', 'This', ' ', 'is', ' ', 'streaming'],
    interval: 100, // 100ms between chunks
    initialContent: ''
  });

  return (
    <div>
      <button onClick={startStreaming} disabled={isStreaming}>
        {isStreaming ? 'Streaming...' : 'Start Streaming'}
      </button>
      <pre>{content}</pre>
    </div>
  );
}
```

### SSE (Server-Sent Events)

Connect to SSE endpoints for real-time server updates.

```tsx
import { useSSE } from '@outilx/ai';

function SSEDemo() {
  const { messages, state, connect, disconnect } = useSSE({
    url: 'http://localhost:3000/sse',
    onMessage: (data) => console.log('Received:', data)
  });

  return (
    <div>
      <button onClick={connect} disabled={state === 'connected'}>
        Connect
      </button>
      <button onClick={disconnect} disabled={state === 'disconnected'}>
        Disconnect
      </button>
      <div>Status: {state}</div>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
```

## API

### detectCodeBlocks(text: string): CodeBlock[]

Detects code blocks in markdown-formatted text.

**Parameters:**
- `text` - Input text to parse

**Returns:**
- Array of `CodeBlock` objects

**CodeBlock Type:**
```typescript
type CodeBlock = {
  type: 'code' | 'text';
  language?: string;  // Only for code blocks
  content: string;
};
```

### useStreamingSimulator(config: StreamingSimulatorConfig)

React hook for simulating streaming data.

**Parameters:**
- `config.chunks` - Array of text chunks to stream
- `config.interval` - Milliseconds between chunks (default: 100)
- `config.initialContent` - Initial content before streaming (default: '')

**Returns:**
```typescript
{
  content: string;           // Current accumulated content
  isStreaming: boolean;      // Whether streaming is active
  startStreaming: () => void; // Start streaming
  stopStreaming: () => void;  // Stop streaming
}
```

### useSSE(config: SSEConfig)

React hook for Server-Sent Events connections.

**Parameters:**
- `config.url` - SSE endpoint URL
- `config.autoConnect` - Connect immediately on mount (default: false)
- `config.onOpen` - Callback when connection opens
- `config.onMessage` - Callback when message is received
- `config.onError` - Callback when error occurs
- `config.options` - EventSource options

**Returns:**
```typescript
{
  state: SSEState;              // Connection state
  messages: string[];           // Received messages
  connect: () => void;          // Connect to SSE
  disconnect: () => void;       // Disconnect from SSE
  clearMessages: () => void;    // Clear message history
}
```

## Use Cases

### AI Chat Interfaces

Perfect for building AI chat interfaces with code highlighting:

```tsx
import { detectCodeBlocks, useStreamingSimulator } from '@outilx/ai';

function AIChatMessage({ response }) {
  const blocks = detectCodeBlocks(response);
  
  return (
    <div>
      {blocks.map((block, i) => (
        block.type === 'code' ? (
          <CodeHighlight key={i} language={block.language}>
            {block.content}
          </CodeHighlight>
        ) : (
          <p key={i}>{block.content}</p>
        )
      ))}
    </div>
  );
}
```

### Testing Streaming UIs

Test your streaming UI without a real backend:

```tsx
function TestStreamingUI() {
  const mockResponse = `Here's a solution:\n\`\`\`javascript\nconst result = 42;\n\`\`\``;
  const chunks = mockResponse.split('');
  
  const { content, startStreaming } = useStreamingSimulator({
    chunks,
    interval: 50
  });
  
  return (
    <div>
      <button onClick={startStreaming}>Test Streaming</button>
      <div>{content}</div>
    </div>
  );
}
```

## License

MIT
