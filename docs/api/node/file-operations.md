# File Operations

File manipulation utilities for Node.js.

## deleteFilesByPattern

Deletes files matching a specific pattern.

```typescript
function deleteFilesByPattern(options: {
  targetDir: string;
  pattern: string;
  recursive?: boolean;
}): Promise<string[]>
```

### Parameters

- `targetDir` - Target directory path
- `pattern` - File name or pattern to match (e.g., `*.tmp`, `test-*.js`)
- `recursive` - Whether to recursively delete files in subdirectories (default: false)

### Returns

Promise resolving to array of deleted file paths.

### Examples

```typescript
import { deleteFilesByPattern } from '@outilx/node';

// Delete all .tmp files in a directory
await deleteFilesByPattern({
  targetDir: './temp',
  pattern: '*.tmp'
});

// Recursively delete all .log files
await deleteFilesByPattern({
  targetDir: './logs',
  pattern: '*.log',
  recursive: true
});

// Delete specific test files
await deleteFilesByPattern({
  targetDir: './tests',
  pattern: 'test-*.spec.ts',
  recursive: true
});
```

## readModifiedFile

Reads a file with retry logic to handle file system race conditions.

```typescript
function readModifiedFile(file: string): Promise<string>
```

### Parameters

- `file` - Path to the file to read

### Returns

Promise resolving to file content as string.

### Description

This function handles edge cases where a file change event is triggered before the file is fully written. It polls the file's modification time and retries reading if the initial read returns empty content.

Useful for hot-reloading scenarios and file watchers.

### Examples

```typescript
import { readModifiedFile } from '@outilx/node';

// Read a file that might be in the process of being written
const content = await readModifiedFile('./config.json');

// Use in a file watcher
import { watch } from 'fs';

watch('./src', async (eventType, filename) => {
  if (eventType === 'change') {
    const content = await readModifiedFile(`./src/${filename}`);
    console.log('File updated:', content);
  }
});
```
