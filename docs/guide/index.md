# Getting Started

Welcome to Outilx documentation!

## What is Outilx?

Outilx is a collection of modern utility libraries designed for both Node.js and Browser environments. It provides two main packages:

- **[@outilx/browser](/guide/browser)** - Utilities for browser environments
- **[@outilx/node](/guide/node)** - Utilities for Node.js environments

## Features

- 🌐 **Universal**: Separate packages for browser and Node.js
- 📦 **Tree-shakeable**: Import only what you need
- 🔷 **TypeScript**: Full type definitions included
- ⚡ **Modern**: Built with latest JavaScript features
- 🧪 **Tested**: Comprehensive test coverage

## Quick Start

Choose the package that fits your environment:

::: code-group

```bash [Browser]
npm install @outilx/browser
```

```bash [Node.js]
npm install @outilx/node
```

:::

Then import and use:

::: code-group

```typescript [Browser]
import { chunk, TipCache, getUrlParams } from '@outilx/browser';

const chunks = chunk([1, 2, 3, 4, 5], 2);
// [[1, 2], [3, 4], [5]]
```

```typescript [Node.js]
import { ensureDirExists, deleteEmptyDirs } from '@outilx/node';

await ensureDirExists('./my-dir');
await deleteEmptyDirs('./my-dir');
```

:::

## Next Steps

- Learn about [@outilx/browser](/guide/browser)
- Learn about [@outilx/node](/guide/node)
- Browse the [API Reference](/api/)
