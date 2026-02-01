import { useState } from 'react';
import {
  useBoolean,
  useCounter,
  useArray,
  useToggle,
  useMap,
  useTaskPending,
} from '@outilx/react-hooks';

function ReactHooksDemo() {
  const [activeHook, setActiveHook] = useState<string>('useBoolean');

  return (
    <div>
      <h2>React Hooks Demo</h2>
      <p>测试 @outilx/react-hooks 包的各种 hooks</p>

      <div style={{ marginBottom: '20px' }}>
        <select
          value={activeHook}
          onChange={(e) => setActiveHook(e.target.value)}
          style={{ padding: '8px', fontSize: '14px' }}
        >
          <option value="useBoolean">useBoolean</option>
          <option value="useCounter">useCounter</option>
          <option value="useArray">useArray</option>
          <option value="useToggle">useToggle</option>
          <option value="useMap">useMap</option>
          <option value="useTaskPending">useTaskPending</option>
        </select>
      </div>

      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
        {activeHook === 'useBoolean' && <UseBooleanDemo />}
        {activeHook === 'useCounter' && <UseCounterDemo />}
        {activeHook === 'useArray' && <UseArrayDemo />}
        {activeHook === 'useToggle' && <UseToggleDemo />}
        {activeHook === 'useMap' && <UseMapDemo />}
        {activeHook === 'useTaskPending' && <UseTaskPendingDemo />}
      </div>
    </div>
  );
}

function UseBooleanDemo() {
  const [visible, { setTrue, setFalse, toggle }] = useBoolean(false);

  return (
    <div>
      <h3>useBoolean</h3>
      <p>当前值: <strong>{visible ? 'true' : 'false'}</strong></p>
      <button onClick={setTrue} style={{ padding: '8px 16px', marginRight: '10px' }}>
        设为 True
      </button>
      <button onClick={setFalse} style={{ padding: '8px 16px', marginRight: '10px' }}>
        设为 False
      </button>
      <button onClick={toggle} style={{ padding: '8px 16px' }}>
        切换
      </button>
    </div>
  );
}

function UseCounterDemo() {
  const [count, { inc, dec, set, reset }] = useCounter(0, { min: 0, max: 10 });

  return (
    <div>
      <h3>useCounter</h3>
      <p>当前值: <strong>{count}</strong> (范围: 0-10)</p>
      <button onClick={() => dec()} style={{ padding: '8px 16px', marginRight: '10px' }}>
        -1
      </button>
      <button onClick={() => inc()} style={{ padding: '8px 16px', marginRight: '10px' }}>
        +1
      </button>
      <button onClick={() => inc(5)} style={{ padding: '8px 16px', marginRight: '10px' }}>
        +5
      </button>
      <button onClick={() => set(5)} style={{ padding: '8px 16px', marginRight: '10px' }}>
        设为 5
      </button>
      <button onClick={reset} style={{ padding: '8px 16px' }}>
        重置
      </button>
    </div>
  );
}

function UseArrayDemo() {
  const [items, { push, remove, removeById, empty }] = useArray([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ]);

  return (
    <div>
      <h3>useArray</h3>
      <button
        onClick={() => push({ id: Date.now(), name: `Item ${items.length + 1}` })}
        style={{ padding: '8px 16px', marginRight: '10px', marginBottom: '10px' }}
      >
        添加项目
      </button>
      <button
        onClick={empty}
        style={{ padding: '8px 16px', marginBottom: '10px' }}
      >
        清空
      </button>
      <div>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              padding: '10px',
              marginBottom: '5px',
              background: '#f5f5f5',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>{item.name}</span>
            <button
              onClick={() => removeById(item.id)}
              style={{ padding: '4px 8px', cursor: 'pointer' }}
            >
              删除
            </button>
          </div>
        ))}
        {items.length === 0 && <div style={{ color: '#999' }}>暂无项目</div>}
      </div>
    </div>
  );
}

function UseToggleDemo() {
  const [theme, { toggle, setLeft, setRight }] = useToggle('light', 'dark');

  return (
    <div>
      <h3>useToggle</h3>
      <p>当前主题: <strong>{theme}</strong></p>
      <button onClick={toggle} style={{ padding: '8px 16px', marginRight: '10px' }}>
        切换主题
      </button>
      <button onClick={setLeft} style={{ padding: '8px 16px', marginRight: '10px' }}>
        设为 Light
      </button>
      <button onClick={setRight} style={{ padding: '8px 16px' }}>
        设为 Dark
      </button>
    </div>
  );
}

function UseMapDemo() {
  const [map, { set, remove, reset }] = useMap<string, number>([
    ['a', 1],
    ['b', 2],
  ]);

  return (
    <div>
      <h3>useMap</h3>
      <button
        onClick={() => set(`key${map.size + 1}`, map.size + 1)}
        style={{ padding: '8px 16px', marginRight: '10px', marginBottom: '10px' }}
      >
        添加项
      </button>
      <button
        onClick={reset}
        style={{ padding: '8px 16px', marginBottom: '10px' }}
      >
        重置
      </button>
      <div>
        {Array.from(map.entries()).map(([key, value]) => (
          <div
            key={key}
            style={{
              padding: '10px',
              marginBottom: '5px',
              background: '#f5f5f5',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>
              {key}: {value}
            </span>
            <button
              onClick={() => remove(key)}
              style={{ padding: '4px 8px', cursor: 'pointer' }}
            >
              删除
            </button>
          </div>
        ))}
        {map.size === 0 && <div style={{ color: '#999' }}>Map 为空</div>}
      </div>
    </div>
  );
}

function UseTaskPendingDemo() {
  const mockFetch = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return '数据加载完成！';
  };

  const [loadData, isPending] = useTaskPending(mockFetch);

  const handleClick = async () => {
    const result = await loadData();
    alert(result);
  };

  return (
    <div>
      <h3>useTaskPending</h3>
      <p>模拟异步任务，带有 pending 状态</p>
      <button
        onClick={handleClick}
        disabled={isPending}
        style={{
          padding: '10px 20px',
          cursor: isPending ? 'not-allowed' : 'pointer',
          background: isPending ? '#ccc' : '#4CAF50',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        {isPending ? '加载中...' : '加载数据 (2秒)'}
      </button>
    </div>
  );
}

export default ReactHooksDemo;
