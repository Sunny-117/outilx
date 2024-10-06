class CacheEntry<T> {
  value: T;
  expiry: number | null;

  constructor(value: T, expiry: number | null) {
    this.value = value;
    this.expiry = expiry;
  }
}

class TipCache<T> {
  private _cachePool: Map<string, CacheEntry<T>>;
  private _maxSize: number;

  constructor(maxSize = 5) {
    this._cachePool = new Map(); // 使用 Map 来维护顺序
    this._maxSize = maxSize;
  }

  private _isExpired(entry: CacheEntry<T>): boolean {
    if (entry.expiry && Date.now() > entry.expiry) {
      return true;
    }
    return false;
  }

  public set(key: string, value: T, ttl: number = 0): void {
    if (this._cachePool.has(key)) {
      // 删除旧的位置，重新插入新位置
      this._cachePool.delete(key);
    } else if (this._cachePool.size >= this._maxSize) {
      // 淘汰最久未使用的缓存项
      const oldestKey = this._cachePool.keys().next().value;
      if (oldestKey) this._cachePool.delete(oldestKey);
    }

    const expiry = ttl > 0 ? Date.now() + ttl : null;
    this._cachePool.set(key, new CacheEntry(value, expiry));
  }

  public get(key: string): T | null {
    if (!this._cachePool.has(key)) {
      return null;
    }

    const entry = this._cachePool.get(key)!; // 使用感叹号来告诉 TypeScript entry 不是 undefined
    if (this._isExpired(entry)) {
      // 过期处理
      this._cachePool.delete(key);
      return null;
    }

    // 每次访问都将缓存项移动到 Map 的尾部
    this._cachePool.delete(key);
    this._cachePool.set(key, entry);

    return entry.value;
  }

  public delete(key: string): boolean {
    return this._cachePool.delete(key);
  }

  public has(key: string): boolean {
    if (!this._cachePool.has(key)) {
      return false;
    }

    const entry = this._cachePool.get(key)!;
    if (this._isExpired(entry)) {
      // 过期处理
      this._cachePool.delete(key);
      return false;
    }

    return true;
  }

  public size(): number {
    return this._cachePool.size;
  }
}

export default TipCache;
