# SSE (Server-Sent Events)

React hook for connecting to Server-Sent Events endpoints and receiving real-time updates.

## useSSE

Manages SSE connections with automatic cleanup and state management.

```typescript
function useSSE(config: SSEConfig): SSEResult
```

### Parameters

```typescript
interface SSEConfig {
  url: string;                    // SSE endpoint URL
  autoConnect?: boolean;          // Connect on mount (default: false)
  onOpen?: () => void;            // Connection opened callback
  onMessage?: (data: string) => void; // Message received callback
  onError?: (error: Event) => void;   // Error callback
  options?: EventSourceInit;      // EventSource options
}
```

### Returns

```typescript
interface SSEResult {
  state: SSEState;              // Connection state
  messages: string[];           // All received messages
  connect: () => void;          // Connect to SSE
  disconnect: () => void;       // Disconnect from SSE
  clearMessages: () => void;    // Clear message history
}

type SSEState = 'disconnected' | 'connecting' | 'connected' | 'error';
```

### Examples

#### Basic Usage

```tsx
import { useSSE } from '@outilx/ai';

function SSEDemo() {
  const { messages, state, connect, disconnect } = useSSE({
    url: 'http://localhost:3000/sse'
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

#### With Callbacks

```tsx
function SSEWithCallbacks() {
  const [logs, setLogs] = useState<string[]>([]);

  const { messages, state, connect } = useSSE({
    url: 'http://localhost:3000/sse',
    onOpen: () => {
      setLogs(prev => [...prev, 'Connected!']);
    },
    onMessage: (data) => {
      setLogs(prev => [...prev, `Received: ${data}`]);
    },
    onError: (error) => {
      setLogs(prev => [...prev, 'Connection error']);
    }
  });

  return (
    <div>
      <button onClick={connect}>Connect</button>
      <h3>Messages:</h3>
      <ul>{messages.map((msg, i) => <li key={i}>{msg}</li>)}</ul>
      <h3>Logs:</h3>
      <ul>{logs.map((log, i) => <li key={i}>{log}</li>)}</ul>
    </div>
  );
}
```

#### Auto-Connect

```tsx
function AutoConnectSSE() {
  const { messages, state } = useSSE({
    url: 'http://localhost:3000/sse',
    autoConnect: true  // Connects immediately on mount
  });

  return (
    <div>
      <div>Status: {state}</div>
      <div>Messages: {messages.length}</div>
    </div>
  );
}
```

#### With Message Clearing

```tsx
function SSEWithClear() {
  const { messages, connect, disconnect, clearMessages } = useSSE({
    url: 'http://localhost:3000/sse'
  });

  return (
    <div>
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
      <button onClick={clearMessages}>Clear Messages</button>
      <div>Total messages: {messages.length}</div>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Server Setup

Create a simple SSE server:

```javascript
// server.js
import { createServer } from 'http';

const server = createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.url === '/sse') {
    // Set SSE headers
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    // Send initial message
    res.write('data: Connected\n\n');

    // Send messages every 2 seconds
    const interval = setInterval(() => {
      const data = { message: 'Hello', timestamp: Date.now() };
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    }, 2000);

    // Cleanup on disconnect
    req.on('close', () => {
      clearInterval(interval);
    });
  }
});

server.listen(3000);
```

### Use Cases

#### Real-Time Notifications

```tsx
function NotificationCenter() {
  const { messages, state, connect } = useSSE({
    url: '/api/notifications',
    autoConnect: true,
    onMessage: (data) => {
      const notification = JSON.parse(data);
      showNotification(notification);
    }
  });

  return (
    <div>
      <div>Status: {state}</div>
      <div>Notifications: {messages.length}</div>
    </div>
  );
}
```

#### Live Updates

```tsx
function LiveDashboard() {
  const [metrics, setMetrics] = useState({});

  const { state } = useSSE({
    url: '/api/metrics',
    autoConnect: true,
    onMessage: (data) => {
      const newMetrics = JSON.parse(data);
      setMetrics(newMetrics);
    }
  });

  return (
    <div>
      <div>Connection: {state}</div>
      <div>CPU: {metrics.cpu}%</div>
      <div>Memory: {metrics.memory}%</div>
    </div>
  );
}
```

#### Chat Application

```tsx
function ChatRoom() {
  const [chatMessages, setChatMessages] = useState<any[]>([]);

  const { state, connect, disconnect } = useSSE({
    url: '/api/chat/room/123',
    onMessage: (data) => {
      const message = JSON.parse(data);
      setChatMessages(prev => [...prev, message]);
    }
  });

  return (
    <div>
      <button onClick={connect}>Join Room</button>
      <button onClick={disconnect}>Leave Room</button>
      <div>Status: {state}</div>
      <div>
        {chatMessages.map((msg, i) => (
          <div key={i}>{msg.user}: {msg.text}</div>
        ))}
      </div>
    </div>
  );
}
```

### Connection States

- **disconnected**: Not connected to server
- **connecting**: Attempting to establish connection
- **connected**: Successfully connected and receiving messages
- **error**: Connection failed or encountered an error

### Behavior

- **Automatic Cleanup**: Connection is automatically closed on component unmount
- **Reconnection**: Call `connect()` again to reconnect after disconnect or error
- **Message History**: All messages are stored in the `messages` array
- **State Management**: Connection state is tracked and updated automatically

### Best Practices

1. **Error Handling**: Always provide an `onError` callback
2. **Cleanup**: Use `disconnect()` when component unmounts or user navigates away
3. **Message Parsing**: Parse JSON messages in `onMessage` callback
4. **State Checking**: Check `state` before attempting operations
5. **CORS**: Ensure server has proper CORS headers for cross-origin requests

### Browser Support

- Modern browsers with EventSource API support
- Polyfills available for older browsers
- Not supported in IE11 (use polyfill)
