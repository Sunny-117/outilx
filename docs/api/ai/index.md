# @outilx/ai API

AI utilities for code detection and streaming simulation.

## Modules

- [Code Detection](/api/ai/code-detection) - Detect and parse code blocks from text
- [Streaming Simulation](/api/ai/streaming) - Simulate streaming data for testing
- [SSE](/api/ai/sse) - Server-Sent Events for real-time updates

## Installation

```bash
npm install @outilx/ai
```

## Quick Example

```typescript
import { 
  detectCodeBlocks,
  useStreamingSimulator,
  useSSE
} from '@outilx/ai';

// Detect code blocks
const blocks = detectCodeBlocks(markdownText);

// Simulate streaming (React)
function Component() {
  const { content, startStreaming } = useStreamingSimulator({
    chunks: ['Hello', ' ', 'World'],
    interval: 100
  });
  
  return <div>{content}</div>;
}

// SSE connection (React)
function SSEComponent() {
  const { messages, connect } = useSSE({
    url: 'http://localhost:3000/sse'
  });
  
  return <div>{messages.length} messages</div>;
}
```
