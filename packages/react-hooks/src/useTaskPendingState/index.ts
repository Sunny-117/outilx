import { useCallback } from 'react'
import useTaskPending from '../useTaskPending'

/**
 * A hook that wraps an async task with pending state and stores the result.
 * 
 * @param task - The async task function to wrap
 * @param storeResult - Function to store the task result
 * @returns A tuple containing the wrapped task and pending state
 * 
 * @example
 * ```tsx
 * function UserList() {
 *   const [users, setUsers] = useState([]);
 *   
 *   const fetchUsers = async () => {
 *     const response = await fetch('/api/users');
 *     return response.json();
 *   };
 *   
 *   const [loadUsers, isPending] = useTaskPendingState(fetchUsers, setUsers);
 *   
 *   return (
 *     <div>
 *       <button onClick={loadUsers} disabled={isPending}>
 *         {isPending ? 'Loading...' : 'Load Users'}
 *       </button>
 *       <ul>
 *         {users.map(user => <li key={user.id}>{user.name}</li>)}
 *       </ul>
 *     </div>
 *   );
 * }
 * ```
 */
function useTaskPendingState<T extends (...args: any[]) => Promise<any>, R>(
  task: T,
  storeResult: (result: R) => void,
): [(...args: Parameters<T>) => Promise<void>, boolean] {
  const [taskWithPending, pending] = useTaskPending(task)

  const callAndStore = useCallback(
    async (...args: Parameters<T>) => {
      const result = await taskWithPending(...args)
      storeResult(result)
    },
    [taskWithPending, storeResult],
  )

  return [callAndStore, pending]
}

export default useTaskPendingState
