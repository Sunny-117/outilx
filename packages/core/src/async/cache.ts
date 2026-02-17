import type { CacheStore } from './types'

/**
 * In-memory cache implementation
 */
export class MemoryCache implements CacheStore {
  private store = new Map<string, any>()

  async get(key: string) {
    return this.store.get(key)
  }

  async set(key: string, value: any) {
    this.store.set(key, value)
  }

  clear() {
    this.store.clear()
  }

  delete(key: string) {
    return this.store.delete(key)
  }

  has(key: string) {
    return this.store.has(key)
  }

  get size() {
    return this.store.size
  }
}
