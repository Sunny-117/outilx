# @outilx/browser

Browser utility functions for arrays, caching, JSON, URL parsing, and more.

## Installation

```bash
npm install @outilx/browser
# or
pnpm add @outilx/browser
# or
yarn add @outilx/browser
```

## Usage

```typescript
import { toArray, createIncrementingArray, TipCache, getUrlParams, parseJsonWithFallback } from '@outilx/browser';

// Array utilities
const arr = toArray(1); // [1]
const nums = createIncrementingArray(5); // [1, 2, 3, 4, 5]

// Caching with LRU and TTL
const cache = new TipCache<string>(100); // maxSize: 100
cache.set('key', 'value', 5000); // 5 second TTL

// URL utilities (pass query string)
const params = getUrlParams('foo=bar&baz=qux');
// { foo: 'bar', baz: 'qux' }

// Safe JSON parsing
const data = parseJsonWithFallback('{"name":"John"}', {});
```

## Features

- Array utilities (toArray, shuffleArray, pipeFromArray, createIncrementingArray)
- LRU caching with TTL support
- Safe JSON operations
- URL query string parsing
- Network utilities

## License

MIT
