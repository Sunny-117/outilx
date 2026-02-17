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
import { toArray, shuffleArray, pipeFromArray, createIncrementingArray } from '@outilx/browser';

// Convert values to arrays
toArray(1);  // [1]
toArray([1, 2]);  // [1, 2]

// Create incrementing arrays
createIncrementingArray(5);  // [1, 2, 3, 4, 5]

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

// Simple cache with LRU
const cache = new TipCache(100); // maxSize: 100
cache.set('key', 'value', 5000); // ttl: 5000ms
const value = cache.get('key');

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

const params = getUrlParams('foo=bar&baz=qux');
// { foo: 'bar', baz: 'qux' }
```

### JSON Utilities

Safe JSON operations:

```typescript
import { parseJsonWithFallback, stringifyJsonWithFallback, isJsonString } from '@outilx/browser';

// Safe parsing
const data = parseJsonWithFallback('{"name":"John"}', {});

// Safe stringify
const str = stringifyJsonWithFallback({ name: 'John' }, '{}');

// Check if valid JSON
isJsonString('{"valid": true}');  // true
```

### Network Utilities

Get network information:

```typescript
import { getNetWorkInfo } from '@outilx/browser';

const info = getNetWorkInfo();
// { status: 'online', type: '4g', rtt: 50, downlink: 10 }
```

### Configuration Utilities

Map configuration data:

```typescript
import { getConfigFromDataSource } from '@outilx/browser';

const data = [
  [1, 'A', 'Label A'],
  [2, 'B', 'Label B']
] as const;

const config = getConfigFromDataSource(data);
// {
//   valueMapByKey: { A: 1, B: 2 },
//   keyMapByValue: { 1: 'A', 2: 'B' },
//   nameMapByValue: { 1: 'Label A', 2: 'Label B' },
//   nameMapByKey: { A: 'Label A', B: 'Label B' }
// }
```

### Async Processing

Convert callback-style async functions to Promises with caching and execution strategies:

```typescript
import { createAsyncProcessor, MemoryCache, LocalStorageCache, promisify } from '@outilx/browser';

// Simple promisify
function asyncAdd(a: number, b: number, cb: (err: null, result: number) => void) {
  setTimeout(() => cb(null, a + b), 1000);
}

const promisifiedAdd = promisify(asyncAdd);
const result = await promisifiedAdd(1, 2); // 3

// Advanced processor with caching
const optimizedSum = createAsyncProcessor(asyncAdd, {
  mode: 'parallel', // or 'serial'
  cache: new MemoryCache(),
  keyGenerator: (a, b) => `add_${a}_${b}`
});

// First call - takes 1 second
const sum1 = await optimizedSum(1, 2, 3, 4); // 10

// Second call - instant (cached)
const sum2 = await optimizedSum(1, 2, 3, 4); // 10

// Use LocalStorage cache
const persistentProcessor = createAsyncProcessor(asyncAdd, {
  cache: new LocalStorageCache('my_cache_')
});
```

### Text Similarity

Calculate text similarity using Levenshtein (edit distance) or TF-IDF (semantic):

```typescript
import { levenshteinSimilarity, tfidfSimilarity, compareSimilarity } from '@outilx/browser';

// Levenshtein - literal similarity (edit distance)
levenshteinSimilarity('hello', 'hallo');  // 0.8
levenshteinSimilarity('abc', 'abc');      // 1

// TF-IDF - semantic similarity (supports Chinese)
const target = '空调回收附近上门高价回收';
const candidates = [
  '旧空调上门回收电话',
  '24小时上门回收空调',
  '闲鱼二手市场'
];

const results = tfidfSimilarity(target, candidates);
// Returns sorted by similarity: [{ text: '...', score: 0.72 }, ...]

// Compare both algorithms
const comparison = compareSimilarity(target, candidates);
// [{ text: '...', levenshteinScore: 0.6, tfidfScore: 0.8 }, ...]
```

## API Reference

Browse the complete API documentation:

- [Array](/api/browser/array)
- [Cache](/api/browser/cache)
- [JSON](/api/browser/json)
- [URL](/api/browser/url)
- [Network](/api/browser/network)
- [Async](/api/browser/async)
- [Similarity](/api/browser/similarity)
