# React Hooks API

A high-quality & reliable React Hooks library.

## State Management Hooks

- [useBoolean](./state.md#useboolean) - Manage boolean state with convenient actions
- [useToggle](./state.md#usetoggle) - Toggle between two values
- [useMap](./state.md#usemap) - Manage Map state
- [useCounter](./state.md#usecounter) - Manage counter state
- [useSetState](./state.md#usesetstate) - Manage object state like class component setState
- [useArray](./state.md#usearray) - Manage array state with convenient methods
- [useNumber](./state.md#usenumber) - Manage number state with increment/decrement
- [useMethods](./state.md#usemethods) - Manage state with custom methods

## Storage Hooks

- [useLocalStorageState](./storage.md#uselocalstoragestate) - Sync state with localStorage
- [useSessionStorageState](./storage.md#usesessionstoragestate) - Sync state with sessionStorage
- [useCookieState](./storage.md#usecookiestate) - Sync state with cookies

## Performance Hooks

- [useLatest](./performance.md#uselatest) - Get the latest value without re-rendering
- [useMemoizedFn](./performance.md#usememoizedfn) - Memoize function to avoid re-creation

## Lifecycle Hooks

- [useUnmount](./lifecycle.md#useunmount) - Execute callback on component unmount

## Async Hooks

- [useCancelableAsyncTaskCallback](./async.md#usecancelableasynctaskcallback) - Create cancelable async task callback
- [useTaskPending](./async.md#usetaskpending) - Wrap async task with pending state
- [useTaskPendingState](./async.md#usetaskpendingstate) - Wrap async task with pending state and store result

## Utilities

- [createUseStorageState](./utilities.md#createusestoragestate) - Create custom storage state hook
