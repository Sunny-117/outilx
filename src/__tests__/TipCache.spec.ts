import { TipCache } from "outilx";

describe("TipCache", () => {
  let cache: TipCache<number>;

  beforeEach(() => {
    cache = new TipCache<number>(3); // 设置最大缓存大小为 3
  });

  test("should set and get a value", () => {
    cache.set("a", 1);
    expect(cache.get("a")).toBe(1);
  });

  test("should return null for non-existing key", () => {
    expect(cache.get("b")).toBeNull();
  });

  test("should return null for expired entry", () => {
    cache.set("c", 2, 50); // 设置 ttl 为 50 毫秒
    setTimeout(() => {
      expect(cache.get("c")).toBeNull(); // 50 毫秒后应该过期
    }, 60);
  });

  test("should delete an entry", () => {
    cache.set("d", 3);
    expect(cache.delete("d")).toBe(true);
    expect(cache.get("d")).toBeNull();
  });

  test("should return false when deleting a non-existing key", () => {
    expect(cache.delete("non-existing")).toBe(false);
  });

  test("should check if key exists", () => {
    cache.set("e", 4);
    expect(cache.has("e")).toBe(true);
    cache.delete("e");
    expect(cache.has("e")).toBe(false);
  });

  test("should return false for expired keys in has", () => {
    cache.set("f", 5, 50); // 设置 ttl 为 50 毫秒
    setTimeout(() => {
      expect(cache.has("f")).toBe(false); // 50 毫秒后应该过期
    }, 60);
  });

  test("should respect the maximum size limit", () => {
    cache.set("g", 6);
    cache.set("h", 7);
    cache.set("i", 8);
    cache.set("j", 9); // 这会淘汰最老的 'g'

    expect(cache.get("g")).toBeNull(); // g 应该被淘汰
    expect(cache.get("h")).toBe(7);
    expect(cache.get("i")).toBe(8);
    expect(cache.get("j")).toBe(9);
    expect(cache.size()).toBe(3); // 应该仍然是 3
  });

  test("should return the correct size of cache", () => {
    expect(cache.size()).toBe(0);
    cache.set("k", 10);
    expect(cache.size()).toBe(1);
    cache.set("l", 11);
    expect(cache.size()).toBe(2);
    cache.delete("k");
    expect(cache.size()).toBe(1);
  });
});
