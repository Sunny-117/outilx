# Repository Operations

Git repository automation utilities for Node.js.

## autoPullRepository

Automatically clones or updates all repositories for a user from GitHub or Gitee.

```typescript
function autoPullRepository(config: {
  username: string;
  token?: string;
  platform: "github" | "gitee";
  cloneDir?: string;
  concurrency?: number;
  timeoutMs?: number;
}): Promise<void>
```

### Parameters

- `username` - GitHub or Gitee username
- `token` - Personal access token (optional, can be set via `GIT_TOKEN` env variable)
- `platform` - Git platform: `"github"` or `"gitee"`
- `cloneDir` - Base directory for cloning repos (default: `"cloned_repos"`)
- `concurrency` - Number of concurrent operations (default: 5)
- `timeoutMs` - Timeout for each operation in milliseconds (default: 120000)

### Environment Variables

- `GIT_TOKEN` - Personal access token (used if not provided in config)
- `GIT_TIMEOUT_MS` - Default timeout in milliseconds

### Returns

Promise that resolves when all repositories are processed.

### Examples

#### Basic Usage

```typescript
import { autoPullRepository } from '@outilx/node';

// Clone/update all GitHub repos
await autoPullRepository({
  username: 'octocat',
  token: 'ghp_xxxxxxxxxxxx',
  platform: 'github'
});
```

#### With Custom Configuration

```typescript
await autoPullRepository({
  username: 'myuser',
  token: 'ghp_xxxxxxxxxxxx',
  platform: 'github',
  cloneDir: './my-repos',
  concurrency: 10,
  timeoutMs: 300000 // 5 minutes
});
```

#### Using Environment Variables

Create a `.env` file:

```env
GIT_TOKEN=ghp_xxxxxxxxxxxx
GIT_TIMEOUT_MS=180000
```

Then use:

```typescript
import { autoPullRepository } from '@outilx/node';

await autoPullRepository({
  username: 'myuser',
  platform: 'github'
  // token will be read from GIT_TOKEN env variable
});
```

#### Gitee Platform

```typescript
await autoPullRepository({
  username: 'myuser',
  token: 'your_gitee_token',
  platform: 'gitee',
  cloneDir: './gitee-repos'
});
```

### Features

- **Automatic Detection**: Clones new repos, pulls updates for existing ones
- **Concurrent Operations**: Configurable concurrency for faster processing
- **Progress Tracking**: Real-time progress output with heartbeat monitoring
- **Error Handling**: Continues processing even if some repos fail
- **Timeout Protection**: Prevents hanging on slow operations
- **Failed Repos Report**: Generates `failed_repos.json` for failed operations

### Output

The function provides detailed console output:

```
Found 42 repositories on github
Cloning to: cloned_repos/octocat

[1/42] Processing repo-name
  ↳ Cloning repository...
  ✓ Cloned successfully

[2/42] Processing another-repo
  ↳ Updating repository...
  ✓ Updated successfully

...

All repositories processed!
```

### Error Handling

Failed repositories are logged and saved to `failed_repos.json`:

```json
[
  {
    "name": "large-repo",
    "reason": "timeout after 120000ms"
  },
  {
    "name": "private-repo",
    "reason": "Authentication failed"
  }
]
```

### Getting a Personal Access Token

#### GitHub

1. Go to Settings → Developer settings → Personal access tokens
2. Generate new token with `repo` scope
3. Copy the token (starts with `ghp_`)

#### Gitee

1. Go to Settings → Private Token
2. Generate new token with `projects` scope
3. Copy the token
