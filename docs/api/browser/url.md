# URL Utilities

URL query string parsing utilities.

## getUrlParams

Parses a URL query string into an object. Handles multiple values for the same parameter by creating arrays.

```typescript
function getUrlParams(query: string): Record<string, string | string[]>
```

### Parameters

- `query` - The query string to parse (without the leading `?`)

### Returns

Object containing all query parameters. If a parameter appears multiple times, its value will be an array.

### Examples

```typescript
import { getUrlParams } from '@outilx/browser';

// Basic usage
getUrlParams('foo=bar&baz=qux');
// { foo: 'bar', baz: 'qux' }

// Multiple values for same parameter
getUrlParams('id=1&id=2&id=3');
// { id: ['1', '2', '3'] }

// Mixed single and multiple values
getUrlParams('name=John&tag=js&tag=ts&tag=react');
// { name: 'John', tag: ['js', 'ts', 'react'] }

// Parse from current page URL
const currentParams = getUrlParams(window.location.search.slice(1));

// Parse from full URL
const url = 'https://example.com?foo=bar&baz=qux';
const queryString = new URL(url).search.slice(1);
getUrlParams(queryString);
// { foo: 'bar', baz: 'qux' }

// Handle encoded values
getUrlParams('name=John%20Doe&city=New%20York');
// { name: 'John Doe', city: 'New York' }
```

::: tip Usage with window.location
To parse the current page's query parameters:
```typescript
const params = getUrlParams(window.location.search.slice(1));
```
The `.slice(1)` removes the leading `?` from the search string.
:::
