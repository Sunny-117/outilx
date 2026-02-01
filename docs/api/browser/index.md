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
  chunk, 
  TipCache, 
  getUrlParams,
  safeJsonParse 
} from '@outilx/browser';

// Array utilities
const chunks = chunk([1, 2, 3, 4, 5], 2);

// Caching
const cache = new TipCache({ maxSize: 100 });
cache.set('key', 'value');

// URL parsing
const params = getUrlParams(window.location.href);

// Safe JSON
const data = safeJsonParse(jsonString, {});
```
