# URL Utilities

URL parameter parsing and manipulation.

## Functions

### getUrlParams

Converts URL query string to an object.

```typescript
function getUrlParams(query: string): Record<string, string | string[]>
```

**Parameters:**

- `query` - The query string to parse (without leading '?')

**Returns:**

An object containing the parsed parameters. Duplicate keys are returned as arrays.

**Examples:**

```typescript
// Simple parameters
getUrlParams('foo=bar&baz=qux');
// { foo: 'bar', baz: 'qux' }

// Duplicate keys become arrays
getUrlParams('foo=bar&foo=baz');
// { foo: ['bar', 'baz'] }

// URL-encoded values are decoded
getUrlParams('name=John%20Doe&city=New%20York');
// { name: 'John Doe', city: 'New York' }

// Empty values
getUrlParams('foo=&bar=baz');
// { foo: '', bar: 'baz' }
```

**Usage with window.location:**

```typescript
// In browser
const params = getUrlParams(window.location.search.slice(1));
```

::: info
This function uses the native `URLSearchParams` API, which is available in Node.js 18+, Deno, Bun, and all modern browsers.
:::
