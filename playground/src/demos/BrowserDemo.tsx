import { useState } from 'react';
import { toArray, TipCache, parseJsonWithFallback, getUrlParams } from '@outilx/browser';

function BrowserDemo() {
  const [arrayInput, setArrayInput] = useState('1');
  const [cacheKey, setCacheKey] = useState('');
  const [cacheValue, setCacheValue] = useState('');
  const [cacheResult, setCacheResult] = useState('');
  const [jsonInput, setJsonInput] = useState('{"name": "John", "age": 30}');
  const [urlInput, setUrlInput] = useState('foo=bar&baz=qux&id=1&id=2');

  const cache = new TipCache<string>(10);

  const handleArrayConvert = () => {
    try {
      const input = JSON.parse(arrayInput);
      const result = toArray(input);
      alert(`结果: ${JSON.stringify(result)}`);
    } catch (e) {
      alert('输入格式错误，请输入有效的 JSON');
    }
  };

  const handleCacheSet = () => {
    cache.set(cacheKey, cacheValue);
    setCacheResult(`已设置: ${cacheKey} = ${cacheValue}`);
  };

  const handleCacheGet = () => {
    const value = cache.get(cacheKey);
    setCacheResult(value ? `获取到: ${value}` : '未找到该键');
  };

  const handleJsonParse = () => {
    const result = parseJsonWithFallback(jsonInput, { error: 'Invalid JSON' });
    alert(`解析结果:\n${JSON.stringify(result, null, 2)}`);
  };

  const handleUrlParse = () => {
    const params = getUrlParams(urlInput);
    alert(`解析结果:\n${JSON.stringify(params, null, 2)}`);
  };

  return (
    <div>
      <h2>Browser Utils Demo</h2>
      <p>测试 @outilx/browser 包的各种工具函数</p>

      <div style={{ marginBottom: '30px' }}>
        <h3>toArray - 转换为数组</h3>
        <input
          type="text"
          value={arrayInput}
          onChange={(e) => setArrayInput(e.target.value)}
          placeholder="输入值 (JSON 格式)"
          style={{ padding: '8px', width: '300px', marginRight: '10px' }}
        />
        <button
          onClick={handleArrayConvert}
          style={{ padding: '8px 16px', cursor: 'pointer' }}
        >
          转换
        </button>
        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          示例: 1, [1,2], null, "hello"
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>TipCache - 缓存</h3>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={cacheKey}
            onChange={(e) => setCacheKey(e.target.value)}
            placeholder="键"
            style={{ padding: '8px', width: '150px', marginRight: '10px' }}
          />
          <input
            type="text"
            value={cacheValue}
            onChange={(e) => setCacheValue(e.target.value)}
            placeholder="值"
            style={{ padding: '8px', width: '150px', marginRight: '10px' }}
          />
          <button
            onClick={handleCacheSet}
            style={{ padding: '8px 16px', marginRight: '10px', cursor: 'pointer' }}
          >
            设置
          </button>
          <button
            onClick={handleCacheGet}
            style={{ padding: '8px 16px', cursor: 'pointer' }}
          >
            获取
          </button>
        </div>
        {cacheResult && (
          <div style={{ padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
            {cacheResult}
          </div>
        )}
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>parseJsonWithFallback - 安全 JSON 解析</h3>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="输入 JSON 字符串"
          style={{ padding: '8px', width: '100%', minHeight: '80px', marginBottom: '10px' }}
        />
        <button
          onClick={handleJsonParse}
          style={{ padding: '8px 16px', cursor: 'pointer' }}
        >
          解析
        </button>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>getUrlParams - URL 参数解析</h3>
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="输入查询字符串"
          style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
        />
        <button
          onClick={handleUrlParse}
          style={{ padding: '8px 16px', cursor: 'pointer' }}
        >
          解析
        </button>
        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          注意：多个相同参数会被合并为数组
        </div>
      </div>
    </div>
  );
}

export default BrowserDemo;
