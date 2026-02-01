import useMethods from '../useMethods'

interface ArrayMethods<T> {
  push: (item: T) => void
  pop: () => void
  slice: (start?: number, end?: number) => void
  empty: () => void
  set: (newValue: T[]) => void
  remove: (item: T) => void
  removeById: (id: string | number) => void
}

const createArrayMethods = <T>() => ({
  push(state: T[], item: T): T[] {
    return state.concat(item)
  },
  pop(state: T[]): T[] {
    return state.slice(0, -1)
  },
  slice(state: T[], start?: number, end?: number): T[] {
    return state.slice(start, end)
  },
  empty(): T[] {
    return []
  },
  set(_state: T[], newValue: T[]): T[] {
    return newValue
  },
  remove(state: T[], item: T): T[] {
    const index = state.indexOf(item)
    if (index < 0) {
      return state
    }
    return [...state.slice(0, index), ...state.slice(index + 1)]
  },
  removeById(state: T[], id: string | number): T[] {
    return state.filter((item: any) => item.id !== id)
  },
})

/**
 * A hook that manages array state with convenient methods.
 * 
 * @param initialValue - The initial array value (default: [])
 * @returns A tuple containing the current array and methods object
 * 
 * @example
 * ```tsx
 * function TodoList() {
 *   const [todos, { push, remove, removeById, empty }] = useArray([
 *     { id: 1, text: 'Learn React' },
 *   ]);
 *   
 *   return (
 *     <div>
 *       <button onClick={() => push({ id: Date.now(), text: 'New Todo' })}>
 *         Add Todo
 *       </button>
 *       <button onClick={empty}>Clear All</button>
 *       {todos.map(todo => (
 *         <div key={todo.id}>
 *           {todo.text}
 *           <button onClick={() => removeById(todo.id)}>Delete</button>
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
function useArray<T = any>(initialValue: T[] = []): [T[], ArrayMethods<T>] {
  return useMethods(initialValue, createArrayMethods<T>())
}

export default useArray
