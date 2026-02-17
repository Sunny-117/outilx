/**
 * Array utility functions
 * @module array
 */

/**
 * Converts a value to an array
 *
 * @template T
 * @param {T | T[] | null | undefined} val - The value to convert
 * @param {T} [defaultValue] - Default value when input is null/undefined
 * @returns {T[]} The resulting array
 *
 * @example
 * ```ts
 * toArray(1)  // => [1]
 * toArray([1, 2])  // => [1, 2]
 * toArray(null, 'default')  // => ['default']
 * ```
 */
export function toArray<T>(
  val: T | T[] | null | undefined,
  defaultValue?: T,
): T[] {
  if (Array.isArray(val)) {
    return val
  } else if (val == null) {
    if (defaultValue) return [defaultValue]
    return []
  } else {
    return [val]
  }
}

/**
 * Creates an array of incrementing numbers starting from 1
 *
 * @param {number} length - The length of the array
 * @returns {number[]} Array of numbers from 1 to length
 *
 * @example
 * ```ts
 * createIncrementingArray(3)  // => [1, 2, 3]
 * ```
 */
export function createIncrementingArray(length: number) {
  return Array.from({ length }, (_, index) => index + 1);
}

/**
 * Composes an array of functions into a single function
 *
 * @param {Function[]} fns - Array of functions to compose
 * @returns {Function} The composed function
 *
 * @example
 * ```ts
 * const addOne = x => x + 1;
 * const double = x => x * 2;
 * const composed = pipeFromArray([addOne, double]);
 * composed(3)  // => 8 ((3 + 1) * 2)
 * ```
 */
export function pipeFromArray(fns: Function[]) {
  if (fns.length === 0) {
    return (x: unknown) => x;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return function (input: unknown) {
    return fns.reduce((prev, fn) => fn(prev), input);
  };
}

/**
 * Randomly shuffles an array using Fisher-Yates algorithm
 *
 * @template T
 * @param {T[]} array - The array to shuffle
 * @returns {T[]} The shuffled array
 *
 * @example
 * ```ts
 * const arr = [1, 2, 3, 4, 5];
 * shuffleArray([...arr]);  // => [3, 1, 5, 2, 4] (random order)
 * ```
 */
export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
