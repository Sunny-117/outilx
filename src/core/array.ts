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

// 数组随机排序, Fisher-Yates洗牌算法
export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}