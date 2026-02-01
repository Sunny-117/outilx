# Cache

Caching utilities with TTL support and memoization.

## TipCache

A simple cache implementation with size limits and TTL (Time To Live) support.

```typescript
class TipCache<K = any, V = any>
```

### Constructor

```typescript
new TipCache(options?: {
  maxSize?: number;
  ttl?: number;
})
```

#### Options

- `maxSize` - Maximum number of entries (default: 100)
- `ttl` - Time to live in milliseconds (optional)

### Methods

#### set

Stores a value in the cache.

```typescript
set(key: K, value: V, ttl?: number): void
```

#### get

Retrieves a value from the cache.

```typescript
get(key: K): V | undefined
```

#### has

Checks if a key exists in the cache.

```typescript
has(key: K): boolean
```

#### delete

Removes a key from the cache.

```typescript
delete(key: K): boolean
```

#### clear

Clears all entries from the cache.

```typescript
clear(): void
```

### Examples

```typescript
import { TipCache } from '@outilx/browser';

// Basic usage
const cache = new TipCache({ maxSize: 100 });
cache.set('user:1', { name: 'John' });
console.log(cache.get('user:1'));  // { name: 'John' }

// With TTL
const ttlCache = new TipCache({ ttl: 5000 }); // 5 seconds
ttlCache.set('temp', 'value');
console.log(ttlCache.get('temp'));  // 'value'
// After 5 seconds...
console.log(ttlCache.get('temp'));  // undefined

// Per-item TTL
cache.set('short-lived', 'data', 1000);  // 1 second TTL
```

## memoize

Creates a memoized version of a function that caches results.

```typescript
function memoize<T extends (...args: any[]) => any>(
  fn: T,
  options?: {
    maxSize?: number;
    ttl?: number;
  }
): T
```

### Parameters

- `fn` - The function to memoize
- `options` - Cache options (same as TipCache)

### Returns

Memoized version of the function.

### Examples

```typescript
import { memoize } from '@outilx/browser';

// Expensive computation
const fibonacci = memoize((n: number): number => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

fibonacci(40);  // Computed once
fibonacci(40);  // Returns cached result

// With TTL
const fetchUser = memoize(
  async (id: string) => {
    const response = await fetch(\`/api/users/\${id}\`);
    return response.json();
  },
  { ttl: 60000 } // Cache for 1 minute
);
```
