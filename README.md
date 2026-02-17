<div align="center">
  <img src="./logo.svg" alt="Outilx Logo" width="200" height="200">
  <h1>Outilx</h1>
  <p><em>A modern, modular utility library collection for JavaScript/TypeScript</em></p>
</div>

Outilx is a monorepo of high-quality, well-tested utility libraries designed to simplify common development tasks across different JavaScript environments.

## 📦 Packages

| Package | Description | Version |
|---------|-------------|---------|
| [@outilx/core](./packages/core) | Core utilities for any runtime (Node.js, Deno, Bun, browsers) | ![npm](https://img.shields.io/npm/v/@outilx/core) |
| [@outilx/browser](./packages/browser) | Browser environment utilities (includes @outilx/core) | ![npm](https://img.shields.io/npm/v/@outilx/browser) |
| [@outilx/node](./packages/node) | Node.js environment utilities | ![npm](https://img.shields.io/npm/v/@outilx/node) |
| [@outilx/react-hooks](./packages/react-hooks) | React Hooks collection | ![npm](https://img.shields.io/npm/v/@outilx/react-hooks) |
| [@outilx/ai](./packages/ai) | AI utilities for code detection, streaming, and SSE | ![npm](https://img.shields.io/npm/v/@outilx/ai) |

## ✨ Features

- 🎯 **Modular** - Install only what you need
- 📦 **Tree-shakeable** - Optimized bundle sizes
- 🔷 **TypeScript** - Full type definitions included
- ⚡ **Modern** - Built with latest JavaScript features
- 🧪 **Well-tested** - Comprehensive test coverage
- 📚 **Well-documented** - Detailed API documentation

## 🚀 Quick Start

Choose the package that fits your needs:

```bash
# Core utilities (works in any JS runtime)
npm install @outilx/core

# Browser utilities (includes core)
npm install @outilx/browser

# Node.js utilities
npm install @outilx/node

# React Hooks
npm install @outilx/react-hooks

# AI utilities
npm install @outilx/ai
```

### Usage Examples

```typescript
// @outilx/core - Array, JSON, cache, async utilities (works everywhere)
import { toArray, parseJsonWithFallback, MemoryCache, TipCache, createAsyncProcessor } from '@outilx/core';

const arr = toArray(1); // [1]
const cache = new TipCache(100);
const memCache = new MemoryCache();

// @outilx/browser - Browser-specific utilities + all core exports
import { LocalStorageCache, toArray } from '@outilx/browser';

const browserCache = new LocalStorageCache('my-app');

// @outilx/node - File operations, directory management
import { ensureDirExists, deleteEmptyDirs, autoPullRepository } from '@outilx/node';

await ensureDirExists('./my-dir');
await deleteEmptyDirs('./my-dir');

// @outilx/react-hooks - State management, async operations, storage
import {
  useArray, useBoolean, useToggle, useCounter,
  useLocalStorageState, useTaskPendingState
} from '@outilx/react-hooks';

function Component() {
  const [items, { push, removeById }] = useArray([]);
  const [visible, { toggle }] = useBoolean(false);
  const [count, { inc, dec }] = useCounter(0);
  const [value, setValue] = useLocalStorageState('key', { defaultValue: '' });
  // ...
}

// @outilx/ai - Code detection, streaming simulation, SSE
import { detectCodeBlocks, useStreamingSimulator, useSSE } from '@outilx/ai';

const blocks = detectCodeBlocks(markdownText);
const { content, startStreaming } = useStreamingSimulator({ chunks, interval: 100 });
const { data, error, isConnected } = useSSE({ url: '/api/events' });
```

## 📚 Documentation

Visit our [documentation site](https://your-docs-url.com) for:
- Detailed API references
- Usage guides and examples
- Best practices
- Migration guides

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Run playground (interactive demos)
pnpm playground

# Documentation
pnpm docs:dev      # Start dev server
pnpm docs:build    # Build for production
```

## 📝 Release

This project uses [Changesets](https://github.com/changesets/changesets) for version management:

```bash
# Create a changeset
pnpm changeset

# Dry run (test without publishing)
pnpm release:dry

# Publish stable version
pnpm release

# Publish pre-release versions
pnpm release:alpha
pnpm release:beta
```

## 🏗️ Architecture

Built with modern tools for optimal developer experience:

- **pnpm workspaces** - Efficient package management
- **Turbo** - High-performance build system with smart caching
- **Changesets** - Streamlined version management and publishing
- **tsdown** - Fast TypeScript bundler
- **Vitest** - Lightning-fast unit testing
- **VitePress** - Modern documentation framework

## 🤝 Contributing

We welcome contributions! Whether it's:
- 🐛 Bug reports
- 💡 Feature requests
- 📖 Documentation improvements
- 🔧 Code contributions

Please check our [contributing guidelines](./CONTRIBUTING.md) before submitting.

## 📄 License

MIT © [Sunny-117]

---

<p align="center">Made with ❤️ by the Outilx team</p>
