# @outilx/core

Core JavaScript utility functions that work in any JavaScript runtime - Node.js, Deno, Bun, and browsers.

## Installation

```bash
npm install @outilx/core
```

## Why @outilx/core?

Previously, common JavaScript utilities like array manipulation, caching, and JSON operations were part of `@outilx/browser`. However, these functions don't depend on browser APIs and work perfectly in Node.js, Deno, Bun, or any JavaScript runtime.

`@outilx/core` extracts these runtime-agnostic utilities into a separate package, allowing you to:

- Use the same utilities across Node.js scripts and browser apps
- Avoid installing browser-specific code in server environments
- Share code between different JavaScript runtimes

## Features

### Array Utilities

```typescript
import { toArray, createIncrementingArray, shuffleArray, pipeFromArray } from '@outilx/core';

// Convert values to arrays
toArray(1);           // [1]
toArray([1, 2]);      // [1, 2]
toArray(null, 'def'); // ['def']

// Create incrementing arrays
createIncrementingArray(5);  // [1, 2, 3, 4, 5]

// Shuffle arrays (Fisher-Yates)
shuffleArray([1, 2, 3, 4, 5]);

// Compose functions
const addOne = x => x + 1;
const double = x => x * 2;
pipeFromArray([addOne, double])(3);  // 8
```

### Smart Caching

```typescript
import { TipCache, memoize } from '@outilx/core';

// LRU Cache with TTL
const cache = new TipCache<string>(100);
cache.set('key', 'value', 5000); // 5 second TTL
cache.get('key');

// Memoization
const expensive = memoize((n: number) => computeSomething(n));
```

### JSON Utilities

```typescript
import { isJsonString, parseJsonWithFallback, stringifyJsonWithFallback } from '@outilx/core';

isJsonString('{"valid": true}');             // true
parseJsonWithFallback('invalid', {});        // {}
stringifyJsonWithFallback(obj, 'fallback');  // stable JSON string
```

### URL Utilities

```typescript
import { getUrlParams } from '@outilx/core';

getUrlParams('foo=bar&baz=qux');  // { foo: 'bar', baz: 'qux' }
getUrlParams('foo=1&foo=2');      // { foo: ['1', '2'] }
```

### Async Processing

```typescript
import { promisify, createAsyncProcessor, MemoryCache } from '@outilx/core';

// Promisify callback functions
const readFile = promisify(fs.readFile);
const content = await readFile('file.txt');

// Async processor with caching
const processor = createAsyncProcessor(asyncFunc, {
  mode: 'parallel',
  cache: new MemoryCache()
});
```

### Text Similarity

```typescript
import { levenshteinSimilarity, tfidfSimilarity, compareSimilarity } from '@outilx/core';

// Edit distance based
levenshteinSimilarity('hello', 'hallo');  // 0.8

// TF-IDF semantic similarity
tfidfSimilarity('搜索词', ['候选1', '候选2']);

// Compare both methods
compareSimilarity('target', candidates);
```

## Runtime Support

- Node.js 18+
- Deno
- Bun
- Modern browsers (ES2016+)

## Relationship with @outilx/browser

`@outilx/browser` re-exports everything from `@outilx/core` plus browser-specific utilities:

- `LocalStorageCache` - Cache using localStorage
- `getNetWorkInfo` - Network information via `navigator.connection`

If you're building a browser app, you can use either package. Use `@outilx/core` for server-side code or when you don't need browser-specific features.

## API Reference

- [Array](/api/core/array) - Array manipulation
- [Cache](/api/core/cache) - Caching and memoization
- [JSON](/api/core/json) - Safe JSON operations
- [URL](/api/core/url) - URL parameter parsing
- [Config](/api/core/config) - Configuration mapping
- [Async](/api/core/async) - Async processing
- [Similarity](/api/core/similarity) - Text similarity
