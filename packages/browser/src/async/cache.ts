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

/**
 * LocalStorage-based cache implementation
 */
export class LocalStorageCache implements CacheStore {
  private prefix: string

  constructor(prefix = 'async_cache_') {
    this.prefix = prefix
  }

  async get(key: string) {
    const item = localStorage.getItem(this.prefix + key)
    return item ? JSON.parse(item) : undefined
  }

  async set(key: string, value: any) {
    localStorage.setItem(this.prefix + key, JSON.stringify(value))
  }

  clear() {
    const keys = Object.keys(localStorage)
    keys.forEach((key) => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key)
      }
    })
  }

  delete(key: string) {
    localStorage.removeItem(this.prefix + key)
  }

  has(key: string) {
    return localStorage.getItem(this.prefix + key) !== null
  }
}
