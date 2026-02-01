import { useState, useMemo } from 'react'

export type Methods<S, M> = {
  [K in keyof M]: M[K] extends (state: S, ...args: infer Args) => S
    ? (...args: Args) => void
    : never
}

/**
 * A hook that manages state with custom methods.
 * 
 * @param initialValue - The initial state value
 * @param methods - An object containing methods that transform the state
 * @returns A tuple containing the current state and bound methods
 * 
 * @example
 * ```tsx
 * const counterMethods = {
 *   increment: (state: number) => state + 1,
 *   decrement: (state: number) => state - 1,
 *   add: (state: number, value: number) => state + value,
 * };
 * 
 * function Counter() {
 *   const [count, { increment, decrement, add }] = useMethods(0, counterMethods);
 *   
 *   return (
 *     <div>
 *       <p>Count: {count}</p>
 *       <button onClick={increment}>+1</button>
 *       <button onClick={decrement}>-1</button>
 *       <button onClick={() => add(5)}>+5</button>
 *     </div>
 *   );
 * }
 * ```
 */
function useMethods<S, M extends Record<string, (state: S, ...args: any[]) => S>>(
  initialValue: S,
  methods: M,
): [S, Methods<S, M>] {
  const [value, setValue] = useState<S>(initialValue)

  const boundMethods = useMemo(() => {
    const bound = {} as Methods<S, M>
    
    for (const [name, fn] of Object.entries(methods)) {
      ;(bound as any)[name] = (...args: any[]) => {
        setValue((currentValue) => fn(currentValue, ...args))
      }
    }
    
    return bound
  }, [methods])

  return [value, boundMethods]
}

export default useMethods
