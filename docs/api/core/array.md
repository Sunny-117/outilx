# Array Utilities

Array manipulation and transformation functions.

## Functions

### toArray

Converts a value to an array.

```typescript
function toArray<T>(val: T | T[] | null | undefined, defaultValue?: T): T[]
```

**Examples:**

```typescript
toArray(1);              // [1]
toArray([1, 2]);         // [1, 2]
toArray(null);           // []
toArray(null, 'default'); // ['default']
```

### createIncrementingArray

Creates an array of incrementing numbers starting from 1.

```typescript
function createIncrementingArray(length: number): number[]
```

**Examples:**

```typescript
createIncrementingArray(3);  // [1, 2, 3]
createIncrementingArray(5);  // [1, 2, 3, 4, 5]
```

### pipeFromArray

Composes an array of functions into a single function.

```typescript
function pipeFromArray(fns: Function[]): Function
```

**Examples:**

```typescript
const addOne = x => x + 1;
const double = x => x * 2;
const composed = pipeFromArray([addOne, double]);

composed(3);  // 8 ((3 + 1) * 2)
```

### shuffleArray

Randomly shuffles an array using Fisher-Yates algorithm.

```typescript
function shuffleArray<T>(array: T[]): T[]
```

**Examples:**

```typescript
const arr = [1, 2, 3, 4, 5];
shuffleArray([...arr]);  // [3, 1, 5, 2, 4] (random order)
```

::: warning
This function mutates the input array. Use spread operator to create a copy if needed.
:::
