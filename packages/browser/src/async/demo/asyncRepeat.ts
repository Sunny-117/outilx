import { createAsyncProcessor } from '../src'
import { asyncRepeat } from './test-utils'

// 自定义复杂任务处理
const complexProcessor = createAsyncProcessor(
  asyncRepeat,
  {
    keyGenerator: (str, num) => `repeat_${str}_${num}`,
  },
)
complexProcessor('ts', 3).then(console.log) // 输出 "tststs"
