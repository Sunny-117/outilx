# React Hooks

`@outilx/react-hooks` is a high-quality & reliable React Hooks library that provides a collection of commonly used hooks for React applications.

## Installation

```bash
npm install @outilx/react-hooks
# or
pnpm add @outilx/react-hooks
# or
yarn add @outilx/react-hooks
```

## Features

- 🎯 **State Management** - Boolean, toggle, counter, map, and object state hooks
- 💾 **Storage** - Sync state with localStorage, sessionStorage, cookies, and URL
- ⚡ **Performance** - Memoization and latest value hooks
- 🔄 **Lifecycle** - Unmount and effect hooks
- 🚀 **Async** - Cancelable async task hooks
- 📦 **TypeScript** - Full TypeScript support with type inference
- ✅ **Tested** - Comprehensive test coverage

## Quick Start

```tsx
import { useBoolean, useCounter, useLocalStorageState } from '@outilx/react-hooks';

function App() {
  const [visible, { toggle }] = useBoolean(false);
  const [count, { inc, dec }] = useCounter(0);
  const [user, setUser] = useLocalStorageState('user', { name: 'Guest' });
  
  return (
    <div>
      <button onClick={toggle}>
        {visible ? 'Hide' : 'Show'}
      </button>
      
      <div>
        <button onClick={() => dec()}>-</button>
        <span>{count}</span>
        <button onClick={() => inc()}>+</button>
      </div>
      
      <p>Welcome, {user.name}</p>
    </div>
  );
}
```

## Categories

### State Management Hooks

Manage different types of state with convenient APIs:

- `useBoolean` - Boolean state with toggle, setTrue, setFalse
- `useToggle` - Toggle between two values
- `useCounter` - Counter with inc, dec, set, reset
- `useMap` - Map state management
- `useSetState` - Object state like class component

### Storage Hooks

Sync state with various storage mechanisms:

- `useLocalStorageState` - Persist state in localStorage
- `useSessionStorageState` - Persist state in sessionStorage
- `useCookieState` - Sync state with cookies
- `useUrlState` - Sync state with URL query parameters

### Performance Hooks

Optimize your React components:

- `useLatest` - Always get the latest value without re-render
- `useMemoizedFn` - Memoize function to prevent re-creation

### Lifecycle Hooks

Handle component lifecycle:

- `useUnmount` - Execute callback on unmount

### Async Hooks

Handle asynchronous operations:

- `useCancelableAsyncTaskCallback` - Create cancelable async tasks

## API Reference

For detailed API documentation, see the [API Reference](/api/react-hooks/).
