export const memoize = <R>(
  fn: (...args: any[]) => R extends void ? never : R
) =>
  (
    (cache = Object.create(null)) =>
    (arg: any) =>
      cache[arg] || (cache[arg] = fn(arg))
  )();
