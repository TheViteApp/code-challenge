/**
 * Checks whether an array contains any duplicate values.
 *
 * Examples:
 *   hasDuplicate(["a", "b", "a"]) // true
 *   hasDuplicate(["a", "b", "c"]) // false
 */
export function hasDuplicate(arr: string[]): boolean {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Returns all values that appear more than once in the array.
 * Each duplicate value should appear only once in the result.
 *
 * Examples:
 *   findDuplicates(["a", "b", "a", "c", "b"]) // ["a", "b"]
 *   findDuplicates(["a", "b", "c"])            // []
 *
 * HINT: You need to count how many times each value appears.
 * HINT: There are several valid approaches — loops, Map, filter. Pick any.
 */
export function findDuplicates(arr: string[]): string[] {
  // TODO: implement this function
  return [];
}
