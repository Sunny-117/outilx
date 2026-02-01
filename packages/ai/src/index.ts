/**
 * @outilx/ai - AI utilities for code detection and streaming simulation
 * @module @outilx/ai
 */

// Code detection
export { detectCodeBlocks } from './codeDetector';

// Streaming simulation (React hook)
export { useStreamingSimulator } from './streamingSimulator';

// SSE (Server-Sent Events) support
export { useSSE } from './useSSE';
export type { SSEConfig, SSEState } from './useSSE';

// Types
export type { CodeBlock, StreamingSimulatorConfig } from './types';
