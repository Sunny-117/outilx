import type { ProcessorOptions } from './types'
import { MemoryCache } from './cache'
import { promisify } from './promisify'

/**
 * Create an async processor with caching and execution strategy support
 *
 * @param originalFunc - Original async function (error-first callback style)
 * @param options - Processor configuration options
 * @returns Processed function that returns a Promise
 *
 * @example
 * ```ts
 * // Original callback-style function
 * function asyncAdd(a: number, b: number, cb: (err: null, result: number) => void) {
 *   setTimeout(() => cb(null, a + b), 1000)
 * }
 *
 * // Create processor with caching
 * const optimizedSum = createAsyncProcessor(asyncAdd, {
 *   mode: 'parallel',
 *   cache: new MemoryCache(),
 *   keyGenerator: (a, b) => `add_${a}_${b}`
 * })
 *
 * // Use it
 * const result = await optimizedSum(1, 2, 3, 4) // Processes in batches
 * ```
 */
export function createAsyncProcessor<Args extends any[], Result>(
  originalFunc: (...args: [...Args, (err: any, res: Result) => void]) => void,
  options: ProcessorOptions = {},
): (...args: Args) => Promise<Result> {
  // Convert to Promise-based function
  const promisified = promisify(originalFunc)
  const {
    mode = 'parallel',
    cache = new MemoryCache(),
    keyGenerator = (...args) => JSON.stringify(args),
  } = options

  // Executor with caching
  const executor = async (...args: Args): Promise<Result> => {
    // Direct execution when cache is disabled
    if (cache === false) {
      return await promisified(...args)
    }

    const key = keyGenerator(...args)

    // Check cache
    const cached = await cache.get(key)
    if (cached !== undefined)
      return cached

    // Execute and cache result
    const result = await promisified(...args)
    await cache.set(key, result)
    return result
  }

  // Execution strategy control
  return async function processedFunc(...args: Args): Promise<Result> {
    // Process batch of tasks
    const processBatch = async (tasks: Args[]): Promise<Result[]> => {
      if (mode === 'parallel') {
        return Promise.all(tasks.map(task => executor(...task)))
      }

      // Serial execution
      const results: Result[] = []
      for (const task of tasks) {
        results.push(await executor(...task))
      }
      return results
    }

    // Recursive processing for multiple arguments
    async function recursiveProcess(currentArgs: any[]): Promise<any> {
      if (currentArgs.length <= 1)
        return currentArgs[0] || 0

      // Generate task batches (pair-wise grouping)
      const tasks: Args[] = []
      for (let i = 0; i < currentArgs.length; i += 2) {
        const pair = currentArgs.slice(i, i + 2) as Args
        tasks.push(pair.length === 1 ? [...pair, 0] as Args : pair) // Pad with zero
      }

      // Execute current batch
      const batchResults = await processBatch(tasks)
      return recursiveProcess(batchResults)
    }

    return await recursiveProcess(args)
  }
}
