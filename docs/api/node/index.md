# @outilx/node API

Node.js utility functions for file operations and automation.

## Modules

- [File Operations](/api/node/file-operations) - File manipulation utilities
- [Directory](/api/node/directory) - Directory management
- [Repository](/api/node/repository) - Git repository automation

## Installation

```bash
npm install @outilx/node
```

## Quick Example

```typescript
import { 
  ensureDirExists,
  deleteEmptyDirs,
  deleteFilesByPattern,
  autoPullRepository 
} from '@outilx/node';

// Directory operations
ensureDirExists('./data/users');
await deleteEmptyDirs('./temp', true);

// File operations
await deleteFilesByPattern({
  targetDir: './logs',
  pattern: '*.log',
  recursive: true
});

// Repository automation
await autoPullRepository({
  username: 'myuser',
  platform: 'github'
});
```
