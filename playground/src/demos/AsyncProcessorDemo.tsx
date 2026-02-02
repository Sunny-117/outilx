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

interface TestResult {
  name: string
  result: string
  duration: number
  timestamp: number
}

export function AsyncProcessorDemo() {
  const [results, setResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState(false)

  const addResult = (name: string, result: string, duration: number) => {
    setResults(prev => [...prev, { name, result, duration, timestamp: Date.now() }])
  }

  const runTest = async (name: string, fn: () => Promise<any>) => {
    setLoading(true)
    const start = Date.now()
    try {
      const res = await fn()
      const duration = Date.now() - start
      addResult(name, `${res}`, duration)
    } catch (error) {
      addResult(name, `Error - ${error}`, 0)
    }
    setLoading(false)
  }

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div style={{ flex: 1 }}>
        <h2>Async Processor Demo</h2>

        <div style={{ marginBottom: '20px' }}>
          <h3>Simple Promisify</h3>
          <button
            onClick={() => runTest('Promisify (5+3)', () => promisifiedAdd(5, 3))}
            disabled={loading}
          >
            Add 5 + 3
          </button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Parallel Mode with Cache</h3>
          <button
            onClick={() =>
              runTest('Parallel (1-8, first)', () =>
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
              runTest('Parallel (1-8, cached)', () =>
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
              runTest('Serial (2,4,6,8, first)', () =>
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
              runTest('Serial (2,4,6,8, cached)', () =>
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
              runTest('No Cache (1-4)', () =>
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
              runTest('LocalStorage (10-40, first)', () =>
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
              runTest('LocalStorage (10-40, cached)', () =>
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
              addResult('Clear Cache', 'LocalStorage cleared', 0)
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

              // Parallel with cache
              const start1 = Date.now()
              // @ts-ignore
              const res1 = await parallelProcessor(1, 2, 3, 4)
              const time1 = Date.now() - start1

              // Serial with cache
              const start2 = Date.now()
              // @ts-ignore
              const res2 = await serialProcessor(1, 2, 3, 4)
              const time2 = Date.now() - start2

              // No cache
              const start3 = Date.now()
              // @ts-ignore
              const res3 = await noCacheProcessor(1, 2, 3, 4)
              const time3 = Date.now() - start3

              addResult('Comparison', `Parallel: ${time1}ms | Serial: ${time2}ms | No Cache: ${time3}ms`, time1 + time2 + time3)
              setLoading(false)
            }}
            disabled={loading}
          >
            Compare All Modes
          </button>
        </div>

        <div style={{ marginTop: '20px' }}>
          <button
            onClick={() => setResults([])}
            style={{
              padding: '8px 16px',
              background: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Clear Results
          </button>
        </div>

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

      <div
        style={{
          flex: 1,
          background: '#f5f5f5',
          padding: '20px',
          borderRadius: '8px',
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <h3 style={{ marginTop: 0 }}>Results</h3>
        {results.length === 0 ? (
          <p style={{ color: '#999' }}>No results yet. Run some tests!</p>
        ) : (
          <div>
            {results.map((result, index) => (
              <div
                key={result.timestamp}
                style={{
                  background: 'white',
                  padding: '12px',
                  marginBottom: '10px',
                  borderRadius: '4px',
                  borderLeft: '4px solid #4CAF50',
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  #{index + 1} {result.name}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  Result: <strong>{result.result}</strong>
                </div>
                <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                  Duration: {result.duration}ms
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
