import { createAsyncProcessor, MemoryCache } from '../'
import { asyncAdd } from './test-utils'

// 创建优化后的处理器
const optimizedSum = createAsyncProcessor(asyncAdd, {
  mode: 'parallel',
  cache: new MemoryCache(),
  keyGenerator: (a, b) => `add_${a}_${b}`, // 自定义缓存键格式
})

// 最终求和函数
async function sum(...nums: number[]) {
  // @ts-expect-error
  return optimizedSum(...nums)
}

// 测试用例
async function total() {
  const start = Date.now()

  const [res1, res2] = await Promise.all([
    sum(1, 2, 3, 4, 5, 6, 4),
    sum(1, 2, 3, 4, 5, 6, 4),
  ])

  console.log(`耗时：${Date.now() - start}ms`)
  return [res1, res2]
}

total().then(console.log) // 输出：[25, 25] 耗时约1秒
