# @outilx/browser

Browser utility functions for modern web development.

> **Note**: This package re-exports all utilities from `@outilx/core` plus browser-specific features. If you don't need browser-specific features like `LocalStorageCache` or `getNetWorkInfo`, consider using `@outilx/core` directly.

## Installation

```bash
npm install @outilx/browser
```

## Features

### Core Features (from @outilx/core)

All utilities from `@outilx/core` are available:

#### Array Utilities

```typescript
import { toArray, shuffleArray, pipeFromArray, createIncrementingArray } from '@outilx/browser';

toArray(1);  // [1]
toArray([1, 2]);  // [1, 2]
createIncrementingArray(5);  // [1, 2, 3, 4, 5]
shuffleArray([1, 2, 3, 4, 5]);

const addOne = x => x + 1;
const double = x => x * 2;
pipeFromArray([addOne, double])(3);  // 8
```

#### Smart Caching

```typescript
import { TipCache, memoize } from '@outilx/browser';

const cache = new TipCache(100);
cache.set('key', 'value', 5000); // ttl: 5000ms
const value = cache.get('key');

const expensive = memoize((n: number) => n * 2);
```

#### URL Utilities

```typescript
import { getUrlParams } from '@outilx/browser';

const params = getUrlParams('foo=bar&baz=qux');
// { foo: 'bar', baz: 'qux' }
```

#### JSON Utilities

```typescript
import { parseJsonWithFallback, stringifyJsonWithFallback, isJsonString } from '@outilx/browser';

const data = parseJsonWithFallback('{"name":"John"}', {});
const str = stringifyJsonWithFallback({ name: 'John' }, '{}');
isJsonString('{"valid": true}');  // true
```

#### Configuration Utilities

```typescript
import { getConfigFromDataSource } from '@outilx/browser';

const data = [
  [1, 'A', 'Label A'],
  [2, 'B', 'Label B']
] as const;

const config = getConfigFromDataSource(data);
```

#### Async Processing

```typescript
import { createAsyncProcessor, MemoryCache, promisify } from '@outilx/browser';

const promisifiedAdd = promisify(asyncAdd);
const result = await promisifiedAdd(1, 2);

const optimizedSum = createAsyncProcessor(asyncAdd, {
  mode: 'parallel',
  cache: new MemoryCache()
});
```

#### Text Similarity

```typescript
import { levenshteinSimilarity, tfidfSimilarity, compareSimilarity } from '@outilx/browser';

levenshteinSimilarity('hello', 'hallo');  // 0.8

const results = tfidfSimilarity('搜索词', ['候选1', '候选2']);

const comparison = compareSimilarity('target', candidates);
```

### Browser-Specific Features

#### Network Utilities

Get network information using browser APIs:

```typescript
import { getNetWorkInfo } from '@outilx/browser';

const info = getNetWorkInfo();
// { status: 'online', type: '4g', rtt: 50, downlink: 10 }
```

::: warning
This uses `navigator.connection` which is not available in all browsers.
:::

#### LocalStorage Cache

Persistent cache using localStorage:

```typescript
import { LocalStorageCache } from '@outilx/browser';

const cache = new LocalStorageCache('my_prefix_');

await cache.set('key', { data: 'value' });
const data = await cache.get('key');
cache.has('key');
cache.delete('key');
cache.clear();
```

## API Reference

### Core APIs (from @outilx/core)

- [Array](/api/core/array)
- [Cache](/api/core/cache)
- [JSON](/api/core/json)
- [URL](/api/core/url)
- [Config](/api/core/config)
- [Async](/api/core/async)
- [Similarity](/api/core/similarity)

### Browser-Specific APIs

- [Network](/api/browser/network)
- [Storage](/api/browser/storage)
