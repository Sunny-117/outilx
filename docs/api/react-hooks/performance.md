# Performance Hooks

## useLatest

Get the latest value without re-rendering.

```tsx
import { useLatest } from '@outilx/react-hooks';

function Component() {
  const [count, setCount] = useState(0);
  const latestCount = useLatest(count);
  
  useEffect(() => {
    const timer = setInterval(() => {
      // Always get the latest count value
      console.log(latestCount.current);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []); // No need to add count to dependencies
  
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}
```

## useMemoizedFn

Memoize function to avoid re-creation.

```tsx
import { useMemoizedFn } from '@outilx/react-hooks';

function Component() {
  const [count, setCount] = useState(0);
  
  // Function reference never changes
  const handleClick = useMemoizedFn(() => {
    console.log(count);
    setCount(count + 1);
  });
  
  return (
    <ChildComponent onClick={handleClick} />
  );
}
```
