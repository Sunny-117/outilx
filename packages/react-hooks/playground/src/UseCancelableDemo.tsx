import React, { useEffect } from 'react';
import { useCancelableAsyncTaskCallback } from '@outilx/react-hooks';

// A fake async task that resolves after 1s and supports AbortSignal
async function fakeFetch(
  params: { id?: number } = {}, 
  options?: { signal?: AbortSignal | null; timeout?: number }
): Promise<{ id?: number; ts: number }> {
  const { id } = params || {};
  const { signal } = options || {};
  return await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      resolve({ id, ts: Date.now() });
    }, 1000);
    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timeout);
        reject(new DOMException('Aborted', 'AbortError'));
      });
    }
  });
}

export default function UseCancelableDemo() {
  const [run, { pending: loading, data, error, cancel }] = useCancelableAsyncTaskCallback<
    { id?: number }, 
    { id?: number; ts: number }
  >(
    fakeFetch,
    undefined,
    { timeout: 2000 }
  );

  useEffect(() => {
    // start a request on mount
    run({ id: 1 }).catch(() => {});

    // cancel after 300ms to demonstrate cancellation
    const t = setTimeout(() => cancel(), 300);
    return () => clearTimeout(t);
  }, [run, cancel]);

  return (
    <div>
      <h2>useCancelableAsyncTaskCallback Demo</h2>
      <p>演示可取消的异步任务，支持超时和手动取消</p>

      <div>
        <p>Loading: {loading ? 'yes' : 'no'}</p>
        <p>Data: {data ? JSON.stringify(data) : 'none'}</p>
        <p>Error: {error ? String(error) : 'none'}</p>
      </div>

      <div>
        <button 
          onClick={() => run({ id: Math.floor(Math.random() * 100) }).catch(() => {})}
          disabled={loading}
        >
          {loading ? '请求中...' : '发起请求'}
        </button>
        <button 
          onClick={() => cancel()}
          disabled={!loading}
        >
          取消请求
        </button>
      </div>

      <hr />

      <div>
        <h4>功能说明：</h4>
        <ul>
          <li>支持通过 AbortSignal 取消正在进行的异步任务</li>
          <li>支持设置超时时间，超时自动取消</li>
          <li>自动管理 loading、data、error 状态</li>
          <li>组件卸载时自动取消未完成的请求</li>
        </ul>
      </div>
    </div>
  );
}
