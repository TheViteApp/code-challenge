# Anagram Finder — Coding Challenge

Welcome! This challenge tests your ability to read code carefully, spot bugs, and implement missing logic. The framework is just the vehicle — we care about how you think.

## What is an Anagram?

Two words are anagrams if one can be formed by rearranging all the letters of the other (case-insensitive).

- `"listen"` and `"silent"` → anagrams ✓
- `"triangle"` and `"integral"` → anagrams ✓
- `"hello"` and `"world"` → NOT anagrams ✗

---

## Getting Started

**Requirements:** Node.js >= 18 and pnpm installed.

```bash
pnpm install       # install dependencies
pnpm dev           # start the app at http://localhost:5173
pnpm test          # run all tests once
pnpm test:watch    # run tests in watch mode (reruns on file change)
```

Run `pnpm test` first — you'll see several tests failing. Your goal is to make them all pass.

---

## Your Tasks

There are **3 things** to fix or implement. All changes belong in exactly two files:

- `src/utils/anagram.ts`
- `src/components/AnagramForm.tsx`

**Do not modify any test files.**

---

### Task 1 — Fix the bug in `isAnagram` (`src/utils/anagram.ts`)

The `isAnagram` function compares two words to determine if they are anagrams. It works for some cases but fails for others. Find the bug and fix it.

> The fix is a small, one-line change.

---

### Task 2 — Implement `findAnagrams` (`src/utils/anagram.ts`)

The `findAnagrams` function is currently empty — it always returns `[]`. Implement it so it returns all words from `wordList` that are anagrams of `word`.

> Hints are in the JSDoc comments above the function.

---

### Task 3 — Fix the React bug in `AnagramForm` (`src/components/AnagramForm.tsx`)

The form component has a bug that causes the inputs to behave unexpectedly. When you type in one field, the wrong state gets updated. Find where the bug is and correct it.

---

## Acceptance Criteria

When all tasks are complete, running `pnpm test` must show **all tests passing**.

The app should also work correctly in the browser:

1. Type a word (e.g. `listen`) in the **Word** field
2. Type a comma-separated list (e.g. `silent, hello, enlist, world`) in the **Word List** field
3. Click **Find Anagrams**
4. The results should show `silent` and `enlist`

---

## Rules

- Only modify `src/utils/anagram.ts` and `src/components/AnagramForm.tsx`
- Do not install additional dependencies
- Do not modify any files inside `src/__tests__/`
- No console.log should exist once you're done (can use them while resolving)

Good luck!
