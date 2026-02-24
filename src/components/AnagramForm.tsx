import { useState } from 'react';
import { findAnagrams } from '../utils/anagram';

function AnagramForm() {
  const [word, setWord] = useState('');
  const [wordList, setWordList] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const candidates = wordList
      .split(',')
      .map((w) => w.trim())
      .filter(Boolean);
    const anagrams = findAnagrams(word, candidates);
    setResults(anagrams);
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="word">Word</label>
        <input
          id="word"
          type="text"
          value={word}
          onChange={(e) => setWordList(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="wordList">Word List (comma-separated)</label>
        <input
          id="wordList"
          type="text"
          value={wordList}
          onChange={(e) => setWord(e.target.value)}
        />
      </div>

      <button type="submit">Find Anagrams</button>

      {submitted && results.length > 0 && (
        <div className="results">
          <h2>Anagrams found:</h2>
          <ul>
            {results.map((anagram) => (
              <li key={anagram}>{anagram}</li>
            ))}
          </ul>
        </div>
      )}

      {submitted && results.length === 0 && (
        <p className="no-results">No anagrams found.</p>
      )}
    </form>
  );
}

export default AnagramForm;
