# Async Processing

Utilities for converting callback-style async functions to Promises, with built-in caching and execution strategies.

## promisify

Convert callback-style async function to Promise-based function.

```typescript
function promisify<Args extends any[], Result>(
  func: (...args: [...Args, (err: any, result: Result) => void]) => void
): (...args: Args) => Promise<Result>
```

### Example

```typescript
import { promisify } from '@outilx/browser'

// Original callback-style function
function asyncAdd(a: number, b: number, cb: (err: null, result: number) => void) {
  setTimeout(() => cb(null, a + b), 1000)
}

// Convert to Promise
const promisifiedAdd = promisify(asyncAdd)
const result = await promisifiedAdd(1, 2) // 3
```

## createAsyncProcessor

Create an async processor with caching and execution strategy support. This function converts callback-style async functions to Promise-based functions with advanced features like caching and parallel/serial execution.

```typescript
function createAsyncProcessor<Args extends any[], Result>(
  originalFunc: (...args: [...Args, (err: any, res: Result) => void]) => void,
  options?: ProcessorOptions
): (...args: Args) => Promise<Result>
```

### Options

```typescript
interface ProcessorOptions {
  /** Execution mode: 'parallel' (default) | 'serial' */
  mode?: 'parallel' | 'serial'
  /** Custom cache implementation or false to disable caching */
  cache?: CacheStore | false
  /** Custom cache key generator */
  keyGenerator?: (...args: any[]) => string
}
```

### Example

```typescript
import { createAsyncProcessor, MemoryCache } from '@outilx/browser'

// Original callback-style function
function asyncAdd(a: number, b: number, cb: (err: null, result: number) => void) {
  setTimeout(() => cb(null, a + b), 1000)
}

// Create processor with caching
const optimizedSum = createAsyncProcessor(asyncAdd, {
  mode: 'parallel',
  cache: new MemoryCache(),
  keyGenerator: (a, b) => `add_${a}_${b}`
})

// Use it - processes multiple arguments in batches
const result = await optimizedSum(1, 2, 3, 4)
// Processes as: (1+2) and (3+4) in parallel, then sums results
// Result: 10

// Repeated calls use cache
const cachedResult = await optimizedSum(1, 2, 3, 4) // Instant!
```

### Execution Modes

**Parallel Mode** (default)
- Processes batches of tasks concurrently
- Faster for I/O-bound operations
- Higher memory usage

```typescript
const processor = createAsyncProcessor(asyncFunc, {
  mode: 'parallel'
})
```

**Serial Mode**
- Processes tasks one by one
- Lower memory usage
- Predictable execution order

```typescript
const processor = createAsyncProcessor(asyncFunc, {
  mode: 'serial'
})
```

### Caching

**With MemoryCache**

```typescript
import { createAsyncProcessor, MemoryCache } from '@outilx/browser'

const processor = createAsyncProcessor(asyncFunc, {
  cache: new MemoryCache(),
  keyGenerator: (a, b) => `${a}_${b}`
})
```

**With LocalStorageCache**

```typescript
import { createAsyncProcessor, LocalStorageCache } from '@outilx/browser'

const processor = createAsyncProcessor(asyncFunc, {
  cache: new LocalStorageCache('my_cache_'),
  keyGenerator: (a, b) => `${a}_${b}`
})
```

**Without Cache**

```typescript
const processor = createAsyncProcessor(asyncFunc, {
  cache: false
})
```

## Cache Implementations

### MemoryCache

In-memory cache implementation with Map.

```typescript
class MemoryCache implements CacheStore {
  async get(key: string): Promise<any>
  async set(key: string, value: any): Promise<void>
  clear(): void
  delete(key: string): boolean
  has(key: string): boolean
  get size(): number
}
```

**Example**

```typescript
import { MemoryCache } from '@outilx/browser'

const cache = new MemoryCache()
await cache.set('key1', 'value1')
const value = await cache.get('key1') // 'value1'
cache.clear()
```

### LocalStorageCache

LocalStorage-based cache implementation.

```typescript
class LocalStorageCache implements CacheStore {
  constructor(prefix?: string)
  async get(key: string): Promise<any>
  async set(key: string, value: any): Promise<void>
  clear(): void
  delete(key: string): void
  has(key: string): boolean
}
```

**Example**

```typescript
import { LocalStorageCache } from '@outilx/browser'

const cache = new LocalStorageCache('my_app_')
await cache.set('user', { name: 'John' })
const user = await cache.get('user') // { name: 'John' }
```

### Custom Cache

Implement your own cache by following the `CacheStore` interface:

```typescript
import type { CacheStore } from '@outilx/browser'

class RedisCache implements CacheStore {
  async get(key: string) {
    // Your implementation
  }
  
  async set(key: string, value: any) {
    // Your implementation
  }
}

const processor = createAsyncProcessor(asyncFunc, {
  cache: new RedisCache()
})
```

## Complete Example

```typescript
import { 
  createAsyncProcessor, 
  MemoryCache,
  promisify 
} from '@outilx/browser'

// Original callback-style API
function fetchUser(id: number, cb: (err: Error | null, user: any) => void) {
  setTimeout(() => {
    if (id < 0) {
      cb(new Error('Invalid ID'), null)
    } else {
      cb(null, { id, name: `User ${id}` })
    }
  }, 1000)
}

// Option 1: Simple promisify
const getUserSimple = promisify(fetchUser)
const user1 = await getUserSimple(1)

// Option 2: With caching and parallel execution
const getUserOptimized = createAsyncProcessor(fetchUser, {
  mode: 'parallel',
  cache: new MemoryCache(),
  keyGenerator: (id) => `user_${id}`
})

// First call - takes 1 second
const user2 = await getUserOptimized(2)

// Second call - instant (cached)
const user2Again = await getUserOptimized(2)

// Batch processing
const users = await getUserOptimized(1, 2, 3, 4)
// Processes (1,2) and (3,4) in parallel
```

## Type Definitions

```typescript
interface CacheStore {
  get: (key: string) => Promise<any>
  set: (key: string, value: any) => Promise<void>
}

interface ProcessorOptions {
  mode?: 'parallel' | 'serial'
  cache?: CacheStore | false
  keyGenerator?: (...args: any[]) => string
}
```
