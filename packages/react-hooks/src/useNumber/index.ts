import useMethods from '../useMethods'

interface NumberMethods {
  increment: () => void
  decrement: () => void
  set: (newValue: number) => void
}

const numberMethods = {
  increment(value: number): number {
    return value + 1
  },
  decrement(value: number): number {
    return value - 1
  },
  set(_current: number, newValue: number): number {
    return newValue
  },
}

/**
 * A hook that manages number state with convenient methods.
 * 
 * @param initialValue - The initial number value (default: 0)
 * @returns A tuple containing the current number and methods object
 * 
 * @example
 * ```tsx
 * function Counter() {
 *   const [count, { increment, decrement, set }] = useNumber(0);
 *   
 *   return (
 *     <div>
 *       <p>Count: {count}</p>
 *       <button onClick={increment}>+1</button>
 *       <button onClick={decrement}>-1</button>
 *       <button onClick={() => set(100)}>Set to 100</button>
 *     </div>
 *   );
 * }
 * ```
 */
function useNumber(initialValue: number = 0): [number, NumberMethods] {
  return useMethods(initialValue, numberMethods)
}

export default useNumber
