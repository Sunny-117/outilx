# Directory Operations

Directory management utilities for Node.js.

## ensureDirExists

Ensures that a directory exists, creating it if necessary.

```typescript
function ensureDirExists(filePath: string): void
```

### Parameters

- `filePath` - File path or directory path

### Description

Creates the directory (and any parent directories) if it doesn't exist. If a file path is provided, it creates the parent directory.

### Examples

```typescript
import { ensureDirExists } from '@outilx/node';

// Ensure directory exists before writing a file
ensureDirExists('./data/users/profiles');

// Create parent directory for a file
ensureDirExists('./logs/app.log');

// Use before file operations
import { writeFileSync } from 'fs';

const filePath = './output/reports/2024/report.json';
ensureDirExists(filePath);
writeFileSync(filePath, JSON.stringify(data));
```

## deleteEmptyDirs

Deletes all empty directories in a target directory.

```typescript
function deleteEmptyDirs(
  targetDir: string,
  recursive?: boolean
): Promise<string[]>
```

### Parameters

- `targetDir` - Target directory to scan
- `recursive` - Whether to recursively delete empty subdirectories (default: false)

### Returns

Promise resolving to array of deleted directory paths.

### Examples

```typescript
import { deleteEmptyDirs } from '@outilx/node';

// Delete empty directories (non-recursive)
await deleteEmptyDirs('./temp');

// Recursively delete all empty directories
await deleteEmptyDirs('./project', true);

// Clean up after build
await deleteEmptyDirs('./dist', true);

// Get list of deleted directories
const deleted = await deleteEmptyDirs('./cache', true);
console.log(`Deleted ${deleted.length} empty directories`);
```

## Use Cases

### Before File Operations

```typescript
import { ensureDirExists } from '@outilx/node';
import { writeFile } from 'fs/promises';

async function saveData(data: any, filePath: string) {
  ensureDirExists(filePath);
  await writeFile(filePath, JSON.stringify(data));
}
```

### Clean Up Build Artifacts

```typescript
import { deleteEmptyDirs, deleteFilesByPattern } from '@outilx/node';

async function cleanBuild() {
  // Delete temporary files
  await deleteFilesByPattern({
    targetDir: './dist',
    pattern: '*.tmp',
    recursive: true
  });
  
  // Remove empty directories
  await deleteEmptyDirs('./dist', true);
}
```
