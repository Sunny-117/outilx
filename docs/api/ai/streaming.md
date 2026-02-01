# Streaming Simulation

React hook for simulating streaming data, perfect for testing and demos.

## useStreamingSimulator

Simulates streaming data by progressively revealing chunks of text at specified intervals.

```typescript
function useStreamingSimulator(
  config: StreamingSimulatorConfig
): StreamingSimulatorResult
```

### Parameters

```typescript
type StreamingSimulatorConfig = {
  chunks: string[];        // Array of text chunks to stream
  interval?: number;       // Milliseconds between chunks (default: 100)
  initialContent?: string; // Initial content before streaming (default: '')
};
```

### Returns

```typescript
type StreamingSimulatorResult = {
  content: string;           // Current accumulated content
  isStreaming: boolean;      // Whether streaming is active
  startStreaming: () => void; // Start streaming
  stopStreaming: () => void;  // Stop streaming
};
```

### Examples

#### Basic Usage

```tsx
import { useStreamingSimulator } from '@outilx/ai';

function StreamingDemo() {
  const { content, isStreaming, startStreaming } = useStreamingSimulator({
    chunks: ['Hello', ' ', 'World', '!'],
    interval: 100
  });

  return (
    <div>
      <button onClick={startStreaming} disabled={isStreaming}>
        {isStreaming ? 'Streaming...' : 'Start'}
      </button>
      <pre>{content}</pre>
    </div>
  );
}
```

#### Character-by-Character Streaming

```tsx
function TypewriterEffect() {
  const text = "Hello, this is a typewriter effect!";
  const chunks = text.split(''); // Split into characters
  
  const { content, startStreaming } = useStreamingSimulator({
    chunks,
    interval: 50 // 50ms per character
  });

  return (
    <div>
      <button onClick={startStreaming}>Start Typing</button>
      <p>{content}</p>
    </div>
  );
}
```

#### Word-by-Word Streaming

```tsx
function WordStreaming() {
  const text = "This streams word by word";
  const chunks = text.split(' ').map(word => word + ' ');
  
  const { content, startStreaming } = useStreamingSimulator({
    chunks,
    interval: 200 // 200ms per word
  });

  return <div>{content}</div>;
}
```

#### With Initial Content

```tsx
function ChatWithHistory() {
  const { content, startStreaming } = useStreamingSimulator({
    initialContent: 'Previous message\n\n',
    chunks: ['New', ' ', 'streaming', ' ', 'message'],
    interval: 100
  });

  return (
    <div>
      <button onClick={startStreaming}>Send Message</button>
      <pre>{content}</pre>
    </div>
  );
}
```

#### Manual Stop

```tsx
function ControllableStreaming() {
  const { 
    content, 
    isStreaming, 
    startStreaming, 
    stopStreaming 
  } = useStreamingSimulator({
    chunks: Array(100).fill('word '),
    interval: 100
  });

  return (
    <div>
      <button onClick={startStreaming} disabled={isStreaming}>
        Start
      </button>
      <button onClick={stopStreaming} disabled={!isStreaming}>
        Stop
      </button>
      <div>{content}</div>
    </div>
  );
}
```

### Advanced Use Cases

#### Simulating AI Response

```tsx
function AIResponseSimulator() {
  const mockAIResponse = `Here's a solution:\n\n\`\`\`javascript\nconst result = data.map(x => x * 2);\n\`\`\`\n\nThis doubles each value.`;
  
  const { content, isStreaming, startStreaming } = useStreamingSimulator({
    chunks: mockAIResponse.split(''),
    interval: 20 // Fast streaming
  });

  return (
    <div className="ai-chat">
      <button onClick={startStreaming} disabled={isStreaming}>
        Ask AI
      </button>
      <div className="response">
        {content}
        {isStreaming && <span className="cursor">▋</span>}
      </div>
    </div>
  );
}
```

#### With Code Detection

```tsx
import { useStreamingSimulator } from '@outilx/ai';
import { detectCodeBlocks } from '@outilx/ai';

function StreamingWithCodeHighlight() {
  const response = `Text\n\`\`\`js\ncode\n\`\`\`\nMore text`;
  
  const { content, startStreaming } = useStreamingSimulator({
    chunks: response.split(''),
    interval: 30
  });
  
  const blocks = detectCodeBlocks(content);

  return (
    <div>
      <button onClick={startStreaming}>Stream</button>
      {blocks.map((block, i) => (
        block.type === 'code' ? (
          <pre key={i}><code>{block.content}</code></pre>
        ) : (
          <p key={i}>{block.content}</p>
        )
      ))}
    </div>
  );
}
```

#### Multiple Streaming Sessions

```tsx
function MultipleStreamers() {
  const stream1 = useStreamingSimulator({
    chunks: ['Stream', ' ', '1'],
    interval: 100
  });
  
  const stream2 = useStreamingSimulator({
    chunks: ['Stream', ' ', '2'],
    interval: 150
  });

  return (
    <div>
      <div>
        <button onClick={stream1.startStreaming}>Start 1</button>
        <p>{stream1.content}</p>
      </div>
      <div>
        <button onClick={stream2.startStreaming}>Start 2</button>
        <p>{stream2.content}</p>
      </div>
    </div>
  );
}
```

#### Testing Component

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import { useStreamingSimulator } from '@outilx/ai';

function TestComponent() {
  const { content, startStreaming } = useStreamingSimulator({
    chunks: ['test', ' ', 'data'],
    interval: 10
  });

  useEffect(() => {
    startStreaming();
  }, []);

  return <div data-testid="output">{content}</div>;
}

test('streaming completes', async () => {
  render(<TestComponent />);
  
  await waitFor(() => {
    expect(screen.getByTestId('output')).toHaveTextContent('test data');
  }, { timeout: 1000 });
});
```

### Behavior

- **Automatic Cleanup**: Timers are automatically cleared on component unmount
- **Idempotent Start**: Calling `startStreaming()` while streaming is ignored
- **Reset on Start**: Starting a new stream resets content to `initialContent`
- **Completion**: Streaming stops automatically when all chunks are processed

### Performance Tips

1. **Interval Selection**:
   - Faster (20-50ms): Smooth but CPU-intensive
   - Medium (100-200ms): Good balance
   - Slower (300-500ms): More dramatic effect

2. **Chunk Size**:
   - Characters: Smoothest but most overhead
   - Words: Good balance
   - Sentences: Fastest but less smooth

3. **Memory**:
   - Large chunk arrays consume memory
   - Consider generating chunks on-demand for very long texts

### Common Patterns

#### Loading State

```tsx
const { isStreaming } = useStreamingSimulator(config);

return (
  <div>
    {isStreaming && <LoadingSpinner />}
    {content}
  </div>
);
```

#### Cursor Effect

```tsx
return (
  <span>
    {content}
    {isStreaming && <span className="blinking-cursor">|</span>}
  </span>
);
```

#### Progress Indicator

```tsx
const progress = (content.length / totalLength) * 100;

return (
  <div>
    <ProgressBar value={progress} />
    {content}
  </div>
);
```
