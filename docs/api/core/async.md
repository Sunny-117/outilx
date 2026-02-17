# Async Utilities

Async processing utilities with caching and execution strategies.

## Functions

### promisify

Convert callback-style async functions to Promise-based functions.

```typescript
function promisify<Args extends any[], Result>(
  func: (...args: [...Args, (err: any, result: Result) => void]) => void
): (...args: Args) => Promise<Result>
```

**Examples:**

```typescript
// Original callback-style function
function asyncAdd(a: number, b: number, cb: (err: null, result: number) => void) {
  setTimeout(() => cb(null, a + b), 1000);
}

// Promisify it
const promisifiedAdd = promisify(asyncAdd);

// Use with async/await
const result = await promisifiedAdd(1, 2); // 3
```

### createAsyncProcessor

Create an async processor with caching and execution strategy support.

```typescript
function createAsyncProcessor<Args extends any[], Result>(
  originalFunc: (...args: [...Args, (err: any, res: Result) => void]) => void,
  options?: ProcessorOptions
): (...args: Args) => Promise<Result>
```

**Options:**

```typescript
interface ProcessorOptions {
  mode?: 'parallel' | 'serial';  // Execution mode (default: 'parallel')
  cache?: CacheStore | false;    // Cache implementation or false to disable
  keyGenerator?: (...args: any[]) => string;  // Custom cache key generator
}
```

**Examples:**

```typescript
// Create processor with default options
const processor = createAsyncProcessor(asyncAdd);

// Create processor with caching
const cachedProcessor = createAsyncProcessor(asyncAdd, {
  mode: 'parallel',
  cache: new MemoryCache(),
  keyGenerator: (a, b) => `add_${a}_${b}`
});

// First call executes the function
const result1 = await cachedProcessor(1, 2); // 3 (slow)

// Second call returns cached result
const result2 = await cachedProcessor(1, 2); // 3 (instant)

// Disable caching
const noCacheProcessor = createAsyncProcessor(asyncAdd, {
  cache: false
});
```

## Classes

### MemoryCache

In-memory cache implementation.

```typescript
class MemoryCache implements CacheStore {
  get(key: string): Promise<any>
  set(key: string, value: any): Promise<void>
  clear(): void
  delete(key: string): boolean
  has(key: string): boolean
  get size(): number
}
```

**Examples:**

```typescript
const cache = new MemoryCache();

await cache.set('key', { data: 'value' });
const data = await cache.get('key'); // { data: 'value' }

cache.has('key');   // true
cache.size;         // 1
cache.delete('key');
cache.clear();
```

## Interfaces

### CacheStore

Interface for cache implementations.

```typescript
interface CacheStore {
  get: (key: string) => Promise<any>
  set: (key: string, value: any) => Promise<void>
}
```

You can implement this interface to create custom cache backends:

```typescript
class RedisCache implements CacheStore {
  async get(key: string) {
    return redis.get(key);
  }
  async set(key: string, value: any) {
    await redis.set(key, JSON.stringify(value));
  }
}
```
