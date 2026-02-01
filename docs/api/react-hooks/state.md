# State Management Hooks

## useBoolean

Manage boolean state with convenient actions.

```tsx
import { useBoolean } from '@outilx/react-hooks';

function Component() {
  const [visible, { setTrue, setFalse, toggle, set }] = useBoolean(false);
  
  return (
    <div>
      <p>Visible: {visible ? 'Yes' : 'No'}</p>
      <button onClick={setTrue}>Show</button>
      <button onClick={setFalse}>Hide</button>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}
```

## useToggle

Toggle between two values.

```tsx
import { useToggle } from '@outilx/react-hooks';

function Component() {
  const [state, { toggle, setLeft, setRight }] = useToggle('light', 'dark');
  
  return (
    <div>
      <p>Theme: {state}</p>
      <button onClick={toggle}>Toggle Theme</button>
    </div>
  );
}
```

## useMap

Manage Map state.

```tsx
import { useMap } from '@outilx/react-hooks';

function Component() {
  const [map, { set, setAll, remove, reset, get }] = useMap<string, number>([
    ['a', 1],
    ['b', 2],
  ]);
  
  return (
    <div>
      <button onClick={() => set('c', 3)}>Add C</button>
      <button onClick={() => remove('a')}>Remove A</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

## useCounter

Manage counter state.

```tsx
import { useCounter } from '@outilx/react-hooks';

function Component() {
  const [count, { inc, dec, set, reset }] = useCounter(0, { min: 0, max: 10 });
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => inc()}>+1</button>
      <button onClick={() => dec()}>-1</button>
      <button onClick={() => inc(5)}>+5</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

## useSetState

Manage object state like class component setState.

```tsx
import { useSetState } from '@outilx/react-hooks';

function Component() {
  const [state, setState] = useSetState({ name: '', age: 0 });
  
  return (
    <div>
      <input
        value={state.name}
        onChange={(e) => setState({ name: e.target.value })}
      />
      <input
        type="number"
        value={state.age}
        onChange={(e) => setState({ age: Number(e.target.value) })}
      />
    </div>
  );
}
```

## useArray

Manage array state with convenient methods.

```tsx
import { useArray } from '@outilx/react-hooks';

function TodoList() {
  const [todos, { push, remove, removeById, empty }] = useArray([
    { id: 1, text: 'Learn React' },
  ]);
  
  return (
    <div>
      <button onClick={() => push({ id: Date.now(), text: 'New Todo' })}>
        Add Todo
      </button>
      <button onClick={empty}>Clear All</button>
      {todos.map(todo => (
        <div key={todo.id}>
          {todo.text}
          <button onClick={() => removeById(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

## useNumber

Manage number state with increment/decrement.

```tsx
import { useNumber } from '@outilx/react-hooks';

function Counter() {
  const [count, { increment, decrement, set }] = useNumber(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={() => set(100)}>Set to 100</button>
    </div>
  );
}
```

## useMethods

Manage state with custom methods.

```tsx
import { useMethods } from '@outilx/react-hooks';

const counterMethods = {
  increment: (state: number) => state + 1,
  decrement: (state: number) => state - 1,
  add: (state: number, value: number) => state + value,
  multiply: (state: number, value: number) => state * value,
};

function Calculator() {
  const [value, { increment, decrement, add, multiply }] = useMethods(0, counterMethods);
  
  return (
    <div>
      <p>Value: {value}</p>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={() => add(10)}>+10</button>
      <button onClick={() => multiply(2)}>×2</button>
    </div>
  );
}
```
