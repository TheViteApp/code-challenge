import { describe, it, expect } from 'vitest';
import { isAnagram, findAnagrams } from '../utils/anagram';

describe('isAnagram', () => {
  it('returns true for two words that are anagrams (same case)', () => {
    expect(isAnagram('listen', 'silent')).toBe(true);
  });

  it('returns false for two words that are not anagrams', () => {
    expect(isAnagram('hello', 'world')).toBe(false);
  });

  it('returns true for anagrams regardless of case', () => {
    expect(isAnagram('Listen', 'silent')).toBe(true);
  });

  it('returns true for anagrams with mixed case in both words', () => {
    expect(isAnagram('Triangle', 'Integral')).toBe(true);
  });

  it('returns false for words with different lengths', () => {
    expect(isAnagram('abc', 'ab')).toBe(false);
  });
});

describe('findAnagrams', () => {
  it('returns all anagrams of the given word from the list', () => {
    expect(findAnagrams('listen', ['silent', 'hello', 'enlist', 'world'])).toEqual([
      'silent',
      'enlist',
    ]);
  });

  it('returns an empty array when no anagrams exist', () => {
    expect(findAnagrams('hello', ['world', 'foo', 'bar'])).toEqual([]);
  });

  it('handles case-insensitive matching in the list', () => {
    expect(findAnagrams('listen', ['Silent', 'ENLIST', 'hello'])).toEqual([
      'Silent',
      'ENLIST',
    ]);
  });

  it('returns all words when all words in the list are anagrams', () => {
    expect(findAnagrams('arc', ['car', 'rac'])).toEqual(['car', 'rac']);
  });
});
