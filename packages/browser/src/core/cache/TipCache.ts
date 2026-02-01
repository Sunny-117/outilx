/**
 * Cache implementation module
 * @module cache
 */

/**
 * Class representing a cache entry with optional expiry
 * @template T
 */
export class CacheEntry<T> {
  /** The cached value */
  value: T;
  
  /** Expiry timestamp or null if no expiry */
  expiry: number | null;

  /**
   * Creates a cache entry
   * @param {T} value - The value to cache
   * @param {number|null} expiry - Expiry timestamp or null
   */
  constructor(value: T, expiry: number | null) {
    this.value = value;
    this.expiry = expiry;
  }
}

/**
 * LRU Cache implementation with TTL support
 * @template T
 */
export class TipCache<T> {
  /** Map to store cache entries */
  private _cachePool: Map<string, CacheEntry<T>>;
  /** Maximum size of the cache */
  private _maxSize: number;

  /**
   * Creates a TipCache instance
   * @param {number} [maxSize=5] - Maximum number of entries to store
   */
  constructor(maxSize = 5) {
    this._cachePool = new Map();
    this._maxSize = maxSize;
  }

  /**
   * Checks if a cache entry has expired
   * @private
   * @param {CacheEntry<T>} entry - The cache entry to check
   * @returns {boolean} True if the entry has expired
   */
  private _isExpired(entry: CacheEntry<T>): boolean {
    if (entry.expiry && Date.now() > entry.expiry) {
      return true;
    }
    return false;
  }

  /**
   * Sets a value in the cache
   * @param {string} key - The key to store the value under
   * @param {T} value - The value to store
   * @param {number} [ttl=0] - Time to live in milliseconds (0 for no expiry)
   */
  public set(key: string, value: T, ttl: number = 0): void {
    if (this._cachePool.has(key)) {
      this._cachePool.delete(key);
    } else if (this._cachePool.size >= this._maxSize) {
      const oldestKey = this._cachePool.keys().next().value;
      if (oldestKey) this._cachePool.delete(oldestKey);
    }

    const expiry = ttl > 0 ? Date.now() + ttl : null;
    this._cachePool.set(key, new CacheEntry(value, expiry));
  }

  /**
   * Gets a value from the cache
   * @param {string} key - The key to retrieve
   * @returns {T|null} The cached value or null if not found/expired
   */
  public get(key: string): T | null {
    if (!this._cachePool.has(key)) {
      return null;
    }

    const entry = this._cachePool.get(key)!;
    if (this._isExpired(entry)) {
      this._cachePool.delete(key);
      return null;
    }

    this._cachePool.delete(key);
    this._cachePool.set(key, entry);

    return entry.value;
  }

  /**
   * Deletes a value from the cache
   * @param {string} key - The key to delete
   * @returns {boolean} True if the key was found and deleted
   */
  public delete(key: string): boolean {
    return this._cachePool.delete(key);
  }

  /**
   * Checks if a key exists in the cache and is not expired
   * @param {string} key - The key to check
   * @returns {boolean} True if the key exists and is not expired
   */
  public has(key: string): boolean {
    if (!this._cachePool.has(key)) {
      return false;
    }

    const entry = this._cachePool.get(key)!;
    if (this._isExpired(entry)) {
      this._cachePool.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Gets the current size of the cache
   * @returns {number} Number of entries in the cache
   */
  public size(): number {
    return this._cachePool.size;
  }
}
