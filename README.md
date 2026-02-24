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

The required tasks touch exactly these files:

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

### Task 3 — Fix the React component (`src/components/AnagramForm.tsx`)

Something is wrong with `AnagramForm`. The form renders correctly but does not behave as expected. Read the component carefully, find what's broken, and fix it.

---

## Optional Task — Duplicates (`src/utils/duplicates.ts`)

The form also shows duplicate words from your word list after each submit.
There are two functions in `src/utils/duplicates.ts`:

- `hasDuplicate(arr)` — has a bug. Find and fix it.
- `findDuplicates(arr)` — is empty. Implement it so it returns all values that appear more than once (each listed once).

> There is no single correct solution for `findDuplicates` — any working approach is valid.

---

## Acceptance Criteria

When all tasks are complete, running `pnpm test` must show **all tests passing**.

The app should also work correctly in the browser:

1. Type a word (e.g. `listen`) in the **Word** field
2. Type a comma-separated list (e.g. `silent, hello, enlist, silent`) in the **Word List** field
3. Click **Find Anagrams**
4. Anagram results should show `silent` and `enlist`
5. Duplicate words should show `silent`

---

## Rules

- Only modify `src/utils/anagram.ts`, `src/utils/duplicates.ts`, and `src/components/AnagramForm.tsx`
- Do not install additional dependencies
- Do not modify any files inside `src/__tests__/`
- No console.log should exist once you're done (can use them while resolving)

Good luck!

---

#### One Last Thing

Before you submit, answer this question in your submission notes or as a comment in your first commit message:

> **What animal is mentioned somewhere in this project's source code?**

Include your answer in a comment on your first commit message.

_(You won't be able to guess it — but it's in one of the files you already worked on.)_
