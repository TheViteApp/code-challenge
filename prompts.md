# Challenge Solutions

This file contains the full solutions and explanations for each task.

---

## Task 1 — Fix `isAnagram` (`src/utils/anagram.ts`)

### The Bug

The function sorts both words character by character and compares the sorted strings. The problem is it does **not normalize the case** before sorting, so uppercase and lowercase letters have different char codes and are sorted differently.

```
'L' → char code 76
'l' → char code 108
```

This means `isAnagram("Listen", "silent")` produces:

```
sorted1 = "Leinst"   ← 'L' sorts before lowercase letters
sorted2 = "eilnst"
"Leinst" !== "eilnst"  → returns false ❌
```

### The Fix

Add `.toLowerCase()` before splitting into characters:

```ts
export function isAnagram(word1: string, word2: string): boolean {
  const sorted1 = word1.toLowerCase().split('').sort().join('');
  const sorted2 = word2.toLowerCase().split('').sort().join('');
  return sorted1 === sorted2;
}
```

Now both words are normalized to lowercase first, so `"Listen"` becomes `"listen"` and the comparison works correctly.

---

## Task 2 — Implement `findAnagrams` (`src/utils/anagram.ts`)

### The Goal

Return all words from `wordList` that are anagrams of `word`. The key insight is that you already have `isAnagram` — reuse it instead of reimplementing the logic.

---

### Solution A — Functional with `filter` (recommended)

```ts
export function findAnagrams(word: string, wordList: string[]): string[] {
  return wordList.filter((w) => isAnagram(word, w));
}
```

**Why this works:** `Array.filter` iterates the list and keeps only items where the callback returns `true`. Since `isAnagram` returns a boolean, passing it as the filter condition is all you need. Clean and concise.

---

### Solution B — Imperative with a `for...of` loop

```ts
export function findAnagrams(word: string, wordList: string[]): string[] {
  const result: string[] = [];
  for (const w of wordList) {
    if (isAnagram(word, w)) {
      result.push(w);
    }
  }
  return result;
}
```

**Why this works:** Same logic as solution A, written explicitly. For each word in the list, check if it is an anagram and accumulate matches in a result array. More verbose but equally correct.

---

### Solution C — Without reusing `isAnagram`

The hint says to reuse `isAnagram`, but a student could also implement `findAnagrams` independently by inlining the same logic:

```ts
export function findAnagrams(word: string, wordList: string[]): string[] {
  const sortedWord = word.toLowerCase().split('').sort().join('');
  return wordList.filter((w) => w.toLowerCase().split('').sort().join('') === sortedWord);
}
```

**Why this works:** Pre-computes the sorted version of `word` once (more efficient than recomputing it for every comparison), then filters the list by comparing each candidate's sorted form to it.

> Note: Solution C is valid but misses the opportunity to reuse existing code. Solutions A or B demonstrate better code composition skills.

---

## Task 3 — Fix the 3 React bugs in `AnagramForm` (`src/components/AnagramForm.tsx`)

There are three independent React bugs in this file. All three must be fixed for the tests to pass.

---

### Bug A — Direct state mutation

```tsx
results.push(...anagrams);
setResults(results); // ← same array reference
```

**Why it breaks:** React uses `Object.is` to compare the previous and next state. Because `results.push()` mutates the existing array in place, `setResults(results)` passes back the exact same reference. React sees no change and skips the re-render — the UI never updates.

**Fix:** Replace both lines with a single call that creates a new array:

```tsx
setResults(anagrams);
```

---

### Bug B — Stale closure in `useCallback`

```tsx
const handleSubmit = useCallback((event) => {
  const candidates = wordList.split(',')...; // wordList is always ''
  const anagrams = findAnagrams(word, candidates); // word is always ''
}, []); // ← missing dependencies
```

**Why it breaks:** `useCallback` with an empty dependency array creates the function once at mount time and never recreates it. The `word` and `wordList` variables captured inside are frozen at their initial values (empty strings). Every submit call effectively runs `findAnagrams('', [])`.

**Fix A — Add the missing dependencies:**

```tsx
const handleSubmit = useCallback((event) => {
  // word and wordList now always reflect current state
}, [word, wordList]);
```

**Fix B — Remove `useCallback` entirely (simpler, equally correct):**

```tsx
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  // plain function, always closes over current state
}
```

> `useCallback` is a performance optimisation for referential stability (e.g. preventing child re-renders). For a form submit handler in a component like this, it adds complexity with no benefit.

---

### Bug C — `useEffect` that wipes results on every keystroke

```tsx
useEffect(() => {
  setResults([]);
  setSubmitted(false);
}, [word]); // runs every time the word input changes
```

**Why it breaks:** Every character the user types in the Word field triggers this effect, resetting `results` and `submitted` back to their initial state. Results disappear the moment the user edits the word input after submitting.

**Fix:** Delete this `useEffect` entirely — it has no valid purpose in this component.

---

### What each bug tests

| Bug | React concept |
|-----|--------------|
| Direct mutation | State immutability — React requires new references to detect changes |
| Stale `useCallback` | Closures and hook dependencies — captured values freeze at creation time |
| `useEffect` wipe | Effect lifecycle — side effects that run too broadly cause unexpected resets |

---

---

## Optional Task — Fix `hasDuplicate` + Implement `findDuplicates` (`src/utils/duplicates.ts`)

### The Bug in `hasDuplicate`

The function uses two nested loops to compare each pair of elements. The bug is in the inner loop's starting index: it starts at `j = i` instead of `j = i + 1`.

When `j` starts at `i`, the very first comparison is always `arr[i] === arr[i]` — an element compared to **itself** — which is always `true`. So the function returns `true` immediately for any non-empty array, regardless of whether real duplicates exist.

```ts
// Buggy
for (let j = i; j < arr.length; j++) {   // ← j starts at i
  if (arr[i] === arr[j]) return true;     // arr[0] === arr[0] → always true
}

// Fixed
for (let j = i + 1; j < arr.length; j++) { // ← j starts at i + 1
  if (arr[i] === arr[j]) return true;
}
```

---

### `findDuplicates` — Multiple Valid Solutions

The goal: return every value that appears more than once, with each value listed only once in the result.

---

#### Solution A — Frequency Map with `Map` (O(n), most efficient)

```ts
export function findDuplicates(arr: string[]): string[] {
  const count = new Map<string, number>();
  for (const item of arr) {
    count.set(item, (count.get(item) ?? 0) + 1);
  }
  return [...new Set(arr.filter((item) => count.get(item)! > 1))];
}
```

**How it works:** Build a frequency map in one pass, then filter the original array to items with count > 1. Wrapping in `Set` removes the repeated occurrences so each duplicate appears once in the result.

**Complexity:** O(n) time, O(n) space. The most scalable approach — shows awareness of hash maps.

---

#### Solution B — `filter` with `indexOf` / `lastIndexOf` (O(n²), no extra data structure)

```ts
export function findDuplicates(arr: string[]): string[] {
  return arr.filter((item, index) => arr.indexOf(item) !== arr.lastIndexOf(item) && arr.indexOf(item) === index);
}
```

**How it works:** An item is a duplicate if its first occurrence (`indexOf`) differs from its last occurrence (`lastIndexOf`). The `arr.indexOf(item) === index` guard ensures each duplicate is only included once (at its first position).

**Complexity:** O(n²) time due to repeated linear scans. Simpler to write but slower for large inputs.

---

#### Solution C — Nested loops (O(n²), fully manual)

```ts
export function findDuplicates(arr: string[]): string[] {
  const result: string[] = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j] && !result.includes(arr[i])) {
        result.push(arr[i]);
      }
    }
  }
  return result;
}
```

**How it works:** Compare every pair. When a match is found and the value hasn't been recorded yet, add it to results. The same loop structure as the fixed `hasDuplicate` — a candidate who spots this connection shows good pattern recognition.

**Complexity:** O(n²) time, O(n) space. The most explicit approach, expected from candidates less familiar with higher-order functions.

---

#### Solution D — Sort then scan (O(n log n))

```ts
export function findDuplicates(arr: string[]): string[] {
  const sorted = [...arr].sort();
  const result: string[] = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i] === sorted[i + 1] && !result.includes(sorted[i])) {
      result.push(sorted[i]);
    }
  }
  return result;
}
```

**How it works:** Sorting brings duplicates together as adjacent elements. One scan is enough to detect them. The spread `[...arr]` is important — it avoids mutating the original array.

**Complexity:** O(n log n) time. A middle ground between the brute-force and the Map approach.

---

### What to look for in candidates

| Approach | What it signals |
|----------|----------------|
| Solution A (Map) | Knows data structures, thinks about time complexity |
| Solution B (indexOf/lastIndexOf) | Comfortable with array built-ins, concise thinking |
| Solution C (nested loops) | Understands fundamentals, may be earlier in their learning |
| Solution D (sort + scan) | Knows the sort trick, thinks algorithmically |

Any working solution is acceptable. The interesting conversation is asking *why* they chose their approach.

---

---

## Bonus Question — The Hidden Animal

**Question asked in README:** "What animal is mentioned somewhere in this project's source code?"

**Answer:** `capybara`

**Where it is:** Line 3 of the HINT block in the `findAnagrams` JSDoc inside `src/utils/anagram.ts`:

```ts
 * HINT: A capybara would solve this in O(1) but we'll accept O(n).
```

**What to look for:** The README tells candidates the answer is in one of the files they already worked on. A candidate who read the JSDoc carefully before implementing `findAnagrams` will have seen it. Anyone who jumped straight to the `// TODO` line without reading the context around it will miss it.

---

## Summary

| Task | File | Change |
|------|------|--------|
| 1 — Fix `isAnagram` | `src/utils/anagram.ts` | Add `.toLowerCase()` on both words before sorting |
| 2 — Implement `findAnagrams` | `src/utils/anagram.ts` | `return wordList.filter(w => isAnagram(word, w))` |
| 3 — Fix React controlled inputs | `src/components/AnagramForm.tsx` | Swap the two `onChange` handlers |
| Optional — Fix `hasDuplicate` | `src/utils/duplicates.ts` | Change `j = i` to `j = i + 1` in inner loop |
| Optional — Implement `findDuplicates` | `src/utils/duplicates.ts` | Any of the 4 solutions above |
