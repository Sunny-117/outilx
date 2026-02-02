// 原始异步加法函数
export function asyncAdd(a: number, b: number, cb: (err: null, result: number) => void) {
  setTimeout(() => cb(null, a + b), Math.random() * 1000)
}
export function asyncRepeat(a: string, b: number, cb: (err: null, res: string) => void) {
  setTimeout(() => cb(null, a.repeat(b)), 1000)
}
