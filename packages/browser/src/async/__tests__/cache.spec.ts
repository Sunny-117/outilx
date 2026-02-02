import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { MemoryCache, LocalStorageCache } from '../cache'

describe('MemoryCache', () => {
  let cache: MemoryCache

  beforeEach(() => {
    cache = new MemoryCache()
  })

  it('should store and retrieve values', async () => {
    await cache.set('key1', 'value1')
    const result = await cache.get('key1')
    expect(result).toBe('value1')
  })

  it('should return undefined for non-existent keys', async () => {
    const result = await cache.get('nonexistent')
    expect(result).toBeUndefined()
  })

  it('should clear all values', async () => {
    await cache.set('key1', 'value1')
    await cache.set('key2', 'value2')
    cache.clear()
    expect(await cache.get('key1')).toBeUndefined()
    expect(await cache.get('key2')).toBeUndefined()
  })

  it('should delete specific keys', async () => {
    await cache.set('key1', 'value1')
    await cache.set('key2', 'value2')
    cache.delete('key1')
    expect(await cache.get('key1')).toBeUndefined()
    expect(await cache.get('key2')).toBe('value2')
  })

  it('should check if key exists', async () => {
    await cache.set('key1', 'value1')
    expect(cache.has('key1')).toBe(true)
    expect(cache.has('key2')).toBe(false)
  })

  it('should return correct size', async () => {
    expect(cache.size).toBe(0)
    await cache.set('key1', 'value1')
    expect(cache.size).toBe(1)
    await cache.set('key2', 'value2')
    expect(cache.size).toBe(2)
  })
})

describe('LocalStorageCache', () => {
  // Skip tests if localStorage is not available (Node.js environment)
  const hasLocalStorage = typeof localStorage !== 'undefined'

  if (!hasLocalStorage) {
    it.skip('localStorage not available in this environment', () => {})
    return
  }

  let cache: LocalStorageCache

  beforeEach(() => {
    localStorage.clear()
    cache = new LocalStorageCache('test_')
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('should store and retrieve values', async () => {
    await cache.set('key1', { data: 'value1' })
    const result = await cache.get('key1')
    expect(result).toEqual({ data: 'value1' })
  })

  it('should return undefined for non-existent keys', async () => {
    const result = await cache.get('nonexistent')
    expect(result).toBeUndefined()
  })

  it('should clear all values with prefix', async () => {
    await cache.set('key1', 'value1')
    await cache.set('key2', 'value2')
    localStorage.setItem('other_key', 'other_value')
    
    cache.clear()
    
    expect(await cache.get('key1')).toBeUndefined()
    expect(await cache.get('key2')).toBeUndefined()
    expect(localStorage.getItem('other_key')).toBe('other_value')
  })

  it('should delete specific keys', async () => {
    await cache.set('key1', 'value1')
    await cache.set('key2', 'value2')
    cache.delete('key1')
    expect(await cache.get('key1')).toBeUndefined()
    expect(await cache.get('key2')).toBe('value2')
  })

  it('should check if key exists', async () => {
    await cache.set('key1', 'value1')
    expect(cache.has('key1')).toBe(true)
    expect(cache.has('key2')).toBe(false)
  })
})
