# Cache

Caching utilities with LRU cache and simple memoization.

## TipCache

An LRU (Least Recently Used) cache implementation with optional TTL (Time To Live) support.

```typescript
class TipCache<T>
```

### Constructor

```typescript
new TipCache<T>(maxSize?: number)
```

#### Parameters

- `maxSize` - Maximum number of entries (default: 5)

### Methods

#### set

Stores a value in the cache with optional TTL.

```typescript
set(key: string, value: T, ttl?: number): void
```

- `key` - The cache key (must be a string)
- `value` - The value to cache
- `ttl` - Time to live in milliseconds (default: 0, meaning no expiry)

#### get

Retrieves a value from the cache. Returns `null` if not found or expired.

```typescript
get(key: string): T | null
```

#### has

Checks if a key exists in the cache and is not expired.

```typescript
has(key: string): boolean
```

#### delete

Removes a key from the cache.

```typescript
delete(key: string): boolean
```

#### size

Returns the current number of entries in the cache.

```typescript
size(): number
```

### Examples

```typescript
import { TipCache } from '@outilx/browser';

// Basic usage
const cache = new TipCache<{ name: string }>(100);
cache.set('user:1', { name: 'John' });
console.log(cache.get('user:1'));  // { name: 'John' }

// With TTL
const ttlCache = new TipCache<string>(10);
ttlCache.set('temp', 'value', 5000); // 5 seconds TTL
console.log(ttlCache.get('temp'));  // 'value'
// After 5 seconds...
console.log(ttlCache.get('temp'));  // null

// LRU behavior - oldest entry is removed when maxSize is reached
const lruCache = new TipCache<number>(3);
lruCache.set('a', 1);
lruCache.set('b', 2);
lruCache.set('c', 3);
lruCache.set('d', 4);  // 'a' is removed (oldest)
console.log(lruCache.has('a'));  // false
console.log(lruCache.size());    // 3
```

## memoize

Creates a memoized version of a single-argument function that caches results.

```typescript
function memoize<R>(
  fn: (arg: any) => R
): (arg: any) => R
```

### Parameters

- `fn` - A function that takes a single argument and returns a non-void value

### Returns

Memoized version of the function that caches results based on the argument.

### Examples

```typescript
import { memoize } from '@outilx/browser';

// Expensive computation
const square = memoize((n: number) => {
  console.log('Computing...');
  return n * n;
});

square(5);  // Logs "Computing..." and returns 25
square(5);  // Returns 25 immediately (cached)
square(10); // Logs "Computing..." and returns 100

// Works with any single argument
const getUser = memoize((id: string) => {
  return { id, name: `User ${id}` };
});

getUser('123');  // Creates object
getUser('123');  // Returns cached object
```

::: warning Note
The `memoize` function only works with single-argument functions. For more complex memoization needs, consider using TipCache directly.
:::
