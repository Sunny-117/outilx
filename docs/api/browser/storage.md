# Storage Utilities

Browser-specific storage utilities.

## Classes

### LocalStorageCache

LocalStorage-based cache implementation that implements the `CacheStore` interface from `@outilx/core`.

```typescript
class LocalStorageCache implements CacheStore {
  constructor(prefix?: string)
  get(key: string): Promise<any>
  set(key: string, value: any): Promise<void>
  clear(): void
  delete(key: string): void
  has(key: string): boolean
}
```

### Constructor

- `prefix` - Key prefix for localStorage items (default: `'async_cache_'`)

### Methods

#### get(key)

Retrieves a value from localStorage.

```typescript
const cache = new LocalStorageCache('my_app_');
const data = await cache.get('user'); // Returns parsed JSON or undefined
```

#### set(key, value)

Stores a value in localStorage as JSON.

```typescript
await cache.set('user', { name: 'John', age: 30 });
```

#### clear()

Removes all items with the cache prefix from localStorage.

```typescript
cache.clear(); // Removes all 'my_app_*' keys
```

#### delete(key)

Removes a specific item from localStorage.

```typescript
cache.delete('user');
```

#### has(key)

Checks if a key exists in localStorage.

```typescript
if (cache.has('user')) {
  // Key exists
}
```

## Examples

### Basic Usage

```typescript
import { LocalStorageCache } from '@outilx/browser';

const cache = new LocalStorageCache('app_');

// Store data
await cache.set('settings', { theme: 'dark', lang: 'en' });

// Retrieve data
const settings = await cache.get('settings');
console.log(settings); // { theme: 'dark', lang: 'en' }

// Check existence
cache.has('settings'); // true

// Delete
cache.delete('settings');
cache.has('settings'); // false
```

### With createAsyncProcessor

```typescript
import { createAsyncProcessor, LocalStorageCache } from '@outilx/browser';

function fetchUser(id: number, cb: (err: any, result: any) => void) {
  fetch(`/api/users/${id}`)
    .then(res => res.json())
    .then(data => cb(null, data))
    .catch(err => cb(err, null));
}

// Create processor with persistent cache
const getUser = createAsyncProcessor(fetchUser, {
  cache: new LocalStorageCache('user_cache_'),
  keyGenerator: (id) => `user_${id}`
});

// First call - fetches from API
const user = await getUser(123);

// Subsequent calls (even after page reload) - returns from localStorage
const cachedUser = await getUser(123);
```

::: warning
LocalStorageCache stores data as JSON strings. Make sure your data is JSON-serializable.
:::

::: tip
Use `MemoryCache` from `@outilx/core` for non-persistent caching that works in any environment.
:::
