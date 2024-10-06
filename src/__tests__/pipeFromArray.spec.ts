import { pipeFromArray } from "outilx";

const addOne = (x) => x + 1;
const multiplyByTwo = (x) => x * 2;
const subtractThree = (x) => x - 3;

describe("pipeFromArray", () => {
  test("should return the input if no functions are provided", () => {
    const pipe = pipeFromArray([]);
    expect(pipe(5)).toBe(5);
  });

  test("should return the function if one function is provided", () => {
    const pipe = pipeFromArray([addOne]);
    expect(pipe(2)).toBe(3);
  });

  test("should apply multiple functions in sequence", () => {
    const pipe = pipeFromArray([addOne, multiplyByTwo, subtractThree]);
    expect(pipe(2)).toBe(3); // (2 + 1) * 2 - 3 = 3
  });

  test("should handle an empty array", () => {
    const pipe = pipeFromArray([]);
    expect(pipe("test")).toBe("test"); // Should return input unchanged
  });

  test("should handle single function", () => {
    const pipe = pipeFromArray([multiplyByTwo]);
    expect(pipe(4)).toBe(8); // 4 * 2 = 8
  });

  test("should handle functions that return other functions", () => {
    const increment = (n) => (x) => x + n;
    const pipe = pipeFromArray([increment(3), increment(2)]);
    expect(pipe(5)).toBe(10); // (5 + 3) + 2 = 10
  });
});
