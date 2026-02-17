# @outilx/core API

Core JavaScript utility functions that work in any JavaScript runtime.

## Modules

- [Array](/api/core/array) - Array manipulation and transformation
- [Cache](/api/core/cache) - Caching with TTL and memoization
- [JSON](/api/core/json) - Safe JSON operations
- [URL](/api/core/url) - URL parameter parsing
- [Config](/api/core/config) - Configuration mapping utilities
- [Async](/api/core/async) - Async processing with caching
- [Similarity](/api/core/similarity) - Text similarity calculation

## Installation

```bash
npm install @outilx/core
```

## Quick Example

```typescript
import {
  toArray,
  TipCache,
  parseJsonWithFallback,
  getUrlParams,
  promisify,
  levenshteinSimilarity
} from '@outilx/core';

// Array utilities
const arr = toArray(1); // [1]

// Caching
const cache = new TipCache<string>(100);
cache.set('key', 'value', 5000);

// JSON operations
const data = parseJsonWithFallback(jsonString, {});

// URL parsing
const params = getUrlParams('foo=bar&baz=qux');

// Promisify
const asyncFn = promisify(callbackFn);

// Similarity
const score = levenshteinSimilarity('hello', 'hallo');
```

## Runtime Support

Works in Node.js, Deno, Bun, and browsers.
