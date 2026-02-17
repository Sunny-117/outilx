import { shuffleArray, toArray } from "../";

describe("shuffleArray", () => {
  it("should shuffle the array", () => {
    const array = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray([...array]); // 使用扩展运算符以避免修改原数组
    expect(shuffled).not.toEqual(array); // 期望打乱后的数组与原数组不同
    expect(shuffled.sort()).toEqual(array.sort()); // 期望打乱后的数组包含相同的元素
  });

  it("should return an empty array when input is empty", () => {
    const result = shuffleArray([]);
    expect(result).toEqual([]); // 期望返回空数组
  });

  it("should return a single-element array unchanged", () => {
    const result = shuffleArray([1]);
    expect(result).toEqual([1]); // 期望返回相同的单元素数组
  });
});

describe("toArray", () => {
  test("should return empty array when input is null/undefined without default value", () => {
    expect(toArray(null)).toEqual([]);
    expect(toArray(undefined)).toEqual([]);
  });

  test("should return array with default value when input is null/undefined", () => {
    expect(toArray(null, "default")).toEqual(["default"]);
    expect(toArray(undefined, "default")).toEqual(["default"]);
  });

  test("should return same array when input is array", () => {
    const arr = [1, 2, 3];
    expect(toArray(arr)).toBe(arr);
  });

  test("should wrap non-array value in array", () => {
    expect(toArray(1)).toEqual([1]);
    expect(toArray("test")).toEqual(["test"]);
    expect(toArray({ a: 1 })).toEqual([{ a: 1 }]);
  });
});
