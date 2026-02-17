/**
 * Text similarity calculation utilities
 * @module similarity
 */

/**
 * Tokenizer function for text preprocessing
 * Supports both English (space-separated) and Chinese (character-level) text
 *
 * @param {string} text - The text to tokenize
 * @returns {string[]} Array of tokens
 *
 * @example
 * ```ts
 * tokenize('hello world')  // => ['hello', 'world']
 * tokenize('你好世界')  // => ['你', '好', '世', '界']
 * ```
 */
export function tokenize(text: string): string[] {
  const cleanText = text
    .replace(/[，。！？、,.!?:：；;""''「」【】（）()]/g, "")
    .toLowerCase();

  if (cleanText.includes(" ")) {
    return cleanText.split(/\s+/).filter((t) => t.length > 0);
  } else {
    return Array.from(cleanText).filter((t) => t.length > 0);
  }
}

/**
 * Calculates Levenshtein similarity (edit distance based similarity) between two strings
 *
 * @param {string} a - First string
 * @param {string} b - Second string
 * @returns {number} Similarity score between 0 and 1
 *
 * @example
 * ```ts
 * levenshteinSimilarity('hello', 'hallo')  // => 0.8
 * levenshteinSimilarity('abc', 'abc')  // => 1
 * levenshteinSimilarity('abc', 'xyz')  // => 0
 * ```
 */
export function levenshteinSimilarity(a: string, b: string): number {
  const cleanA = a.replace(/\s+/g, "").replace(/[，。！？、,.!?]/g, "");
  const cleanB = b.replace(/\s+/g, "").replace(/[，。！？、,.!?]/g, "");

  const m = cleanA.length;
  const n = cleanB.length;

  if (m === 0 && n === 0) return 1;

  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = cleanA[i - 1] === cleanB[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  const distance = dp[m][n];
  const maxLen = Math.max(m, n);
  return maxLen === 0 ? 1 : 1 - distance / maxLen;
}

/**
 * Calculates cosine similarity between two vectors
 *
 * @param {number[]} vecA - First vector
 * @param {number[]} vecB - Second vector
 * @returns {number} Cosine similarity score between 0 and 1
 *
 * @example
 * ```ts
 * cosineSimilarity([1, 0, 1], [1, 0, 1])  // => 1
 * cosineSimilarity([1, 0, 0], [0, 1, 0])  // => 0
 * ```
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

interface TfidfResult {
  tfidfVectors: number[][];
  termIndex: Map<string, number>;
}

/**
 * Computes TF-IDF vectors for a collection of documents
 *
 * @param {string[]} documents - Array of document strings
 * @returns {TfidfResult} Object containing TF-IDF vectors and term index
 *
 * @example
 * ```ts
 * const docs = ['hello world', 'hello there', 'world peace'];
 * const { tfidfVectors, termIndex } = computeTfidf(docs);
 * ```
 */
export function computeTfidf(documents: string[]): TfidfResult {
  const docTokens = documents.map(tokenize);
  const termIndex = new Map<string, number>();
  const documentFrequency = new Map<string, number>();

  docTokens.forEach((tokens) => {
    const uniqueTokens = new Set(tokens);
    uniqueTokens.forEach((term) => {
      if (!termIndex.has(term)) {
        termIndex.set(term, termIndex.size);
      }
      documentFrequency.set(term, (documentFrequency.get(term) || 0) + 1);
    });
  });

  const numDocs = documents.length;
  const numTerms = termIndex.size;
  const idf = new Map<string, number>();

  documentFrequency.forEach((df, term) => {
    // Smoothed IDF: log(N / (DF(t) + 1)) + 1
    idf.set(term, Math.log(numDocs / (df + 1)) + 1);
  });

  const tfidfVectors = docTokens.map((tokens) => {
    const vector = new Array(numTerms).fill(0);
    const termCount = new Map<string, number>();
    tokens.forEach((term) => {
      termCount.set(term, (termCount.get(term) || 0) + 1);
    });

    termCount.forEach((count, term) => {
      if (termIndex.has(term)) {
        const tf = count / tokens.length; // Normalized TF
        const idx = termIndex.get(term)!;
        vector[idx] = tf * idf.get(term)!;
      }
    });
    return vector;
  });

  return {
    tfidfVectors,
    termIndex,
  };
}

interface SimilarityResult {
  text: string;
  score: number;
}

/**
 * Calculates TF-IDF based semantic similarity between a target string and candidates
 *
 * @param {string} target - The target string to compare against
 * @param {string[]} candidates - Array of candidate strings
 * @returns {SimilarityResult[]} Array of results sorted by similarity score (descending)
 *
 * @example
 * ```ts
 * const target = '我要买一个蓝色的包包';
 * const candidates = ['蓝色手提袋', '红色外套', '黑色包包'];
 * const results = tfidfSimilarity(target, candidates);
 * // => [{ text: '蓝色手提袋', score: 0.85 }, ...]
 * ```
 */
export function tfidfSimilarity(
  target: string,
  candidates: string[]
): SimilarityResult[] {
  const documents = [target, ...candidates];
  const { tfidfVectors } = computeTfidf(documents);
  const targetVector = tfidfVectors[0];

  const results = candidates.map((text, index) => {
    const candidateVector = tfidfVectors[index + 1];
    const score = cosineSimilarity(targetVector, candidateVector);
    return { text, score };
  });

  results.sort((a, b) => b.score - a.score);

  return results;
}

interface ComparisonResult {
  text: string;
  levenshteinScore: number;
  tfidfScore: number;
}

/**
 * Compares text similarity using both Levenshtein and TF-IDF algorithms
 *
 * @param {string} target - The target string to compare against
 * @param {string[]} candidates - Array of candidate strings
 * @returns {ComparisonResult[]} Array of results with both similarity scores (sorted by TF-IDF)
 *
 * @example
 * ```ts
 * const target = '空调回收附近上门高价回收';
 * const candidates = ['旧空调上门回收电话', '二手空调回收'];
 * const results = compareSimilarity(target, candidates);
 * // => [{ text: '...', levenshteinScore: 0.6, tfidfScore: 0.8 }, ...]
 * ```
 */
export function compareSimilarity(
  target: string,
  candidates: string[]
): ComparisonResult[] {
  const levenshteinResults = candidates.map((text) => ({
    text,
    levenshteinScore: levenshteinSimilarity(target, text),
  }));

  const tfidfResults = tfidfSimilarity(target, candidates);

  const finalResults: ComparisonResult[] = levenshteinResults.map((item) => {
    const tfidfItem = tfidfResults.find((t) => t.text === item.text);
    return {
      text: item.text,
      levenshteinScore: item.levenshteinScore,
      tfidfScore: tfidfItem ? tfidfItem.score : 0,
    };
  });

  finalResults.sort((a, b) => b.tfidfScore - a.tfidfScore);

  return finalResults;
}
