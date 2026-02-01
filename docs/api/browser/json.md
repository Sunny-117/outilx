# JSON Utilities

Safe JSON parsing and stringification utilities.

## isJsonString

Checks if a string is valid JSON.

```typescript
function isJsonString(str: string): boolean
```

### Parameters

- `str` - The string to check

### Returns

`true` if the string is valid JSON, `false` otherwise.

### Examples

```typescript
import { isJsonString } from '@outilx/browser';

isJsonString('{"key": "value"}');  // true
isJsonString('{key: value}');  // false
isJsonString('null');  // true
isJsonString('undefined');  // false
```

## parseJsonWithFallback

Safely parses a JSON string with fallback value.

```typescript
function parseJsonWithFallback(jsonValue?: any, fallbackValue?: unknown): any
```

### Parameters

- `jsonValue` - The JSON string to parse (default: `''`)
- `fallbackValue` - Value to return if parsing fails (optional)

### Returns

Parsed JSON object or fallback value if parsing fails.

### Examples

```typescript
import { parseJsonWithFallback } from '@outilx/browser';

parseJsonWithFallback('{"key": "value"}');  
// { key: 'value' }

parseJsonWithFallback('{key: value}', { default: true });  
// { default: true }

parseJsonWithFallback('', []);  
// []
```

## stringifyJsonWithFallback

Safely stringifies a JSON value with fallback.

```typescript
function stringifyJsonWithFallback(json: unknown, fallbackValue: unknown): unknown
```

### Parameters

- `json` - The value to stringify
- `fallbackValue` - Value to return if stringification fails

### Returns

Stringified JSON or fallback value if stringification fails.

### Examples

```typescript
import { stringifyJsonWithFallback } from '@outilx/browser';

stringifyJsonWithFallback({ key: 'value' }, '{}');  
// '{"key":"value"}'

// Circular reference handling
const obj: any = {};
obj.self = obj;
stringifyJsonWithFallback(obj, '{}');  
// '{}'

stringifyJsonWithFallback(undefined, 'null');  
// 'null'
```
