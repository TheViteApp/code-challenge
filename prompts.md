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

## Task 3 — Fix the React bug in `AnagramForm` (`src/components/AnagramForm.tsx`)

### The Bug

The two `onChange` handlers are **swapped**. In React, a controlled input requires that:
- `value` is bound to a state variable
- `onChange` updates **that same state variable**

What the buggy code does instead:

```tsx
// "Word" input: value is `word`, but onChange updates `wordList`
<input
  id="word"
  value={word}
  onChange={(e) => setWordList(e.target.value)}  // ← wrong setter
/>

// "Word List" input: value is `wordList`, but onChange updates `word`
<input
  id="wordList"
  value={wordList}
  onChange={(e) => setWord(e.target.value)}  // ← wrong setter
/>
```

**Symptom:** When the user types in either input, the wrong state is updated. Because `value={word}` is controlled by `word` state (which never changes when typing in that input), the input appears to stay blank.

### The Fix

Swap the `onChange` handlers so each input updates its own state:

```tsx
<input
  id="word"
  type="text"
  value={word}
  onChange={(e) => setWord(e.target.value)}
/>

<input
  id="wordList"
  type="text"
  value={wordList}
  onChange={(e) => setWordList(e.target.value)}
/>
```

### Why this is a React-specific concept

In plain HTML, an `<input>` manages its own value internally. In React, when you set `value={...}` on an input, React **takes control** of that value — the input will only display what React tells it to. This is called a **controlled component**.

The contract of a controlled component is:
1. React sets the displayed value via `value`
2. User interaction fires `onChange`
3. The handler updates state
4. React re-renders with the new state value

If step 3 updates the wrong state variable, the displayed value never changes, making the input feel frozen.

---

## Summary

| Task | File | Change |
|------|------|--------|
| 1 — Fix `isAnagram` | `src/utils/anagram.ts` | Add `.toLowerCase()` on both words before sorting |
| 2 — Implement `findAnagrams` | `src/utils/anagram.ts` | `return wordList.filter(w => isAnagram(word, w))` |
| 3 — Fix React controlled inputs | `src/components/AnagramForm.tsx` | Swap the two `onChange` handlers |
