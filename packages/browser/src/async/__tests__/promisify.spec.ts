import { describe, expect, it } from 'vitest'
import { promisify } from '../promisify'

describe('promisify', () => {
  it('should convert callback-style function to Promise', async () => {
    function asyncAdd(a: number, b: number, cb: (err: null, result: number) => void) {
      setTimeout(() => cb(null, a + b), 10)
    }

    const promisifiedAdd = promisify(asyncAdd)
    const result = await promisifiedAdd(1, 2)
    expect(result).toBe(3)
  })

  it('should handle errors correctly', async () => {
    function asyncError(cb: (err: Error, result: null) => void) {
      setTimeout(() => cb(new Error('Test error'), null), 10)
    }

    const promisifiedError = promisify(asyncError)
    await expect(promisifiedError()).rejects.toThrow('Test error')
  })

  it('should work with string operations', async () => {
    function asyncRepeat(str: string, times: number, cb: (err: null, result: string) => void) {
      setTimeout(() => cb(null, str.repeat(times)), 10)
    }

    const promisifiedRepeat = promisify(asyncRepeat)
    const result = await promisifiedRepeat('a', 3)
    expect(result).toBe('aaa')
  })
})
