/**
 * Determines whether two words are anagrams of each other.
 *
 * An anagram is a word formed by rearranging the letters of another word,
 * using all the original letters exactly once.
 *
 * Examples:
 *   isAnagram("listen", "silent") // true
 *   isAnagram("hello", "world")   // false
 */
export function isAnagram(word1: string, word2: string): boolean {
  const sorted1 = word1.split('').sort().join('');
  const sorted2 = word2.split('').sort().join('');
  return sorted1 === sorted2;
}

/**
 * Finds all anagrams of a given word from a list of candidate words.
 *
 * Examples:
 *   findAnagrams("listen", ["silent", "hello", "enlist"]) // ["silent", "enlist"]
 *   findAnagrams("hello", ["world", "foo"])               // []
 *
 * HINT: Use the `isAnagram` function above to check each word.
 * HINT: Use Array.prototype.filter() to return only matching words.
 */
export function findAnagrams(word: string, wordList: string[]): string[] {
  // TODO: implement this function
  return [];
}
