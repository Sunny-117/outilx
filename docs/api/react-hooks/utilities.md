# Utilities

## createUseStorageState

Create custom storage state hook.

```tsx
import { createUseStorageState } from '@outilx/react-hooks';

// Create a custom storage hook
const useCustomStorage = createUseStorageState(() => {
  // Return your custom storage implementation
  return {
    getItem: (key) => { /* ... */ },
    setItem: (key, value) => { /* ... */ },
    removeItem: (key) => { /* ... */ },
  };
});

function Component() {
  const [value, setValue] = useCustomStorage('my-key', 'default');
  
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```
