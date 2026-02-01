# @outilx/browser API

Browser utility functions for modern web development.

## Modules

- [Array](/api/browser/array) - Array manipulation and transformation
- [Cache](/api/browser/cache) - Caching with TTL and memoization
- [JSON](/api/browser/json) - Safe JSON operations
- [URL](/api/browser/url) - URL parameter parsing
- [Network](/api/browser/network) - Network utilities

## Installation

```bash
npm install @outilx/browser
```

## Quick Example

```typescript
import { 
  toArray,
  createIncrementingArray,
  TipCache, 
  getUrlParams,
  parseJsonWithFallback,
  isJsonString
} from '@outilx/browser';

// Array utilities
const arr = toArray(1); // [1]
const nums = createIncrementingArray(5); // [1, 2, 3, 4, 5]

// Caching with LRU
const cache = new TipCache<string>(100);
cache.set('key', 'value', 5000); // with 5s TTL

// URL parsing (pass query string, not full URL)
const params = getUrlParams(window.location.search.slice(1));

// Safe JSON operations
const data = parseJsonWithFallback(jsonString, {});
const valid = isJsonString('{"key": "value"}'); // true
```
