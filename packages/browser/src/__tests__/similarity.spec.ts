import { describe, it, expect } from "vitest";
import {
  tokenize,
  levenshteinSimilarity,
  cosineSimilarity,
  computeTfidf,
  tfidfSimilarity,
  compareSimilarity,
} from "../core/similarity";

describe("similarity", () => {
  describe("tokenize", () => {
    it("should tokenize English text by spaces", () => {
      expect(tokenize("hello world")).toEqual(["hello", "world"]);
      expect(tokenize("Hello World")).toEqual(["hello", "world"]);
    });

    it("should tokenize Chinese text by characters", () => {
      expect(tokenize("你好世界")).toEqual(["你", "好", "世", "界"]);
    });

    it("should remove punctuation", () => {
      expect(tokenize("hello, world!")).toEqual(["hello", "world"]);
      expect(tokenize("你好，世界！")).toEqual(["你", "好", "世", "界"]);
    });

    it("should handle empty string", () => {
      expect(tokenize("")).toEqual([]);
    });
  });

  describe("levenshteinSimilarity", () => {
    it("should return 1 for identical strings", () => {
      expect(levenshteinSimilarity("hello", "hello")).toBe(1);
      expect(levenshteinSimilarity("你好", "你好")).toBe(1);
    });

    it("should return 0 for completely different strings", () => {
      expect(levenshteinSimilarity("abc", "xyz")).toBe(0);
    });

    it("should calculate similarity correctly", () => {
      expect(levenshteinSimilarity("hello", "hallo")).toBe(0.8);
      expect(levenshteinSimilarity("kitten", "sitting")).toBeCloseTo(
        0.571,
        2
      );
    });

    it("should handle empty strings", () => {
      expect(levenshteinSimilarity("", "")).toBe(1);
      expect(levenshteinSimilarity("hello", "")).toBe(0);
    });

    it("should ignore punctuation and spaces", () => {
      expect(levenshteinSimilarity("hello world", "helloworld")).toBe(1);
      expect(levenshteinSimilarity("你好，世界", "你好世界")).toBe(1);
    });
  });

  describe("cosineSimilarity", () => {
    it("should return 1 for identical vectors", () => {
      expect(cosineSimilarity([1, 2, 3], [1, 2, 3])).toBe(1);
    });

    it("should return 0 for orthogonal vectors", () => {
      expect(cosineSimilarity([1, 0, 0], [0, 1, 0])).toBe(0);
    });

    it("should handle zero vectors", () => {
      expect(cosineSimilarity([0, 0, 0], [1, 2, 3])).toBe(0);
      expect(cosineSimilarity([1, 2, 3], [0, 0, 0])).toBe(0);
    });

    it("should calculate similarity correctly", () => {
      expect(cosineSimilarity([1, 0, 1], [0, 1, 1])).toBeCloseTo(0.5, 5);
    });
  });

  describe("computeTfidf", () => {
    it("should compute TF-IDF vectors", () => {
      const docs = ["hello world", "hello there", "world peace"];
      const { tfidfVectors, termIndex } = computeTfidf(docs);

      expect(tfidfVectors.length).toBe(3);
      expect(termIndex.size).toBeGreaterThan(0);
    });

    it("should handle Chinese documents", () => {
      const docs = ["你好世界", "你好朋友", "世界和平"];
      const { tfidfVectors, termIndex } = computeTfidf(docs);

      expect(tfidfVectors.length).toBe(3);
      expect(termIndex.has("你")).toBe(true);
      expect(termIndex.has("好")).toBe(true);
    });

    it("should handle single document", () => {
      const { tfidfVectors } = computeTfidf(["hello world"]);
      expect(tfidfVectors.length).toBe(1);
    });
  });

  describe("tfidfSimilarity", () => {
    it("should return sorted results by similarity", () => {
      const target = "hello world";
      const candidates = ["hello there", "goodbye world", "random text"];
      const results = tfidfSimilarity(target, candidates);

      expect(results.length).toBe(3);
      expect(results[0].score).toBeGreaterThanOrEqual(results[1].score);
      expect(results[1].score).toBeGreaterThanOrEqual(results[2].score);
    });

    it("should work with Chinese text", () => {
      const target = "我要买蓝色的包";
      const candidates = ["蓝色手提包", "红色外套", "绿色帽子"];
      const results = tfidfSimilarity(target, candidates);

      expect(results.length).toBe(3);
      expect(results[0].text).toBe("蓝色手提包");
    });

    it("should handle exact match with high score", () => {
      const target = "hello world";
      const candidates = ["hello world", "goodbye"];
      const results = tfidfSimilarity(target, candidates);

      expect(results[0].text).toBe("hello world");
      expect(results[0].score).toBeCloseTo(1, 5);
    });
  });

  describe("compareSimilarity", () => {
    it("should return both Levenshtein and TF-IDF scores", () => {
      const target = "hello world";
      const candidates = ["hello there", "helloworld"];
      const results = compareSimilarity(target, candidates);

      expect(results.length).toBe(2);
      results.forEach((result) => {
        expect(result).toHaveProperty("text");
        expect(result).toHaveProperty("levenshteinScore");
        expect(result).toHaveProperty("tfidfScore");
      });
    });

    it("should sort by TF-IDF score", () => {
      const target = "空调回收";
      const candidates = ["空调上门回收", "二手家具"];
      const results = compareSimilarity(target, candidates);

      expect(results[0].tfidfScore).toBeGreaterThanOrEqual(
        results[1].tfidfScore
      );
    });
  });
});
