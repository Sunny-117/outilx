# Cache Utilities

Caching with TTL support and memoization.

## Classes

### TipCache

LRU (Least Recently Used) cache implementation with TTL support.

```typescript
class TipCache<T> {
  constructor(maxSize?: number)
  set(key: string, value: T, ttl?: number): void
  get(key: string): T | null
  has(key: string): boolean
  delete(key: string): boolean
  size(): number
}
```

**Examples:**

```typescript
const cache = new TipCache<string>(100); // maxSize: 100

// Set with TTL (milliseconds)
cache.set('key', 'value', 5000); // expires in 5 seconds

// Get value
const value = cache.get('key'); // 'value' or null if expired

// Check existence
cache.has('key'); // true/false

// Delete
cache.delete('key');

// Get size
cache.size(); // number of entries
```

### CacheEntry

Class representing a cache entry with optional expiry.

```typescript
class CacheEntry<T> {
  value: T;
  expiry: number | null;
  constructor(value: T, expiry: number | null)
}
```

## Functions

### memoize

Simple memoization function for caching function results.

```typescript
function memoize<R>(fn: (arg: any) => R): (arg: any) => R
```

**Examples:**

```typescript
const expensive = memoize((n: number) => {
  console.log('computing...');
  return n * 2;
});

expensive(5); // logs 'computing...', returns 10
expensive(5); // returns 10 (cached, no log)
expensive(10); // logs 'computing...', returns 20
```

::: info
The memoize function uses a simple object cache and only works with single arguments that can be used as object keys.
:::
