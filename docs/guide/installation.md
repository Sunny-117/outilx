# Installation

## Package Manager

Install the package you need using your preferred package manager:

::: code-group

```bash [npm]
# Browser utilities
npm install @outilx/browser

# Node.js utilities
npm install @outilx/node
```

```bash [pnpm]
# Browser utilities
pnpm add @outilx/browser

# Node.js utilities
pnpm add @outilx/node
```

```bash [yarn]
# Browser utilities
yarn add @outilx/browser

# Node.js utilities
yarn add @outilx/node
```

:::

## CDN (Browser Only)

You can use @outilx/browser directly from a CDN:

```html
<script type="module">
  import { chunk } from 'https://esm.sh/@outilx/browser';
  
  console.log(chunk([1, 2, 3, 4], 2));
</script>
```

## TypeScript

Both packages are written in TypeScript and include type definitions out of the box. No additional setup required!

```typescript
import { chunk } from '@outilx/browser';

const result = chunk([1, 2, 3, 4], 2);
// TypeScript knows result is number[][]
```

## Version Compatibility

- **Node.js**: Requires Node.js 16.x or higher
- **Browsers**: Supports all modern browsers (ES2015+)
