import { useState } from 'react'
import { createAsyncProcessor, MemoryCache, LocalStorageCache, promisify } from '@outilx/browser'

// Simulated async callback-style function
function asyncAdd(a: number, b: number, cb: (err: null, result: number) => void) {
  setTimeout(() => cb(null, a + b), Math.random() * 1000 + 500)
}

// Create processors
const promisifiedAdd = promisify(asyncAdd)

const parallelProcessor = createAsyncProcessor(asyncAdd, {
  mode: 'parallel',
  cache: new MemoryCache(),
  keyGenerator: (a, b) => `add_${a}_${b}`,
})

const serialProcessor = createAsyncProcessor(asyncAdd, {
  mode: 'serial',
  cache: new MemoryCache(),
  keyGenerator: (a, b) => `add_${a}_${b}`,
})

const noCacheProcessor = createAsyncProcessor(asyncAdd, {
  mode: 'parallel',
  cache: false,
})

const localStorageProcessor = createAsyncProcessor(asyncAdd, {
  mode: 'parallel',
  cache: new LocalStorageCache('async_demo_'),
  keyGenerator: (a, b) => `add_${a}_${b}`,
})

export function AsyncProcessorDemo() {
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const runTest = async (name: string, fn: () => Promise<any>) => {
    setLoading(true)
    setResult(`Running ${name}...`)
    const start = Date.now()
    try {
      const res = await fn()
      const duration = Date.now() - start
      setResult(`${name}: ${res} (${duration}ms)`)
    } catch (error) {
      setResult(`${name}: Error - ${error}`)
    }
    setLoading(false)
  }

  return (
    <div>
      <h2>Async Processor Demo</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3>Simple Promisify</h3>
        <button
          onClick={() => runTest('Promisify', () => promisifiedAdd(5, 3))}
          disabled={loading}
        >
          Add 5 + 3
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Parallel Mode with Cache</h3>
        <button
          onClick={() =>
            runTest('Parallel (first call)', () =>
              // @ts-ignore
              parallelProcessor(1, 2, 3, 4, 5, 6, 7, 8),
            )
          }
          disabled={loading}
        >
          Sum 1-8 (First Call)
        </button>
        <button
          onClick={() =>
            runTest('Parallel (cached)', () =>
              // @ts-ignore
              parallelProcessor(1, 2, 3, 4, 5, 6, 7, 8),
            )
          }
          disabled={loading}
          style={{ marginLeft: '10px' }}
        >
          Sum 1-8 (Cached)
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Serial Mode with Cache</h3>
        <button
          onClick={() =>
            runTest('Serial (first call)', () =>
              // @ts-ignore
              serialProcessor(2, 4, 6, 8),
            )
          }
          disabled={loading}
        >
          Sum 2,4,6,8 (First Call)
        </button>
        <button
          onClick={() =>
            runTest('Serial (cached)', () =>
              // @ts-ignore
              serialProcessor(2, 4, 6, 8),
            )
          }
          disabled={loading}
          style={{ marginLeft: '10px' }}
        >
          Sum 2,4,6,8 (Cached)
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>No Cache</h3>
        <button
          onClick={() =>
            runTest('No Cache', () =>
              // @ts-ignore
              noCacheProcessor(1, 2, 3, 4),
            )
          }
          disabled={loading}
        >
          Sum 1-4 (Always Fresh)
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>LocalStorage Cache</h3>
        <button
          onClick={() =>
            runTest('LocalStorage (first)', () =>
              // @ts-ignore
              localStorageProcessor(10, 20, 30, 40),
            )
          }
          disabled={loading}
        >
          Sum 10-40 (First Call)
        </button>
        <button
          onClick={() =>
            runTest('LocalStorage (cached)', () =>
              // @ts-ignore
              localStorageProcessor(10, 20, 30, 40),
            )
          }
          disabled={loading}
          style={{ marginLeft: '10px' }}
        >
          Sum 10-40 (Cached)
        </button>
        <button
          onClick={() => {
            localStorage.clear()
            setResult('LocalStorage cleared')
          }}
          style={{ marginLeft: '10px' }}
        >
          Clear Cache
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Comparison Test</h3>
        <button
          onClick={async () => {
            setLoading(true)
            setResult('Running comparison...')

            // Parallel with cache
            const start1 = Date.now()
            // @ts-ignore
            await parallelProcessor(1, 2, 3, 4)
            const time1 = Date.now() - start1

            // Serial with cache
            const start2 = Date.now()
            // @ts-ignore
            await serialProcessor(1, 2, 3, 4)
            const time2 = Date.now() - start2

            // No cache
            const start3 = Date.now()
            // @ts-ignore
            await noCacheProcessor(1, 2, 3, 4)
            const time3 = Date.now() - start3

            setResult(
              `Parallel: ${time1}ms | Serial: ${time2}ms | No Cache: ${time3}ms`,
            )
            setLoading(false)
          }}
          disabled={loading}
        >
          Compare All Modes
        </button>
      </div>

      {result && (
        <div
          style={{
            padding: '10px',
            background: '#f0f0f0',
            borderRadius: '4px',
            marginTop: '20px',
          }}
        >
          <strong>Result:</strong> {result}
        </div>
      )}

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p>
          <strong>Note:</strong> Each async operation takes 500-1500ms. Cached
          calls should be instant.
        </p>
        <p>
          Parallel mode processes pairs concurrently, serial mode processes one
          by one.
        </p>
      </div>
    </div>
  )
}
