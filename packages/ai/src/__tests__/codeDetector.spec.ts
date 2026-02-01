import { describe, it, expect } from 'vitest';
import { detectCodeBlocks } from '../codeDetector';

describe('detectCodeBlocks', () => {
  it('should detect code blocks with language specified', () => {
    const text = `Some text
\`\`\`javascript
const x = 1;
\`\`\`
More text`;

    const blocks = detectCodeBlocks(text);
    
    expect(blocks).toHaveLength(3);
    expect(blocks[0]).toEqual({
      type: 'text',
      content: 'Some text\n'
    });
    expect(blocks[1]).toEqual({
      type: 'code',
      language: 'javascript',
      content: 'const x = 1;'
    });
    expect(blocks[2]).toEqual({
      type: 'text',
      content: '\nMore text'
    });
  });

  it('should auto-detect language when not specified', () => {
    const text = `\`\`\`
function hello() {
  console.log('Hello');
}
\`\`\``;

    const blocks = detectCodeBlocks(text);
    
    expect(blocks).toHaveLength(1);
    expect(blocks[0].type).toBe('code');
    expect(blocks[0].language).toBeTruthy();
    expect(blocks[0].content).toContain('function hello()');
  });

  it('should handle text without code blocks', () => {
    const text = 'Just plain text';
    const blocks = detectCodeBlocks(text);
    
    expect(blocks).toHaveLength(1);
    expect(blocks[0]).toEqual({
      type: 'text',
      content: 'Just plain text'
    });
  });

  it('should handle multiple code blocks', () => {
    const text = `Text 1
\`\`\`js
code 1
\`\`\`
Text 2
\`\`\`python
code 2
\`\`\`
Text 3`;

    const blocks = detectCodeBlocks(text);
    
    expect(blocks).toHaveLength(5);
    expect(blocks[0].type).toBe('text');
    expect(blocks[1].type).toBe('code');
    expect(blocks[1].language).toBe('js');
    expect(blocks[2].type).toBe('text');
    expect(blocks[3].type).toBe('code');
    expect(blocks[3].language).toBe('python');
    expect(blocks[4].type).toBe('text');
  });

  it('should handle unclosed code blocks', () => {
    const text = `Text
\`\`\`javascript
const x = 1;`;

    const blocks = detectCodeBlocks(text);
    
    expect(blocks).toHaveLength(2);
    expect(blocks[0].type).toBe('text');
    expect(blocks[1].type).toBe('code');
    expect(blocks[1].content).toContain('const x = 1;');
  });

  it('should handle empty code blocks', () => {
    const text = `\`\`\`javascript
\`\`\``;

    const blocks = detectCodeBlocks(text);
    
    expect(blocks).toHaveLength(1);
    expect(blocks[0].type).toBe('code');
    expect(blocks[0].language).toBe('javascript');
    expect(blocks[0].content).toBe('');
  });
});
