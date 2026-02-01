# Storage Hooks

## useLocalStorageState

Sync state with localStorage.

```tsx
import { useLocalStorageState } from '@outilx/react-hooks';

function Component() {
  const [user, setUser] = useLocalStorageState('user', { name: 'Guest' });
  
  return (
    <div>
      <p>Welcome, {user.name}</p>
      <button onClick={() => setUser({ name: 'John' })}>
        Set Name
      </button>
    </div>
  );
}
```

## useSessionStorageState

Sync state with sessionStorage.

```tsx
import { useSessionStorageState } from '@outilx/react-hooks';

function Component() {
  const [token, setToken] = useSessionStorageState('token', '');
  
  return (
    <div>
      <input
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter token"
      />
    </div>
  );
}
```

## useCookieState

Sync state with cookies.

```tsx
import { useCookieState } from '@outilx/react-hooks';

function Component() {
  const [value, setValue] = useCookieState('my-cookie');
  
  return (
    <div>
      <input
        value={value || ''}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
```

## useUrlState

> ⚠️ **Note**: This hook is currently under development and not yet available.

Sync state with URL query parameters (Coming soon).

```tsx
// This API is not yet implemented
// import { useUrlState } from '@outilx/react-hooks';
```
