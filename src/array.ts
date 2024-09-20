export function createIncrementingArray(length: number) {
  return Array.from({ length }, (_, index) => index + 1);
}

/**
 * 把一个函数的数组变成一个函数 compose
 */
export function pipeFromArray(fns: Function[]) {
  if (fns.length === 0) {
    return (x) => x;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return function (input) {
    return fns.reduce((prev, fn) => fn(prev), input);
  };
}
