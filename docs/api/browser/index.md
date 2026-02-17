# @outilx/browser API

Browser utility functions for modern web development.

> **Note**: This package re-exports all utilities from `@outilx/core`. For runtime-agnostic code, consider using `@outilx/core` directly.

## Browser-Specific Modules

- [Network](/api/browser/network) - Network information using browser APIs
- [Storage](/api/browser/storage) - LocalStorage-based caching

## Core Modules (from @outilx/core)

The following modules are re-exported from `@outilx/core` and work in any JavaScript runtime:

- [Array](/api/core/array) - Array manipulation and transformation
- [Cache](/api/core/cache) - Caching with TTL and memoization
- [JSON](/api/core/json) - Safe JSON operations
- [URL](/api/core/url) - URL parameter parsing
- [Config](/api/core/config) - Configuration mapping
- [Async](/api/core/async) - Async processing with caching
- [Similarity](/api/core/similarity) - Text similarity calculation

## Installation

```bash
npm install @outilx/browser
```

## Quick Example

```typescript
import {
  // Core utilities (from @outilx/core)
  toArray,
  TipCache,
  getUrlParams,
  parseJsonWithFallback,
  createAsyncProcessor,
  MemoryCache,
  levenshteinSimilarity,

  // Browser-specific utilities
  getNetWorkInfo,
  LocalStorageCache
} from '@outilx/browser';

// Core utilities work the same as @outilx/core
const arr = toArray(1); // [1]
const cache = new TipCache<string>(100);
const params = getUrlParams('foo=bar');

// Browser-specific: Network info
const info = getNetWorkInfo();
// { status: 'online', type: '4g', rtt: 50, downlink: 10 }

// Browser-specific: Persistent cache
const storage = new LocalStorageCache('my_app_');
await storage.set('user', { name: 'John' });
```
