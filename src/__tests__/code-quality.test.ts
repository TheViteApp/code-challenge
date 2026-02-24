import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const SOURCE_FILES = [
  join(process.cwd(), 'src/utils/anagram.ts'),
  join(process.cwd(), 'src/utils/duplicates.ts'),
  join(process.cwd(), 'src/components/AnagramForm.tsx'),
];

describe('code quality', () => {
  it('should not contain console.log statements', () => {
    for (const file of SOURCE_FILES) {
      const content = readFileSync(file, 'utf-8');
      expect(content, `${file} contains a console.log — please remove it`).not.toMatch(
        /console\.log/
      );
    }
  });
});
