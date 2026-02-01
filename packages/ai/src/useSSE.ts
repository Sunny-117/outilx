/**
 * SSE (Server-Sent Events) utilities
 * @module useSSE
 */

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Configuration for SSE connection
 */
export interface SSEConfig {
  /** SSE endpoint URL */
  url: string;
  /** Whether to connect immediately on mount (default: false) */
  autoConnect?: boolean;
  /** Callback when connection opens */
  onOpen?: () => void;
  /** Callback when message is received */
  onMessage?: (data: string) => void;
  /** Callback when error occurs */
  onError?: (error: Event) => void;
  /** EventSource options */
  options?: EventSourceInit;
}

/**
 * SSE connection state
 */
export type SSEState = 'disconnected' | 'connecting' | 'connected' | 'error';

/**
 * React hook for Server-Sent Events (SSE) connections.
 * Provides a simple interface for receiving real-time updates from a server.
 * 
 * @param config - SSE configuration
 * @returns Object containing connection state, messages, and control functions
 * 
 * @example
 * ```tsx
 * import { useSSE } from '@outilx/ai';
 * 
 * function SSEDemo() {
 *   const { 
 *     messages, 
 *     state, 
 *     connect, 
 *     disconnect 
 *   } = useSSE({
 *     url: 'http://localhost:3000/sse',
 *     onMessage: (data) => console.log('Received:', data)
 *   });
 * 
 *   return (
 *     <div>
 *       <button onClick={connect} disabled={state === 'connected'}>
 *         Connect
 *       </button>
 *       <button onClick={disconnect} disabled={state === 'disconnected'}>
 *         Disconnect
 *       </button>
 *       <div>Status: {state}</div>
 *       <ul>
 *         {messages.map((msg, i) => (
 *           <li key={i}>{msg}</li>
 *         ))}
 *       </ul>
 *     </div>
 *   );
 * }
 * ```
 */
export const useSSE = (config: SSEConfig) => {
  const { url, autoConnect = false, onOpen, onMessage, onError, options } = config;
  
  const [state, setState] = useState<SSEState>('disconnected');
  const [messages, setMessages] = useState<string[]>([]);
  const eventSourceRef = useRef<EventSource | null>(null);
  const connectionTimeoutRef = useRef<number | null>(null);
  const isConnectedRef = useRef(false);
  const callbacksRef = useRef({ onOpen, onMessage, onError });

  // Update callbacks ref
  useEffect(() => {
    callbacksRef.current = { onOpen, onMessage, onError };
  }, [onOpen, onMessage, onError]);

  const connect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    setState('connecting');
    isConnectedRef.current = false;

    // Set a timeout for connection
    connectionTimeoutRef.current = window.setTimeout(() => {
      if (!isConnectedRef.current) {
        setState('error');
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
          eventSourceRef.current = null;
        }
      }
    }, 5000); // 5 second timeout

    try {
      const eventSource = new EventSource(url, options);
      eventSourceRef.current = eventSource;

      eventSource.onopen = (e) => {
        if (connectionTimeoutRef.current) {
          clearTimeout(connectionTimeoutRef.current);
          connectionTimeoutRef.current = null;
        }
        isConnectedRef.current = true;
        setState('connected');
        callbacksRef.current.onOpen?.();
      };

      eventSource.onmessage = (event) => {
        // If we receive a message, we're definitely connected
        if (!isConnectedRef.current) {
          if (connectionTimeoutRef.current) {
            clearTimeout(connectionTimeoutRef.current);
            connectionTimeoutRef.current = null;
          }
          isConnectedRef.current = true;
          setState('connected');
          callbacksRef.current.onOpen?.();
        }
        
        const data = event.data;
        setMessages((prev) => [...prev, data]);
        callbacksRef.current.onMessage?.(data);
      };

      eventSource.onerror = (error) => {
        // readyState: 0 = CONNECTING, 1 = OPEN, 2 = CLOSED
        if (eventSource.readyState === EventSource.CLOSED) {
          if (connectionTimeoutRef.current) {
            clearTimeout(connectionTimeoutRef.current);
            connectionTimeoutRef.current = null;
          }
          isConnectedRef.current = false;
          setState('error');
          callbacksRef.current.onError?.(error);
          eventSource.close();
          eventSourceRef.current = null;
        } else if (eventSource.readyState === EventSource.CONNECTING) {
          // Still connecting, don't close immediately
          return;
        }
      };
    } catch (error) {
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
        connectionTimeoutRef.current = null;
      }
      isConnectedRef.current = false;
      setState('error');
    }
  }, [url, options]);

  const disconnect = useCallback(() => {
    if (connectionTimeoutRef.current) {
      clearTimeout(connectionTimeoutRef.current);
      connectionTimeoutRef.current = null;
    }
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      isConnectedRef.current = false;
      setState('disconnected');
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  // Auto-connect on mount if enabled
  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    // Cleanup on unmount
    return () => {
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
      }
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [autoConnect, connect]);

  return {
    state,
    messages,
    connect,
    disconnect,
    clearMessages,
  };
};
