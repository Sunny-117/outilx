# JSON Utilities

Safe JSON parsing and stringification utilities.

## safeJsonParse

Safely parses JSON with error handling.

```typescript
function safeJsonParse<T = any>(
  json: string,
  defaultValue?: T
): T | undefined
```

### Parameters

- `json` - The JSON string to parse
- `defaultValue` - Optional default value if parsing fails

### Returns

Parsed object or default value if parsing fails.

### Examples

```typescript
import { safeJsonParse } from '@outilx/browser';

// Valid JSON
safeJsonParse('{"name":"John"}');  // { name: 'John' }

// Invalid JSON
safeJsonParse('invalid json');  // undefined
safeJsonParse('invalid json', {});  // {}

// With type
interface User {
  name: string;
  age: number;
}
const user = safeJsonParse<User>('{"name":"John","age":30}');
```

## stableStringify

Creates a deterministic JSON string (properties sorted).

```typescript
function stableStringify(obj: any): string
```

### Parameters

- `obj` - The object to stringify

### Returns

Deterministic JSON string with sorted keys.

### Examples

```typescript
import { stableStringify } from '@outilx/browser';

const obj1 = { b: 2, a: 1 };
const obj2 = { a: 1, b: 2 };

stableStringify(obj1);  // '{"a":1,"b":2}'
stableStringify(obj2);  // '{"a":1,"b":2}'

// Same output regardless of property order
stableStringify(obj1) === stableStringify(obj2);  // true
```
