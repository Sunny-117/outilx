# Getting Started

Welcome to Outilx documentation!

## What is Outilx?

Outilx is a modern, modular utility library collection for JavaScript/TypeScript development. It provides high-quality, well-tested utilities across different environments and frameworks.

**Current Packages:**

- **[@outilx/browser](/guide/browser)** - Utilities for browser environments
- **[@outilx/node](/guide/node)** - Utilities for Node.js environments
- **[@outilx/react-hooks](/guide/react-hooks)** - High-quality React Hooks library

## Features

- 🎯 **Modular** - Install only what you need
- 📦 **Tree-shakeable** - Optimized bundle sizes
- 🔷 **TypeScript** - Full type definitions included
- ⚡ **Modern** - Built with latest JavaScript features
- 🧪 **Tested** - Comprehensive test coverage

## Quick Start

Choose the package that fits your environment:

::: code-group

```bash [Browser]
npm install @outilx/browser
```

```bash [Node.js]
npm install @outilx/node
```

```bash [React]
npm install @outilx/react-hooks
```

:::

Then import and use:

::: code-group

```typescript [Browser]
import { toArray, TipCache, getUrlParams } from '@outilx/browser';

const arr = toArray(1); // [1]
const cache = new TipCache({ ttl: 5000 });
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

:::

## Next Steps

- Learn about [@outilx/browser](/guide/browser)
- Learn about [@outilx/node](/guide/node)
- Learn about [@outilx/react-hooks](/guide/react-hooks)
- Browse the [API Reference](/api/)
