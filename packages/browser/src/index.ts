// Re-export all utilities from @outilx/core for backward compatibility
export * from '@outilx/core'

// Browser-specific exports
export * from './core/network'
export { LocalStorageCache } from './storage'
