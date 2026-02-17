# @outilx/core

Core JavaScript utility functions that work in any JavaScript runtime - Node.js, Deno, Bun, and browsers.

## Installation

```bash
npm install @outilx/core
# or
pnpm add @outilx/core
# or
yarn add @outilx/core
```

## Usage

```typescript
import {
  // Array utilities
  toArray,
  createIncrementingArray,
  shuffleArray,
  pipeFromArray,

  // Caching
  TipCache,
  CacheEntry,
  memoize,

  // JSON utilities
  isJsonString,
  parseJsonWithFallback,
  stringifyJsonWithFallback,

  // URL utilities
  getUrlParams,

  // Config utilities
  getConfigFromDataSource,

  // Async utilities
  promisify,
  createAsyncProcessor,
  MemoryCache,

  // Text similarity
  levenshteinSimilarity,
  tfidfSimilarity,
  compareSimilarity,
  tokenize,
  cosineSimilarity,
  computeTfidf
} from '@outilx/core';
```

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
shuffleArray([1, 2, 3, 4, 5]);  // random order

// Compose functions
const addOne = x => x + 1;
const double = x => x * 2;
const composed = pipeFromArray([addOne, double]);
composed(3);  // 8 ((3 + 1) * 2)
```

### Smart Caching

```typescript
import { TipCache, memoize } from '@outilx/core';

// LRU Cache with TTL support
const cache = new TipCache<string>(100); // maxSize: 100
cache.set('key', 'value', 5000);         // 5 second TTL
const value = cache.get('key');
cache.has('key');  // true
cache.delete('key');

// Simple memoization
const expensive = memoize((n: number) => {
  // expensive computation
  return result;
});
```

### JSON Utilities

```typescript
import { isJsonString, parseJsonWithFallback, stringifyJsonWithFallback } from '@outilx/core';

// Check if string is valid JSON
isJsonString('{"valid": true}');   // true
isJsonString('{invalid}');         // false

// Safe parsing with fallback
parseJsonWithFallback('{"name":"John"}', {});  // { name: 'John' }
parseJsonWithFallback('invalid', {});          // {}

// Safe stringify with fallback
stringifyJsonWithFallback({ name: 'John' }, '{}');  // '{"name":"John"}'
```

### URL Utilities

```typescript
import { getUrlParams } from '@outilx/core';

// Parse query string to object
getUrlParams('foo=bar&baz=qux');
// { foo: 'bar', baz: 'qux' }

// Handles duplicate keys
getUrlParams('foo=bar&foo=baz');
// { foo: ['bar', 'baz'] }
```

### Configuration Utilities

```typescript
import { getConfigFromDataSource } from '@outilx/core';

const data = [
  [1, 'A', 'Label A'],
  [2, 'B', 'Label B']
] as const;

const config = getConfigFromDataSource(data);
// {
//   valueMapByKey: { A: 1, B: 2 },
//   keyMapByValue: { 1: 'A', 2: 'B' },
//   nameMapByValue: { 1: 'Label A', 2: 'Label B' },
//   nameMapByKey: { A: 'Label A', B: 'Label B' },
//   dataSource: [{ value: 1, key: 'A', label: 'Label A' }, ...]
// }
```

### Async Processing

```typescript
import { promisify, createAsyncProcessor, MemoryCache } from '@outilx/core';

// Promisify callback-style functions
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

// First call - executes function
const sum1 = await optimizedSum(1, 2, 3, 4); // 10

// Second call - returns cached result
const sum2 = await optimizedSum(1, 2, 3, 4); // 10 (instant)
```

### Text Similarity

#### Levenshtein Similarity

基于编辑距离的字面相似度计算，适用于拼写检查、模糊匹配等场景。

```typescript
import { levenshteinSimilarity } from '@outilx/core';

levenshteinSimilarity('hello', 'hallo');  // 0.8
levenshteinSimilarity('abc', 'abc');      // 1
levenshteinSimilarity('空调回收', '空调上门回收');  // 0.67
```

#### TF-IDF Similarity

基于 TF-IDF 的语义相似度计算，适用于文本检索、相关性排序等场景。支持中英文自动分词。

```typescript
import { tfidfSimilarity } from '@outilx/core';

const target = '空调回收附近上门高价回收';
const candidates = [
  '旧空调上门回收电话',
  '24小时上门回收空调',
  '闲鱼二手市场'
];

const results = tfidfSimilarity(target, candidates);
// Returns sorted by similarity: [{ text: '...', score: 0.72 }, ...]
```

#### Compare Similarity

同时计算两种相似度：

```typescript
import { compareSimilarity } from '@outilx/core';

const results = compareSimilarity(target, candidates);
// [{ text: '...', levenshteinScore: 0.6, tfidfScore: 0.8 }, ...]
```

#### Low-level APIs

```typescript
import { tokenize, cosineSimilarity, computeTfidf } from '@outilx/core';

// Tokenize (auto-detects Chinese/English)
tokenize('hello world');  // ['hello', 'world']
tokenize('你好世界');     // ['你', '好', '世', '界']

// Cosine similarity
cosineSimilarity([1, 0, 1], [1, 0, 1]);  // 1
cosineSimilarity([1, 0, 0], [0, 1, 0]);  // 0

// Compute TF-IDF vectors
const { tfidfVectors, termIndex } = computeTfidf(['doc1', 'doc2']);
```

## Runtime Support

- Node.js 18+
- Deno
- Bun
- Modern browsers (ES2016+)

## Related Packages

- **@outilx/browser** - Includes all of @outilx/core plus browser-specific utilities (`LocalStorageCache`, `getNetWorkInfo`)

## License

MIT
