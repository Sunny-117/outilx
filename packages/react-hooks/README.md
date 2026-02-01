# @outilx/react-hooks

A high-quality & reliable React Hooks library.

## Installation

```bash
npm install @outilx/react-hooks
# or
pnpm add @outilx/react-hooks
# or
yarn add @outilx/react-hooks
```

## Usage

```tsx
import { useBoolean, useToggle, useCounter } from '@outilx/react-hooks';

function App() {
  const [visible, { toggle, setTrue, setFalse }] = useBoolean(false);
  const [count, { inc, dec, set, reset }] = useCounter(0);
  
  return (
    <div>
      <button onClick={toggle}>Toggle: {visible ? 'ON' : 'OFF'}</button>
      <button onClick={inc}>Count: {count}</button>
    </div>
  );
}
```

## Features

- 🎯 State Management Hooks
- 💾 Storage Hooks (localStorage, sessionStorage, cookie, URL)
- ⚡ Performance Hooks
- 🔄 Lifecycle Hooks
- 🚀 Async Hooks
- 📦 TypeScript Support
- ✅ Fully Tested

## License

MIT
