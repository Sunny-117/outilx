# Config Utilities

Configuration mapping utilities for creating lookup objects from data tuples.

## Functions

### getConfigFromDataSource

Maps configuration data into various lookup objects. Useful for creating enums-like structures with labels.

```typescript
function getConfigFromDataSource<T extends DataTupleDataSource>(
  dataSource: T
): {
  valueMapByKey: Record<string, string | number>;
  keyMapByValue: Record<string | number, string>;
  nameMapByValue: Record<string | number, string>;
  nameMapByKey: Record<string, string>;
  dataSource: Array<{ value: string | number; key: string; label: string }>;
}
```

**Parameters:**

- `dataSource` - Array of tuples in format `[value, key, label]`

**Returns:**

Object with multiple lookup maps:
- `valueMapByKey` - Get value by key
- `keyMapByValue` - Get key by value
- `nameMapByValue` - Get label by value
- `nameMapByKey` - Get label by key
- `dataSource` - Normalized array of objects

**Examples:**

```typescript
const statusConfig = [
  [0, 'PENDING', '待处理'],
  [1, 'APPROVED', '已通过'],
  [2, 'REJECTED', '已拒绝']
] as const;

const config = getConfigFromDataSource(statusConfig);

// Lookup by key
config.valueMapByKey.PENDING;    // 0
config.valueMapByKey.APPROVED;   // 1

// Lookup by value
config.keyMapByValue[0];         // 'PENDING'
config.nameMapByValue[1];        // '已通过'

// Lookup label by key
config.nameMapByKey.REJECTED;    // '已拒绝'

// Normalized data source (useful for dropdowns)
config.dataSource;
// [
//   { value: 0, key: 'PENDING', label: '待处理' },
//   { value: 1, key: 'APPROVED', label: '已通过' },
//   { value: 2, key: 'REJECTED', label: '已拒绝' }
// ]
```

## Types

### DataTupleDataSource

Type for the data source array.

```typescript
type DataTupleDataSource = readonly (readonly [
  value: string | number,
  key: string,
  label: string
])[];
```

### ExtractFromTuple

Utility type for extracting values from tuples.

```typescript
type ExtractFromTuple<
  T extends DataTuple,
  KeyIndex extends 0 | 1 | 2,
  ValueIndex extends 0 | 1 | 2
>
```

::: tip
Use `as const` when defining your data source to get full type inference for the lookup maps.
:::
