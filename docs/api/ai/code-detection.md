# Code Detection

Utilities for detecting and parsing code blocks from text.

## detectCodeBlocks

Detects code blocks in markdown-formatted text and automatically identifies programming languages.

```typescript
function detectCodeBlocks(text: string): CodeBlock[]
```

### Parameters

- `text` - Input text to parse (supports markdown code block syntax)

### Returns

Array of `CodeBlock` objects:

```typescript
type CodeBlock = {
  type: 'code' | 'text';
  language?: string;  // Only present for code blocks
  content: string;
};
```

### Examples

#### Basic Usage

```typescript
import { detectCodeBlocks } from '@outilx/ai';

const text = `
Here is some code:
\`\`\`javascript
const x = 1;
\`\`\`
`;

const blocks = detectCodeBlocks(text);
// [
//   { type: 'text', content: '\nHere is some code:\n' },
//   { type: 'code', language: 'javascript', content: 'const x = 1;' }
// ]
```

#### Auto Language Detection

When no language is specified, it automatically detects the language:

```typescript
const text = `
\`\`\`
function hello() {
  console.log('Hello');
}
\`\`\`
`;

const blocks = detectCodeBlocks(text);
// Language will be auto-detected as 'javascript'
```

#### Multiple Code Blocks

```typescript
const text = `
Text before
\`\`\`python
def greet():
    print("Hello")
\`\`\`
Text between
\`\`\`javascript
console.log("Hello");
\`\`\`
Text after
`;

const blocks = detectCodeBlocks(text);
// Returns 5 blocks: text, code, text, code, text
```

#### Handling Unclosed Blocks

```typescript
const text = `
\`\`\`javascript
const x = 1;
// No closing backticks
`;

const blocks = detectCodeBlocks(text);
// Treats remaining content as code block
```

### Supported Languages

The function uses highlight.js for language detection, supporting 190+ languages including:

- JavaScript/TypeScript
- Python
- Java
- C/C++/C#
- Go
- Rust
- Ruby
- PHP
- HTML/CSS
- SQL
- Shell/Bash
- And many more...

### Use Cases

#### AI Chat Interface

```typescript
function AIChatMessage({ response }) {
  const blocks = detectCodeBlocks(response);
  
  return (
    <div className="message">
      {blocks.map((block, i) => (
        block.type === 'code' ? (
          <CodeHighlight key={i} language={block.language}>
            {block.content}
          </CodeHighlight>
        ) : (
          <p key={i}>{block.content}</p>
        )
      ))}
    </div>
  );
}
```

#### Documentation Parser

```typescript
function parseDocumentation(markdown: string) {
  const blocks = detectCodeBlocks(markdown);
  
  return {
    text: blocks.filter(b => b.type === 'text'),
    code: blocks.filter(b => b.type === 'code'),
    languages: [...new Set(
      blocks
        .filter(b => b.type === 'code')
        .map(b => b.language)
    )]
  };
}
```

#### Code Extraction

```typescript
function extractCodeSnippets(text: string) {
  const blocks = detectCodeBlocks(text);
  
  return blocks
    .filter(block => block.type === 'code')
    .map(block => ({
      language: block.language,
      code: block.content
    }));
}
```

### Performance Considerations

- The function processes text linearly (O(n) complexity)
- Language detection is performed using highlight.js
- For very large texts, consider chunking or lazy processing
- Results can be memoized if the input doesn't change

### Edge Cases

- Empty code blocks are preserved
- Unclosed code blocks treat remaining text as code
- Nested backticks are not supported (standard markdown limitation)
- Language names are case-insensitive
