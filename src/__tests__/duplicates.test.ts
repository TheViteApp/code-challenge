import { describe, it, expect } from 'vitest';
import { hasDuplicate, findDuplicates } from '../utils/duplicates';

describe('hasDuplicate', () => {
  it('returns true when the array has duplicate values', () => {
    expect(hasDuplicate(['a', 'b', 'a'])).toBe(true);
  });

  it('returns false when all values are unique', () => {
    expect(hasDuplicate(['a', 'b', 'c'])).toBe(false);
  });

  it('returns false for a single-element array', () => {
    expect(hasDuplicate(['a'])).toBe(false);
  });

  it('returns false for an empty array', () => {
    expect(hasDuplicate([])).toBe(false);
  });
});

describe('findDuplicates', () => {
  it('returns all values that appear more than once', () => {
    expect(findDuplicates(['a', 'b', 'a', 'c', 'b'])).toEqual(['a', 'b']);
  });

  it('returns an empty array when there are no duplicates', () => {
    expect(findDuplicates(['a', 'b', 'c'])).toEqual([]);
  });

  it('returns each duplicate value only once', () => {
    expect(findDuplicates(['x', 'x', 'x'])).toEqual(['x']);
  });

  it('returns an empty array for an empty input', () => {
    expect(findDuplicates([])).toEqual([]);
  });
});
