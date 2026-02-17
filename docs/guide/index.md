# Getting Started

Welcome to Outilx documentation!

## What is Outilx?

Outilx is a modern, modular utility library collection for JavaScript/TypeScript development. It provides high-quality, well-tested utilities across different environments and frameworks.

**Current Packages:**

- **[@outilx/core](/guide/core)** - Core utilities for any JavaScript runtime (Node.js, Deno, Bun, browsers)
- **[@outilx/browser](/guide/browser)** - Browser-specific utilities (extends @outilx/core)
- **[@outilx/node](/guide/node)** - Utilities for Node.js environments
- **[@outilx/react-hooks](/guide/react-hooks)** - High-quality React Hooks library
- **[@outilx/ai](/guide/ai)** - AI utilities for code detection and streaming

## Features

- 🎯 **Modular** - Install only what you need
- 📦 **Tree-shakeable** - Optimized bundle sizes
- 🔷 **TypeScript** - Full type definitions included
- ⚡ **Modern** - Built with latest JavaScript features
- 🧪 **Tested** - Comprehensive test coverage

## Quick Start

Choose the package that fits your environment:

::: code-group

```bash [Core (Any Runtime)]
npm install @outilx/core
```

```bash [Browser]
npm install @outilx/browser
```

```bash [Node.js]
npm install @outilx/node
```

```bash [React]
npm install @outilx/react-hooks
```

```bash [AI]
npm install @outilx/ai
```

:::

Then import and use:

::: code-group

```typescript [Core (Any Runtime)]
import { toArray, TipCache, getUrlParams, parseJsonWithFallback } from '@outilx/core';

const arr = toArray(1); // [1]
const cache = new TipCache(5000);
const params = getUrlParams('foo=bar');
```

```typescript [Browser]
import { toArray, TipCache, getUrlParams, getNetWorkInfo, LocalStorageCache } from '@outilx/browser';

const arr = toArray(1); // [1]
const cache = new TipCache({ ttl: 5000 });
const networkInfo = getNetWorkInfo();
```

```typescript [Node.js]
import { ensureDirExists, deleteEmptyDirs } from '@outilx/node';

await ensureDirExists('./my-dir');
await deleteEmptyDirs('./my-dir');
```

```typescript [React]
import { useBoolean, useCounter } from '@outilx/react-hooks';

function App() {
  const [visible, { toggle }] = useBoolean(false);
  const [count, { inc }] = useCounter(0);
  return <div>...</div>;
}
```

```typescript [AI]
import { detectCodeBlocks, useStreamingSimulator } from '@outilx/ai';

const blocks = detectCodeBlocks(markdownText);
const { content, startStreaming } = useStreamingSimulator({
  chunks: ['Hello', ' ', 'World'],
  interval: 100
});
```

:::

## Next Steps

- Learn about [@outilx/core](/guide/core)
- Learn about [@outilx/browser](/guide/browser)
- Learn about [@outilx/node](/guide/node)
- Learn about [@outilx/react-hooks](/guide/react-hooks)
- Learn about [@outilx/ai](/guide/ai)
- Browse the [API Reference](/api/)
