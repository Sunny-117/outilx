import React from 'react';
import { useMethods, useNumber } from '@outilx/react-hooks';

// Calculator using useMethods
const calculatorMethods = {
  add: (state: number, value: number) => state + value,
  subtract: (state: number, value: number) => state - value,
  multiply: (state: number, value: number) => state * value,
  divide: (state: number, value: number) => (value !== 0 ? state / value : state),
  reset: () => 0,
  square: (state: number) => state * state,
  sqrt: (state: number) => Math.sqrt(state),
};

function Calculator() {
  const [value, { add, subtract, multiply, divide, reset, square, sqrt }] = useMethods(
    0,
    calculatorMethods
  );

  return (
    <div>
      <h4>计算器 (useMethods)</h4>
      <div>当前值: {value.toFixed(2)}</div>
      <div>
        <button onClick={() => add(1)}>+1</button>
        <button onClick={() => subtract(1)}>-1</button>
        <button onClick={() => multiply(2)}>×2</button>
        <button onClick={() => divide(2)}>÷2</button>
      </div>
      <div>
        <button onClick={() => add(10)}>+10</button>
        <button onClick={() => subtract(10)}>-10</button>
        <button onClick={square}>x²</button>
        <button onClick={sqrt}>√x</button>
      </div>
      <button onClick={reset}>重置</button>
    </div>
  );
}

// Counter using useNumber
function SimpleCounter() {
  const [count, { increment, decrement, set }] = useNumber(0);

  return (
    <div>
      <h4>简单计数器 (useNumber)</h4>
      <div>计数: {count}</div>
      <div>
        <button onClick={decrement}>-1</button>
        <button onClick={increment}>+1</button>
      </div>
      <div>
        <button onClick={() => set(0)}>重置为 0</button>
        <button onClick={() => set(100)}>设为 100</button>
      </div>
    </div>
  );
}

export default function MethodsDemo() {
  return (
    <div>
      <h2>useMethods & useNumber Demo</h2>
      <p>演示如何使用 useMethods 创建自定义状态管理方法，以及 useNumber 的便捷数字操作</p>
      
      <Calculator />
      <hr />
      <SimpleCounter />
      <hr />

      <div>
        <h4>Hooks 说明：</h4>
        <ul>
          <li><strong>useMethods</strong>: 通过定义方法对象来管理状态，适合复杂的状态转换逻辑</li>
          <li><strong>useNumber</strong>: 专门用于数字状态管理，内置 increment/decrement/set 方法</li>
          <li>两者都基于 useState，但提供了更语义化的 API</li>
        </ul>
      </div>
    </div>
  );
}
