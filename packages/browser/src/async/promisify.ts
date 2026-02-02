/**
 * Convert callback-style async function to Promise-based function
 * @param func - Callback-style function (error-first callback)
 * @returns Promise-based function
 * 
 * @example
 * ```ts
 * function asyncAdd(a: number, b: number, cb: (err: null, result: number) => void) {
 *   setTimeout(() => cb(null, a + b), 1000)
 * }
 * 
 * const promisifiedAdd = promisify(asyncAdd)
 * const result = await promisifiedAdd(1, 2) // 3
 * ```
 */
export function promisify<Args extends any[], Result>(
  func: (...args: [...Args, (err: any, result: Result) => void]) => void,
): (...args: Args) => Promise<Result> {
  return (...args: Args) =>
    new Promise((resolve, reject) => {
      func(...args, (err: unknown, result: any) =>
        err ? reject(err) : resolve(result),
      )
    })
}
