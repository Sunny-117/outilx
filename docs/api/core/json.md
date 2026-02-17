# JSON Utilities

Safe JSON parsing and stringification utilities.

## Functions

### isJsonString

Checks if a string is valid JSON.

```typescript
function isJsonString(str: string): boolean
```

**Examples:**

```typescript
isJsonString('{"key": "value"}'); // true
isJsonString('[1, 2, 3]');        // true
isJsonString('{invalid}');        // false
isJsonString('null');             // false (not an object)
isJsonString('"string"');         // false (not an object)
```

### parseJsonWithFallback

Safely parses a JSON string with fallback value.

```typescript
function parseJsonWithFallback(jsonValue?: any, fallbackValue?: unknown): any
```

**Examples:**

```typescript
parseJsonWithFallback('{"name":"John"}');        // { name: 'John' }
parseJsonWithFallback('{invalid}', {});          // {}
parseJsonWithFallback('{invalid}');              // '{invalid}' (returns original)
parseJsonWithFallback('{"a":1}', { b: 2 });      // { a: 1 }
```

### stringifyJsonWithFallback

Safely stringifies a JSON value with fallback.

```typescript
function stringifyJsonWithFallback(json: unknown, fallbackValue: unknown): string
```

**Examples:**

```typescript
stringifyJsonWithFallback({ key: 'value' }, '{}'); // '{"key":"value"}'
stringifyJsonWithFallback(undefined, 'fallback');  // 'fallback'
stringifyJsonWithFallback(null, 'fallback');       // 'fallback'
```

::: info
This function uses `fast-json-stable-stringify` for deterministic JSON output, which is useful for caching and comparison.
:::
