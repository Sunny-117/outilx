# @outilx/browser

Browser utility functions for modern web development.

> **Note**: This package re-exports all utilities from `@outilx/core` for backward compatibility. If you don't need browser-specific features, consider using `@outilx/core` directly.

## Installation

```bash
npm install @outilx/browser
```

## Features

### Network Utilities

Get network information using browser APIs:

```typescript
import { getNetWorkInfo } from '@outilx/browser';

const info = getNetWorkInfo();
// { status: 'online', type: '4g', rtt: 50, downlink: 10 }
```

::: warning
This uses `navigator.connection` which is not available in all browsers.
:::

### LocalStorage Cache

Persistent cache using localStorage:

```typescript
import { LocalStorageCache } from '@outilx/browser';

const cache = new LocalStorageCache('my_prefix_');

await cache.set('key', { data: 'value' });
const data = await cache.get('key');
cache.has('key');
cache.delete('key');
cache.clear();
```

## API Reference

- [Network](/api/browser/network)
- [Storage](/api/browser/storage)
