import { memoize } from "../core/memoize";

describe("memoize", () => {
  it("should return the cached result for the same input", () => {
    const add = (x: number) => x + 1;
    const memoizedAdd = memoize(add);

    // 第一次调用，计算并缓存结果
    expect(memoizedAdd(1)).toBe(2);

    // 第二次调用，应该返回缓存的结果
    expect(memoizedAdd(1)).toBe(2);
  });

  it("should compute new results for different inputs", () => {
    const multiply = (x: number) => x * 2;
    const memoizedMultiply = memoize(multiply);

    expect(memoizedMultiply(2)).toBe(4); // 计算并缓存结果
    expect(memoizedMultiply(3)).toBe(6); // 计算并缓存结果
    expect(memoizedMultiply(2)).toBe(4); // 返回缓存的结果
  });

  it("should handle string arguments", () => {
    const greet = (name: string) => `Hello, ${name}!`;
    const memoizedGreet = memoize(greet);

    expect(memoizedGreet("Alice")).toBe("Hello, Alice!"); // 计算并缓存结果
    expect(memoizedGreet("Alice")).toBe("Hello, Alice!"); // 返回缓存的结果
    expect(memoizedGreet("Bob")).toBe("Hello, Bob!"); // 计算并缓存结果
  });

  it("should return undefined for void-returning functions", () => {
    const log = (message: string) => {
      console.log(message);
    };
    // @ts-expect-error
    const memoizedLog = memoize(log);

    expect(memoizedLog("Hello")).toBeUndefined(); // 第一次调用返回undefined
    expect(memoizedLog("Hello")).toBeUndefined(); // 第二次调用返回undefined，仍然是缓存
  });
});
