/**
 * Type definitions for AI utilities
 * @module types
 */

/**
 * Represents a code block or text block
 */
export type CodeBlock = {
  /** Block type: 'code' for code blocks, 'text' for plain text */
  type: 'code' | 'text';
  /** Programming language (only for code blocks) */
  language?: string;
  /** Block content */
  content: string;
};

/**
 * Configuration for streaming simulator
 */
export type StreamingSimulatorConfig = {
  /** Array of text chunks to stream */
  chunks: string[];
  /** Interval between chunks in milliseconds (default: 100) */
  interval?: number;
  /** Initial content before streaming starts */
  initialContent?: string;
};
