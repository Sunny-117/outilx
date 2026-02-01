# @outilx/node

Node.js utility functions for file operations, directory management, and more.

## Installation

```bash
npm install @outilx/node
```

## Features

### File Operations

Comprehensive file manipulation utilities:

```typescript
import { 
  deleteFilesByPattern,
  copyFiles,
  moveFiles 
} from '@outilx/node';

// Delete files by pattern
await deleteFilesByPattern('./src', '**/*.tmp');

// Copy files
await copyFiles('./src', './dist');

// Move files
await moveFiles('./temp', './archive');
```

### Directory Management

Easy directory operations:

```typescript
import { 
  ensureDirExists,
  deleteEmptyDirs 
} from '@outilx/node';

// Ensure directory exists
await ensureDirExists('./my-dir');

// Clean up empty directories
await deleteEmptyDirs('./project');
```

### Repository Automation

Automated repository management:

```typescript
import { autoPullRepository } from '@outilx/node';

// Auto-pull git repositories
await autoPullRepository({
  repoUrl: 'https://github.com/user/repo.git',
  localPath: './repos/my-repo',
  branch: 'main'
});
```

## API Reference

Browse the complete API documentation:

- [File Operations](/api/node/file-operations)
- [Directory](/api/node/directory)
- [Repository](/api/node/repository)
