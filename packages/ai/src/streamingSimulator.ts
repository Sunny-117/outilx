/**
 * Streaming simulation utilities
 * @module streamingSimulator
 */

import { useState, useRef, useEffect } from 'react';
import type { StreamingSimulatorConfig } from './types';

/**
 * React hook for simulating streaming data (like AI responses).
 * Useful for testing and demonstrating streaming interfaces without a real backend.
 * 
 * @param config - Streaming simulator configuration
 * @returns Object containing current content, streaming state, and control functions
 * 
 * @example
 * ```tsx
 * import { useStreamingSimulator } from '@outilx/ai';
 * 
 * function StreamingDemo() {
 *   const { content, isStreaming, startStreaming } = useStreamingSimulator({
 *     chunks: ['Hello', ' ', 'World', '!'],
 *     interval: 100,
 *     initialContent: ''
 *   });
 * 
 *   return (
 *     <div>
 *       <button onClick={startStreaming} disabled={isStreaming}>
 *         Start Streaming
 *       </button>
 *       <pre>{content}</pre>
 *     </div>
 *   );
 * }
 * ```
 */
export const useStreamingSimulator = (config: StreamingSimulatorConfig) => {
  const [content, setContent] = useState(config.initialContent || '');
  const [isStreaming, setIsStreaming] = useState(false);
  const currentIndexRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  const startStreaming = () => {
    if (isStreaming) return;

    setIsStreaming(true);
    currentIndexRef.current = 0;
    setContent(config.initialContent || '');

    timerRef.current = window.setInterval(() => {
      if (currentIndexRef.current < config.chunks.length) {
        setContent(prev => prev + config.chunks[currentIndexRef.current]);
        currentIndexRef.current++;
      } else {
        stopStreaming();
      }
    }, config.interval || 100);
  };

  const stopStreaming = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsStreaming(false);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return {
    content,
    isStreaming,
    startStreaming,
    stopStreaming
  };
};
