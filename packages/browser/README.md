# @outilx/browser

Browser utility functions for modern web development. This package re-exports all utilities from `@outilx/core` plus browser-specific features.

> **Note**: Most utility functions are now available in `@outilx/core` which works in any JavaScript runtime (Node.js, Deno, Bun, browsers). Use `@outilx/browser` when you need browser-specific features like `LocalStorageCache` or `getNetWorkInfo`.

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
import {
  // Core utilities (re-exported from @outilx/core)
  toArray,
  createIncrementingArray,
  TipCache,
  getUrlParams,
  parseJsonWithFallback,
  createAsyncProcessor,
  MemoryCache,
  promisify,
  levenshteinSimilarity,
  tfidfSimilarity,
  compareSimilarity,

  // Browser-specific utilities
  getNetWorkInfo,
  LocalStorageCache
} from '@outilx/browser';

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

// Browser-specific: Network info
const networkInfo = getNetWorkInfo();
// { status: 'online', type: '4g', rtt: 50, downlink: 10 }

// Browser-specific: LocalStorage cache
const persistentCache = new LocalStorageCache('my_prefix_');
await persistentCache.set('key', { data: 'value' });
const stored = await persistentCache.get('key');

// Async processing with caching
function asyncAdd(a: number, b: number, cb: (err: null, result: number) => void) {
  setTimeout(() => cb(null, a + b), 1000);
}

const optimizedSum = createAsyncProcessor(asyncAdd, {
  mode: 'parallel',
  cache: new MemoryCache(),
  keyGenerator: (a, b) => `add_${a}_${b}`
});

// Promisify callback-style functions
const promisifiedAdd = promisify(asyncAdd);
const result = await promisifiedAdd(1, 2); // 3

// Text similarity - Levenshtein (edit distance based)
const score = levenshteinSimilarity('hello', 'hallo'); // 0.8

// Text similarity - TF-IDF (semantic similarity)
const target = '我要买一个蓝色的包包';
const candidates = ['蓝色手提袋', '红色外套', '黑色包包'];
const results = tfidfSimilarity(target, candidates);
// => [{ text: '蓝色手提袋', score: 0.85 }, ...]

// Compare both similarity methods
const comparison = compareSimilarity(target, candidates);
// => [{ text: '...', levenshteinScore: 0.6, tfidfScore: 0.8 }, ...]
```

## Features

### From @outilx/core (works anywhere)
- Array utilities (toArray, shuffleArray, pipeFromArray, createIncrementingArray)
- LRU caching with TTL support (TipCache)
- Safe JSON operations
- URL query string parsing
- Async processing with caching and execution strategies
- Promisify callback-style functions
- Text similarity calculation (Levenshtein, TF-IDF, cosine similarity)
- Memoization

### Browser-specific
- Network utilities (`getNetWorkInfo`) - uses `navigator.connection`
- LocalStorage cache (`LocalStorageCache`) - persistent cache using localStorage

## Text Similarity

### Levenshtein Similarity

基于编辑距离的字面相似度计算，适用于拼写检查、模糊匹配等场景。

```typescript
import { levenshteinSimilarity } from '@outilx/browser';

levenshteinSimilarity('hello', 'hallo');  // => 0.8
levenshteinSimilarity('abc', 'abc');      // => 1
levenshteinSimilarity('空调回收', '空调上门回收');  // => 0.67
```

### TF-IDF Similarity

基于 TF-IDF 的语义相似度计算，适用于文本检索、相关性排序等场景。支持中英文自动分词。

```typescript
import { tfidfSimilarity } from '@outilx/browser';

const target = '空调回收附近上门高价回收';
const candidates = [
  '旧空调上门回收电话',
  '24小时上门回收空调',
  '闲鱼二手市场'
];

const results = tfidfSimilarity(target, candidates);
// 返回按相似度降序排列的结果
// [{ text: '24小时上门回收空调', score: 0.72 }, ...]
```

### Compare Similarity

同时计算 Levenshtein 和 TF-IDF 两种相似度，便于对比分析。

```typescript
import { compareSimilarity } from '@outilx/browser';

const results = compareSimilarity(target, candidates);
// [{ text: '...', levenshteinScore: 0.6, tfidfScore: 0.8 }, ...]
```

### Low-level APIs

```typescript
import { tokenize, cosineSimilarity, computeTfidf } from '@outilx/browser';

// 分词 (自动识别中英文)
tokenize('hello world');  // => ['hello', 'world']
tokenize('你好世界');     // => ['你', '好', '世', '界']

// 余弦相似度
cosineSimilarity([1, 0, 1], [1, 0, 1]);  // => 1
cosineSimilarity([1, 0, 0], [0, 1, 0]);  // => 0

// 计算 TF-IDF 向量
const { tfidfVectors, termIndex } = computeTfidf(['doc1', 'doc2']);
```

## License

MIT
