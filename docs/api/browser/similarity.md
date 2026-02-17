# Similarity Utilities

Text similarity calculation functions supporting both literal (edit distance) and semantic (TF-IDF) similarity.

## tokenize

Tokenizes text for similarity calculation. Automatically detects Chinese (character-level) vs English (space-separated).

```typescript
function tokenize(text: string): string[]
```

### Parameters

- `text` - The text to tokenize

### Returns

Array of tokens.

### Examples

```typescript
import { tokenize } from '@outilx/browser';

tokenize('hello world');  // ['hello', 'world']
tokenize('Hello World');  // ['hello', 'world'] (lowercased)
tokenize('你好世界');     // ['你', '好', '世', '界']
tokenize('hello, world!'); // ['hello', 'world'] (punctuation removed)
```

## levenshteinSimilarity

Calculates Levenshtein similarity (edit distance based) between two strings. Returns a score between 0 and 1.

```typescript
function levenshteinSimilarity(a: string, b: string): number
```

### Parameters

- `a` - First string
- `b` - Second string

### Returns

Similarity score between 0 (completely different) and 1 (identical).

### Examples

```typescript
import { levenshteinSimilarity } from '@outilx/browser';

levenshteinSimilarity('hello', 'hello');  // 1
levenshteinSimilarity('hello', 'hallo');  // 0.8
levenshteinSimilarity('abc', 'xyz');      // 0
levenshteinSimilarity('空调回收', '空调上门回收');  // 0.67
```

## cosineSimilarity

Calculates cosine similarity between two vectors.

```typescript
function cosineSimilarity(vecA: number[], vecB: number[]): number
```

### Parameters

- `vecA` - First vector
- `vecB` - Second vector

### Returns

Cosine similarity score between 0 and 1.

### Examples

```typescript
import { cosineSimilarity } from '@outilx/browser';

cosineSimilarity([1, 0, 1], [1, 0, 1]);  // 1 (identical)
cosineSimilarity([1, 0, 0], [0, 1, 0]);  // 0 (orthogonal)
cosineSimilarity([1, 0, 1], [0, 1, 1]);  // 0.5
```

## computeTfidf

Computes TF-IDF vectors for a collection of documents.

```typescript
interface TfidfResult {
  tfidfVectors: number[][];
  termIndex: Map<string, number>;
}

function computeTfidf(documents: string[]): TfidfResult
```

### Parameters

- `documents` - Array of document strings

### Returns

Object containing:
- `tfidfVectors` - Array of TF-IDF vectors for each document
- `termIndex` - Map from term to vector index

### Examples

```typescript
import { computeTfidf } from '@outilx/browser';

const docs = ['hello world', 'hello there', 'world peace'];
const { tfidfVectors, termIndex } = computeTfidf(docs);

console.log(tfidfVectors.length);  // 3
console.log(termIndex.has('hello'));  // true
```

## tfidfSimilarity

Calculates TF-IDF based semantic similarity between a target string and candidates. Returns results sorted by similarity score.

```typescript
interface SimilarityResult {
  text: string;
  score: number;
}

function tfidfSimilarity(target: string, candidates: string[]): SimilarityResult[]
```

### Parameters

- `target` - The target string to compare against
- `candidates` - Array of candidate strings

### Returns

Array of results sorted by similarity score (descending).

### Examples

```typescript
import { tfidfSimilarity } from '@outilx/browser';

const target = '我要买一个蓝色的包包';
const candidates = [
  '蓝色手提袋',
  '红色外套',
  '黑色包包',
  '绿色帽子'
];

const results = tfidfSimilarity(target, candidates);
// [
//   { text: '蓝色手提袋', score: 0.85 },
//   { text: '黑色包包', score: 0.72 },
//   { text: '红色外套', score: 0.31 },
//   { text: '绿色帽子', score: 0.15 }
// ]
```

### Use Cases

- Search relevance ranking
- Content recommendation
- Text matching and retrieval

## compareSimilarity

Compares text similarity using both Levenshtein and TF-IDF algorithms. Useful for analyzing differences between literal and semantic similarity.

```typescript
interface ComparisonResult {
  text: string;
  levenshteinScore: number;
  tfidfScore: number;
}

function compareSimilarity(target: string, candidates: string[]): ComparisonResult[]
```

### Parameters

- `target` - The target string to compare against
- `candidates` - Array of candidate strings

### Returns

Array of results with both similarity scores, sorted by TF-IDF score.

### Examples

```typescript
import { compareSimilarity } from '@outilx/browser';

const target = '空调回收附近上门高价回收';
const candidates = [
  '旧空调上门回收电话',
  '24小时上门回收空调',
  '闲鱼二手市场'
];

const results = compareSimilarity(target, candidates);
// [
//   { text: '24小时上门回收空调', levenshteinScore: 0.54, tfidfScore: 0.72 },
//   { text: '旧空调上门回收电话', levenshteinScore: 0.62, tfidfScore: 0.68 },
//   { text: '闲鱼二手市场', levenshteinScore: 0.15, tfidfScore: 0.12 }
// ]
```

### Use Cases

- A/B testing similarity algorithms
- Analyzing which algorithm better fits your use case
- Debugging search relevance issues

## Algorithm Comparison

| Algorithm | Type | Best For |
|-----------|------|----------|
| Levenshtein | Literal | Typo correction, fuzzy matching |
| TF-IDF | Semantic | Search ranking, content similarity |

### When to Use Levenshtein

- Spell checking
- Fuzzy string matching
- Finding typos or minor variations

### When to Use TF-IDF

- Search engine ranking
- Document similarity
- Content recommendation
- Handling synonyms and related terms
