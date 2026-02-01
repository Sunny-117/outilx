import { useState } from 'react';
import { detectCodeBlocks } from '@outilx/ai';

const sampleText = `这是一段包含代码的文本。

下面是一个 JavaScript 示例：
\`\`\`javascript
function greet(name) {
  console.log('Hello, ' + name);
  return 'Hello, ' + name;
}

greet('World');
\`\`\`

这是一些普通文本。

再来一个 Python 示例：
\`\`\`python
def calculate(x, y):
    result = x + y
    print(f"Result: {result}")
    return result

calculate(10, 20)
\`\`\`

还有一个没有指定语言的代码块：
\`\`\`
const data = [1, 2, 3, 4, 5];
const doubled = data.map(x => x * 2);
\`\`\`

结束。`;

function CodeDetectionDemo() {
  const [input, setInput] = useState(sampleText);
  const blocks = detectCodeBlocks(input);

  return (
    <div>
      <h2>Code Detection Demo</h2>
      <p>检测文本中的代码块并自动识别编程语言</p>

      <div style={{ marginBottom: '20px' }}>
        <h3>输入文本：</h3>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            width: '100%',
            minHeight: '200px',
            padding: '10px',
            fontFamily: 'monospace',
            fontSize: '14px',
          }}
        />
      </div>

      <div>
        <h3>检测结果：</h3>
        <p>共检测到 {blocks.length} 个块（{blocks.filter(b => b.type === 'code').length} 个代码块）</p>
        
        {blocks.map((block, index) => (
          <div
            key={index}
            style={{
              marginBottom: '15px',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          >
            <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>
              Block {index + 1}: {block.type === 'code' ? `Code (${block.language})` : 'Text'}
            </div>
            <pre
              style={{
                margin: 0,
                padding: '10px',
                background: block.type === 'code' ? '#f5f5f5' : '#fff',
                border: block.type === 'code' ? '1px solid #e0e0e0' : 'none',
                borderRadius: '4px',
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {block.content}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CodeDetectionDemo;
