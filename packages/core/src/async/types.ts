/**
 * Cache store interface for async processor
 */
export interface CacheStore {
  get: (key: string) => Promise<any>
  set: (key: string, value: any) => Promise<void>
}

/**
 * Options for async processor
 */
export interface ProcessorOptions {
  /** Execution mode: parallel (default) | serial */
  mode?: 'parallel' | 'serial'
  /** Custom cache implementation or false to disable caching */
  cache?: CacheStore | false
  /** Custom cache key generator */
  keyGenerator?: (...args: any[]) => string
}
