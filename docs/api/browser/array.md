# Array Utilities

Array manipulation and transformation functions.

## toArray

Converts a value to an array.

```typescript
function toArray<T>(
  val: T | T[] | null | undefined,
  defaultValue?: T
): T[]
```

### Parameters

- `val` - The value to convert
- `defaultValue` - Optional default value when input is null/undefined

### Returns

The resulting array.

### Examples

```typescript
import { toArray } from '@outilx/browser';

toArray(1);  // [1]
toArray([1, 2]);  // [1, 2]
toArray(null, 'default');  // ['default']
toArray(undefined);  // []
```

## createIncrementingArray

Creates an array of incrementing numbers starting from 1.

```typescript
function createIncrementingArray(length: number): number[]
```

### Parameters

- `length` - The length of the array

### Returns

Array of numbers from 1 to length.

### Examples

```typescript
import { createIncrementingArray } from '@outilx/browser';

createIncrementingArray(3);  // [1, 2, 3]
createIncrementingArray(5);  // [1, 2, 3, 4, 5]
```

## pipeFromArray

Composes an array of functions into a single function that executes them in sequence.

```typescript
function pipeFromArray(fns: Function[]): Function
```

### Parameters

- `fns` - Array of functions to compose

### Returns

The composed function.

### Examples

```typescript
import { pipeFromArray } from '@outilx/browser';

const addOne = (x: number) => x + 1;
const double = (x: number) => x * 2;
const composed = pipeFromArray([addOne, double]);

composed(3);  // 8 ((3 + 1) * 2)
```

## shuffleArray

Randomly shuffles an array using the Fisher-Yates algorithm.

```typescript
function shuffleArray<T>(array: T[]): T[]
```

### Parameters

- `array` - The array to shuffle (modified in place)

### Returns

The shuffled array.

### Examples

```typescript
import { shuffleArray } from '@outilx/browser';

const arr = [1, 2, 3, 4, 5];
shuffleArray([...arr]);  // [3, 1, 5, 2, 4] (random order)

// Note: The original array is modified
const original = [1, 2, 3];
shuffleArray(original);
console.log(original);  // [2, 3, 1] (modified)
```
