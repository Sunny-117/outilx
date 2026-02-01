# @outilx/browser

Browser utility functions for arrays, caching, JSON, URL parsing, and more.

## Installation

```bash
npm install @outilx/browser
# or
pnpm add @outilx/browser
# or
yarn add @outilx/browser
```

## Usage

```typescript
import { chunk, TipCache, getUrlParams } from '@outilx/browser';

// Array utilities
const chunks = chunk([1, 2, 3, 4, 5], 2);
// [[1, 2], [3, 4], [5]]

// Caching
const cache = new TipCache({ maxSize: 100 });
cache.set('key', 'value');

// URL utilities
const params = getUrlParams('https://example.com?foo=bar');
// { foo: 'bar' }
```

## Features

- Array utilities (chunk, flatten, unique, etc.)
- Caching with TTL support
- JSON utilities
- URL parameter parsing
- Network utilities

## License

MIT
