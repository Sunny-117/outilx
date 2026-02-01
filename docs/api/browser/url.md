# URL Utilities

URL parameter parsing and manipulation.

## getUrlParams

Parses URL query parameters into an object.

```typescript
function getUrlParams(url?: string): Record<string, string>
```

### Parameters

- `url` - The URL to parse (defaults to current window.location.href)

### Returns

Object containing all query parameters.

### Examples

```typescript
import { getUrlParams } from '@outilx/browser';

// Parse specific URL
getUrlParams('https://example.com?foo=bar&baz=qux');
// { foo: 'bar', baz: 'qux' }

// Parse current page URL
getUrlParams();
// Returns params from window.location.href

// Handle encoded values
getUrlParams('https://example.com?name=John%20Doe');
// { name: 'John Doe' }

// Multiple values (last one wins)
getUrlParams('https://example.com?id=1&id=2');
// { id: '2' }
```
