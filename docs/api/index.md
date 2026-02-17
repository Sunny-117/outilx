# API Reference

Browse the API documentation by package:

## @outilx/core

Core utility functions that work in any JavaScript runtime (Node.js, Deno, Bun, browsers).

### [Array Utilities](/api/core/array)
Functions for array manipulation and transformation.

### [Cache](/api/core/cache)
Caching utilities with TTL support and memoization.

### [JSON](/api/core/json)
Safe JSON parsing and stringification utilities.

### [URL](/api/core/url)
URL parameter parsing and manipulation.

### [Config](/api/core/config)
Configuration mapping utilities.

### [Async](/api/core/async)
Async processing with caching and execution strategies.

### [Similarity](/api/core/similarity)
Text similarity calculation (Levenshtein, TF-IDF).

---

## @outilx/browser

Browser-specific utility functions. Re-exports all of @outilx/core plus:

### [Network](/api/browser/network)
Network and HTTP utilities using browser APIs.

### [Storage](/api/browser/storage)
LocalStorage-based caching.

---

## @outilx/node

Utility functions for Node.js environments.

### [File Operations](/api/node/file-operations)
File manipulation and reading utilities.

### [Directory](/api/node/directory)
Directory management and cleanup utilities.

### [Repository](/api/node/repository)
Git repository automation utilities.

---

## @outilx/react-hooks

A comprehensive React Hooks library for state management, storage, performance optimization, and async operations.

### [State Management](/api/react-hooks/state)
Hooks for managing different types of state (boolean, toggle, counter, map, array, number, custom methods).

### [Storage](/api/react-hooks/storage)
Hooks for syncing state with storage mechanisms (localStorage, sessionStorage, cookies, URL).

### [Performance](/api/react-hooks/performance)
Hooks for optimizing React components (memoization, latest value reference).

### [Lifecycle](/api/react-hooks/lifecycle)
Hooks for handling component lifecycle events.

### [Async](/api/react-hooks/async)
Hooks for handling asynchronous operations (cancelable tasks, pending state tracking).

### [Utilities](/api/react-hooks/utilities)
Utility functions for creating custom hooks.

---

## @outilx/ai

AI utilities for code detection and streaming simulation.

### [Code Detection](/api/ai/code-detection)
Detect and parse code blocks from markdown-formatted text with automatic language identification.

### [Streaming Simulation](/api/ai/streaming)
React hook for simulating streaming data, perfect for testing AI chat interfaces and demos.
