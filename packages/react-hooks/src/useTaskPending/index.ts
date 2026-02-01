import { useCallback } from 'react'
import useNumber from '../useNumber'

/**
 * A hook that wraps an async task with pending state tracking.
 * 
 * @param task - The async task function to wrap
 * @returns A tuple containing the wrapped task and pending state
 * 
 * @example
 * ```tsx
 * function DataFetcher() {
 *   const fetchData = async () => {
 *     const response = await fetch('/api/data');
 *     return response.json();
 *   };
 *   
 *   const [loadData, isPending] = useTaskPending(fetchData);
 *   
 *   return (
 *     <div>
 *       <button onClick={loadData} disabled={isPending}>
 *         {isPending ? 'Loading...' : 'Load Data'}
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
function useTaskPending<T extends (...args: any[]) => Promise<any>>(
  task: T,
): [T, boolean] {
  const [pendingCount, { increment, decrement }] = useNumber(0)

  const taskWithPending = useCallback(
    async (...args: Parameters<T>) => {
      increment()
      try {
        const result = await task(...args)
        return result
      } finally {
        decrement()
      }
    },
    [task, increment, decrement],
  ) as T

  return [taskWithPending, pendingCount > 0]
}

export default useTaskPending
