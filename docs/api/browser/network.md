# Network Utilities

Network information utilities for browser environments.

## getNetWorkInfo

Retrieves the current network status and connection information.

```typescript
function getNetWorkInfo(): {
  status: string;
  type?: any;
  rtt?: any;
  downlink?: any;
}
```

### Returns

An object containing network status and connection details:
- `status` - `"online"` or `"offline"`
- `type` - The effective type of the connection (e.g., '4g', '3g') when online
- `rtt` - The estimated round-trip time in milliseconds when online
- `downlink` - The effective bandwidth estimate in megabits per second when online

### Examples

```typescript
import { getNetWorkInfo } from '@outilx/browser';

// Get network information
const info = getNetWorkInfo();

if (info.status === 'online') {
  console.log(`Connection type: ${info.type}`);
  console.log(`RTT: ${info.rtt}ms`);
  console.log(`Downlink: ${info.downlink}Mbps`);
} else {
  console.log('Device is offline');
}

// Example output when online:
// {
//   status: 'online',
//   type: '4g',
//   rtt: 50,
//   downlink: 10
// }

// Example output when offline:
// {
//   status: 'offline'
// }
```

### Notes

- The `navigator.connection` API may not be supported in all browsers
- When offline, only the `status` property will be present
- Connection details are estimates and may vary
