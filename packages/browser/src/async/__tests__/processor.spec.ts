import { describe, expect, it, vi } from 'vitest'
import { createAsyncProcessor } from '../processor'
import { MemoryCache } from '../cache'

// Test utility function
function asyncAdd(a: number, b: number, cb: (err: null, result: number) => void) {
  setTimeout(() => cb(null, a + b), 10)
}

describe('createAsyncProcessor', () => {
  it('should process with parallel mode and caching', async () => {
    const processor = createAsyncProcessor(asyncAdd, {
      mode: 'parallel',
      cache: new MemoryCache(),
      keyGenerator: (a, b) => `add_${a}_${b}`,
    })

    // @ts-ignore - Testing with multiple args
    const result = await processor(1, 2, 3, 4)
    expect(result).toBe(10) // ((1+2) + (3+4)) = 3 + 7 = 10
  })

  it('should process with serial mode', async () => {
    const processor = createAsyncProcessor(asyncAdd, {
      mode: 'serial',
      cache: new MemoryCache(),
    })

    // @ts-ignore
    const result = await processor(1, 2, 3, 4)
    expect(result).toBe(10)
  })

  it('should work without caching', async () => {
    const processor = createAsyncProcessor(asyncAdd, {
      mode: 'parallel',
      cache: false,
    })

    // @ts-ignore
    const result = await processor(1, 2, 3, 4)
    expect(result).toBe(10)
  })

  it('should use cache for repeated calls', async () => {
    const cache = new MemoryCache()
    const spy = vi.fn(asyncAdd)
    
    const processor = createAsyncProcessor(spy, {
      mode: 'parallel',
      cache,
      keyGenerator: (a, b) => `add_${a}_${b}`,
    })

    // @ts-ignore
    await processor(1, 2)
    // @ts-ignore
    await processor(1, 2) // Should use cache

    // Should only be called once due to caching
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should handle odd number of arguments', async () => {
    const processor = createAsyncProcessor(asyncAdd, {
      mode: 'parallel',
      cache: new MemoryCache(),
    })

    // @ts-ignore
    const result = await processor(1, 2, 3)
    expect(result).toBe(6) // ((1+2) + (3+0)) = 3 + 3 = 6
  })

  it('should handle single argument', async () => {
    const processor = createAsyncProcessor(asyncAdd, {
      mode: 'parallel',
      cache: new MemoryCache(),
    })

    // @ts-ignore
    const result = await processor(5)
    expect(result).toBe(5)
  })

  it('should use custom key generator', async () => {
    const cache = new MemoryCache()
    const customKeyGen = vi.fn((a: number, b: number) => `custom_${a}_${b}`)
    
    const processor = createAsyncProcessor(asyncAdd, {
      cache,
      keyGenerator: customKeyGen,
    })

    // @ts-ignore
    await processor(1, 2)
    
    expect(customKeyGen).toHaveBeenCalledWith(1, 2)
  })

  it('should handle errors in async function', async () => {
    function asyncError(a: number, b: number, cb: (err: Error, result: null) => void) {
      setTimeout(() => cb(new Error('Test error'), null), 10)
    }

    const processor = createAsyncProcessor(asyncError, {
      cache: false,
    })

    // @ts-ignore
    await expect(processor(1, 2)).rejects.toThrow('Test error')
  })
})
