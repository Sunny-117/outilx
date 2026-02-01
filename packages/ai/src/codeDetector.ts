/**
 * Code detection utilities
 * @module codeDetector
 */

import type { CodeBlock } from './types';
import hljs from 'highlight.js';

/**
 * Detects code blocks in text and automatically identifies the programming language.
 * Supports markdown code block syntax (```language) and automatic language detection.
 * 
 * @param text - Input text to parse
 * @returns Array of detected code blocks and text blocks
 * 
 * @example
 * ```ts
 * const text = `
 * Here is some text
 * \`\`\`javascript
 * const x = 1;
 * \`\`\`
 * More text
 * `;
 * 
 * const blocks = detectCodeBlocks(text);
 * // [
 * //   { type: 'text', content: 'Here is some text\n' },
 * //   { type: 'code', language: 'javascript', content: 'const x = 1;' },
 * //   { type: 'text', content: 'More text\n' }
 * // ]
 * ```
 */
export const detectCodeBlocks = (text: string): CodeBlock[] => {
  const blocks: CodeBlock[] = [];
  let currentIndex = 0;

  while (currentIndex < text.length) {
    const startIdx = text.indexOf('```', currentIndex);

    // No code block marker found, add remaining text
    if (startIdx === -1) {
      blocks.push({
        type: 'text',
        content: text.slice(currentIndex)
      });
      break;
    }

    // Add text before code block
    if (startIdx > currentIndex) {
      blocks.push({
        type: 'text',
        content: text.slice(currentIndex, startIdx)
      });
    }

    // Find code block end position
    const endIdx = text.indexOf('```', startIdx + 3);

    // No closing marker, treat remaining content as code
    if (endIdx === -1) {
      const codeContent = text.slice(startIdx + 3);
      // Auto-detect language
      const auto = hljs.highlightAuto(codeContent);
      const detectedLang = auto.language || 'unknown';
      blocks.push({
        type: 'code',
        language: detectedLang,
        content: codeContent
      });
      break;
    }

    // Extract language and code content
    const headerLine = text.slice(startIdx + 3, endIdx).split('\n')[0].trim();
    let language = headerLine;
    const codeStartIndex = startIdx + 3 + headerLine.length;
    const codeContent = text.slice(codeStartIndex, endIdx).trim();
    
    if (!language) {
      // Auto-detect language
      const auto = hljs.highlightAuto(codeContent);
      language = auto.language || 'unknown';
    }
    
    blocks.push({
      type: 'code',
      language,
      content: codeContent
    });

    currentIndex = endIdx + 3;
  }

  return blocks;
};
