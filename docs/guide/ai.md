# @outilx/ai

AI utilities for code detection, streaming simulation, and more.

## Installation

```bash
npm install @outilx/ai
```

## Features

### Code Detection

Automatically detect and parse code blocks from markdown-formatted text with language identification using highlight.js.

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
// Returns array of CodeBlock objects
```

**Use Cases:**
- Parse AI responses containing code
- Build code documentation systems
- Create interactive coding tutorials
- Implement code highlighting in chat interfaces

### Streaming Simulation

Simulate streaming data (like AI responses) for testing and demos. Perfect for developing streaming UIs without a real backend.

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

**Use Cases:**
- Test streaming UI components
- Demo AI chat interfaces
- Prototype real-time features
- Educational examples

### SSE (Server-Sent Events)

Connect to SSE endpoints for real-time server updates. Perfect for live notifications, dashboards, and chat applications.

```tsx
import { useSSE } from '@outilx/ai';

function LiveNotifications() {
  const { messages, state, connect, disconnect } = useSSE({
    url: 'http://localhost:3000/sse',
    onMessage: (data) => {
      console.log('New notification:', data);
    }
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

**Use Cases:**
- Real-time notifications
- Live dashboards
- Chat applications
- Server monitoring
- Event streams

## Real-World Examples

### AI Chat Interface

Combine code detection with streaming for a complete AI chat experience:

```tsx
import { detectCodeBlocks, useStreamingSimulator } from '@outilx/ai';
import { useState } from 'react';

function AIChatInterface() {
  const [messages, setMessages] = useState([]);
  
  // Simulate AI response
  const mockResponse = `Here's how to use React hooks:\n\n\`\`\`javascript\nimport { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}\n\`\`\`\n\nThis creates a simple counter component.`;
  
  const { content, isStreaming, startStreaming } = useStreamingSimulator({
    chunks: mockResponse.split(''),
    interval: 20
  });
  
  // Parse content into blocks
  const blocks = detectCodeBlocks(content);
  
  return (
    <div>
      <button onClick={startStreaming} disabled={isStreaming}>
        Ask AI
      </button>
      
      <div className="chat-message">
        {blocks.map((block, i) => (
          block.type === 'code' ? (
            <pre key={i}>
              <code className={`language-${block.language}`}>
                {block.content}
              </code>
            </pre>
          ) : (
            <p key={i}>{block.content}</p>
          )
        ))}
      </div>
    </div>
  );
}
```

### Documentation System

Build a documentation system with code highlighting:

```tsx
import { detectCodeBlocks } from '@outilx/ai';

function DocumentationPage({ content }) {
  const blocks = detectCodeBlocks(content);
  
  return (
    <article>
      {blocks.map((block, index) => {
        if (block.type === 'code') {
          return (
            <CodeBlock 
              key={index}
              language={block.language}
              code={block.content}
            />
          );
        }
        return <Markdown key={index}>{block.content}</Markdown>;
      })}
    </article>
  );
}
```

### Testing Streaming Components

Test your streaming UI without a backend:

```tsx
import { useStreamingSimulator } from '@outilx/ai';
import { render, screen, fireEvent } from '@testing-library/react';

function TestStreamingComponent() {
  const testData = 'Hello World'.split('');
  
  const { content, startStreaming } = useStreamingSimulator({
    chunks: testData,
    interval: 10
  });
  
  return (
    <div>
      <button onClick={startStreaming}>Start</button>
      <div data-testid="output">{content}</div>
    </div>
  );
}

test('streaming works correctly', async () => {
  render(<TestStreamingComponent />);
  fireEvent.click(screen.getByText('Start'));
  
  // Wait for streaming to complete
  await waitFor(() => {
    expect(screen.getByTestId('output')).toHaveTextContent('Hello World');
  });
});
```

## API Reference

Browse the complete API documentation:

- [Code Detection](/api/ai/code-detection)
- [Streaming Simulation](/api/ai/streaming)
- [SSE](/api/ai/sse)

## Integration with Other Packages

### With @outilx/react-hooks

Combine with state management hooks:

```tsx
import { useStreamingSimulator } from '@outilx/ai';
import { useArray } from '@outilx/react-hooks';

function ChatHistory() {
  const [messages, { push }] = useArray([]);
  
  const { content, isStreaming, startStreaming } = useStreamingSimulator({
    chunks: ['New', ' ', 'message'],
    interval: 50
  });
  
  const handleComplete = () => {
    if (!isStreaming && content) {
      push({ id: Date.now(), text: content });
    }
  };
  
  // ... rest of component
}
```

## Performance Tips

1. **Adjust interval**: Lower intervals (faster streaming) use more CPU
2. **Chunk size**: Larger chunks reduce overhead but feel less smooth
3. **Memoization**: Use `useMemo` for expensive code detection operations
4. **Cleanup**: The hook automatically cleans up timers on unmount

## Browser Support

- Modern browsers (ES2015+)
- React 18.0.0 or higher (for hooks)
- Node.js 16+ (for server-side rendering)
