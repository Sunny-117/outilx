# Lifecycle Hooks

## useUnmount

Execute callback on component unmount.

```tsx
import { useUnmount } from '@outilx/react-hooks';

function Component() {
  useUnmount(() => {
    console.log('Component unmounted');
    // Cleanup logic here
  });
  
  return <div>Component</div>;
}
```
