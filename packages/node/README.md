# @outilx/node

Node.js utility functions for file operations, repository management, and more.

## Installation

```bash
npm install @outilx/node
# or
pnpm add @outilx/node
# or
yarn add @outilx/node
```

## Usage

```typescript
import { ensureDirExists, deleteEmptyDirs } from '@outilx/node';

// Ensure directory exists
await ensureDirExists('./my-dir');

// Delete empty directories
await deleteEmptyDirs('./my-dir');
```

## Features

- File operations (delete, copy, move)
- Directory management
- Repository auto-pull
- And more...

## License

MIT
