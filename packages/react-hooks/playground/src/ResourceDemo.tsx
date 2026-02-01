import React from 'react';
import { useArray, useTaskPendingState, useNumber } from '@outilx/react-hooks';

// Fake API request
async function fetchUsers(): Promise<Array<{ id: number; name: string }>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
      ]);
    }, 1000);
  });
}

export default function ResourceDemo() {
  const [users, { push, removeById, set, empty }] = useArray<{ id: number; name: string }>([]);
  const [loadUsers, isPending] = useTaskPendingState(fetchUsers, set);
  const [count, { increment, decrement }] = useNumber(0);

  return (
    <div>
      <h2>Resource Management Demo</h2>
      
      <div>
        <h3>useArray + useTaskPendingState</h3>
        <button onClick={loadUsers} disabled={isPending}>
          {isPending ? 'Loading...' : 'Load Users'}
        </button>
        <button onClick={() => push({ id: Date.now(), name: 'New User' })}>
          Add User
        </button>
        <button onClick={empty}>Clear All</button>
        
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name}
              <button onClick={() => removeById(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <hr />

      <div>
        <h3>useNumber</h3>
        <p>Count: {count}</p>
        <button onClick={increment}>+1</button>
        <button onClick={decrement}>-1</button>
      </div>
    </div>
  );
}
