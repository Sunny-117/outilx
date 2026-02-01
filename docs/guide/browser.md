# @outilx/browser

Browser utility functions for modern web development.

## Installation

```bash
npm install @outilx/browser
```

## Features

### Array Utilities

Powerful array manipulation functions:

```typescript
import { toArray, shuffleArray, pipeFromArray } from '@outilx/browser';

// Convert values to arrays
toArray(1);  // [1]
toArray([1, 2]);  // [1, 2]

// Shuffle arrays
shuffleArray([1, 2, 3, 4, 5]);

// Compose functions
const addOne = x => x + 1;
const double = x => x * 2;
const composed = pipeFromArray([addOne, double]);
composed(3);  // 8
```

### Smart Caching

Built-in caching with TTL support:

```typescript
import { TipCache, memoize } from '@outilx/browser';

// Simple cache
const cache = new TipCache({ maxSize: 100, ttl: 5000 });
cache.set('key', 'value');

// Memoization
const expensive = memoize((n: number) => {
  // expensive computation
  return result;
});
```

### URL Utilities

Easy URL parameter parsing:

```typescript
import { getUrlParams } from '@outilx/browser';

const params = getUrlParams('https://example.com?foo=bar&baz=qux');
// { foo: 'bar', baz: 'qux' }
```

### JSON Utilities

Safe JSON operations:

```typescript
import { safeJsonParse, stableStringify } from '@outilx/browser';

// Safe parsing
const data = safeJsonParse('{"name":"John"}', {});

// Deterministic stringify
stableStringify({ b: 2, a: 1 });  // '{"a":1,"b":2}'
```

### Network Utilities

Simplified network operations:

```typescript
import { fetchWithTimeout, retry } from '@outilx/browser';

// Fetch with timeout
const response = await fetchWithTimeout(url, { timeout: 5000 });

// Retry failed requests
const data = await retry(() => fetch(url), { retries: 3 });
```

## API Reference

Browse the complete API documentation:

- [Array](/api/browser/array)
- [Cache](/api/browser/cache)
- [JSON](/api/browser/json)
- [URL](/api/browser/url)
- [Network](/api/browser/network)
