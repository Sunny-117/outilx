# Similarity Utilities

Text similarity calculation using Levenshtein distance and TF-IDF algorithms.

## Functions

### levenshteinSimilarity

Calculates Levenshtein similarity (edit distance based) between two strings.

```typescript
function levenshteinSimilarity(a: string, b: string): number
```

**Returns:** Similarity score between 0 and 1.

**Examples:**

```typescript
levenshteinSimilarity('hello', 'hallo');  // 0.8
levenshteinSimilarity('abc', 'abc');      // 1
levenshteinSimilarity('abc', 'xyz');      // 0
levenshteinSimilarity('空调回收', '空调上门回收');  // ~0.67
```

### tfidfSimilarity

Calculates TF-IDF based semantic similarity between a target string and candidates.

```typescript
function tfidfSimilarity(
  target: string,
  candidates: string[]
): Array<{ text: string; score: number }>
```

**Returns:** Array of results sorted by similarity score (descending).

**Examples:**

```typescript
const target = '我要买一个蓝色的包包';
const candidates = ['蓝色手提袋', '红色外套', '黑色包包'];

const results = tfidfSimilarity(target, candidates);
// [
//   { text: '蓝色手提袋', score: 0.85 },
//   { text: '黑色包包', score: 0.65 },
//   { text: '红色外套', score: 0.2 }
// ]
```

### compareSimilarity

Compares text similarity using both Levenshtein and TF-IDF algorithms.

```typescript
function compareSimilarity(
  target: string,
  candidates: string[]
): Array<{
  text: string;
  levenshteinScore: number;
  tfidfScore: number;
}>
```

**Examples:**

```typescript
const results = compareSimilarity('空调回收', ['空调上门回收', '手机维修']);
// [
//   { text: '空调上门回收', levenshteinScore: 0.67, tfidfScore: 0.8 },
//   { text: '手机维修', levenshteinScore: 0, tfidfScore: 0 }
// ]
```

### tokenize

Tokenizes text for preprocessing. Supports both English (space-separated) and Chinese (character-level).

```typescript
function tokenize(text: string): string[]
```

**Examples:**

```typescript
tokenize('hello world');  // ['hello', 'world']
tokenize('你好世界');     // ['你', '好', '世', '界']
tokenize('Hello, World!'); // ['hello', 'world']
```

### cosineSimilarity

Calculates cosine similarity between two vectors.

```typescript
function cosineSimilarity(vecA: number[], vecB: number[]): number
```

**Examples:**

```typescript
cosineSimilarity([1, 0, 1], [1, 0, 1]);  // 1
cosineSimilarity([1, 0, 0], [0, 1, 0]);  // 0
cosineSimilarity([1, 1, 0], [1, 0, 1]);  // 0.5
```

### computeTfidf

Computes TF-IDF vectors for a collection of documents.

```typescript
function computeTfidf(documents: string[]): {
  tfidfVectors: number[][];
  termIndex: Map<string, number>;
}
```

**Examples:**

```typescript
const docs = ['hello world', 'hello there', 'world peace'];
const { tfidfVectors, termIndex } = computeTfidf(docs);

// tfidfVectors[0] is the TF-IDF vector for 'hello world'
// termIndex maps terms to vector indices
```

## Use Cases

### Spell Checking / Fuzzy Matching

Use `levenshteinSimilarity` for finding close matches:

```typescript
const words = ['apple', 'apply', 'maple', 'banana'];
const typo = 'aple';

const matches = words
  .map(word => ({ word, score: levenshteinSimilarity(typo, word) }))
  .sort((a, b) => b.score - a.score);
// [{ word: 'apple', score: 0.8 }, ...]
```

### Search / Text Retrieval

Use `tfidfSimilarity` for semantic search:

```typescript
const query = '如何学习编程';
const articles = [
  '编程入门教程',
  '学习Python的最佳方法',
  '今日天气预报'
];

const results = tfidfSimilarity(query, articles);
// Returns articles sorted by relevance
```
