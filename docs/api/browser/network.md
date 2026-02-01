# Network Utilities

Network and HTTP utilities for browser environments.

## fetchWithTimeout

Fetch with timeout support.

```typescript
function fetchWithTimeout(
  url: string,
  options?: RequestInit & { timeout?: number }
): Promise<Response>
```

### Parameters

- `url` - The URL to fetch
- `options` - Fetch options with optional timeout in milliseconds

### Returns

Promise resolving to Response.

### Examples

```typescript
import { fetchWithTimeout } from '@outilx/browser';

// Basic usage
const response = await fetchWithTimeout('https://api.example.com/data');
const data = await response.json();

// With timeout (5 seconds)
try {
  const response = await fetchWithTimeout(
    'https://api.example.com/slow',
    { timeout: 5000 }
  );
} catch (error) {
  console.error('Request timed out');
}

// With other fetch options
const response = await fetchWithTimeout(
  'https://api.example.com/users',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'John' }),
    timeout: 10000
  }
);
```
