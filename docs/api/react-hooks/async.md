# Async Hooks

## useCancelableAsyncTaskCallback

Create cancelable async task callback.

```tsx
import { useCancelableAsyncTaskCallback } from '@outilx/react-hooks';

function Component() {
  const fetchData = useCancelableAsyncTaskCallback(async (signal) => {
    const response = await fetch('/api/data', { signal });
    return response.json();
  });
  
  const handleClick = async () => {
    try {
      const data = await fetchData();
      console.log(data);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request was cancelled');
      }
    }
  };
  
  return (
    <button onClick={handleClick}>
      Fetch Data
    </button>
  );
}
```

## useTaskPending

Wrap an async task with pending state tracking.

```tsx
import { useTaskPending } from '@outilx/react-hooks';

function DataFetcher() {
  const fetchData = async () => {
    const response = await fetch('/api/data');
    return response.json();
  };
  
  const [loadData, isPending] = useTaskPending(fetchData);
  
  return (
    <div>
      <button onClick={loadData} disabled={isPending}>
        {isPending ? 'Loading...' : 'Load Data'}
      </button>
    </div>
  );
}
```

## useTaskPendingState

Wrap an async task with pending state and store the result.

```tsx
import { useTaskPendingState } from '@outilx/react-hooks';
import { useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  
  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    return response.json();
  };
  
  const [loadUsers, isPending] = useTaskPendingState(fetchUsers, setUsers);
  
  return (
    <div>
      <button onClick={loadUsers} disabled={isPending}>
        {isPending ? 'Loading...' : 'Load Users'}
      </button>
      <ul>
        {users.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
    </div>
  );
}
```

### Combining with useArray

A powerful pattern is to combine `useTaskPendingState` with `useArray`:

```tsx
import { useArray, useTaskPendingState } from '@outilx/react-hooks';

function UserManager() {
  const [users, { push, removeById, set }] = useArray([]);
  
  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    return response.json();
  };
  
  const [loadUsers, isPending] = useTaskPendingState(fetchUsers, set);
  
  return (
    <div>
      <button onClick={loadUsers} disabled={isPending}>
        {isPending ? 'Loading...' : 'Load Users'}
      </button>
      <button onClick={() => push({ id: Date.now(), name: 'New User' })}>
        Add User
      </button>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => removeById(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```
