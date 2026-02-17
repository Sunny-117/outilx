import type { CacheStore } from '@outilx/core'

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
